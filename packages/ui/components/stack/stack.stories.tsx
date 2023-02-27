import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { SxProps } from "../../theme";
import { Box } from "../box";
import Stack from "./stack";

export default {
  title: "Components/Layouts/Stack",
  component: Stack,
  tags: ["autodocs"],
} as Meta<typeof Stack>;

type Story = StoryObj<typeof Stack>;

const Template: StoryFn<typeof Stack> = (props) => {
  const boxStyles: SxProps = {
    bg: "$accent4",
    px: "$4",
    py: "$2",
    br: "$sm",
  };

  return (
    <Stack spacing="$3" {...props}>
      <Box sx={boxStyles}>Child 1</Box>
      <Box sx={boxStyles}>Child 2</Box>
      <Box sx={boxStyles}>Child 3</Box>
    </Stack>
  );
};

export const Column: Story = {
  args: {
    direction: "column",
  },
  render: Template,
};

export const Row: Story = {
  args: {
    direction: "row",
  },
  render: Template,
};
