import { useTransition, config } from "react-spring";
import PropTypes from "prop-types";

useAnimateLeft.propTypes = {
  condition: PropTypes.bool.isRequired,
  x: PropTypes.number.isRequired
};

function useAnimateLeft({ condition, x }) {
  const transitionLeft = useTransition(condition, null, {
    from: { opacity: 0, transform: `translate3d(-${x}px, 0, 0)` },
    enter: { opacity: 1, transform: `"translate3d(0, 0, 0)"` },
    leave: { opacity: 0, transform: `"translate3d(-${x}, 0, 0)"` },
    config: config.stiff
  });

  return transitionLeft;
}

useAnimateRight.propTypes = {
  condition: PropTypes.bool.isRequired,
  x: PropTypes.number.isRequired
};

function useAnimateRight({ condition, x }) {
  const transitionRight = useTransition(condition, null, {
    from: { opacity: 0, transform: `translate3d(${x}px, 0, 0)` },
    enter: { opacity: 1, transform: `"translate3d(0, 0, 0)"` },
    leave: { opacity: 0, transform: `"translate3d(${x}, 0, 0)"` },
    config: config.stiff
  });

  return transitionRight;
}

export { useAnimateLeft, useAnimateRight };
