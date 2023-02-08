import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import { Box } from "./box";

export default {
  title: "Components/Layout/Box",
  component: Box,
} as ComponentMeta<typeof Box>;

const Template: ComponentStoryFn<typeof Box> = (args) => (
  <Box {...args} />
);

export const Default = Template.bind({});
