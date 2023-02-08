import { createBrowserRouter, Navigate } from "react-router-dom";
import { createRouteMap } from "./utils";
import { Layout } from "./components";
import { Timer } from "./tabs";

export const routes = createRouteMap({
  tasks: {
    icon: "tasks",
    label: "Tasks",
    path: "/tasks",
  },
  config: {
    icon: "config",
    label: "Config",
    path: "/config",
  },
  timer: {
    icon: "timer",
    label: "Timer",
    path: "/timer",
  },
  settings: {
    icon: "settings",
    label: "Settings",
    path: "/settings",
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
