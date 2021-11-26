export const INITIAL_STATE = {
  key: new Date().getTime(),
  run: false,
  continuous: true,
  stepIndex: 0,
  steps: [],
};

const tourReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "START":
      return { ...state, run: true };
    case "RESET":
      return { ...state, stepIndex: 0 };
    case "STOP":
      return { ...state, run: false };
    case "NEXT_OR_PREV":
      return { ...state, ...action.payload };
    case "RESTART":
      return {
        ...state,
        stepIndex: 0,
        run: true,
        key: new Date().getTime(),
      };
    default:
      return state;
  }
};

export default tourReducer;
