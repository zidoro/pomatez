const { app, BrowserWindow } = require("electron");
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} = require("electron-devtools-installer");

const isDev = require("electron-is-dev");
const path = require("path");

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 400,
    height: 600,
    resizable: false,
    maximizable: false,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // window.loadURL(
  //   isDev
  //     ? "http://localhost:3000"
  //     : `file://${path.join(__dirname, "../build/index.html")}`
  // );
  window.loadURL("https://github.com");

  window.on("ready-to-show", () => window.show());

  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension: ${name}`))
    .catch(err => console.log(`An error occured: `, err));

  installExtension(REDUX_DEVTOOLS)
    .then(name => console.log(`Added Extension: ${name}`))
    .catch(err => console.log(`An error occured: `, err));

  window.on("closed", () => (window = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (window === null) {
    createWindow();
  }
});

// process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
