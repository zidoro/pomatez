import { Meta } from "@storybook/react";
import { WindowDecorator } from "../../utils/story";
import Switch from "./switch";

export default {
  title: "Components/Forms/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: {
    id: "switch",
    label: "Switch",
  },
  render: (args) => (
    <WindowDecorator
      sx={{
        padding: "$5",
      }}
    >
      <Switch {...args} />
    </WindowDecorator>
  ),
} as Meta<typeof Switch>;

export const Default = {};
