import { Meta, StoryObj } from "@storybook/react";
import { WindowDecorator } from "../../utils/story";
import { Box } from "../box";
import { Text } from "../text";
import ScrollArea from "./scroll-area";

export default {
  title: "Components/Layouts/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  render: (args) => (
    <WindowDecorator sx={{ height: "20rem" }}>
      <ScrollArea {...args} />
    </WindowDecorator>
  ),
} as Meta<typeof ScrollArea>;

export const Default: StoryObj<typeof ScrollArea> = {
  args: {
    children: (
      <Box sx={{ height: "40rem" }}>
        <Text>Content</Text>
      </Box>
    ),
  },
};
