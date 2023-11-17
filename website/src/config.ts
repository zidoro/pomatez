import json from "../../package.json";

export const APP_NAME = "Pomatez";
export const APP_VERSION = `v${json.version}`;

export const URL_PATH_PREFIX = "/pomatez";

export const AUTHOR_GITHUB_URL = "https://github.com/roldanjr";
export const PROJECT_GITHUB_URL = `${AUTHOR_GITHUB_URL}/pomatez`;
export const PROJECT_RELEASES_URL = `${PROJECT_GITHUB_URL}/releases`;

export const DOWNLOAD_PREFIX = `${PROJECT_RELEASES_URL}/download/${APP_VERSION}`;
export const INSTALLER = `${DOWNLOAD_PREFIX}/Pomatez-${APP_VERSION}`;

export const WINDOWS_x64_INSTALLER = `${INSTALLER}-win-x64-setup.exe`;
export const WINDOWS_ARM_INSTALLER = `${INSTALLER}-win-arm64-setup.exe`;
export const DEB_INSTALLER = `${INSTALLER}-linux-amd64.deb`;
export const APP_IMAGE_x64_INSTALLER = `${INSTALLER}-linux-x86_64.AppImage`;
export const APP_IMAGE_ARM_INSTALLER = `${INSTALLER}-linux-arm64.AppImage`;
export const RPM_INSTALLER = `${INSTALLER}-linux-x86_64.rpm`;
export const MAC_x64_INSTALLER = `${INSTALLER}-mac-x64.dmg`;
export const MAC_ARM_INSTALLER = `${INSTALLER}-mac-arm64.dmg`;

export const INSTALLERS = {
  ELECTRON: {
    WINDOWS: {
      x64: WINDOWS_x64_INSTALLER,
      arm: WINDOWS_ARM_INSTALLER,
    },
    LINUX: {
      deb: DEB_INSTALLER,
      appImage: {
        x64: APP_IMAGE_x64_INSTALLER,
        arm: APP_IMAGE_ARM_INSTALLER,
      },
      rpm: RPM_INSTALLER,
    },
    MAC: {
      x64: MAC_x64_INSTALLER,
      arm: MAC_ARM_INSTALLER,
    },
  },
  // Only done like this because of the different caps and it doesn't have v before the version.
  TAURI: {
    WINDOWS: {
      x64: `${DOWNLOAD_PREFIX}/Pomatez_${json.version}_x64_en-US-win-tauri-beta.msi`,
      arm: `${DOWNLOAD_PREFIX}/Pomatez_${json.version}_arm64-setup-win-tauri-beta.exe`,
    },
    LINUX: {
      deb: `${DOWNLOAD_PREFIX}/pomatez_${json.version}_amd64-linux-tauri-beta.deb`,
      appImage: {
        x64: `${DOWNLOAD_PREFIX}/pomatez_${json.version}_amd64-linux-tauri-beta.AppImage`,
      },
    },
    MAC: {
      universal: `${DOWNLOAD_PREFIX}/Pomatez_${json.version}_universal-mac-tauri-beta.dmg`,
    },
  },
} as const;

export const NAV_LINKS = [
  { label: "Features", link: "features", offset: -24 },
  { label: "Roadmap", link: "roadmap", offset: -24 },
  {
    label: "Release notes",
    link: `${PROJECT_RELEASES_URL}/latest`,
  },
  {
    label: "Discord",
    link: `https://discord.gg/ZqPqN3hwcB`,
  },
] as const;

export const ENV = {
  GOOGLE_VERIFICATION: process.env.GOOGLE_VERIFICATION || "",
  GA_TRACKING_ID: process.env.GA_TRACKING_ID || "",
  IS_DEV: process.env.NODE_ENV !== "production",
} as const;
