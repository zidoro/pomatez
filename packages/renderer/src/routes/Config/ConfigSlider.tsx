import React, { useState, useEffect } from "react";
import { StyledRangeContainer } from "styles";
import { RangeSlider, RangeLabel } from "components";

export type ConfigSliderProps = {
  label?: string;
  valueType?: "mins" | "rounds";
  minValue: number;
  maxValue: number;
  value: number;
  onMouseUp?:
    | ((event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void)
    | undefined;
};

const ConfigSlider: React.FC<ConfigSliderProps> = ({
  label,
  valueType,
  minValue,
  maxValue,
  value,
  onMouseUp,
}) => {
  const [rangeValue, setRangeValue] = useState(value);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRangeValue(parseInt(e.target.value));
  };

  useEffect(() => {
    setRangeValue(value);
  }, [value]);

  return (
    <StyledRangeContainer>
      <RangeLabel label={label} value={rangeValue} valueType={valueType} />
      <RangeSlider
        value={rangeValue}
        minValue={minValue}
        maxValue={maxValue}
        onChange={onChange}
        onMouseUp={onMouseUp}
      />
    </StyledRangeContainer>
  );
};

ConfigSlider.defaultProps = {
  label: "Stay focus",
  valueType: "mins",
};

export default React.memo(ConfigSlider);
