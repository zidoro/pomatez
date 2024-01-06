import React from "react";
import { TimerStatus } from "store/timer/types";
import { StyledSessions, StyledSessionReset } from "styles";
import { SVG } from "components";

type Props = {
  timerType: TimerStatus;
  round: number;
  sessionRounds: number;
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
};

const Sessions: React.FC<Props> = ({
  timerType,
  round,
  sessionRounds,
  onClick,
}) => {
  return (
    <StyledSessions>
      <span>
        {round} / {sessionRounds}
      </span>
      <span>Sessions</span>

      <StyledSessionReset timerType={timerType} onClick={onClick}>
        <SVG name="refresh" />
      </StyledSessionReset>
    </StyledSessions>
  );
};

export default React.memo(Sessions);
