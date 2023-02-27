import { Meta } from "@storybook/react";
import Button from "./button";

export default {
  title: "Components/Forms/Button",
  component: Button,
  tags: ["autodocs"],
} as Meta<typeof Button>;

export const Default = () => <Button>Button</Button>;
