import React from "react";
import PropTypes from "prop-types";

function Switch({ id, isChecked, onChange }) {
  return (
    <input
      type="checkbox"
      className="switch"
      id={id}
      checked={isChecked}
      onChange={onChange}
    />
  );
}

Switch.propTypes = {
  id: PropTypes.string,
  isChecked: PropTypes.bool
};

export default Switch;
