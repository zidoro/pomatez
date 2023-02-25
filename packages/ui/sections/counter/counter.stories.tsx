import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { VStack } from "../../components";
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
} as Meta<typeof Counter>;

type Story = StoryObj<typeof Counter>;

const Wrapper: StoryFn<typeof Counter> = (props) => (
  <VStack
    sx={{
      width: "34rem",
      height: "max-content",
      border: "1px solid $gray6",
      borderRadius: "$sm",
      boxShadow: "$sm",
      bg: "$white",
    }}
  >
    <Counter {...props} />
  </VStack>
);

export const StayFocused: Story = {
  args: {
    appState: "stay-focused",
  },
  render: Wrapper,
};

export const ShortBreak: Story = {
  args: {
    appState: "short-break",
  },
  render: Wrapper,
};

export const LongBreak: Story = {
  args: {
    appState: "long-break",
  },
  render: Wrapper,
};

export const SpecialBreak: Story = {
  args: {
    appState: "special-break",
  },
  render: Wrapper,
};
