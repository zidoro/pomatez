import React from "react";
import ReactRipples from "react-ripples";
import PropTypes from "prop-types";

Ripple.propTypes = {
  color: PropTypes.string.isRequired
};

Ripple.defaultProps = {
  color: "rgba(255,255,255, .1)"
};

function Ripple({ color, children }) {
  return <ReactRipples color={color}>{children}</ReactRipples>;
}

export default React.memo(Ripple);
