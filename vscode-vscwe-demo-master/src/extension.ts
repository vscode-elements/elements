// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

const getNonce = () => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const { extensionPath } = context;

	const fileUri = (fp: string) => {
		const fragments = fp.split('/');

		return vscode.Uri.file(
			path.join(extensionPath, ...fragments)
		);
	};

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-vscwe-demo" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscode-vscwe-demo.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		const columnToShowIn = vscode.window.activeTextEditor
        ? vscode.window.activeTextEditor.viewColumn
        : undefined;

		const currentPanel = vscode.window.createWebviewPanel(
			'vscweHello',
			'Hello World',
			<vscode.ViewColumn>columnToShowIn,
			{
				enableScripts: true,
			}
		);

		const assetUri = (fp: string) => {
			return currentPanel.webview.asWebviewUri(fileUri(fp));
		};

		const { cspSource } = currentPanel.webview;
		const nonce = getNonce();

		currentPanel.webview.html = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Document</title>
				<meta
					http-equiv="Content-Security-Policy"
					content="
						default-src 'none'; 
						img-src ${cspSource};
						script-src ${cspSource}
						nonce-${nonce}; 
						style-src 'unsafe-inline' ${cspSource};
						style-src-elem 'unsafe-inline' ${cspSource};
						font-src ${cspSource};
					"
				/>
				<link rel="stylesheet" href="${assetUri('node_modules/vscode-codicons/dist/codicon.css')}" nonce="${nonce}" id="vscode-codicon-stylesheet">
				<script src="${assetUri('node_modules/@bendera/vscode-webview-elements/dist/bundled.js')}" nonce="${nonce}" type="module"></script>
				<style>
					.demo {
						display: block;
						margin: 100px auto;
						width: 200px;
					}

					.canvas {
						background-color: #00c0eb;
						height: 200px;
						position: relative;
						width: 200px;
					}

					.cw {
						color: #fff;
						left: 25px;
						position: absolute;
						top: 20px;
					}

					.ccw {
						color: #fff;
						left: 74px;
						position: absolute;
						transform: scaleX(-1);
						top: 84px;
					}
				</style>
			</head>
			<body>
				<vscode-collapsible title="Gears" class="demo" open>
					<div slot="body" class="canvas">
						<vscode-icon name="gear" spin size="100" class="cw"></vscode-icon>
						<vscode-icon name="gear" spin size="100" class="ccw"></vscode-icon>
					</div>
				</vscode-collapsible>
			</body>
			</html>
		`;
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
