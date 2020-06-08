<p align="center">
  <a href="#">
    <img src="assets/logo.png" alt="Productivity Timer logo" width="72" height="72">
  </a>
</p>

<h1 align="center">PRODUCTIVITY TIMER</h1>

<p align="center">
  Wonderful open source app that will help boost your productivity
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

This app is based on [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique) added some features that might help users a lot.

**Useful Blogs About Pomodoro Technique**:

- [The pomodoro technique](https://www.focusboosterapp.com/the-pomodoro-technique)

- [Productivity 101: An Introduction to The Pomodoro Technique](https://lifehacker.com/productivity-101-a-primer-to-the-pomodoro-technique-1598992730)

- [Do more and have fun with time management](https://francescocirillo.com/pages/pomodoro-technique)

## Features

- Always On Top

  > It make the app always on top of all other apps running on users Operating System. `( default: disabled )`

- Notifications

  > Shows some notification from time to time if necessary.

  > **NOTE**: Notification Property is divided into three category.

  1. **NONE** - No notification will appear.
  2. **NORMAL** - Necessary notification will only appear.
  3. **EXTRA** - `( default )` Warn users _30 seconds_ before _WORK TIME FINISH_, _60 seconds_ before _SHORT BREAK FINISH_, _LONG BREAK FINISH_ and _SPECIAL BREAK FINISH_.

- Special Breaks

  > Allows users to set some special time when they really need to take a break.

  > **Example**: Lunch Break, Dinner Break and etc... `( default: enabled )`

- Strict Mode

  > **NOTE**: Full Screen On Break feature of `version 1` is being moved here due to some request of users.

  > If **Enabled**: It will strictly follows what users had set on thier configuration and it will make every break fullscreen so that users will force to take a break. `( default: enabled )`

- Dark Theme

  > Enable to use `Dark Mode` version of the app to reduce strain. `( default: depends on users operating system prefered color scheme )`

- Timer Animation

  > Allows users to toggle timer progress animation if their laptop / pc has a low specs and experiencing `High CPU Usage`.

  > If **Enabled**: It will reduce CPU Usage of the app up to 99% and to the least of its original usage.

- Built-in Task List

  > Allows users to create a list of task that they want to accomplish.

## Road Map

- Add web blocker feature.
- Add option to switch to native titlebar.
- Create official website that includes documentation.
- Add productivity report requested. Feature request mentioned here [#68](https://github.com/roldanjrCodeArts9711/productivity-timer/issues/68).

## Development

**For Contributors**

PRODUCTIVITY TIMER is built with [React](https://reactjs.org/), [Electron](https://www.electronjs.org/), and [Typescript](https://www.typescriptlang.org/).

### Setup

```bash
# install all dependencies
yarn install

# start the react app
yarn develop

# start electron
yarn electron

# runs `yarn develop` and `yarn electron` concurrently
yarn start:app

# build window installer
yarn build:win

# build mac installer
yarn build:mac

# build linux installer
yarn build:linux
```

## Download

Available for Window, Mac, and Linux.

Download the latest version from the [Releases Page](https://github.com/roldanjrCodeArts9711/productivity-timer/releases).

> For linux users. You can directly install it from SnapStore.

[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/productivity-timer)


## License

MIT © [Roldan Montilla Jr](https://github.com/roldanjrCodeArts9711)
