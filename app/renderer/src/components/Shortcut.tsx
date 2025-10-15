import React, { useState, type KeyboardEvent } from "react";
import {
  StyledShortcutWrapper,
  StyledShortcutName,
  StyledShortcutKey,
} from "styles";
import { getShortcutFromEvent } from "utils/getShortcutFromEvent";

type Props = {
  id: string;
  name: string;
  shortcutKey: string;
};

const Shortcut: React.FC<Props> = ({ id, name, shortcutKey }) => {
  const [shortcut, setShortcut] = useState(() => shortcutKey);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const shortcut = getShortcutFromEvent(e);

    if (shortcut) {
      console.log(shortcut);

      // For now we don't update the UI, as it is not being saved
      // TODO: Uncomment when we have a way to save the shortcuts
      // setShortcut(shortcut);
    }
  };

  return (
    <StyledShortcutWrapper>
      <StyledShortcutName htmlFor={id}>{name}</StyledShortcutName>
      <StyledShortcutKey
        type="text"
        value={shortcut}
        id={id}
        onKeyDown={handleKeyDown}
        readOnly
      />
    </StyledShortcutWrapper>
  );
};

export default React.memo(Shortcut);
