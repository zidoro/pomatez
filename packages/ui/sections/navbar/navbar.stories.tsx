import { Meta, StoryFn, StoryObj } from "@storybook/react";
import {
  CountdownTimerIcon,
  GearIcon,
  MixerHorizontalIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import { VStack } from "../../components";
import Navbar, { NavLinkProps } from "./navbar";

const navLinks: NavLinkProps[] = [
  {
    icon: <Pencil2Icon />,
    label: "Tasks",
    to: "/tasks",
  },
  {
    icon: <MixerHorizontalIcon />,
    label: "Config",
    to: "/config",
  },
  {
    icon: <CountdownTimerIcon />,
    label: "Timer",
    to: "/timer",
    activeClassName: "active",
  },
  {
    icon: <GearIcon />,
    label: "Settings",
    to: "/settings",
  },
];

export default {
  title: "App/Sections/Navbar",
  component: Navbar,
  args: {
    links: navLinks,
  },
  argTypes: {
    appState: {
      options: [
        "stay-focused",
        "short-break",
        "long-break",
        "special-break",
      ],
      control: { type: "select" },
    },
  },
} as Meta<typeof Navbar>;

type Story = StoryObj<typeof Navbar>;

const Wrapper: StoryFn<typeof Navbar> = (props) => (
  <VStack
    sx={{
      width: "34rem",
      height: "$16",
      border: "1px solid $gray6",
      borderRadius: "$sm",
      boxShadow: "$sm",
      bg: "$white",
    }}
  >
    <Navbar {...props} />
  </VStack>
);

export const StayFocused: Story = {
  args: {
    appState: "stay-focused",
  },
  render: Wrapper,
};

export const ShortBreak: Story = {
  args: {
    appState: "short-break",
  },
  render: Wrapper,
};

export const LongBreak: Story = {
  args: {
    appState: "long-break",
  },
  render: Wrapper,
};

export const SpecialBreak: Story = {
  args: {
    appState: "special-break",
  },
  render: Wrapper,
};
