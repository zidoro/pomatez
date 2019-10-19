import React from "react";
const { remote } = window.require("electron");

function Exit() {
  const onExit = () => remote.getCurrentWindow().hide();
  return (
    <div className="exit" onClick={onExit}>
      <svg className="exit__icon">
        <use xlinkHref="#icon-exit" />
      </svg>
    </div>
  );
}

export default Exit;
