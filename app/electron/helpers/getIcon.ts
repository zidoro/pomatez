import path from "path";

export function getIcon() {
  switch (process.platform) {
    case "darwin":
      return path.join(
        __dirname,
        "../../src/assets/logos/logo-transparent@2x.png"
      );
    case "linux":
      return path.join(
        __dirname,
        "../../src/assets/logos/logo-transparent.png"
      );
    default:
      return path.join(
        __dirname,
        "../../src/assets/logos/logo-transparent.ico"
      );
  }
}
