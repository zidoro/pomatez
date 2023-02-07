import { SVG } from "components";
import { CounterContext } from "contexts";
import { useRippleEffect } from "hooks";
import React, { useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { AppStateTypes, SettingTypes } from "store";
import { StyledCompactButton } from "styles";

type Props = { flipped?: boolean } & React.HTMLProps<HTMLButtonElement>;

const CompactModeButton: React.FC<Props> = ({ onClick, flipped }) => {
  const { compactMode }: SettingTypes = useSelector(
    (state: AppStateTypes) => state.settings
  );

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
