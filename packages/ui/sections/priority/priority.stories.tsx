import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { VStack } from "../../components";
import Priority from "./priority";

export default {
  title: "App/Sections/Priority",
  component: Priority,
} as Meta<typeof Priority>;

type Story = StoryObj<typeof Priority>;

const Wrapper: StoryFn<typeof Priority> = (props) => (
  <VStack
    sx={{
      width: "34rem",
      height: "max-content",
      border: "1px solid $gray6",
      borderRadius: "$sm",
      boxShadow: "$sm",
      bg: "$white",
      py: "$4",
    }}
  >
    <Priority {...props} />
  </VStack>
);

export const Default: Story = {
  render: Wrapper,
};
