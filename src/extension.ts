import * as vscode from 'vscode';
import { transform } from './transcoder/generate-react';

const vueReg = /\.(vue)$/;
// const reactReg = /\.(ts|js|tsx|jsx)$/;

export function activate(context: vscode.ExtensionContext) {
	
	let disposable = vscode.commands.registerCommand('transcoder.toReact', async () => {
		const activeEditor = vscode.window.activeTextEditor;
		if (activeEditor) {
			const { fileName, getText } = activeEditor.document || {};
			const contentText = getText ? getText() : '';
			if (vueReg.test(fileName)) {
				transform(contentText)
			} else {
				vscode.window.showWarningMessage('当前文件不属于vue文件')
			}
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
