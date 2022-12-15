import React from "react";
import { StyledCheckbox, StyledCheckboxBox, StyledCheckboxLabel } from "styles";

export type CheckboxProps = {
	label?: string;
	asPrimary?: boolean;
} & React.HTMLProps<HTMLInputElement>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	({ id, label, name, disabled, asPrimary, ...props }, ref) => {
		return (
			<StyledCheckbox htmlFor={id} disabled={disabled} asPrimary={asPrimary}>
				<input
					type="checkbox"
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
	},
);

export default React.memo(Checkbox);
