import { SVG } from "components";
import { CounterContext } from "contexts";
import { useRippleEffect } from "hooks";
import { useAppSelector } from "hooks/storeHooks";
import React, { useCallback, useRef } from "react";
import { StyledCompactButton } from "styles";

type Props = { flipped?: boolean } & React.HTMLProps<HTMLButtonElement>;

const CompactModeButton: React.FC<Props> = ({ onClick, flipped }) => {
  const { compactMode } = useAppSelector((state) => state.settings);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const buttonClickAction = useRippleEffect();

  const onClickAction = useCallback(
    (e) =>
      buttonClickAction(e, buttonRef, () => {
        if (onClick) {
          onClick(e);
        }
      }),
    [buttonClickAction, onClick]
  );

  return (
    <StyledCompactButton
      ref={buttonRef}
      onClick={onClickAction}
      compact={compactMode}
    >
      <SVG
        name="expand"
        style={flipped ? { transform: "rotate(180deg)" } : {}}
      />
    </StyledCompactButton>
  );
};

export default React.memo(CompactModeButton);
