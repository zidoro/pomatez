import React, { useState, useEffect } from "react";
import { StyledRangeContainer } from "styles";
import { RangeSlider, RangeLabel } from "components";

export type ConfigSliderProps = {
  label?: string;
  valueType?: "mins" | "rounds";
  minValue: number;
  maxValue: number;
  value: number;
  handleConfigChange?: (value: any) => void;
};

const ConfigSlider: React.FC<ConfigSliderProps> = ({
  label,
  valueType,
  minValue,
  maxValue,
  value,
  handleConfigChange,
}) => {
  const [rangeValue, setRangeValue] = useState(value);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRangeValue(parseInt(e.target.value));

    /*
    Check if "handleConfigChange" exists to avoid typescript compile error.

    Error comes because type "ConfigSliderProps" is used in "src/config.ts" for "rangeConfig" object. But that object is not used by anything else in the app which means its unnecessary code.

    Correct solution would be to make "handleConfigChange" mandatory instead of optional in "ConfigSliderProps" type & remove/disable the "rangeConfig" object from "src/config.ts".
    */

    if (handleConfigChange) handleConfigChange(e.target.value);
  };

  useEffect(() => {
    setRangeValue(value);
  }, [value]);

  return (
    <StyledRangeContainer>
      <RangeLabel
        label={label}
        value={rangeValue}
        valueType={valueType}
      />
      <RangeSlider
        value={rangeValue}
        minValue={minValue}
        maxValue={maxValue}
        onChange={onChange}
      />
    </StyledRangeContainer>
  );
};

ConfigSlider.defaultProps = {
  label: "Stay focused",
  valueType: "mins",
};

export default React.memo(ConfigSlider);
