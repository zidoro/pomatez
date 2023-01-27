import json from "../../package.json";

export const APP_NAME = "Pomatez";
export const APP_VERSION = `v${json.version}`;

export const URL_PATH_PREFIX = "/pomatez";

export const AUTHOR_GITHUB_URL = "https://github.com/roldanjr";
export const PROJECT_GITHUB_URL = `${AUTHOR_GITHUB_URL}/pomatez`;
export const PROJECT_RELEASES_URL = `${PROJECT_GITHUB_URL}/releases`;

export const INSTALLER = `${PROJECT_RELEASES_URL}/download/${APP_VERSION}/Pomatez-${APP_VERSION}`;

export const WINDOWS_INSTALLER = `${INSTALLER}-setup.exe`;
export const DEB_INSTALLER = `${INSTALLER}-linux.deb`;
export const APP_IMAGE_INSTALLER = `${INSTALLER}-linux.AppImage`;
export const RPM_INSTALLER = `${INSTALLER}-linux.rpm`;
export const MAC_INSTALLER = `${INSTALLER}-mac.dmg`;

export const NAV_LINKS = [
  { label: "Features", link: "features", offset: -24 },
  { label: "Roadmap", link: "roadmap", offset: -24 },
  {
    label: "Released notes",
    link: `${PROJECT_RELEASES_URL}/latest`,
  },
];

export const ENV = {
  GOOGLE_VERIFICATION: process.env.GOOGLE_VERIFICATION || "",
  GA_TRACKING_ID: process.env.GA_TRACKING_ID || "",
};
