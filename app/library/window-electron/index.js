const { remote, ipcRenderer, webFrame } = window.require("electron");

const currentWindow = remote.getCurrentWindow();

module.exports = { currentWindow, ipcRenderer, webFrame };
