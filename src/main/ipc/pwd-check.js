var _electron = require('electron');

var _common = require('../utils/common.js');

_electron.ipcMain.on('pwd-check', function (ev, pwd) {
	(0, _common.execCmd)('echo ' + pwd + ' | sudo -S ls', function (err) {
		if (err) {
			ev.sender.send('pwd-checked', {
				error: 1
			});
		} else {
			global.pwd = pwd;
			ev.sender.send('pwd-checked', {
				error: 0
			});
		}
	});
});