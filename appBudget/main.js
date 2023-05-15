const { app, BrowserWindow } = require("electron");
const path = require("path");

// Création d'une fenêtre
function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Chargement de l'index.html
  win.loadFile(path.join(__dirname, "index.html"));
}

app.whenReady().then(() => {
  createWindow();

  // Gestion des fenêtres
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quitter l'application
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});