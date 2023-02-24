import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { VStack } from "../../components";
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
} as Meta<typeof Titlebar>;

type Story = StoryObj<typeof Titlebar>;

const Wrapper: StoryFn<typeof Titlebar> = (props) => (
  <VStack
    sx={{
      width: "34rem",
      border: "1px solid $gray6",
      borderRadius: "$sm",
      boxShadow: "$sm",
      bg: "$white",
    }}
  >
    <Titlebar {...props} />
  </VStack>
);

export const StayFocused: Story = {
  args: {
    appState: "stay-focused",
    appVersion: "1.0.0",
  },
  render: Wrapper,
};

export const ShortBreak: Story = {
  args: {
    appState: "short-break",
    appVersion: "1.0.0",
  },
  render: Wrapper,
};

export const LongBreak: Story = {
  args: {
    appState: "long-break",
    appVersion: "1.0.0",
  },
  render: Wrapper,
};

export const SpecialBreak: Story = {
  args: {
    appState: "special-break",
    appVersion: "1.0.0",
  },
  render: Wrapper,
};
