import React from "react";
import { Switch } from "../Switch";

function Toggle({ toggleName, switchId, checked, onClick }) {
  return (
    <div className="toggle" onClick={onClick}>
      <label htmlFor={switchId} className="toggle__name">
        {toggleName}
      </label>
      <Switch id={switchId} checked={checked} />
    </div>
  );
}

export default Toggle;
