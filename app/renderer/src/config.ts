import { SVGTypes } from "components";
import { TaskList, Config, Timer, Settings } from "routes";
import { ConfigSliderProps } from "routes";

export const APP_NAME = "Pomatez";

type NavItemTypes = {
	name: string;
	icon: SVGTypes["name"];
	exact: boolean;
	path: string;
	component: React.FC;
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

export const rangeConfig: ConfigSliderProps[] = [
	{
		label: "Stay focus",
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
