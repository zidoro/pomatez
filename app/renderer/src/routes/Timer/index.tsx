import React, { useContext, useCallback } from "react";
import { CounterContext } from "contexts";
import { StyledTimer } from "styles";

import Counter from "./Counter";
import PriorityCard from "./PriorityCard";
import Control from "./Control";

export default () => {
	const { resetTimerAction } = useContext(CounterContext);

	const onResetCallback = useCallback(() => {
		if (resetTimerAction) resetTimerAction();
	}, [resetTimerAction]);

	return (
		<StyledTimer>
			<Counter />
			<PriorityCard />
			<Control resetTimerAction={onResetCallback} />
		</StyledTimer>
	);
};
