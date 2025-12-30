import React from "react";
import { useTranslation } from "react-i18next";
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

const RangeLabel: React.FC<Props> = ({
  label,
  value,
  valueType,
  children,
}) => {
  const { t } = useTranslation();

  const getValueLabel = () => {
    switch (valueType) {
      case "mins":
        return value === 1 ? t("units.min") : t("units.mins");
      case "rounds":
        return value === 1 ? t("units.round") : t("units.rounds");
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
