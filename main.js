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
// create about window

function createAboutWindow(){
    const aboutWindow = new BrowserWindow({
        title:"About Image Sizer",
        width: 300,
        height:300
    });

    // load file
    aboutWindow.loadFile(path.join(__dirname,"./renderer/about.html"))
}
// menu template
const menu = [
    // macos config for menu
    ...(isMac ? [
        {
            label: app.name,
            submenu: [
                {
                    label: 'About',
                    click: createAboutWindow,
                }
            ]
        }]: []),
    {
        role: 'filemenu',

    },
    // windows config
    ...(!isMac? [{
        label: 'Help',
        submenu:[{
            label:'About',
            click: createAboutWindow,
        }]
    }]:[])
];

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