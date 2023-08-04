"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand("sdf.openBrowser", () => {
        const panel = vscode.window.createWebviewPanel("sdfPreview", "SliDesk: preview", vscode.ViewColumn.One, {
            enableScripts: true,
        });
        panel.webview.html = getWebviewContent();
    }));
}
exports.activate = activate;
function getWebviewContent() {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        html { width: 100%; height: 100%; min-height: 100%; display: flex; }
        body { flex: 1; display: flex; }
        iframe { flex: 1; border: none; }
      </style>
  </head>
  <body>
      <iframe src="http://localhost:1337" sandbox="allow-same-origin allow-scripts" />
  </body>
  </html>`;
}
//# sourceMappingURL=extension.js.map