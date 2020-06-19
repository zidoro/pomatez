import path from "path";

export function getIcon(isDarkMode: boolean) {
  switch (process.platform) {
    case "darwin":
      return isDarkMode
        ? path.join(__dirname, "../../src/assets/logos/logo-dark@2x.png")
        : path.join(__dirname, "../../src/assets/logos/logo-light@2x.png");
    case "linux":
      return isDarkMode
        ? path.join(__dirname, "../../src/assets/logos/logo-dark.png")
        : path.join(__dirname, "../../src/assets/logos/logo-light.png");
    default:
      return isDarkMode
        ? path.join(__dirname, "../../src/assets/logos/logo-dark.ico")
        : path.join(__dirname, "../../src/assets/logos/logo-light.ico");
  }
}
