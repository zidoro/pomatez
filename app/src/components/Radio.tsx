import React from "react";
import { StyledCheckbox, StyledCheckboxBox, StyledCheckboxLabel } from "styles";

type Props = { label?: string } & React.HTMLProps<HTMLInputElement>;

export const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  ({ id, label, name, disabled, ...props }, ref) => {
    return (
      <StyledCheckbox htmlFor={id} disabled={disabled} tabIndex={0}>
        <input
          type="radio"
          name={name}
          id={id}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        <StyledCheckboxBox />
        <StyledCheckboxLabel>{label}</StyledCheckboxLabel>
      </StyledCheckbox>
    );
  }
);

export default React.memo(Checkbox);
