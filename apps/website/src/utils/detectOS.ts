export type OSTypes = "Windows" | "MacOS" | "Linux" | "Mobile";

export function detectOS(): OSTypes {
  const { appVersion, userAgent } = navigator;

  const regex = new RegExp("Android|webOS|iPhone|iPad|iPod", "i");

  if (regex.test(userAgent)) return "Mobile";

  if (appVersion.indexOf("Win") !== -1) return "Windows";
  if (appVersion.indexOf("Mac") !== -1) return "MacOS";
  if (appVersion.indexOf("Linux") !== -1) return "Linux";

  return "Windows";
}
