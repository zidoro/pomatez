let fs = require("fs");
let path = require("path");
let tauriConfig = require("../tauri.conf.json");

let cargo = fs.readFileSync(
  path.join(__dirname, "../Cargo.toml"),
  "utf8"
);

let versionRegex = /\nversion = "([0-9.]+)"/g;

let newContents = cargo.replace(
  versionRegex,
  `\nversion = "${tauriConfig.package.version}"`
);

fs.writeFileSync(
  path.join(__dirname, "../Cargo.toml"),
  newContents,
  "utf8"
);

console.log("Setting Cargo.toml to version " + process.argv[2]);
