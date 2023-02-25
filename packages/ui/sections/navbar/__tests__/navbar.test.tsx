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
      <Navbar links={navLinks} appState="stay-focused" />
    );

    const activeLinkElement = screen
      .getAllByRole("link")
      .filter((link) => link.className.includes("active"));

    expect(activeLinkElement[0].getAttribute("class")).toMatch(
      /appState-stay-focused/i
    );

    rerender(<Navbar links={navLinks} appState="short-break" />);

    expect(activeLinkElement[0].getAttribute("class")).toMatch(
      /appState-short-break/i
    );

    rerender(<Navbar links={navLinks} appState="long-break" />);

    expect(activeLinkElement[0].getAttribute("class")).toMatch(
      /appState-long-break/i
    );

    rerender(<Navbar links={navLinks} appState="special-break" />);

    expect(activeLinkElement[0].getAttribute("class")).toMatch(
      /appState-special-break/i
    );
  });
});
