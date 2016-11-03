var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _electron = require('electron');

var _commandExists = require('../utils/command-exists.js');

var _common = require('../utils/common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var platform = process.platform;
var resourcePath = _path2.default.join(__dirname, '../../resource');
var sudoPwd = '';

var dialogInfoObj = {
	type: 'info',
	buttons: [],
	title: '提示',
	message: '提示信息'
};

function apply(success, fail) {
	var cmd = '';
	var curr = (0, _common.normalizePath)(resourcePath);
	if (platform !== 'win32') {
		cmd = 'cd ' + curr + ' && echo ' + sudoPwd + ' | sudo -S npm link';
	} else {
		cmd = 'cd ' + curr + ' && npm link';
	}
	(0, _common.execCmd)(cmd, function (err, stdout, stderr) {
		if (err) {
			fail();
			return;
		}
		success();
	});
}

function tryToApply(ev) {
	apply(function () {
		ev.sender.send('app-init-has-check', {
			error: 0
		});
	}, function () {
		ev.sender.send('app-init-has-check', {
			error: 1,
			type: 'nopwd'
		});
	});
}

function checkCommand(metaJSON) {
	return new _promise2.default(function (resolve, reject) {
		var cur = 0;
		for (var i = 0; i < metaJSON.bin.length; i++) {
			(function (j) {
				(0, _commandExists.commandExists)(metaJSON.bin[j], function (err, exist) {
					if (!exist) {
						resolve();
						return;
					} else {
						cur++;
						if (cur === metaJSON.bin.length) {
							reject();
						}
					}
				});
			})(i);
		}
	});
}

_electron.ipcMain.on('app-init-will-check', function (ev, metaJSON) {
	(0, _commandExists.commandExists)('npm', function (err, exist) {
		if (!exist) {
			ev.sender.send('app-init-has-check', {
				error: 1,
				type: 'nonpm',
				msg: 'You should install npm.'
			});
			return;
		}
		var result = {};
		var cur = false;

		checkCommand(metaJSON).then(function () {
			tryToApply(ev);
		}).catch(function () {
			ev.sender.send('app-init-has-check', {
				error: 0
			});
		});
	});
});

_electron.ipcMain.on('app-init-input-pwd', function (ev, pwd) {
	sudoPwd = pwd;
});