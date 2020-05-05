import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppStateTypes,
  setPlay,
  skipTimer,
  setRound,
  setTimerType,
  STAY_FOCUS,
  SHORT_BREAK,
  LONG_BREAK,
  SPECIAL_BREAK,
  togglenotificationSoundOn,
} from "store";
import {
  StyledControl,
  StyledControlMain,
  StyledStrictIndicator,
  StyledLockIndicator,
} from "styles";
import { SVG } from "components";

import Sessions from "./Sessions";
import ResetButton from "./ResetButton";
import PlayButton from "./PlayButton";
import SkipButton from "./SkipButton";
import VolumeButton from "./VolumeButton";

type Props = {
  resetTimerAction: () => void;
};

const Control: React.FC<Props> = ({ resetTimerAction }) => {
  const {
    round,
    playing,
    timerType,
    sessionRounds,
    notifactionSound,
    onStrickMode,
    isSettingLock,
  } = useSelector(({ timer, config, settings }: AppStateTypes) => ({
    round: timer.round,
    playing: timer.playing,
    timerType: timer.timerType,
    sessionRounds: config.sessionRounds,
    notifactionSound: settings.notificationSoundOn,
    onStrickMode: settings.enableStrictMode,
    isSettingLock: settings.isSettingLock,
  }));

  const dispatch = useDispatch();

  const onResetCallback = useCallback(() => {
    if (playing && onStrickMode) return;
    resetTimerAction();
  }, [resetTimerAction, playing, onStrickMode]);

  const onPlayCallback = useCallback(() => {
    if (playing && onStrickMode) return;
    dispatch(setPlay());
  }, [dispatch, playing, onStrickMode]);

  const onNotifacationSoundCallback = useCallback(() => {
    dispatch(togglenotificationSoundOn());
  }, [dispatch]);

  const onSkipAction = useCallback(() => {
    if (playing && onStrickMode) return;

    switch (timerType) {
      case STAY_FOCUS:
        if (round < sessionRounds) {
          dispatch(skipTimer("SHORT_BREAK"));
        } else {
          dispatch(skipTimer("LONG_BREAK"));
        }
        if (!playing) dispatch(setPlay());
        break;

      case SHORT_BREAK:
        dispatch(skipTimer("STAY_FOCUS"));
        dispatch(setRound(round + 1));
        if (!playing) dispatch(setPlay());
        break;

      case LONG_BREAK:
        dispatch(skipTimer("STAY_FOCUS"));
        dispatch(setRound(1));
        if (!playing) dispatch(setPlay());
        break;

      case SPECIAL_BREAK:
        dispatch(skipTimer("STAY_FOCUS"));
        if (!playing) dispatch(setPlay());
        break;
    }
  }, [dispatch, round, sessionRounds, timerType, playing, onStrickMode]);

  const onResetSessionCallback = useCallback(() => {
    dispatch(setTimerType("STAY_FOCUS"));
    dispatch(setRound(1));
  }, [dispatch]);

  return (
    <StyledControl type={timerType}>
      <Sessions
        timerType={timerType}
        round={round}
        sessionRounds={sessionRounds}
        onClick={onResetSessionCallback}
      />

      <StyledControlMain>
        <ResetButton onClick={onResetCallback} />
        <PlayButton playing={playing} onClick={onPlayCallback} />
        <SkipButton onClick={onSkipAction} />
        <VolumeButton
          soundOn={notifactionSound}
          onClick={onNotifacationSoundCallback}
        />
      </StyledControlMain>

      {onStrickMode && !isSettingLock && (
        <StyledStrictIndicator>
          <SVG name="hand" />
        </StyledStrictIndicator>
      )}

      {isSettingLock && (
        <StyledLockIndicator>
          <SVG name="lock" />
        </StyledLockIndicator>
      )}
    </StyledControl>
  );
};

export default React.memo(Control);
