import { SVG } from "components";
import { useRippleEffect } from "hooks";
import React, { useCallback, useRef } from "react";
import { StyledMainButton } from "styles";

type Props = { flipped?: boolean } & React.HTMLProps<HTMLButtonElement>;

const CompactModeButton: React.FC<Props> = ({ onClick, flipped }) => {
	const buttonRef = useRef<HTMLButtonElement>(null);

	const buttonClickAction = useRippleEffect();

	const onClickAction = useCallback(
		(e) =>
			buttonClickAction(e, buttonRef, () => {
				if (onClick) {
					onClick(e);
				}
			}),
		[buttonClickAction, onClick],
	);

	return (
		<StyledMainButton ref={buttonRef} onClick={onClickAction}>
			<SVG
				name="expand"
				style={flipped ? { transform: "rotate(180deg)" } : {}}
			/>
		</StyledMainButton>
	);
};

export default React.memo(CompactModeButton);
