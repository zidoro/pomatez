import React from "react";
import Menu from "./elements/Menu";
import Minimize from "./elements/Minimize";
import Exit from "./elements/Exit";

import Sprite from "../../assets/sprite.svg";

function Titlebar() {
  return (
    <div className="titlebar">
      <div className="titlebar__menu">
        <Menu />
      </div>

      <div className="titlebar__title">
        <p className="app-name">Time Management App</p>
      </div>

      <div className="titlebar__icon">
        <Minimize Sprite={Sprite} />
        <Exit Sprite={Sprite} />
      </div>
    </div>
  );
}

export default Titlebar;
