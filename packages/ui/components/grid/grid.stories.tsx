import { Meta, StoryFn } from "@storybook/react";
import { SxProps } from "../../theme";
import Grid from "./grid";

export default {
  title: "Components/Layouts/Grid",
  component: Grid,
} as Meta<typeof Grid>;

const Template: StoryFn<typeof Grid> = (args) => {
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
};

export const Column = Template.bind({});
Column.args = {
  templateColumns: "repeat(3, 1fr)",
};

export const Row = Template.bind({});
Row.args = {
  templateRows: "repeat(3, 1fr)",
  autoFlow: "row",
};
