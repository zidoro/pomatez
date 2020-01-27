import React from "react";
import PropTypes from "prop-types";

Switch.propTypes = {
  id: PropTypes.string.isRequired,
  isChecked: PropTypes.bool
};

Switch.defaultProps = {
  isChecked: false
};

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

export default React.memo(Switch);
