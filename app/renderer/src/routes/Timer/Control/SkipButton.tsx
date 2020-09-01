import React, { useRef, useCallback } from "react";
import { StyledSkipButton } from "styles";
import { useRippleEffect } from "hooks";
import { SVG } from "components";

type Props = {} & React.HTMLProps<HTMLButtonElement>;

const SkipButton: React.FC<Props> = ({ onClick }) => {
	const buttonRef = useRef<HTMLButtonElement>(null);

	const buttonClickAction = useRippleEffect();

	const onSkipAction = useCallback(
		(e) =>
			buttonClickAction(e, buttonRef, () => {
				if (onClick) {
					onClick(e);
				}
			}),
		[buttonClickAction, onClick]
	);

	return (
		<StyledSkipButton ref={buttonRef} onClick={onSkipAction}>
			<SVG name="skip" />
		</StyledSkipButton>
	);
};

export default React.memo(SkipButton);
