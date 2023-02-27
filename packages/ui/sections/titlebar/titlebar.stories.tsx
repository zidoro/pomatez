import { Meta, StoryObj } from "@storybook/react";
import { WindowDecorator } from "../../utils/story";
import Titlebar from "./titlebar";

export default {
  title: "App/Sections/Titlebar",
  component: Titlebar,
  argTypes: {
    appState: {
      options: [
        "stay-focused",
        "short-break",
        "long-break",
        "special-break",
      ],
      control: { type: "select" },
    },
  },
  tags: ["autodocs"],
  render: (args) => (
    <WindowDecorator>
      <Titlebar {...args} />
    </WindowDecorator>
  ),
} as Meta<typeof Titlebar>;

type Story = StoryObj<typeof Titlebar>;

export const StayFocused: Story = {
  args: {
    appState: "stay-focused",
    appVersion: "1.0.0",
  },
};

export const ShortBreak: Story = {
  args: {
    appState: "short-break",
    appVersion: "1.0.0",
  },
};

export const LongBreak: Story = {
  args: {
    appState: "long-break",
    appVersion: "1.0.0",
  },
};

export const SpecialBreak: Story = {
  args: {
    appState: "special-break",
    appVersion: "1.0.0",
  },
};
