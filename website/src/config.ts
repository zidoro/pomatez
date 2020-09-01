export const APP_NAME = "Pomatez";

export const APP_VERSION = "v3.2.0";

export const INSTALLER = `https://github.com/roldanjr/pomatez/releases/download/${APP_VERSION}/Pomatez-${APP_VERSION}`;

export const WINDOWS_INSTALLER = `${INSTALLER}-setup.exe`;
export const DEB_INSTALLER = `${INSTALLER}-linux.deb`;
export const APP_IMAGE_INSTALLER = `${INSTALLER}-linux.AppImage`;
export const RPM_INSTALLER = `${INSTALLER}-linux.rpm`;
export const MAC_INSTALLER = `${INSTALLER}-mac.dmg`;

type LinkProps = {
	label: string;
	link: string;
	offset?: number;
};

export const navLinks: LinkProps[] = [
	{ label: "Features", link: "features", offset: -24 },
	{ label: "Boosters", link: "boosters", offset: -24 },
	{ label: "Roadmap", link: "roadmap", offset: -24 },
	{
		label: "Released notes",
		link: "https://github.com/roldanjr/pomatez/releases/latest",
	},
];
