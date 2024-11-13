/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
(function(){
    let clickEventName = 'click';
    let clickButtonEventHandler = function(){
        let mysql      = require('mysql');
        let connection = mysql.createConnection({
            host     : 'DESKTOP-3LA5V4N',
            user     : 'root',
            password : 'lowcode',
            database : 'electronSample'
        });
        alert("a");

        connection.connect();

        connection.query('SELECT * FROM electronSample;', function(err, rows, fields) {
            if (err) throw err;
            if(rows.length > 0){
                let table = document.querySelectorAll('[elc-js=SelectResultTbl]')[0]
                let tableBody = table.querySelectorAll('tbody')[0];
                tableBody.innerHTML = '';
                alert(rows[0].message);
                tableBody.insertAdjacentHTML('beforeend','<tr><td>' + rows[0].message + '</td></tr>');
            }
        });

        connection.end();
    };
    document.querySelectorAll('[elc-js=ExecuteQUeryBtn]')[0].addEventListener(clickEventName, clickButtonEventHandler);
}());

// renderer.js
(function () {
    const clickEventName = 'click';
  
    const clickButtonEventHandler = async function () {
      try {
        console.log('Button clicked, sending database query'); // デバッグ用の出力
  
        const rows = await window.api.queryDatabase('SELECT * FROM electronSample;');
        console.log('Received rows from database:', rows); // デバッグ用の出力
  
        if (rows.length > 0) {
          const table = document.querySelector('[elc-js=SelectResultTbl]');
          const tableBody = table.querySelector('tbody');
          tableBody.innerHTML = ''; // テーブルをクリア
  
          rows.forEach(row => {
            const message = row.message || 'No message'; // 空のメッセージに対処
            tableBody.insertAdjacentHTML('beforeend', `<tr><td>${message}</td></tr>`);
          });
        } else {
          console.log('No rows returned from database');
        }
      } catch (error) {
        console.error('Failed to execute database query:', error);
      }
    };
  
    document.querySelector('[elc-js=ExecuteQUeryBtn]')
      .addEventListener(clickEventName, clickButtonEventHandler);
  }());
  