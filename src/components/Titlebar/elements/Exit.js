import React from "react";
const { remote } = window.require("electron");

function Exit({ Sprite }) {
  function onExit() {
    const app = remote.app;
    app.quit();
  }
  return (
    <div className="exit" onClick={onExit}>
      <svg className="exit__icon">
        <use xlinkHref={Sprite + "#icon-exit"} />
      </svg>
    </div>
  );
}

export default Exit;
