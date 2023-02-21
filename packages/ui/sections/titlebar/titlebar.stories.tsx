import { Meta } from "@storybook/react";
import { VStack } from "../../components";
import Titlebar from "./titlebar";

export default {
  title: "App/Titlebar",
  component: Titlebar,
} as Meta<typeof Titlebar>;

export const Default = () => (
  <VStack
    sx={{
      width: "34rem",
      border: "1px solid $gray6",
      borderRadius: "$sm",
    }}
  >
    <Titlebar />
  </VStack>
);
