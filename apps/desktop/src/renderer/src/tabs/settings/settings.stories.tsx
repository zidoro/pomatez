import { Meta } from "@storybook/react";
import { WindowDecorator } from "@renderer/utils";
import Settings from "./settings";

export default {
  title: "App/Tabs/Settings",
  component: Settings,
  decorators: [
    (Story) => (
      <WindowDecorator activeTab="/settings">
        <Story />
      </WindowDecorator>
    ),
  ],
} as Meta<typeof Settings>;

export const Default = () => <Settings />;
