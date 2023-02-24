import { Meta, StoryObj } from "@storybook/react";
import LogoIcon from "./logo-icon";
import Logo from "./logo";

export default {
  title: "Components/Display/Logo",
  component: Logo,
} as Meta<typeof Logo>;

type Story = StoryObj<typeof Logo>;

export const IconOnly: Story = {
  args: {
    appState: "stay-focused",
    size: "8rem",
  },
  render: (args) => <LogoIcon {...args} />,
};

export const WithLabel: Story = {
  args: {
    appState: "stay-focused",
    size: "1.6rem",
  },
  render: (args) => <Logo {...args} />,
};
