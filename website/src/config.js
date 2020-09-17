const APP_NAME = "Pomatez";

const APP_VERSION = "v1.1.0";

const INSTALLER = `https://github.com/roldanjr/pomatez/releases/download/${APP_VERSION}/Pomatez-${APP_VERSION}`;

const WINDOWS_INSTALLER = `${INSTALLER}-setup.exe`;
const DEB_INSTALLER = `${INSTALLER}-linux.deb`;
const APP_IMAGE_INSTALLER = `${INSTALLER}-linux.AppImage`;
const RPM_INSTALLER = `${INSTALLER}-linux.rpm`;
const MAC_INSTALLER = `${INSTALLER}-mac.dmg`;

const navLinks = [
	{ label: "Features", link: "features", offset: -24 },
	{ label: "Boosters", link: "boosters", offset: -24 },
	{ label: "Roadmap", link: "roadmap", offset: -24 },
	{
		label: "Released notes",
		link: "https://github.com/roldanjr/pomatez/releases/latest",
	},
];

const pathPrefix = "/pomatez";

module.exports = {
	pathPrefix,
	APP_NAME,
	APP_VERSION,
	WINDOWS_INSTALLER,
	DEB_INSTALLER,
	APP_IMAGE_INSTALLER,
	RPM_INSTALLER,
	MAC_INSTALLER,
	navLinks,
};
