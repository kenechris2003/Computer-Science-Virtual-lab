"use client";

import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Globe, RefreshCw, Smartphone, Monitor, Code, Settings } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function WebPlayground() {
  const [html, setHtml] = useState(
    `<div className="welcome-card">\n  <h1>Interactive Web Lab 🚀</h1>\n  <p>Modify HTML, CSS, and JS tabs to see changes live.</p>\n  <button id="action-btn">Click Me!</button>\n</div>`
  );
  const [css, setCss] = useState(
    `body {\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  margin: 0;\n}\n\n.welcome-card {\n  background: white;\n  padding: 30px;\n  border-radius: 16px;\n  box-shadow: 0 10px 20px rgba(0,0,0,0.1);\n  text-align: center;\n  max-width: 400px;\n}\n\nh1 {\n  color: #2563eb;\n  margin-top: 0;\n}\n\nbutton {\n  background-color: #2563eb;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  font-size: 14px;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n\nbutton:hover {\n  background-color: #1d4ed8;\n}`
  );
  const [js, setJs] = useState(
    `// JavaScript Interaction\nconst btn = document.getElementById("action-btn");\n\nbtn.addEventListener("click", () => {\n  alert("Hello from JavaScript! 🎉");\n});`
  );

  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  const [iframeSrcDoc, setIframeSrcDoc] = useState("");
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");

  const buildSrcDoc = () => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>
          // Catch script errors and print in console wrapper if needed
          window.onerror = function(msg, url, line) {
            console.error("Javascript Error: " + msg + " at line " + line);
            return false;
          };
          
          try {
            ${js}
          } catch(e) {
            console.error(e);
          }
        </script>
      </body>
      </html>
    `;
  };

  // Compile frame source document on input change with slight debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setIframeSrcDoc(buildSrcDoc());
    }, 500);

    return () => clearTimeout(handler);
  }, [html, css, js]);

  const handleRefresh = () => {
    setIframeSrcDoc(buildSrcDoc());
  };

  return (
    <div className="flex h-full flex-col lg:flex-row bg-white dark:bg-surface-900 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-surface-200 dark:divide-surface-800">
      {/* Left panel: Editor Panel */}
      <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-surface-900">
        {/* Navigation Tabs */}
        <div className="flex h-11 items-center justify-between border-b border-surface-200 bg-surface-50 px-4 dark:border-surface-850 dark:bg-surface-900/60 shrink-0">
          <div className="flex gap-2">
            {[
              { id: "html", name: "index.html", icon: "🌐" },
              { id: "css", name: "style.css", icon: "🎨" },
              { id: "js", name: "script.js", icon: "⚙️" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-white dark:bg-surface-800 shadow-sm border border-surface-200 dark:border-surface-700 text-primary-600 dark:text-primary-400"
                    : "text-surface-500 hover:text-surface-800 dark:hover:text-surface-200"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-surface-400 font-sans flex items-center gap-1">
            <Code className="h-3.5 w-3.5" /> Frontend workbench
          </span>
        </div>

        {/* Editor Body */}
        <div className="flex-1 min-h-0 relative bg-surface-950">
          {activeTab === "html" && (
            <Editor
              height="100%"
              language="html"
              theme="vs-dark"
              value={html}
              onChange={(val) => setHtml(val || "")}
              options={{
                fontSize: 13,
                minimap: { enabled: false },
                lineNumbers: "on",
                automaticLayout: true,
                tabSize: 2
              }}
            />
          )}

          {activeTab === "css" && (
            <Editor
              height="100%"
              language="css"
              theme="vs-dark"
              value={css}
              onChange={(val) => setCss(val || "")}
              options={{
                fontSize: 13,
                minimap: { enabled: false },
                lineNumbers: "on",
                automaticLayout: true,
                tabSize: 2
              }}
            />
          )}

          {activeTab === "js" && (
            <Editor
              height="100%"
              language="javascript"
              theme="vs-dark"
              value={js}
              onChange={(val) => setJs(val || "")}
              options={{
                fontSize: 13,
                minimap: { enabled: false },
                lineNumbers: "on",
                automaticLayout: true,
                tabSize: 2
              }}
            />
          )}
        </div>
      </div>

      {/* Right panel: Visual Preview Screen */}
      <div className="flex-1 flex flex-col min-h-0 bg-surface-50 dark:bg-surface-950">
        {/* Frame Top Header */}
        <div className="flex h-11 items-center justify-between border-b border-surface-200 bg-surface-100/50 px-4 dark:border-surface-850 dark:bg-surface-900/40 shrink-0">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-surface-600 dark:text-surface-300">Live Render Output</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-white dark:bg-surface-800 rounded-lg p-0.5 border border-surface-200 dark:border-surface-700">
              <button
                onClick={() => setPreviewMode("desktop")}
                title="Desktop View"
                className={`p-1 rounded ${
                  previewMode === "desktop"
                    ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                    : "text-surface-450 hover:text-surface-700"
                }`}
              >
                <Monitor className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setPreviewMode("mobile")}
                title="Mobile View"
                className={`p-1 rounded ${
                  previewMode === "mobile"
                    ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                    : "text-surface-450 hover:text-surface-700"
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="h-4 w-px bg-surface-200 dark:bg-surface-800" />

            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              title="Reload Frame"
              className="h-8 px-2.5 text-surface-500 hover:text-surface-850 hover:bg-white dark:hover:bg-surface-800"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Live Preview Embed */}
        <div className="flex-1 flex items-center justify-center p-4 min-h-0">
          <div
            className={`transition-all duration-300 bg-white border border-surface-200 shadow-lg dark:border-surface-850 dark:bg-white overflow-hidden ${
              previewMode === "mobile"
                ? "w-[360px] h-[580px] rounded-2xl max-h-full"
                : "w-full h-full rounded-lg"
            }`}
          >
            <iframe
              srcDoc={iframeSrcDoc}
              title="Live Visual Sandbox Preview"
              sandbox="allow-scripts"
              className="w-full h-full border-0 bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
