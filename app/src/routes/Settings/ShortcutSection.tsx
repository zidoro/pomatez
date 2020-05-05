import React from "react";
import SettingSection from "./SettingSection";
import { Shortcut } from "components";

const ShortcutSection: React.FC = () => {
  return (
    <SettingSection heading="Keyboard Shortcuts">
      <Shortcut
        name="Toggle Themes"
        shortcutKey="Alt + Shift + T"
        id="toggle-themes"
      />
      <Shortcut
        name="Hide The App"
        shortcutKey="Alt + Shift + H"
        id="hide-the-app"
      />
      <Shortcut
        name="Show The App"
        shortcutKey="Alt + Shift + S"
        id="show-the-app"
      />
    </SettingSection>
  );
};

export default ShortcutSection;
