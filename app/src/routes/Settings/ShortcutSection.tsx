import React from "react";
import SettingSection from "./SettingSection";
import { Shortcut } from "components";

const ShortcutSection: React.FC = () => {
  return (
    <>
      <SettingSection heading="Local Shortcut Keys">
        <Shortcut
          name="Escape Form / Popup"
          shortcutKey="Press Esc"
          id="escape-form-popup"
        />
        <Shortcut
          name="Toggle Theme"
          shortcutKey="Alt + Shift + T"
          id="toggle-themes"
        />
        <Shortcut name="Cut Text" shortcutKey="Cmd/Ctrl + X" id="cut-text" />
        <Shortcut name="Copy Text" shortcutKey="Cmd/Ctrl + C" id="copy-text" />
        <Shortcut
          name="Paste Text"
          shortcutKey="Cmd/Ctrl + V"
          id="paste-text"
        />
        <Shortcut
          name="Select All Text"
          shortcutKey="Cmd/Ctrl + A"
          id="select-all-text"
        />
        <Shortcut
          name="Undo Action"
          shortcutKey="Cmd/Ctrl + Z"
          id="undo-action"
        />
        <Shortcut
          name="Redo Action"
          shortcutKey="Cmd/Ctrl + Shift + Z"
          id="redo-action"
        />
      </SettingSection>
      <SettingSection heading="Global Shortcut Key">
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
    </>
  );
};

export default ShortcutSection;
