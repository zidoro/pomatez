import { CounterContext } from "contexts";
import { useTime } from "hooks";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { AppStateTypes, SettingTypes } from "store";
import {
	StyledCounterContainer,
	StyledCounterProgress,
	StyledCounterWrapper,
} from "styles";
import CounterLabel from "./CounterLabel";
import CounterTimer from "./CounterTimer";
import CounterType from "./CounterType";

const Counter: React.FC = () => {
	const settings: SettingTypes = useSelector(
		(state: AppStateTypes) => state.settings,
	);

	const { count, duration, timerType, shouldFullscreen } =
		useContext(CounterContext);

	const dashOffset = (duration - count) * (674 / duration);

	const { minutes, seconds } = useTime(count);
	if (settings.compactMode) {
		return (
			<StyledCounterContainer className="compact" fullscreen={shouldFullscreen}>
				<CounterTimer
					compact
					timerType={timerType}
					minutes={minutes}
					seconds={seconds}
				/>
			</StyledCounterContainer>
		);
	}

	return (
		<StyledCounterContainer fullscreen={shouldFullscreen}>
			<StyledCounterProgress
				offset={dashOffset}
				type={timerType}
				animate={settings.enableProgressAnimation ? "true" : "false"}
			/>

			<StyledCounterWrapper>
				<CounterType timerType={timerType} />

				<CounterTimer
					timerType={timerType}
					minutes={minutes}
					seconds={seconds}
				/>

				<CounterLabel timerType={timerType} />
			</StyledCounterWrapper>
		</StyledCounterContainer>
	);
};

export default React.memo(Counter);
