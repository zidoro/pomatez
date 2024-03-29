import React from "react";
import {
  StyledTogglerWrapper,
  StyledTogglerLabel,
  StyledTogglerSwitch,
} from "styles";

export type TogglerProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange?:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | undefined;
  style?: React.CSSProperties;
};

const Toggler: React.FC<TogglerProps> = ({
  id,
  label,
  checked,
  onChange,
  style,
}) => {
  return (
    <StyledTogglerWrapper style={style}>
      <StyledTogglerLabel htmlFor={id}>{label}</StyledTogglerLabel>
      <StyledTogglerSwitch
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
    </StyledTogglerWrapper>
  );
};

export default React.memo(Toggler);
