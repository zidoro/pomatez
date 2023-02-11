import { Meta, StoryFn } from "@storybook/react";
import Box from "./box";

export default {
  title: "Components/Layouts/Box",
  component: Box,
  args: {
    children: "Box Component",
    sx: {
      color: "$primary",
      backgroundColor: "$accents3",
      borderRadius: "$sm",
      px: "$5",
      py: "$4",
    },
  },
} as Meta<typeof Box>;

const Template: StoryFn<typeof Box> = (args) => <Box {...args} />;

export const Default = Template.bind({});
