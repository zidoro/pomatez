import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { VStack } from "../../components";
import Titlebar from "./titlebar";

export default {
  title: "App/Sections/Titlebar",
  component: Titlebar,
} as Meta<typeof Titlebar>;

type Story = StoryObj<typeof Titlebar>;

const Wrapper: StoryFn<typeof Titlebar> = (props) => (
  <VStack
    sx={{
      width: "34rem",
      border: "1px solid $gray6",
      borderRadius: "$sm",
      overflow: "hidden",
    }}
  >
    <Titlebar {...props} />
  </VStack>
);

export const Default: Story = {
  args: {
    appState: "stay-focused",
    appVersion: "1.0.0",
  },
  render: Wrapper,
};
