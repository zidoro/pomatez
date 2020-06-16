import React, { useEffect, useContext, useCallback, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AppStateTypes,
  SHORT_BREAK,
  LONG_BREAK,
  SPECIAL_BREAK,
  SettingTypes,
} from "store";
import { StyledLayout } from "styles";

import Titlebar from "./Titlebar";
import Navigation from "./Navigation";
import { ThemeContext } from "contexts";

type Props = {} & RouteComponentProps;

const Layout: React.FC<Props> = ({ history, location, children }) => {
  const timer = useSelector((state: AppStateTypes) => state.timer);

  const settings: SettingTypes = useSelector(
    (state: AppStateTypes) => state.settings
  );

  const { toggleThemeAction } = useContext(ThemeContext);

  const [noTransition, setNoTransition] = useState(false);

  const registerKey = useCallback(
    (e: KeyboardEvent) => {
      const keyCode = e.keyCode;
      const keyChar = String.fromCharCode(keyCode);

      if (e.altKey && e.shiftKey && keyChar === "T") {
        if (toggleThemeAction) toggleThemeAction();
      }
    },
    [toggleThemeAction]
  );

  useEffect(() => {
    document.addEventListener("keydown", registerKey);
    return () => document.removeEventListener("keydown", registerKey);
  }, [registerKey]);

  useEffect(() => {
    if (settings.enableStrictMode) {
      if (
        timer.timerType === SHORT_BREAK ||
        timer.timerType === LONG_BREAK ||
        timer.timerType === SPECIAL_BREAK
      ) {
        if (location.pathname !== "/") {
          setNoTransition(true);
          history.push("/");
        }
      } else {
        setNoTransition(false);
      }
    }
  }, [timer.timerType, location, history, settings.enableStrictMode]);

  return (
    <StyledLayout noTransition={noTransition}>
      {!settings.useNativeTitlebar && (
        <Titlebar
          darkMode={settings.enableDarkTheme}
          timerType={timer.timerType}
        />
      )}
      <Navigation timerType={timer.timerType} />
      {children}
    </StyledLayout>
  );
};

export default withRouter(Layout);
