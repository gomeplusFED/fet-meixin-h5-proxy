Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (app) {
	return [{
		label: 'Application',
		submenu: [{ label: 'About Application', selector: 'orderFrontStandardAboutPanel:' }, { type: 'separator' }, { label: 'Quit', accelerator: 'Command+Q', click: function click() {
				app.quit();
			} }]
	}, {
		label: 'Edit',
		submenu: [{ label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' }, { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' }, { type: 'separator' }, { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' }, { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' }, { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' }, { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }]
	}, {
		label: 'Window',
		role: 'window',
		submenu: [{
			label: 'Minimize',
			accelerator: 'CmdOrCtrl+M',
			role: 'minimize'
		}, {
			label: 'Close',
			accelerator: 'CmdOrCtrl+W',
			role: 'close'
		}]
	}];
};