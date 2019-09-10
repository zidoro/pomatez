import React from "react";
import { Switch } from "../Switch";

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
