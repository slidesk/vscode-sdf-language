"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand("sdf.openBrowser", () => {
        const panel = vscode.window.createWebviewPanel("sdfPreview", "SliDesk: preview", vscode.ViewColumn.One, {});
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
        html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }
      </style>
  </head>
  <body>
      <iframe width="100%" height="100%" src="http://localhost:1337" frameborder="0" sandbox="allow-same-origin allow-scripts" />
  </body>
  </html>`;
}
//# sourceMappingURL=extension.js.map