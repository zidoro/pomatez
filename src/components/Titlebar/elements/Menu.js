import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

import Ripple from "../../Ripple";

function Menu() {
  const showConfig = useStoreState(({ nav }) => nav.showConfig);
  const setShowConfig = useStoreActions(({ nav }) => nav.setShowConfig);

  return (
    <Ripple>
      <div className="menu" onClick={() => setShowConfig()}>
        <div className="menu-box">
          <div
            className={`menu-box__icon menu-box__icon--1 ${
              showConfig ? "active" : ""
            }`}
          ></div>
          <div
            className={`menu-box__icon menu-box__icon--2 ${
              showConfig ? "active" : ""
            }`}
          ></div>
        </div>
      </div>
    </Ripple>
  );
}

export default Menu;
