// jest.config.js
module.exports = {
	preset: 'ts-jest',
	modulePathIgnorePatterns: [
		"build"
	],
	runner: '@jest-runner/electron/main',
	testEnvironment: 'node',
	verbose: true
};
