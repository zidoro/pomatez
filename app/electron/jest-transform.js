const { transformSync } = require("esbuild");

// The Electron runner embeds Jest 25, which expects a string transformer.
exports.process = (source, sourcefile) =>
  transformSync(source, {
    sourcefile,
    loader: "ts",
    format: "cjs",
    target: "node20",
    sourcemap: "inline",
  }).code;
