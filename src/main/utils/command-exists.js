Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.commandExists = undefined;

var _common = require('./common.js');

var isUsingWindows = process.platform === 'win32';

var commandExistsUnix = function commandExistsUnix(commandName, callback) {
	var child = (0, _common.execCmd)('command -v ' + commandName + ' 2>/dev/null' + ' && { echo >&1 \'' + commandName + ' found\'; exit 0; }', function (error, stdout, stderr) {
		callback(null, !!stdout);
	});
};

var commandExistsWindows = function commandExistsWindows(commandName, callback) {
	var child = (0, _common.execCmd)('where ' + commandName, function (error) {
		if (error !== null) {
			callback(null, false);
		} else {
			callback(null, true);
		}
	});
};

var commandExists = exports.commandExists = function commandExists(commandName, callback) {
	if (isUsingWindows) {
		commandExistsWindows(commandName, callback);
	} else {
		commandExistsUnix(commandName, callback);
	}
};