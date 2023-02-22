import { Meta, StoryObj } from "@storybook/react";
import Box from "./box";

export default {
  title: "Components/Layouts/Box",
  component: Box,
} as Meta<typeof Box>;

export const Default: StoryObj<typeof Box> = {
  args: {
    children: "Box Component",
    sx: {
      backgroundColor: "$accent4",
      borderRadius: "$sm",
      px: "$4",
      py: "$2",
    },
  },
};
