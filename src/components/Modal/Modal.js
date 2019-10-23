import React from "react";
import ReactDOM from "react-dom";

import { Minimize, Exit } from "../Titlebar/elements";
import appIcon from "../../assets/icons/32x32.png";

function Modal() {
  let portalId = "portal-root";
  let portalRoot = document.getElementById(portalId);

  if (!portalRoot) {
    portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", portalId);

    document.body.appendChild(portalRoot);
  }

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="window">
        <div className="window__titlebar">
          <img src={appIcon} alt="application icon" className="window__icon" />
          <div className="window__title">New updates available</div>
          <Minimize />
          <Exit />
        </div>
        <div className="window__body">
          <div className="update">
            <div className="update__label">
              <h3 className="update__label--heading">Updating now...</h3>
              <p className="update__label--indicator">35%</p>
            </div>
            <div className="update__progress">
              <div className="update__progress--base"></div>
              <div className="update__progress--indicator"></div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    portalRoot
  );
}

export default Modal;
