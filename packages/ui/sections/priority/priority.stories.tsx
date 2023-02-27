import { Meta, StoryObj } from "@storybook/react";
import { WindowDecorator } from "../../utils/story";
import Priority from "./priority";

export default {
  title: "App/Sections/Priority",
  component: Priority,
  tags: ["autodocs"],
  render: (args) => (
    <WindowDecorator
      sx={{
        height: "max-content",
        py: "$4",
      }}
    >
      <Priority {...args} />
    </WindowDecorator>
  ),
} as Meta<typeof Priority>;

type Story = StoryObj<typeof Priority>;

export const Default: Story = {};
