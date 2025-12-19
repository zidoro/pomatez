# Contributing to This Project

While we don't have a strict coding style guide we do use conventional commits.

We do ask that you try to make any platform specific features or program
specific integrations optional, so that core functionality remains consistent
across all platforms and use cases.

Please do not open features saying "I asked AI to do it" trying to contribute.
If you make a pr we expect that if we ask for changes you should be able to
implement them rather than
us being your AI proof readers.

## Conventional Commits

Please make your commit messages in the following style, or your pr names in
this style so they can be squash merged.

- `feat:`
  - New features
- `fix:`
  - Fixing bugs
- `perf:`
  - Performance improvements
- `chore:`
  - Non code changes which done fall into the other categories e.g. Updating build pipelines.
- `docs:`
  - Documentation changes
- `lang:`
  - Language specific changes

There are more outlined in the settings in ./release-please-config.json but these are the main ones.

## How to set up the development environment

If there are any issues with these stages e.g. we have forgot to update any
versions, feel free to open a small pr to correct it.

### Requirements

- Node.js v18
- Rust (only required for the Tauri version)
- Yarn

Any IDE should be fine as they should pick up the package.json in the root
folder, once you have run `yarn` to install the modules the main commands are:

- `yarn dev:app`
- `yarn tauri:dev`

If you have any issues, feel free to open an issue with any error logs and steps
to reproduce.

We will happily add any configurations or list any plugins suggested that may
help with local development.
