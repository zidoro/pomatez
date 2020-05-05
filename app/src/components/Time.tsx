import React from "react";
import { StyledTimeWrapper, StyledTimeInput } from "styles";

type Props = {
  error?: boolean;
} & React.HTMLProps<HTMLInputElement>;

const Time: React.FC<Props> = ({
  id,
  name,
  value,
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
    </StyledTimeWrapper>
  );
};

export default React.memo(Time);
