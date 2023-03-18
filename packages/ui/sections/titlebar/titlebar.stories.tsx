import { Meta, StoryObj } from "@storybook/react";
import { WindowDecorator } from "../../utils/story";
import Titlebar from "./titlebar";

export default {
  title: "App/Sections/Titlebar",
  component: Titlebar,
  argTypes: {
    appState: {
      options: ["stayFocused", "shortBreak", "longBreak"],
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
    appState: "stayFocused",
    appVersion: "1.0.0",
  },
};

export const ShortBreak: Story = {
  args: {
    appState: "shortBreak",
    appVersion: "1.0.0",
  },
};

export const LongBreak: Story = {
  args: {
    appState: "longBreak",
    appVersion: "1.0.0",
  },
};
