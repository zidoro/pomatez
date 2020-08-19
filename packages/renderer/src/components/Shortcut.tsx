import React from "react";
import {
  StyledShortcutWrapper,
  StyledShortcutName,
  StyledShortcutKey,
} from "styles";

type Props = {
  id: string;
  name: string;
  shortcutKey: string;
};

const Shortcut: React.FC<Props> = ({ id, name, shortcutKey }) => {
  return (
    <StyledShortcutWrapper>
      <StyledShortcutName htmlFor={id}>{name}</StyledShortcutName>
      <StyledShortcutKey type="text" value={shortcutKey} id={id} disabled />
    </StyledShortcutWrapper>
  );
};

export default React.memo(Shortcut);
