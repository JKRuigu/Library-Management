const {app, BrowserWindow, Menu, ipcMain} = require('electron')
const path = require('path')
const url = require('url')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    // frame:false,
    width: 1200,
    height: 800
  })


    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    win.loadURL(startUrl);
    // Open the DevTools.
// win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null
  })
  // Build menu from template
const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

// Insert menu
Menu.setApplicationMenu(mainMenu);
}

app.on('ready', createWindow)

// Create menu template
const mainMenuTemplate =  [
  // Each object is a dropdown
  {
    label: 'Settings',
    submenu:[
      {
        role: 'reload'
      },
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];

// If OSX, add empty object to menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
