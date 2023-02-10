import { Meta, StoryFn } from "@storybook/react";
import Box from "./box";

export default {
  title: "Components/Layout/Box",
  component: Box,
  args: {
    children: "Box Component",
  },
} as Meta<typeof Box>;

const Template: StoryFn<typeof Box> = (args) => <Box {...args} />;

export const Default = Template.bind({});

export const WithSXProps = Template.bind({});
WithSXProps.args = {
  sx: {
    color: "$primary",
    backgroundColor: "$accents3",
    borderRadius: "$xs",
    px: "$5",
    py: "$4",
  },
};
