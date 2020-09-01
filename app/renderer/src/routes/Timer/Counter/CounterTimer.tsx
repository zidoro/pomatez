import React from "react";
import { TimerTypes } from "store";
import { StyledCounterTimer } from "styles";

type Props = {
	timerType?: TimerTypes["timerType"];
	minutes: string;
	seconds: string;
};

const CounterTimer: React.FC<Props> = ({ timerType, minutes, seconds }) => {
	return (
		<StyledCounterTimer type={timerType}>
			<span>{minutes}</span>
			<span>:</span>
			<span>{seconds}</span>
		</StyledCounterTimer>
	);
};

export default React.memo(CounterTimer);
