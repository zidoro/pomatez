import { Meta, StoryObj } from "@storybook/react";
import { WindowDecorator } from "../../utils/story";
import Counter from "./counter";

export default {
  title: "App/Sections/Counter",
  component: Counter,
  argTypes: {
    appState: {
      options: ["stayFocused", "shortBreak", "longBreak"],
      control: { type: "select" },
    },
  },
  tags: ["autodocs"],
  render: (args) => (
    <WindowDecorator>
      <Counter {...args} />
    </WindowDecorator>
  ),
} as Meta<typeof Counter>;

type Story = StoryObj<typeof Counter>;

export const StayFocused: Story = {
  args: {
    appState: "stayFocused",
  },
};

export const ShortBreak: Story = {
  args: {
    appState: "shortBreak",
  },
};

export const LongBreak: Story = {
  args: {
    appState: "longBreak",
  },
};
