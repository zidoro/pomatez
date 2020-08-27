import path from "path";

export function getIcon() {
	switch (process.platform) {
		case "darwin":
			return path.join(__dirname, "../assets/logo@2x.png");
		case "linux":
			return path.join(__dirname, "../assets/logo.png");
		default:
			return path.join(__dirname, "../assets/logo.ico");
	}
}
