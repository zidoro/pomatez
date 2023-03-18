import { MemoExoticComponent, ComponentType } from "react";
import LogoMain, { LogoProps } from "./logo";
import LogoIcon from "./logo-icon";

export type { LogoIconProps } from "./logo-icon";
export type { LogoProps } from "./logo";

type LogoComponent<P> = MemoExoticComponent<ComponentType<P>> & {
  Icon: typeof LogoIcon;
};

export const Logo = LogoMain as LogoComponent<LogoProps>;

Logo.Icon = LogoIcon;
