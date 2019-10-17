import React, { useContext } from "react";
import { StoreContext, SHOW_CONFIG, SET_DARKMODE } from "../../models";
import { Exit, Menu, Minimize, Mode } from "./elements";

function Titlebar() {
  const [{ title, showConfig }, dispatchNav] = useContext(StoreContext).nav;

  const [{ darkMode }, dispatchSetting] = useContext(StoreContext).setting;

  return (
    <div className="titlebar">
      <div className="titlebar__option">
        <Menu
          showConfig={showConfig}
          onClick={() => dispatchNav({ type: SHOW_CONFIG })}
        />
        <Mode
          darkMode={darkMode}
          onClick={() =>
            dispatchSetting({
              type: SET_DARKMODE,
              payload: !darkMode
            })
          }
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
