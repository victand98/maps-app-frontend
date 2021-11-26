import React, { Fragment, useEffect, useReducer } from "react";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import tourReducer, { INITIAL_STATE } from "./tour.reducer";
import { TOUR_LOCALE } from "../../../helpers/constants";

const styles = {
  options: {
    arrowColor: "rgba(255, 255, 255,1)",
    backgroundColor: "rgba(255, 255, 255,1)",
    overlayColor: "rgba(17, 24, 39, 0.7)",
    primaryColor: "rgba(76, 29, 149, 0.9)",
    textColor: "rgba(17, 24, 39, 1)",
    zIndex: 1000,
  },
  tooltipContainer: {
    textAlign: "left",
    fontSize: "0.875rem",
  },
};

export const Tour = ({ children, steps, ...rest }) => {
  const [tourState, dispatch] = useReducer(tourReducer, {
    ...INITIAL_STATE,
    steps,
  });

  useEffect(() => {
    if (!localStorage.getItem("tour")) {
      dispatch({ type: "START" });
    }
  }, []);

  const callback = (data) => {
    const { action, index, type, status } = data;
    if (
      action === ACTIONS.CLOSE ||
      (status === STATUS.SKIPPED && tourState.run) ||
      status === STATUS.FINISHED
    ) {
      dispatch({ type: "STOP" });
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      dispatch({
        type: "NEXT_OR_PREV",
        payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) },
      });
    }
  };

  const startTour = () => {
    dispatch({ type: "RESTART" });
  };

  return (
    <Fragment>
      <div onClick={startTour}>{children}</div>

      <Joyride
        {...tourState}
        callback={callback}
        showSkipButton={true}
        scrollToFirstStep={true}
        showProgress={true}
        locale={TOUR_LOCALE}
        styles={styles}
        {...rest}
      />
    </Fragment>
  );
};
