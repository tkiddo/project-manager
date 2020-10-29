// 引入electron并创建一个Browserwindow
const { app, BrowserWindow, Menu, Tray } = require('electron');
const path = require('path');
const mainProcess = require('./main_process/index');

// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow;
// 保存托盘对象
let appTray = null;

function setTray(win) {
  const trayMenuTemplate = [
    {
      label: '退出GUI',
      click: () => {
        app.quit();
      }
    }
  ];
  // 托盘图标
  const trayIcon = path.join(__dirname, 'public/favicon.ico');
  appTray = new Tray(trayIcon);
  // 托盘上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
  appTray.setToolTip('Sliver GUI');
  appTray.setContextMenu(contextMenu);
  appTray.on('click', () => {
    win.show();
  });
}

function createWindow() {
  // 隐藏菜单栏
  Menu.setApplicationMenu(null);
  // 创建浏览器窗口,宽高自定义具体大小你开心就好
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    resizable: false,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  setTray(mainWindow);

  // 加载应用-----适用于生产模式
  mainWindow.loadFile('./dist/index.html');

  // 加载应用----适用于开发模式
  // mainWindow.loadURL('http://localhost:3001/');

  // 打开开发者工具，默认不打开
  mainWindow.webContents.openDevTools();

  // 关闭window时触发下列事件.
  mainWindow.on('close', (e) => {
    e.preventDefault();
    mainWindow.hide();
  });
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', () => {
  createWindow();
});

// 所有窗口关闭时退出应用.
app.on('window-all-closed', () => {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    // app.quit();
  }
});

app.on('activate', () => {
  // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
  if (mainWindow === null) {
    createWindow();
  }
});

mainProcess();
