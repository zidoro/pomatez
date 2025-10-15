import React, { useContext, useCallback } from "react";
import { TimerStatus } from "store/timer/types";
import {
  StyledTitlebar,
  StyledWindowActions,
  StyledCloseButton,
  StyledMinimizeButton,
  StyledMarkWrapper,
  StyledMarkLogo,
  StyledMarkName,
} from "styles";
import { ConnnectorContext } from "contexts";
import { APP_NAME } from "config";

import Json from "../../package.json";

import appIcon from "assets/logos/tray.png";
import appIconDark from "assets/logos/tray-dark.png";
import appIconShortBreak from "assets/logos/tray-sb.png";
import appIconShortBreakDark from "assets/logos/tray-dark-sb.png";
import appIconLongBreak from "assets/logos/tray-lb.png";
import appIconLongBreakDark from "assets/logos/tray-dark-lb.png";

type Props = {
  darkMode: boolean;
  timerType?: TimerStatus;
};

const Titlebar: React.FC<Props> = ({ darkMode, timerType }) => {
  const { onMinimizeCallback, onExitCallback } =
    useContext(ConnnectorContext);

  const getAppIcon = useCallback(() => {
    switch (timerType) {
      case TimerStatus.STAY_FOCUS:
        return darkMode ? appIconDark : appIcon;
      case TimerStatus.SHORT_BREAK:
        return darkMode ? appIconShortBreakDark : appIconShortBreak;
      case TimerStatus.LONG_BREAK:
        return darkMode ? appIconLongBreakDark : appIconLongBreak;
      default:
        return darkMode ? appIconLongBreakDark : appIconLongBreak;
    }
  }, [darkMode, timerType]);

  return (
    <StyledTitlebar data-tauri-drag-region>
      <StyledMarkWrapper>
        <StyledMarkLogo src={getAppIcon()} />
        <StyledMarkName>
          {APP_NAME} {Json.version && <span>v{Json.version}</span>}
        </StyledMarkName>
      </StyledMarkWrapper>

      <StyledWindowActions>
        <StyledMinimizeButton onClick={onMinimizeCallback} />
        <StyledCloseButton onClick={onExitCallback} />
      </StyledWindowActions>
    </StyledTitlebar>
  );
};

export default React.memo(Titlebar);
