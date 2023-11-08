const path = require('path');

const {app, BrowserWindow, Menu} = require('electron');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

function createMainWindow(){
    // new browser window object with properties 
    const mainWindow = new BrowserWindow({
        title:"image resizer",
        width: isDev ? 1000:500,
        height:"800"
    });
    // open dev tools 
    if (isDev){
        mainWindow.webContents.openDevTools();
    }

    // load index 
    mainWindow.loadFile(path.join(__dirname,"./renderer/index.html"));
}

// menu template

const menu = [{
    label:'File',
    submenu:[
        {
            label: 'Quit',
            click:()=> app.quit(),
            accelerator: 'CmdOrCtrl+W'
        }
    ]
}];

// app ready 
app.whenReady().then(()=>{
    // start app
    createMainWindow();

    // custom menu 
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu); 

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createMainWindow()
        }
    });

});

// boiler plate to no completely kill on macos
app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit()
    }
});