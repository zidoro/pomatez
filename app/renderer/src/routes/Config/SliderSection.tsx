import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	AppStateTypes,
	setStayFocus,
	setSessionRounds,
	setShorBreak,
	setLongBreak,
} from "store";
import { StyledConfigSliderSection } from "styles";
import ConfigSlider, { ConfigSliderProps } from "./ConfigSlider";

const SliderSection: React.FC = () => {
	const { stayFocus, shortBreak, longBreak, sessionRounds } = useSelector(
		({ config }: AppStateTypes) => ({
			stayFocus: config.stayFocus,
			shortBreak: config.shortBreak,
			longBreak: config.longBreak,
			sessionRounds: config.sessionRounds,
		}),
	);

	const dispatch = useDispatch();

	const sliderRangeList: ConfigSliderProps[] = [
		{
			label: "Stay focus",
			valueType: "mins",
			minValue: 1,
			maxValue: 60,
			value: stayFocus,
			onMouseUp: useCallback(
				(e) => dispatch(setStayFocus(parseInt(e.target.value))),
				[dispatch],
			),
		},
		{
			label: "Short break",
			valueType: "mins",
			minValue: 1,
			maxValue: 60,
			value: shortBreak,
			onMouseUp: useCallback(
				(e) => dispatch(setShorBreak(parseInt(e.target.value))),
				[dispatch],
			),
		},
		{
			label: "Long break",
			valueType: "mins",
			minValue: 1,
			maxValue: 60,
			value: longBreak,
			onMouseUp: useCallback(
				(e) => dispatch(setLongBreak(parseInt(e.target.value))),
				[dispatch],
			),
		},
		{
			label: "Session rounds",
			valueType: "rounds",
			minValue: 1,
			maxValue: 10,
			value: sessionRounds,
			onMouseUp: useCallback(
				(e) => dispatch(setSessionRounds(parseInt(e.target.value))),
				[dispatch],
			),
		},
	];

	return (
		<StyledConfigSliderSection>
			{sliderRangeList.map(
				({ label, valueType, minValue, maxValue, value, onMouseUp }, index) => (
					<ConfigSlider
						label={label}
						value={value}
						minValue={minValue}
						valueType={valueType}
						maxValue={maxValue}
						onMouseUp={onMouseUp}
						key={index}
					/>
				),
			)}
		</StyledConfigSliderSection>
	);
};

export default React.memo(SliderSection);
