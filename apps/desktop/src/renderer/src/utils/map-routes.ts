import { NavLinkProps } from "@pomatez/ui";

export type RouteProps = NavLinkProps<{ path: string }>;

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
