import React, { useRef, useCallback } from "react";
import { StyledResetButton } from "styles";
import { useRippleEffect } from "hooks";
import { SVG } from "components";

type Props = {} & React.HTMLProps<HTMLButtonElement>;

const ResetButton: React.FC<Props> = ({ onClick }) => {
	const buttonRef = useRef<HTMLButtonElement>(null);

	const buttonClickAction = useRippleEffect();

	const onResetAction = useCallback(
		(e) =>
			buttonClickAction(e, buttonRef, () => {
				if (onClick) {
					onClick(e);
				}
			}),
		[buttonClickAction, onClick]
	);

	return (
		<StyledResetButton ref={buttonRef} onClick={onResetAction}>
			<SVG name="reset" />
		</StyledResetButton>
	);
};

export default React.memo(ResetButton);
