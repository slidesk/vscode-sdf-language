const vscode = require("vscode");

function activate(context) {
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
      // check text changes
      vscode.workspace.onDidSaveTextDocument((document) => {
        const lines = document.getText().split("\n");
        const currentline =
          vscode.window.activeTextEditor.selection.active.line;
        let cpt = 0;
        let next = 0;
        let slideTitle = "";
        do {
          if (lines[cpt].startsWith("## ") && cpt <= currentline) {
            if (lines[cpt] !== "## ") {
              slideTitle = lines[cpt];
              next = 0;
            } else next = next + 1;
          }
          cpt++;
        } while (cpt < lines.length);
        const slug = slideTitle
          .replace("## ", "")
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "");
        panel.webview.html = getWebviewContent(`${slug}+${next}`);
      });
    })
  );
}

function getWebviewContent(hashtag) {
  const config = vscode.workspace.getConfiguration("sdf");
  const location = `http${config.get("https") ? "s" : ""}://${config.get(
    "host"
  )}:${config.get("port")}#${hashtag}`;
  return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            html { height: 100vh; min-height: 100vh; display: flex; }
            body { flex: 1; display: flex; }
            iframe { flex: 1; border: none; }
          </style>
      </head>
      <body>
          <iframe src="${location}" sandbox="allow-same-origin allow-scripts" />
      </body>
      </html>`;
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
