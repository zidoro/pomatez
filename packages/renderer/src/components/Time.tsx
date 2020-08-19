import React from "react";
import {
  StyledTimeWrapper,
  StyledTimeInput,
  StyledTimeInputLabel,
} from "styles";

type Props = {
  label?: string;
  error?: boolean;
} & React.HTMLProps<HTMLInputElement>;

const Time: React.FC<Props> = ({
  id,
  name,
  value,
  label,
  disabled,
  onChange,
  error,
  onFocus,
  onBlur,
}) => {
  return (
    <StyledTimeWrapper disabled={disabled}>
      <StyledTimeInput
        id={id}
        type="time"
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        error={error}
      />
      <StyledTimeInputLabel>{label}</StyledTimeInputLabel>
    </StyledTimeWrapper>
  );
};

export default React.memo(Time);
