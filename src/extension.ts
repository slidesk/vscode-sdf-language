import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("sdf.openBrowser", () => {
      const panel = vscode.window.createWebviewPanel(
        "sdfPreview",
        "SliDesk: preview",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
        }
      );
      panel.webview.html = getWebviewContent();
    })
  );
}

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
      <iframe src="http://localhost:${vscode.workspace
        .getConfiguration("sdf")
        .get("port")}" sandbox="allow-same-origin allow-scripts" />
  </body>
  </html>`;
}
