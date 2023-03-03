import {
  createBrowserRouter,
  Navigate,
  NavLink,
} from "react-router-dom";
import {
  CountdownTimerIcon,
  GearIcon,
  MixerHorizontalIcon,
  Pencil2Icon,
} from "@pomatez/ui/icons";
import { createRouteMap } from "./utils";
import { Layout } from "./components";
import { Timer } from "./tabs";

export const routes = createRouteMap({
  tasks: {
    icon: <Pencil2Icon />,
    label: "Tasks",
    path: "/tasks",
    as: NavLink,
  },
  config: {
    icon: <MixerHorizontalIcon />,
    label: "Config",
    path: "/config",
    as: NavLink,
  },
  timer: {
    icon: <CountdownTimerIcon />,
    label: "Timer",
    path: "/timer",
    as: NavLink,
  },
  settings: {
    icon: <GearIcon />,
    label: "Settings",
    path: "/settings",
    as: NavLink,
  },
});

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to={routes.timer.path} />,
      },
      {
        path: routes.tasks.path,
        element: <div>Tasks</div>,
      },
      {
        path: routes.config.path,
        element: <div>Config</div>,
      },
      {
        path: routes.timer.path,
        element: <Timer />,
      },
      {
        path: routes.settings.path,
        element: <div>Settings</div>,
      },
    ],
  },
]);
