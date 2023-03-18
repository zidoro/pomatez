import {
  Pencil2Icon,
  MixerHorizontalIcon,
  CountdownTimerIcon,
  GearIcon,
} from "@radix-ui/react-icons";
import { render, screen, testA11y } from "@/test-utils";
import Navbar, { NavLinkProps } from "../navbar";

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

describe("<Navbar />", () => {
  test("should pass the a11y test", async () => {
    await testA11y(<Navbar links={navLinks} />);
  });

  test("appState - prop should work correctly", () => {
    const { rerender } = render(
      <Navbar links={navLinks} appState="stayFocused" />
    );

    const activeLinkElement = screen
      .getAllByRole("link")
      .filter((link) => link.className.includes("active"));

    expect(activeLinkElement[0].getAttribute("class")).toMatch(
      /appState-stayFocused/i
    );

    rerender(<Navbar links={navLinks} appState="shortBreak" />);

    expect(activeLinkElement[0].getAttribute("class")).toMatch(
      /appState-shortBreak/i
    );

    rerender(<Navbar links={navLinks} appState="longBreak" />);

    expect(activeLinkElement[0].getAttribute("class")).toMatch(
      /appState-longBreak/i
    );
  });
});
