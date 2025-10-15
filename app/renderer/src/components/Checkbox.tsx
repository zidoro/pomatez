import React from "react";
import {
  StyledCheckbox,
  StyledCheckboxBox,
  StyledCheckboxLabel,
} from "styles";

export type CheckboxProps = {
  label?: string;
  asPrimary?: boolean;
  hidden?: boolean;
} & React.HTMLProps<HTMLInputElement>;

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  CheckboxProps
>(({ id, label, name, disabled, asPrimary, hidden, ...props }, ref) => {
  return (
    <StyledCheckbox htmlFor={id} asPrimary={asPrimary}>
      <input
        type="checkbox"
        name={name}
        id={id}
        ref={ref}
        disabled={disabled}
        {...props}
      />
      <StyledCheckboxBox hidden={hidden} />
      <StyledCheckboxLabel>{hidden ? "" : label}</StyledCheckboxLabel>
    </StyledCheckbox>
  );
});

export default React.memo(Checkbox);
