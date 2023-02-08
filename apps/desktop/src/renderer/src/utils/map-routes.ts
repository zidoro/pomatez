import { IconProps } from "@renderer/components";

export type RouteProps = {
  icon?: IconProps["name"];
  label: string;
  path: string;
};

export type RouteConfig = {
  [name: string]: RouteProps & {
    subPaths?: RouteConfig;
  };
};

export const createRouteMap = <R extends RouteConfig>(routes: R) =>
  routes;

export const buildRoute = <R extends RouteConfig>({
  path,
  subPaths,
}: {
  path: string;
  subPaths: R;
}) => ({ path, ...subPaths });
