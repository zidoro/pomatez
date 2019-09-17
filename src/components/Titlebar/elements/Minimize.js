import React from "react";
const { remote } = window.require("electron");

function Minimize() {
  const onMinimize = () => remote.getCurrentWindow().minimize();
  return (
    <div className="minimize" onClick={onMinimize}>
      <svg className="minimize__icon">
        <use xlinkHref="#icon-minimize" />
      </svg>
    </div>
  );
}

export default Minimize;
