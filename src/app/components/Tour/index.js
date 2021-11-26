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
    width: "375px",
  },
  tooltipContainer: {
    textAlign: "left",
    fontSize: "0.875rem",
  },
  buttonBack: {
    fontSize: "0.875rem",
  },
  buttonNext: {
    fontSize: "0.875rem",
    color: "rgba(76, 29, 149, 1)",
    fontWeight: 500,
    lineHeight: "1.25rem",
    padding: "0.5rem 1rem",
    backgroundColor: "rgba(237, 233, 254, 1)",
    borderRadius: "0.375rem",
    outlineColor: "rgba(76, 29, 149, 1)",
  },
};

export const Tour = ({ children, steps, storageItem, ...rest }) => {
  const [tourState, dispatch] = useReducer(tourReducer, {
    ...INITIAL_STATE,
    steps,
  });

  useEffect(() => {
    if (!localStorage.getItem(storageItem)) {
      dispatch({ type: "START" });
    }
  }, [storageItem]);

  const callback = (data) => {
    const { action, index, type, status } = data;
    if (
      action === ACTIONS.CLOSE ||
      (status === STATUS.SKIPPED && tourState.run) ||
      status === STATUS.FINISHED
    ) {
      dispatch({ type: "STOP" });
      localStorage.setItem(storageItem, "true");
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
