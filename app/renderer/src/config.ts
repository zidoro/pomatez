import { SVGTypes } from "components";
import { TaskList, Config, Timer, Settings } from "routes";
import { ConfigSliderProps } from "routes";
import { AppStateTypes } from "./store";
import { DefaultRootState } from "react-redux";

export const APP_NAME = "Pomatez";

type NavItemTypes = {
  name: string;
  icon: SVGTypes["name"];
  exact: boolean;
  path: string;
  component: React.FC;
  notify: boolean;
};

export const routes: (state?: AppStateTypes) => NavItemTypes[] = (
  state
) => [
  {
    icon: "task",
    name: "nav.taskList",
    exact: false,
    path: "/task-list",
    component: TaskList,
    notify: false,
  },
  {
    icon: "config",
    name: "nav.config",
    exact: true,
    path: "/config",
    component: Config,
    notify: false,
  },
  {
    icon: "timer",
    name: "nav.timer",
    exact: true,
    path: "/",
    component: Timer,
    notify: false,
  },
  {
    icon: "settings",
    name: "nav.settings",
    exact: true,
    path: "/settings",
    component: Settings,
    notify: !!state?.update?.updateBody,
  },
];

export const compactRoutes: NavItemTypes[] = [
  {
    icon: "timer",
    name: "nav.timer",
    exact: false,
    path: "/",
    component: Timer,
    notify: false,
  },
];

export const rangeConfig: ConfigSliderProps[] = [
  {
    label: "Stay focused",
    valueType: "mins",
    minValue: 0,
    maxValue: 60,
    value: 30,
  },
  {
    label: "Short break",
    valueType: "mins",
    minValue: 0,
    maxValue: 60,
    value: 5,
  },
  {
    label: "Long break",
    valueType: "mins",
    minValue: 0,
    maxValue: 60,
    value: 15,
  },
  {
    label: "Session rounds",
    valueType: "rounds",
    minValue: 0,
    maxValue: 10,
    value: 4,
  },
];
