// jest.config.js
module.exports = {
  transform: { "^.+\\.tsx?$": "<rootDir>/jest-transform.js" },
  testRunner: "jest-jasmine2",
  modulePathIgnorePatterns: ["build"],
  runner: "@jest-runner/electron/main",
  testEnvironment: "node",
  verbose: true,
};
