import React, { useEffect, useContext, useCallback, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppStateTypes, SHORT_BREAK, LONG_BREAK, SPECIAL_BREAK } from "store";
import { StyledLayout } from "styles";

import Titlebar from "./Titlebar";
import Navigation from "./Navigation";
import { ThemeContext } from "contexts";

type Props = {} & RouteComponentProps;

const Layout: React.FC<Props> = ({ history, location, children }) => {
  const { timerType, onStrictMode, darkMode } = useSelector(
    ({ timer, settings }: AppStateTypes) => ({
      timerType: timer.timerType,
      onStrictMode: settings.enableStrictMode,
      darkMode: settings.enableDarkTheme,
    })
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
    if (onStrictMode) {
      if (
        timerType === SHORT_BREAK ||
        timerType === LONG_BREAK ||
        timerType === SPECIAL_BREAK
      ) {
        if (location.pathname !== "/") {
          setNoTransition(true);
          history.push("/");
        }
      } else {
        setNoTransition(false);
      }
    }
  }, [timerType, location, history, onStrictMode]);

  return (
    <StyledLayout noTransition={noTransition}>
      <Titlebar darkMode={darkMode} timerType={timerType} />
      <Navigation timerType={timerType} />
      {children}
    </StyledLayout>
  );
};

export default withRouter(Layout);
