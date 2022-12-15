import React, { useRef, useCallback } from "react";
import { StyledVolumeButton } from "styles";
import { useRippleEffect } from "hooks";
import { SVG } from "components";

type Props = {
	soundOn: boolean;
} & React.HTMLProps<HTMLButtonElement>;

const VolumeButton: React.FC<Props> = ({ soundOn, onClick }) => {
	const buttonRef = useRef<HTMLButtonElement>(null);

	const buttonClickAction = useRippleEffect();

	const onVolumeAction = useCallback(
		(e) =>
			buttonClickAction(e, buttonRef, () => {
				if (onClick) {
					onClick(e);
				}
			}),
		[buttonClickAction, onClick],
	);

	return (
		<StyledVolumeButton ref={buttonRef} onClick={onVolumeAction}>
			{soundOn ? <SVG name="volume-on" /> : <SVG name="volume-mute" />}
		</StyledVolumeButton>
	);
};

export default React.memo(VolumeButton);
