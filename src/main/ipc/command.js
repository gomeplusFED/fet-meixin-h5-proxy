var _electron = require('electron');

var _common = require('../utils/common.js');

_electron.ipcMain.on('command-will-run', function (ev, command) {
	var child = (0, _common.execCmd)(command);
	var pid = child.pid;
	ev.sender.send('command-begin', pid);
	child.stdout.on('data', function (data) {
		ev.sender.send('command-runing', {
			data: data,
			pid: pid
		});
	});
	child.stderr.on('data', function (data) {
		ev.sender.send('command-runing', {
			data: data,
			pid: pid
		});
	});
	child.on('close', function (code) {
		ev.sender.send('command-close', pid);
	});
	child.on('error', function () {});
});

_electron.ipcMain.on('command-force-close', function (ev, pid) {
	try {
		process.kill(pid);
	} catch (e) {}
});