import React from "react";
import {
  StyledRangeInputWrapper,
  StyledRangeInputLabel,
  StyledRangeInputValue,
} from "styles";

type Props = {
  label?: string;
  value: number;
  valueType?: "mins" | "rounds";
  children?: React.ReactNode;
};

const RangeLabel: React.FC<Props> = ({ label, value, valueType, children }) => {
  const getValueLabel = () => {
    switch (valueType) {
      case "mins":
        if (value <= 1) {
          return "min";
        }
        return valueType;
      case "rounds":
        if (value <= 1) {
          return "round";
        }
        return valueType;
    }
  };

  return (
    <StyledRangeInputWrapper>
      <StyledRangeInputLabel>{label}</StyledRangeInputLabel>
      {children}
      <StyledRangeInputValue>
        {value}&nbsp;{getValueLabel()}
      </StyledRangeInputValue>
    </StyledRangeInputWrapper>
  );
};

export default React.memo(RangeLabel);
