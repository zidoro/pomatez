import React, { useRef, useCallback } from "react";
import { StyledMainButton } from "styles";
import { useRippleEffect } from "hooks";
import { SVG } from "components";

type Props = {
	playing: boolean;
} & React.HTMLProps<HTMLButtonElement>;

const PlayButton: React.FC<Props> = ({ playing, onClick }) => {
	const buttonRef = useRef<HTMLButtonElement>(null);

	const buttonClickAction = useRippleEffect();

	const onPlayAction = useCallback(
		(e) =>
			buttonClickAction(e, buttonRef, () => {
				if (onClick) {
					onClick(e);
				}
			}),
		[buttonClickAction, onClick]
	);

	return (
		<StyledMainButton ref={buttonRef} onClick={onPlayAction}>
			{playing ? <SVG name="pause" /> : <SVG name="play" />}
		</StyledMainButton>
	);
};

export default React.memo(PlayButton);
