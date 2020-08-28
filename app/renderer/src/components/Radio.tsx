import React from "react";
import { StyledCheckbox, StyledCheckboxBox, StyledCheckboxLabel } from "styles";
import { CheckboxProps } from "./Checkbox";

export const Radio = React.forwardRef<HTMLInputElement, CheckboxProps>(
	({ id, label, name, disabled, asPrimary, ...props }, ref) => {
		return (
			<StyledCheckbox
				htmlFor={id}
				disabled={disabled}
				tabIndex={0}
				asPrimary={asPrimary}
			>
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

Radio.defaultProps = {
	asPrimary: true,
};

export default React.memo(Radio);
