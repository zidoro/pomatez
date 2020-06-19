import { SVGTypes } from "components";
import { TaskList, Config, Timer, Settings } from "routes";
import { RouteComponentProps } from "react-router-dom";

type NavItemTypes = {
  name: string;
  icon: SVGTypes["name"];
  exact: boolean;
  path: string;
  component: React.FC<RouteComponentProps>;
};

export const routes: NavItemTypes[] = [
  {
    icon: "task",
    name: "Task List",
    exact: false,
    path: "/tasklist",
    component: TaskList,
  },
  {
    icon: "config",
    name: "Config",
    exact: true,
    path: "/config",
    component: Config,
  },
  {
    icon: "timer",
    name: "Timer",
    exact: true,
    path: "/",
    component: Timer,
  },
  {
    icon: "settings",
    name: "Settings",
    exact: true,
    path: "/settings",
    component: Settings,
  },
];
