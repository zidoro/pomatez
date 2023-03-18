import { Meta, StoryObj } from "@storybook/react";
import LogoIcon from "./logo-icon";
import Logo from "./logo";

export default {
  title: "Components/Display/Logo",
  component: Logo,
  argTypes: {
    appState: {
      options: ["stayFocused", "shortBreak", "longBreak"],
      control: { type: "select" },
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Logo>;

type Story = StoryObj<typeof Logo>;

export const IconOnly: Story = {
  args: {
    appState: "stayFocused",
    iconSize: "12.8rem",
  },
  render: (args) => <LogoIcon {...args} />,
};

export const WithLabel: Story = {
  args: {
    appState: "stayFocused",
    appVersion: "1.0.0",
    iconSize: "$4",
    labelFontSize: "$sm",
  },

  render: (args) => <Logo {...args} />,
};
