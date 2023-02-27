import { Meta } from "@storybook/react";
import { WindowDecorator } from "@renderer/utils";
import Timer from "./timer";

export default {
  title: "App/Tabs/Timer",
  component: Timer,
  decorators: [
    (Story) => (
      <WindowDecorator>
        <Story />
      </WindowDecorator>
    ),
  ],
} as Meta<typeof Timer>;

export const Default = () => <Timer />;
