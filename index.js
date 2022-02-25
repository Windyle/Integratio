// index.js

const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");

app.on("ready", () => {
  const mainWindow = new BrowserWindow();

  mainWindow.removeMenu();
  mainWindow.loadFile(path.join(__dirname, "public/index.html"));

  globalShortcut.register("f5", function () {
    mainWindow.reload();
  });

  globalShortcut.register("CommandOrControl+I", function () {
    mainWindow.webContents.openDevTools();
  });
});
