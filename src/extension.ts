'use strict'
import { commands, ExtensionContext, window } from 'vscode'
import * as html2pug from 'html2pug'
const pug = require('pug')

export function activate(context: ExtensionContext) {

	const html2pugDisposable = commands.registerCommand('extension.html2pug', () => {

		const editor = window.activeTextEditor
		if (!editor) {
			return
		}

		const selection = editor.selection;
		const text = editor.document.getText(selection);

		if (text.length <= 0) {
			window.showErrorMessage('Please select HTML which you need to covert to PUG!')
		}

		html2pug(text)
			.then(pug => {
				// window.showInformationMessage(pug)
				editor.edit((editBuilder) => {
					const document = editor.document
					editBuilder.replace(selection, pug)
				})
			})
			.catch(err => {
				window.showErrorMessage('Error when convert. Please ensure selected HTML validate!')
			})
	})

	const pug2htmlDisposable = commands.registerCommand('extension.pug2html', () => {
		window.showInformationMessage('PUG2HTML')
	})


	context.subscriptions.push(pug2htmlDisposable, html2pugDisposable)
}

export function deactivate() {
}