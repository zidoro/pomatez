import React from "react";
const { remote } = window.require("electron");

function Exit() {
  function onExit() {
    const app = remote.app;
    app.quit();
  }
  return (
    <div className="exit" onClick={onExit}>
      <svg className="exit__icon">
        <use xlinkHref="#icon-exit" />
      </svg>
    </div>
  );
}

export default Exit;
