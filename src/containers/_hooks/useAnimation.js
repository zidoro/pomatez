import { useSpring, config } from "react-spring";
import PropTypes from "prop-types";

function useAnimation({ axisX }) {
  const { o, x } = useSpring({
    o: 1,
    x: 0,
    from: { o: 0, x: axisX },
    config: config.stiff
  });
  return { o, x };
}

useAnimation.propTypes = {
  axisX: PropTypes.number
};

export default useAnimation;
