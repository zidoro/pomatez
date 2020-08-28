import React from "react";
import {
	StyledRangeWrapper,
	StyledRangeSliderFill,
	StyledRangeSlider,
} from "styles";

type Props = {
	minValue: number;
	maxValue: number;
	value: number;
	onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
	onMouseUp?:
		| ((event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void)
		| undefined;
};

const RangeSlider: React.FC<Props> = ({
	minValue,
	maxValue,
	value,
	onChange,
	onMouseUp,
}) => {
	return (
		<StyledRangeWrapper>
			<StyledRangeSliderFill
				value={value}
				minValue={minValue}
				maxValue={maxValue}
			/>
			<StyledRangeSlider
				type="range"
				min={minValue}
				max={maxValue}
				value={value}
				onChange={onChange}
				onMouseUp={onMouseUp}
			/>
		</StyledRangeWrapper>
	);
};

export default React.memo(RangeSlider);
