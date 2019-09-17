import React, { useContext } from "react";
import { StoreContext, SHOW_CONFIG } from "../../models";
import { Exit, Menu, Minimize } from "./elements";

function Titlebar() {
  const [{ title, showConfig }, dispatch] = useContext(StoreContext).nav;

  return (
    <div className="titlebar">
      <div className="titlebar__menu">
        <Menu
          showConfig={showConfig}
          onClick={() => dispatch({ type: SHOW_CONFIG })}
        />
      </div>

      <div className="titlebar__title">
        <p className="app-name">{title}</p>
      </div>

      <div className="titlebar__icon">
        <Minimize />
        <Exit />
      </div>
    </div>
  );
}

export default Titlebar;
