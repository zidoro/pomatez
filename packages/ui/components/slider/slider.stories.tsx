import { useState } from "react";
import { Meta } from "@storybook/react";
import { WindowDecorator } from "../../utils/story";
import { oneOrMany } from "../../utils/string";
import Slider from "./slider";

export default {
  title: "Components/Forms/Slider",
  component: Slider,
  tags: ["autodocs"],
  render: (args) => (
    <WindowDecorator sx={{ px: "$4", py: "$2" }}>
      <Slider {...args} />
    </WindowDecorator>
  ),
} as Meta<typeof Slider>;

export const Playground = () => {
  const [value, setValue] = useState(60);

  return (
    <WindowDecorator sx={{ px: "$4", py: "$2" }}>
      <Slider
        header={{
          label: "Session duration",
          valueInterpreter: oneOrMany(value, "min"),
        }}
        min={1}
        value={value}
        onValueChange={setValue}
      />
    </WindowDecorator>
  );
};
