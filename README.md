<p align="center">
  <a href="#">
    <img src="assets/logo.png" alt="Productivity Timer logo" width="72" height="72">
  </a>
</p>

<h1 align="center">PRODUCTIVITY TIMER</h1>

<p align="center">
  Wonderful app that will help boost your productivity
   <br>
  <br>
  <a href="#overview">Overview</a>
  .
  <a href="#features">Features</a>
  .
  <a href="#road-map">Road Map</a>
  .
  <a href="#download">Download</a>
  <br>
  <br>
</p>

![App Preview](/assets/Preview.png)

[![productivity-timer](https://snapcraft.io//productivity-timer/badge.svg)](https://snapcraft.io/productivity-timer)
[![Snap Status](https://build.snapcraft.io/badge/roldanjrCodeArts9711/productivity-timer.svg)](https://build.snapcraft.io/user/roldanjrCodeArts9711/productivity-timer)
[![Build Status](https://travis-ci.com/roldanjrCodeArts9711/productivity-timer.svg?branch=master)](https://travis-ci.com/roldanjrCodeArts9711/productivity-timer)
[![Total Downloads](https://img.shields.io/github/downloads/roldanjrCodeArts9711/productivity-timer/total)](https://github.com/roldanjrCodeArts9711/productivity-timer/releases)
[![Version](https://img.shields.io/github/v/release/roldanjrCodeArts9711/productivity-timer)](https://github.com/roldanjrCodeArts9711/productivity-timer/releases)
[![License](https://img.shields.io/github/license/roldanjrCodeArts9711/productivity-timer)](https://github.com/roldanjrCodeArts9711/productivity-timer/blob/master/LICENSE)

## Overview

This app is base on [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique) added with some features that might help you a lot.

## Features

- Always On Top

  > It make the app always on top of all other apps running on your Operating System.

- Notifications

  > Shows some notification from time to time if necessary.

- Special Breaks

  > Allows you to set some special time when you really need to take a break.

  > **Example**: Lunch Break, Dinner Break and etc...

- Strict Mode

  > **NOTE**: Full Screen On Break feature of `version 1` is being moved here due to some request of users.

  > If **Enabled**: It will strictly follows what you had set on your configuration and it will make every break fullscreen so that you will force to take a break.

- Dark Theme

  > Enable to use `Dark Mode` version of the app to reduce strain.

- Lock Settings

  > If **Enabled**: Your settings that you had set will be locked.

  > **NOTE**: This feature is not yet fully implemented. There's a lot of functionalities of it that has not been develop and implemented.

- Built-in Task List

  > Allow you to create a list of task that you want to accomplish.

  > **NOTE**: This feature will be improve soon.

## Road Map

- Add web blocker feature.
- Add password to Lock Settings feature.
- Add option to switch between native titlebar.
- Improve task list feature to make it more useful.
- Create official website that include documentations.

## Development

PRODUCTIVITY TIMER is built with [React](https://reactjs.org/), [Electron](https://www.electronjs.org/), and [Typescript](https://www.typescriptlang.org/).

### Setup

```bash
# go to app sub-folder
cd app

# install all dependencies
yarn install

# start the react app
yarn develop

# start electron
yarn electron

# build window installer
yarn build:win

# build linux installer
yarn build:linux

# build mac installer
# note: edit package.json and add your custom config for mac
yarn build:mac

# build multiple platform
# note: edit package.json and add your custom config for mac
yarn build:mwl
```

## Download

Available for Window, Mac, and Linux.

> For linux users. You can directly install it from SnapStore.

[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/productivity-timer)

Download the latest version from the [Releases Page](https://github.com/roldanjrCodeArts9711/productivity-timer/releases).

## License

MIT © [Roldan Montilla Jr](https://github.com/roldanjrCodeArts9711)
