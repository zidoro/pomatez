import { Meta } from "@storybook/react";
import ToggleGroup from "./toggle-group";

export default {
  title: "Components/Forms/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
  args: {
    items: [
      { label: "Item 1", value: "item-1" },
      { label: "Item 2", value: "item-2" },
      { label: "Item 3", value: "item-3" },
    ],
    defaultValue: "item-1",
  },
} as Meta<typeof ToggleGroup>;

export const Default = {};
