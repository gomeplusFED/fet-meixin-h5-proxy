var _electron = require('electron');

var _common = require('../utils/common.js');

var _child_process = require('child_process');

var sudoPwd = '';
var resultCommand = '';

_electron.ipcMain.on('command-will-run', function (ev, command, pwd) {
	var preCommand = command;
	if (pwd) {
		sudoPwd = pwd;
	}
	if (/^sudo/.test(command)) {
		command = 'echo ' + sudoPwd + ' | ' + command.replace('sudo', 'sudo -S');
	}
	resultCommand = command;
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
		if (data && !sudoPwd && /^sudo/.test(preCommand)) {
			ev.sender.send('command-require-sudo', preCommand);
			sudoPwd = '';
			return;
		}
		ev.sender.send('command-runing', {
			data: data,
			pid: pid
		});
	});
	child.on('close', function (code) {
		ev.sender.send('command-close', pid);
	});
	child.on('error', function (err) {
		console.log('error: ' + err);
	});
});

_electron.ipcMain.on('command-force-close', function (ev, pid) {
	if (sudoPwd && process.platform === 'darwin' || /^echo/.test(resultCommand)) {
		(0, _common.execCmd)('echo ' + sudoPwd + ' | sudo -S kill -9 ' + pid, function () {
			(0, _common.execCmd)('echo ' + sudoPwd + ' | sudo -S kill -9 ' + (parseInt(pid) + 2), function () {
				(0, _common.execCmd)('echo ' + sudoPwd + ' | sudo -S kill -9 ' + (parseInt(pid) + 2 + 1));
			});
		});
	} else {
		try {
			process.kill(pid);
		} catch (e) {}
	}
});