import React from "react";
import PropTypes from "prop-types";

function Switch({ id, checked }) {
  return <input type="checkbox" className="switch" id={id} checked={checked} />;
}

Switch.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool
};

export default Switch;
