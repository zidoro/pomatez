import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { SxProps } from "../../theme";
import Grid from "./grid";

export default {
  title: "Components/Layouts/Grid",
  component: Grid,
  tags: ["autodocs"],
} as Meta<typeof Grid>;

type Story = StoryObj<typeof Grid>;

const Template: StoryFn<typeof Grid> = (props) => {
  const boxStyles: SxProps = {
    bg: "$accent4",
    px: "$4",
    py: "$2",
    br: "$sm",
  };

  return (
    <Grid gap="$3" {...props}>
      <Grid.Item sx={boxStyles}>Child 1</Grid.Item>
      <Grid.Item sx={boxStyles}>Child 2</Grid.Item>
      <Grid.Item sx={boxStyles}>Child 3</Grid.Item>
    </Grid>
  );
};

export const Column: Story = {
  args: {
    templateColumns: "repeat(3, 1fr)",
  },
  render: Template,
};

export const Row: Story = {
  args: {
    templateRows: "repeat(3, 1fr)",
    autoFlow: "row",
  },
  render: Template,
};
