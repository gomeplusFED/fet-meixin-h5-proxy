Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.execCmd = exports.objType = exports.normalizePath = exports.copyObj = undefined;

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _child_process = require("child_process");

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