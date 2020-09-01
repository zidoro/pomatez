export type OSTypes = "Windows" | "MacOS" | "Linux";

export function detectOS(): OSTypes {
	const { appVersion } = navigator;

	if (appVersion.indexOf("Win") !== -1) return "Windows";
	if (appVersion.indexOf("Mac") !== -1) return "MacOS";
	if (appVersion.indexOf("Linux") !== -1) return "Linux";

	return "Windows";
}
