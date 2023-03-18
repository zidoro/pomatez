import { Meta, StoryObj } from "@storybook/react";
import {
  CountdownTimerIcon,
  GearIcon,
  MixerHorizontalIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import { WindowDecorator } from "../../utils/story";
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
      options: ["stayFocused", "shortBreak", "longBreak"],
      control: { type: "select" },
    },
  },
  tags: ["autodocs"],
  render: (args) => (
    <WindowDecorator sx={{ height: "$16" }}>
      <Navbar {...args} />
    </WindowDecorator>
  ),
} as Meta<typeof Navbar>;

type Story = StoryObj<typeof Navbar>;

export const StayFocused: Story = {
  args: {
    appState: "stayFocused",
  },
};

export const ShortBreak: Story = {
  args: {
    appState: "shortBreak",
  },
};

export const LongBreak: Story = {
  args: {
    appState: "longBreak",
  },
};
