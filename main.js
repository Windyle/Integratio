const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + "/static/icon.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
    minWidth: 800,
    minHeight: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`${__dirname}/src/index.html`);

  // Hide the menu bar
  mainWindow.removeMenu();

  // Maximize the window
  mainWindow.maximize();

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  globalShortcut.register("CommandOrControl+Shift+I", function () {
    mainWindow.webContents.openDevTools();
  });
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q

  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (mainWindow === null) {
    createWindow();
  }
});

// try {
//   require("electron-reloader")(module, { ignore: ["./src/intdb.db"] });
// } catch (err) {
//   throw err;
// }

// Close app event listener
ipcMain.on("close-app", (event) => {
  event.preventDefault();
  app.exit();
});

// Reduce to icon event listener
ipcMain.on("minimize-app", (event) => {
  event.preventDefault();
  mainWindow.minimize();
});

// Maximize event listener
ipcMain.on("maximize-app", (event) => {
  event.preventDefault();
  if (mainWindow.isMaximized()) mainWindow.unmaximize();
  else mainWindow.maximize();
});
