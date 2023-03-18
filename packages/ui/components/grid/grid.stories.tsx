import { Meta, StoryObj } from "@storybook/react";
import { SxProps } from "../../theme";
import Grid from "./grid";

export default {
  title: "Components/Layouts/Grid",
  component: Grid,
  tags: ["autodocs"],
  render: (args) => {
    const boxStyles: SxProps = {
      bg: "$accent4",
      px: "$4",
      py: "$2",
      br: "$sm",
    };

    return (
      <Grid gap="$3" {...args}>
        <Grid.Item sx={boxStyles}>Child 1</Grid.Item>
        <Grid.Item sx={boxStyles}>Child 2</Grid.Item>
        <Grid.Item sx={boxStyles}>Child 3</Grid.Item>
      </Grid>
    );
  },
} as Meta<typeof Grid>;

type Story = StoryObj<typeof Grid>;

export const Column: Story = {
  args: {
    templateColumns: "repeat(3, 1fr)",
  },
};

export const Row: Story = {
  args: {
    templateRows: "repeat(3, 1fr)",
    autoFlow: "row",
  },
};
