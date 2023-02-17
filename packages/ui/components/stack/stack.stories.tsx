import { Meta, StoryFn } from "@storybook/react";
import { SxProps } from "../../theme";
import { Box } from "../box";
import Stack from "./stack";

export default {
  title: "Components/Layouts/Stack",
  component: Stack,
  args: {
    direction: "column",
  },
} as Meta<typeof Stack>;

const Template: StoryFn<typeof Stack> = (args) => {
  const boxStyles: SxProps = {
    bg: "$accent4",
    px: "$4",
    py: "$2",
    br: "$sm",
  };

  return (
    <Stack gap="$3" {...args}>
      <Box sx={boxStyles}>Child 1</Box>
      <Box sx={boxStyles}>Child 2</Box>
      <Box sx={boxStyles}>Child 3</Box>
    </Stack>
  );
};

export const Column = Template.bind({});

export const Row = Template.bind({});
Row.args = {
  direction: "row",
};
