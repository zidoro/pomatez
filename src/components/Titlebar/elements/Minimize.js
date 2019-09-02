import React from "react";
const { remote } = window.require("electron");

function Minimize({ Sprite }) {
  function onMinimize() {
    const currentWindow = remote.getCurrentWindow();
    currentWindow.minimize();
  }
  return (
    <div className="minimize" onClick={onMinimize}>
      <svg className="minimize__icon">
        <use xlinkHref={Sprite + "#icon-minimize"} />
      </svg>
    </div>
  );
}

export default Minimize;
