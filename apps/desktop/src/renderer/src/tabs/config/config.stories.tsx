import { WindowDecorator } from "@renderer/utils";
import { Meta } from "@storybook/react";
import Config from "./config";

export default {
  title: "App/Tabs/Config",
  component: Config,
  decorators: [
    (Story) => (
      <WindowDecorator activeTab="/config">
        <Story />
      </WindowDecorator>
    ),
  ],
} as Meta<typeof Config>;

export const Default = () => <Config />;
