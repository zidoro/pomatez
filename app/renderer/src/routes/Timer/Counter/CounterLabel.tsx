import React from "react";
import { useTranslation } from "react-i18next";
import { TimerStatus } from "store/timer/types";
import { StyledCounterLabel } from "styles";

type Props = {
  timerType?: TimerStatus;
};

const CounterLabel: React.FC<Props> = ({ timerType }) => {
  const { t } = useTranslation();

  return (
    <StyledCounterLabel>
      {(timerType === TimerStatus.SHORT_BREAK &&
        t("timer.shortBreak")) ||
        (timerType === TimerStatus.LONG_BREAK &&
          t("timer.longBreak")) ||
        (timerType === TimerStatus.SPECIAL_BREAK &&
          t("timer.specialBreak")) ||
        t("timer.stayFocused")}
    </StyledCounterLabel>
  );
};

export default React.memo(CounterLabel);
