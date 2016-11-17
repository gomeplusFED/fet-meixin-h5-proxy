var _fixPath = require('fix-path');

var _fixPath2 = _interopRequireDefault(_fixPath);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _electron = require('electron');

require('./ipc/index.js');

var _env = require('./env.js');

var _env2 = _interopRequireDefault(_env);

var _menu = require('./menu.js');

var _menu2 = _interopRequireDefault(_menu);

var _package = require('../resource/package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _fixPath2.default)();

var mainWindow = null;
var appIcon = null;
var forceQuit = false;
var indexPath = 'file://' + _path2.default.join(__dirname, '../index.html');

var browserOptions = {
	width: 717,
	height: 717,
	center: true,
	resizable: false,
	maximizable: false,
	fullscreen: false,
	fullscreenable: false,
	show: false
};

function createWindow() {
	mainWindow = new _electron.BrowserWindow(browserOptions);

	mainWindow.webContents.on('did-finish-load', function () {
		mainWindow.show();
	});

	mainWindow.loadURL(indexPath);

	if (_env2.default === 'dev') {
		mainWindow.webContents.openDevTools();
	} else {
		_electron.Menu.setApplicationMenu(_electron.Menu.buildFromTemplate((0, _menu2.default)(_electron.app)));
	}

	mainWindow.on('close', function (e) {
		if (!forceQuit && process.platform === 'darwin') {
			e.preventDefault();
			mainWindow.hide();
			return;
		}
		mainWindow = null;
		_electron.app.quit();
	});
}

_electron.app.on('ready', createWindow);

_electron.app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		_electron.app.quit();
	};
});

_electron.app.on('activate', function () {
	mainWindow.show();
});

_electron.app.on('before-quit', function () {
	forceQuit = true;
});