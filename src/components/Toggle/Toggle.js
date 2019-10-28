import React from "react";
import PropTypes from "prop-types";
import Switch from "../Switch";

Toggle.propTypes = {
  toggleName: PropTypes.string.isRequired,
  switchId: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

function Toggle({ toggleName, switchId, isChecked, onChange }) {
  return (
    <div className="toggle">
      <label htmlFor={switchId} className="toggle__name">
        {toggleName}
      </label>
      <Switch id={switchId} isChecked={isChecked} onChange={onChange} />
    </div>
  );
}

export default Toggle;
