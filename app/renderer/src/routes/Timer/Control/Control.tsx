import WarningBell from "assets/audios/warning-bell.wav";
import { SVG } from "components";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppStateTypes,
  LONG_BREAK,
  setEnableCompactMode,
  setPlay,
  setRound,
  setTimerType,
  SettingTypes,
  SHORT_BREAK,
  skipTimer,
  SPECIAL_BREAK,
  STAY_FOCUS,
  toggleNotificationSound,
} from "store";
import {
  StyledControl,
  StyledControlMain,
  StyledStrictIndicator,
  StyledStrictSnackbar,
  StyledControlSpacer,
} from "styles";
import CompactModeButton from "./CompactModeButton";
import PlayButton from "./PlayButton";
import ResetButton from "./ResetButton";
import Sessions from "./Sessions";
import SkipButton from "./SkipButton";
import VolumeButton from "./VolumeButton";

type Props = {
  resetTimerAction: () => void;
};

const Control: React.FC<Props> = ({ resetTimerAction }) => {
  const { timer, config } = useSelector((state: AppStateTypes) => ({
    timer: state.timer,
    config: state.config,
  }));

  const settings: SettingTypes = useSelector(
    (state: AppStateTypes) => state.settings
  );

  const dispatch = useDispatch();

  const [warn, setWarn] = useState(false);

  const activateWarning = useCallback(() => {
    const warnSound = new Audio(WarningBell);

    setWarn(true);
    warnSound.play();
  }, []);

  const onResetCallback = useCallback(() => {
    if (timer.playing && settings.enableStrictMode) {
      activateWarning();
      return;
    }
    resetTimerAction();
  }, [
    resetTimerAction,
    activateWarning,
    timer.playing,
    settings.enableStrictMode,
  ]);

  const onPlayCallback = useCallback(() => {
    if (timer.playing && settings.enableStrictMode) {
      activateWarning();
      return;
    }
    dispatch(setPlay(!timer.playing));
  }, [
    dispatch,
    activateWarning,
    timer.playing,
    settings.enableStrictMode,
  ]);

  const onNotifacationSoundCallback = useCallback(() => {
    dispatch(toggleNotificationSound());
  }, [dispatch]);

  const onToggleCompactCallback = useCallback(() => {
    dispatch(setEnableCompactMode(!settings.compactMode));
  }, [dispatch, settings.compactMode]);

  const onSkipAction = useCallback(() => {
    if (timer.playing && settings.enableStrictMode) {
      activateWarning();
      return;
    }

    switch (timer.timerType) {
      case STAY_FOCUS:
        if (timer.round < config.sessionRounds) {
          dispatch(skipTimer("SHORT_BREAK"));
        } else {
          dispatch(skipTimer("LONG_BREAK"));
        }
        if (!timer.playing) dispatch(setPlay(!timer.playing));
        break;

      case SHORT_BREAK:
        dispatch(skipTimer("STAY_FOCUS"));
        dispatch(setRound(timer.round + 1));
        if (!timer.playing) dispatch(setPlay(!timer.playing));
        break;

      case LONG_BREAK:
        dispatch(skipTimer("STAY_FOCUS"));
        dispatch(setRound(1));
        if (!timer.playing) dispatch(setPlay(!timer.playing));
        break;

      case SPECIAL_BREAK:
        dispatch(skipTimer("STAY_FOCUS"));
        if (!timer.playing) dispatch(setPlay(!timer.playing));
        break;
    }
  }, [
    dispatch,
    timer.round,
    timer.playing,
    timer.timerType,
    settings.enableStrictMode,
    config.sessionRounds,
    activateWarning,
  ]);

  const onResetSessionCallback = useCallback(() => {
    dispatch(setTimerType("STAY_FOCUS"));
    dispatch(setRound(1));
  }, [dispatch]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (warn) {
      timeout = setTimeout(() => {
        setWarn(false);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [warn]);

  if (settings.compactMode) {
    return (
      <StyledControl className="compact" type={timer.timerType}>
        <Sessions
          timerType={timer.timerType}
          round={timer.round}
          sessionRounds={config.sessionRounds}
          onClick={onResetSessionCallback}
        />
        <StyledControlSpacer className="test" />
        <StyledControlMain compact={settings.compactMode}>
          <ResetButton className="compact" onClick={onResetCallback} />
          <PlayButton
            compact
            playing={timer.playing}
            onClick={onPlayCallback}
          />
          <SkipButton className="compact" onClick={onSkipAction} />
        </StyledControlMain>
        <StyledControlSpacer className="test" />
        <CompactModeButton onClick={onToggleCompactCallback} />
      </StyledControl>
    );
  }

  return (
    <StyledControl type={timer.timerType}>
      <Sessions
        timerType={timer.timerType}
        round={timer.round}
        sessionRounds={config.sessionRounds}
        onClick={onResetSessionCallback}
      />

      <StyledControlSpacer />
      <StyledControlMain>
        <ResetButton onClick={onResetCallback} />
        <PlayButton playing={timer.playing} onClick={onPlayCallback} />
        <SkipButton onClick={onSkipAction} />
        <VolumeButton
          soundOn={settings.notificationSoundOn}
          onClick={onNotifacationSoundCallback}
        />
      </StyledControlMain>

      <StyledControlSpacer />
      {settings.enableStrictMode ? (
        <StyledStrictIndicator warn={warn}>
          <SVG name="alert" />

          <StyledStrictSnackbar warn={warn}>
            You are currently on <span>Strict Mode!</span>
          </StyledStrictSnackbar>
        </StyledStrictIndicator>
      ) : (
        <CompactModeButton flipped onClick={onToggleCompactCallback} />
      )}
    </StyledControl>
  );
};

export default React.memo(Control);
