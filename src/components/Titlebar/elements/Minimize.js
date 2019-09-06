import React from "react";
const { remote } = window.require("electron");

function Minimize() {
  function onMinimize() {
    const currentWindow = remote.getCurrentWindow();
    currentWindow.minimize();
  }
  return (
    <div className="minimize" onClick={onMinimize}>
      <svg className="minimize__icon">
        <use xlinkHref="#icon-minimize" />
      </svg>
    </div>
  );
}

export default Minimize;
