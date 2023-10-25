const fs = require("fs");
const release_please_manifest = require("../../../.release-please-manifest.json");
const path = require("path");

const version = `v${release_please_manifest["."]}`;
const github_url = `https://github.com/sekwah41/pomatez/releases/download/${version}/`;
const artifactsPath = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "artifacts"
);

// Delete a folder called release in the root of the project if it exists.
// This is to ensure its a fresh prep.
const releasePath = path.join(__dirname, "..", "..", "..", "release");
if (fs.existsSync(releasePath)) {
  fs.rmSync(releasePath, { recursive: true });
}
// and make a new one
fs.mkdirSync(releasePath);

function extractLatestChanges(changelog) {
  const versionRegex =
    /## \[(\d+\.\d+\.\d+)\].*?\n([\s\S]*?)(?=## \[|\n$)/;
  const linkRegex = /\(\[([^\]]+)\]\([^)]+\)\)/g;

  const match = versionRegex.exec(changelog);

  if (match && match.length > 2) {
    const changes = match[2]
      .trim()
      .split("\n")
      .map((line) => line.replace(linkRegex, "").trim()) // Remove links and trim each line
      .join("\n");
    return `Version: ${match[1]}\nChanges:\n${changes}`;
  }

  return "No changes found or changelog is not in the expected format.";
}

// https://tauri.app/v1/guides/distribution/updater/
const data = {
  version,
  notes: extractLatestChanges(
    fs.readFileSync(
      path.join(__dirname, "..", "..", "..", "CHANGELOG.md"),
      { encoding: "utf8" }
    )
  ),
  pub_date: new Date().toISOString(),
  platforms: {},
};

function getSignatureContent(signaturePath) {
  return fs.readFileSync(signaturePath, { encoding: "utf8" });
}

/**
 * This is needed solely so that tar.gz files are not renamed to .gz
 * @param fileName
 * @returns {*|string}
 */
function getFileExtension(fileName) {
  const match = fileName.match(/\.[0-9a-z]+(\.gz)?$/i);
  return match ? match[0] : "";
}

/**
 * only needs the updater file, not the release file
 * @param platform
 * @param artifactSubPath
 * @param fileGlob
 * @param nameOverwrite - if you want to overwrite the name of the file in the release folder
 */
function addPlatformUpdater(
  platform,
  artifactSubPath,
  fileGlob,
  nameOverwrite
) {
  const fullPath = path.join(artifactsPath, artifactSubPath);
  const files = fs.readdirSync(fullPath);
  const file = files.find((file) => file.match(fileGlob));

  if (file) {
    const signaturePath = path.join(fullPath, `${file}.sig`);
    const signature = getSignatureContent(signaturePath);

    // Extract the file extension
    const extension = getFileExtension(file);

    // copy the file into the release folder and rename it so that its clear it's an update file rather than for install
    const originalFilePath = path.join(fullPath, file);
    const releaseFileName = `${
      nameOverwrite ? nameOverwrite : platform
    }-update${extension}`;
    const releaseFilePath = path.join(releasePath, releaseFileName);
    fs.copyFileSync(originalFilePath, releaseFilePath);

    const url = `${github_url}${releaseFileName}`;

    data.platforms[platform] = {
      signature: signature.trim(),
      url: url,
    };

    console.log(`File copied to ${releaseFilePath}`);
  }
}

/**
 * Recursively searches for files with the given glob pattern and copies them to the release folder.
 * @param {string} searchPath - The starting directory to begin the search.
 * @param {string} fileExtension - The file extension to search for.
 */
function addReleaseFiles(searchPath, ...fileExtension) {
  fs.readdirSync(searchPath, { withFileTypes: true }).forEach(
    (entry) => {
      const entryPath = path.join(searchPath, entry.name);
      if (entry.isDirectory()) {
        // Recurse if entry is a directory
        addReleaseFiles(entryPath, ...fileExtension);
      } else if (
        entry.isFile() &&
        fileExtension.find((ext) => ext === path.extname(entry.name))
      ) {
        // Copy file if it matches the extension
        const ext = path.extname(entry.name);
        const baseName = path.basename(entry.name, ext);

        // TODO remove once we are set on replacing electron for some of the base files and/or are sure most of the bugs are gone
        const releaseFilePath = path.join(
          releasePath,
          `${baseName}-tauri-beta${ext}`
        );
        fs.copyFileSync(entryPath, releaseFilePath);
        console.log(`Release file copied to ${releaseFilePath}`);
      }
    }
  );
}

addPlatformUpdater(
  "darwin-x86_64",
  "tauri-mac/universal-apple-darwin/release/bundle/macos",
  /\.tar\.gz$/,
  "darwin-universal"
);
addPlatformUpdater(
  "darwin-aarch64",
  "tauri-mac/universal-apple-darwin/release/bundle/macos",
  /\.tar\.gz$/,
  "darwin-universal"
);
// Need to look into linus for arm, I don't believe it's supported for tauri at least.
addPlatformUpdater(
  "linux-x86_64",
  "tauri-linux/x86_64-unknown-linux-gnu/release/bundle/appimage",
  /\.AppImage.tar.gz$/
);
addPlatformUpdater(
  "windows-x86_64",
  "tauri-win/x86_64-pc-windows-msvc/release/bundle/msi",
  /\.zip$/
);
addPlatformUpdater(
  "windows-aarch64",
  "tauri-win/aarch64-pc-windows-msvc/release/bundle/nsis",
  /\.zip$/
);

addReleaseFiles(
  artifactsPath,
  ".AppImage",
  ".exe",
  ".dmg",
  ".msi",
  ".deb"
);

fs.writeFile(
  path.join(releasePath, "tauri-updater.json"),
  JSON.stringify(data, null, 2),
  (err) => {
    if (err) throw err;
    console.log("Data written to file");
  }
);

// The release action will upload the contends of the release folder and any files from artifacts that match the expected extensions.
