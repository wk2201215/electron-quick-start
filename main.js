// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const mysql = require('mysql');
const path = require('node:path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('query-database', async (event, query) => {
  console.log('Received database query:', query); // デバッグ用の出力

  const connection = mysql.createConnection({
    host: 'mysql310.phy.lolipop.lan',
    user: 'LAA1517446',
    password: 'lowcode',
    database: 'LAA1517446-lowcode'
  });

  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error('Database connection error:', err); // エラー出力
        reject(err);
        return;
      }
      
      connection.query(query, (error, results) => {
        if (error) {
          console.error('Database query error:', error); // エラー出力
          reject(error);
        } else {
          console.log('Database query results:', results); // デバッグ用の出力
          resolve(results);
        }
        
        connection.end();
      });
    });
  });
});
