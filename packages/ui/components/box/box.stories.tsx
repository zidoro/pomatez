import { Meta, StoryFn } from "@storybook/react";
import Box from "./box";

export default {
  title: "Components/Layouts/Box",
  component: Box,
  args: {
    children: "Box Component",
    sx: {
      color: "$primary",
      backgroundColor: "$accent3",
      borderRadius: "$sm",
      px: "$4",
      py: "$2",
    },
  },
} as Meta<typeof Box>;

const Template: StoryFn<typeof Box> = (args) => <Box {...args} />;

export const Default = Template.bind({});
