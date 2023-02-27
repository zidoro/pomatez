import { Meta, StoryObj } from "@storybook/react";
import { WindowDecorator } from "../../utils/story";
import Counter from "./counter";

export default {
  title: "App/Sections/Counter",
  component: Counter,
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
      <Counter {...args} />
    </WindowDecorator>
  ),
} as Meta<typeof Counter>;

type Story = StoryObj<typeof Counter>;

export const StayFocused: Story = {
  args: {
    appState: "stay-focused",
  },
};

export const ShortBreak: Story = {
  args: {
    appState: "short-break",
  },
};

export const LongBreak: Story = {
  args: {
    appState: "long-break",
  },
};

export const SpecialBreak: Story = {
  args: {
    appState: "special-break",
  },
};
