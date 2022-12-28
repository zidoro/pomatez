import path from "path";

export function getIcon() {
  switch (process.platform) {
    case "darwin":
      return path.join(__dirname, "../assets/logo-dark@2x.png");
    case "linux":
      return path.join(__dirname, "../assets/logo-dark256x256.png");
    default:
      return path.join(__dirname, "../assets/logo-dark.ico");
  }
}
