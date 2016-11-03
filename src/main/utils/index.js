Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.mixin = undefined;

var _common = require('./common.js');

var common = _interopRequireWildcard(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var mixin = exports.mixin = function mixin(source, target) {
	for (var i in target) {
		if (target.hasOwnProperty(i)) {
			source[i] = target[i];
		}
	}
	return source;
};

var utils = {};

utils.mixin = mixin;

mixin(utils, common);

exports.default = utils;