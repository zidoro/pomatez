import React, { useRef, useCallback } from "react";
import { StyledMainButton } from "styles";
import { useRippleEffect } from "hooks";
import { SVG } from "components";

type Props = {
  playing: boolean;
  compact?: boolean;
} & React.HTMLProps<HTMLButtonElement>;

const PlayButton: React.FC<Props> = ({
  playing,
  onClick,
  className,
  compact,
}) => {
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

  const size = compact ? 36 : 56;

  return (
    <StyledMainButton
      className={className}
      ref={buttonRef}
      onClick={onPlayAction}
    >
      {playing ? (
        <SVG size={size} name="pause" />
      ) : (
        <SVG size={size} name="play" />
      )}
    </StyledMainButton>
  );
};

export default React.memo(PlayButton);
