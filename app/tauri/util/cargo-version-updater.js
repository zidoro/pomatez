let fs = require("fs");
let path = require("path");
let tauriConfig = require("../tauri.conf.json");

let cargo = fs.readFileSync(
  path.join(__dirname, "../Cargo.toml"),
  "utf8"
);

let versionRegex = /\nversion = "([0-9.]+)"/g;

let resolvedVersion =
  (tauriConfig.package && tauriConfig.package.version) ||
  tauriConfig.version;

if (!resolvedVersion) {
  throw new Error("Missing version in tauri.conf.json");
}

let newContents = cargo.replace(
  versionRegex,
  `\nversion = "${resolvedVersion}"`
);

fs.writeFileSync(
  path.join(__dirname, "../Cargo.toml"),
  newContents,
  "utf8"
);

console.log("Setting Cargo.toml to version " + resolvedVersion);
