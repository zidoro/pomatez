import { Meta, StoryObj } from "@storybook/react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { StyledIconButton } from "./dropdown.styled";
import Dropdown from "./dropdown";

export default {
  title: "Components/Forms/Dropdown",
  component: Dropdown,
  args: {
    trigger: (
      <StyledIconButton aria-label="Customize options">
        <HamburgerMenuIcon />
      </StyledIconButton>
    ),
    menuItems: [
      {
        type: "text",
        label: "New Tab",
        shortcut: "⌘+T",
      },
      {
        type: "text",
        label: "New Window",
        shortcut: "⌘+N",
      },
      {
        type: "text",
        label: "New Private Window",
        shortcut: "⇧+⌘+N",
      },
      {
        type: "sub-menu",
        label: "More Tools",
        options: [
          {
            type: "text",
            label: "Save Page As...",
            shortcut: "⇧+⌘+S",
          },
          {
            type: "text",
            label: "Create Shortcut...",
          },
          {
            type: "text",
            label: "New Window",
          },
          {
            type: "separator",
          },
          {
            type: "text",
            label: "Developer Tools",
          },
        ],
      },
      {
        type: "separator",
      },
      {
        type: "checkbox",
        label: "Show Bookmarks",
        shortcut: "⌘+B",
      },
      {
        type: "checkbox",
        label: "Show Full URLs",
      },
      {
        type: "separator",
      },
      {
        type: "label",
        value: "People",
      },
      {
        type: "radio-group",
        options: [
          {
            type: "radio",
            label: "Pedro Duarte",
            value: "pedro",
          },
          {
            type: "radio",
            label: "Colm Tuite",
            value: "colm",
          },
        ],
      },
    ],
  },
} as Meta<typeof Dropdown>;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {};
