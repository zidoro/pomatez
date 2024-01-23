import React, {
  useEffect,
  useContext,
  useCallback,
  useState,
  useRef,
} from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { StyledLayout } from "styles";

import Titlebar from "./Titlebar";
import Navigation from "./Navigation";
import { ThemeContext } from "contexts";
import { TimerStatus } from "store/timer/types";
import { useAppSelector } from "hooks/storeHooks";

type Props = {} & RouteComponentProps;

const Layout: React.FC<Props> = ({ history, location, children }) => {
  const timer = useAppSelector((state) => state.timer);

  const settings = useAppSelector((state) => state.settings);

  const { toggleThemeAction } = useContext(ThemeContext);

  const [noTransition, setNoTransition] = useState(false);

  const useNativeTitlebar = useRef(settings.useNativeTitlebar);

  const registerKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && e.code === "KeyT") {
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
    if (settings.enableFullscreenBreak) {
      if (
        timer.timerType === TimerStatus.SHORT_BREAK ||
        timer.timerType === TimerStatus.LONG_BREAK ||
        timer.timerType === TimerStatus.SPECIAL_BREAK
      ) {
        if (location.pathname !== "/") {
          setNoTransition(true);
          history.push("/");
        }
      } else {
        setNoTransition(false);
      }
    }
  }, [
    timer.timerType,
    location,
    history,
    settings.enableFullscreenBreak,
  ]);

  return (
    <StyledLayout noTransition={noTransition}>
      {!settings.useNativeTitlebar && (
        <Titlebar
          darkMode={settings.enableDarkTheme}
          timerType={timer.timerType}
        />
      )}
      {settings["compactMode"] ? null : (
        <Navigation timerType={timer.timerType} />
      )}
      {children}
    </StyledLayout>
  );
};

export default withRouter(Layout);
