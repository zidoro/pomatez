import React from "react";
import { TimerTypes } from "store";
import { StyledCounterTimer } from "styles";

type Props = {
	timerType?: TimerTypes["timerType"];
	minutes: string;
	seconds: string;
	compact?: boolean;
};

const CounterTimer: React.FC<Props> = ({
	timerType,
	minutes,
	seconds,
	compact,
}) => {
	return (
		<StyledCounterTimer className={compact ? "compact" : ""} type={timerType}>
			<span>{minutes}</span>
			<span>:</span>
			<span>{seconds}</span>
		</StyledCounterTimer>
	);
};

export default React.memo(CounterTimer);
