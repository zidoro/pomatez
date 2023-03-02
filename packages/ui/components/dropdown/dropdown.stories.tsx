import { useState } from "react";
import { Meta } from "@storybook/react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { StyledIconButton } from "./dropdown.styled";
import Dropdown from "./dropdown";

const renderTrigger = () => (
  <StyledIconButton aria-label="Customize options">
    <HamburgerMenuIcon />
  </StyledIconButton>
);

export default {
  title: "Components/Forms/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
} as Meta<typeof Dropdown>;

export const Playground = () => {
  const [bookmarksChecked, setBookmarksChecked] = useState(true);
  const [urlsChecked, setUrlsChecked] = useState(false);
  const [person, setPerson] = useState("pedro");

  return (
    <Dropdown
      trigger={renderTrigger()}
      menuItems={[
        {
          type: "text",
          label: "New Tab",
          shortcut: "⌘+T",
          onClick: () => {
            console.log("New Tab");
          },
        },
        {
          type: "text",
          label: "New Window",
          shortcut: "⌘+N",
          onClick: () => {
            console.log("New Window");
          },
        },
        {
          type: "text",
          label: "New Private Window",
          shortcut: "⇧+⌘+N",
          isDisabled: true,
        },
        {
          type: "sub-menu",
          label: "More Tools",
          subMenu: [
            {
              type: "text",
              label: "Save Page As...",
              shortcut: "⇧+⌘+S",
            },
            { type: "text", label: "Create Shortcut..." },
            { type: "text", label: "New Window" },
            { type: "separator" },
            { type: "text", label: "Developer Tools" },
          ],
        },
        { type: "separator" },
        {
          type: "checkbox",
          label: "Show Bookmarks",
          shortcut: "⌘+B",
          isChecked: bookmarksChecked,
          onCheckedChange: setBookmarksChecked,
        },
        {
          type: "checkbox",
          label: "Show Full URLs",
          isChecked: urlsChecked,
          onCheckedChange: setUrlsChecked,
        },
        { type: "separator" },
        { type: "label", value: "People" },
        {
          type: "radio-group",
          subMenu: [
            { label: "Pedro Duarte", value: "pedro" },
            { label: "Colm Tuite", value: "colm" },
          ],
          value: person,
          onValueChange: setPerson,
        },
      ]}
    />
  );
};
