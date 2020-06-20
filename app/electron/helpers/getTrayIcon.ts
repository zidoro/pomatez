import path from "path";

export function getTrayIcon() {
  switch (process.platform) {
    case "darwin":
      return path.join(__dirname, "../../src/assets/logos/16x16-dark.png");
    default:
      return path.join(__dirname, "../../src/assets/logos/tray-dark.png");
  }
}
