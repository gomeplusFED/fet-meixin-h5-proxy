Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.kill = exports.execCmd = exports.objType = exports.normalizePath = exports.copyObj = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _child_process = require('child_process');

var _psTree = require('ps-tree');

var _psTree2 = _interopRequireDefault(_psTree);

var _sudoPrompt = require('sudo-prompt');

var _sudoPrompt2 = _interopRequireDefault(_sudoPrompt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var copyObj = exports.copyObj = function copyObj(source) {
	return JSON.parse((0, _stringify2.default)(source));
};

var normalizePath = exports.normalizePath = function normalizePath(path) {
	if (/\s/.test(path)) {
		path = "'" + path + "'";
	}
	return path.replace(/\\/g, '/');
};

var objType = exports.objType = function objType(obj) {
	return Object.prototype.toString.call(obj).match(/\[object (.*)\]/)[1];
};

var execCmd = exports.execCmd = function execCmd(command, cb) {
	return (0, _child_process.exec)(command, {
		env: {
			PATH: process.env.PATH
		}
	}, function (err, stout, sterr) {
		if (objType(cb) === 'Function') {
			cb(err, stout, sterr);
		}
	});
};

var kill = exports.kill = function kill(pid) {
	var signal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'SIGKILL';
	var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

	if (process.platform !== 'win32') {
		(0, _psTree2.default)(pid, function (err, children) {
			[pid].concat(children.map(function (p) {
				return p.PID;
			})).forEach(function (tpid) {
				_sudoPrompt2.default.exec('kill -9 ' + tpid, {
					name: 'kill process'
				}, function (err, stdout, stderr) {
					if (err) {
						console.log(err);
					}
				});
			});
			callback();
		});
	} else {
		try {
			process.kill(pid, signal);
		} catch (ex) {}
		callback();
	}
};