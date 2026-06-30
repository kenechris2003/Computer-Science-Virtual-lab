"use client";

import { useTerminalStore } from "@/stores/terminalStore";
import { useEffect, useRef, useState } from "react";
import { Terminal, CornerDownLeft, RefreshCw, Trash2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function LinuxTerminal() {
  const { history, currentDirectory, fileSystem, addCommand, setDirectory, clearHistory, reset } = useTerminalStore();
  const [inputValue, setInputValue] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Local filesystem representation to support file creation
  const [localFS, setLocalFS] = useState<Record<string, any>>(fileSystem);

  // Sync with store filesystem on reset
  useEffect(() => {
    setLocalFS(fileSystem);
  }, [fileSystem]);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Focus input on terminal area click
  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Helper to normalize path
  const resolvePath = (targetPath: string): { path: string; node: any; error?: string } => {
    if (!targetPath) {
      return { path: currentDirectory, node: getNodeAt(currentDirectory) };
    }

    let absolutePath = targetPath.startsWith("/")
      ? targetPath
      : currentDirectory === "/"
      ? `/${targetPath}`
      : `${currentDirectory}/${targetPath}`;

    // Resolve "." and ".."
    const parts = absolutePath.split("/").filter(Boolean);
    const resolvedParts: string[] = [];

    for (const part of parts) {
      if (part === ".") continue;
      if (part === "..") {
        resolvedParts.pop();
      } else {
        resolvedParts.push(part);
      }
    }

    const resolvedPathStr = "/" + resolvedParts.join("/");
    const node = getNodeAt(resolvedPathStr);

    if (!node) {
      return { path: resolvedPathStr, node: null, error: `No such file or directory` };
    }

    return { path: resolvedPathStr, node };
  };

  const getNodeAt = (path: string) => {
    if (path === "/") return localFS["/"];
    const parts = path.split("/").filter(Boolean);
    let current = localFS["/"];

    for (const part of parts) {
      if (current && current.type === "directory" && current.children) {
        current = current.children[part];
      } else {
        return null;
      }
    }
    return current;
  };

  // Command Executor
  const executeCommand = (fullCommand: string) => {
    const trimmed = fullCommand.trim();
    if (!trimmed) {
      addCommand("", "");
      return;
    }

    const args = trimmed.split(/\s+/);
    const cmdName = args[0];
    const cmdArgs = args.slice(1);
    let output = "";

    switch (cmdName) {
      case "help":
        output = `Available simulated commands:
  ls [dir]        List directory contents
  cd [dir]        Change directory
  pwd             Print working directory
  cat [file]      Show file contents
  mkdir [name]    Create directory
  touch [name]    Create empty file
  echo [text]     Print text (supports echo "text" > file to write)
  whoami          Print current user name
  hostname        Print system hostname
  clear           Clear screen history
  reset           Reset terminal file system
  help            Display this help info`;
        break;

      case "clear":
        clearHistory();
        return;

      case "reset":
        reset();
        setLocalFS(fileSystem);
        output = "Terminal state and filesystem have been reset to default.";
        break;

      case "pwd":
        output = currentDirectory;
        break;

      case "whoami":
        output = "student";
        break;

      case "hostname":
        output = "virtuallab-nigeria";
        break;

      case "ls": {
        const { node, error } = resolvePath(cmdArgs[0]);
        if (error || !node) {
          output = `ls: cannot access '${cmdArgs[0]}': ${error || "No such file or directory"}`;
        } else if (node.type === "file") {
          output = cmdArgs[0];
        } else if (node.type === "directory" && node.children) {
          const names = Object.keys(node.children);
          if (names.length === 0) {
            output = "";
          } else {
            // format directories differently
            output = names
              .map((n) => {
                const child = node.children[n];
                return child.type === "directory" ? `${n}/` : n;
              })
              .join("   ");
          }
        }
        break;
      }

      case "cd": {
        const target = cmdArgs[0] || "/home/student";
        const { path, node, error } = resolvePath(target);
        if (error || !node) {
          output = `bash: cd: ${target}: No such file or directory`;
        } else if (node.type !== "directory") {
          output = `bash: cd: ${target}: Not a directory`;
        } else {
          setDirectory(path);
          output = "";
        }
        break;
      }

      case "cat": {
        if (cmdArgs.length === 0) {
          output = "cat: missing file operand";
          break;
        }
        const fileTarget = cmdArgs[0];
        const { node, error } = resolvePath(fileTarget);
        if (error || !node) {
          output = `cat: ${fileTarget}: No such file or directory`;
        } else if (node.type === "directory") {
          output = `cat: ${fileTarget}: Is a directory`;
        } else {
          output = node.content || "";
        }
        break;
      }

      case "mkdir": {
        if (cmdArgs.length === 0) {
          output = "mkdir: missing operand";
          break;
        }
        const dirName = cmdArgs[0];
        const { path, node } = resolvePath(dirName);
        if (node) {
          output = `mkdir: cannot create directory '${dirName}': File exists`;
          break;
        }
        // Create directory
        const parentPath = resolveParentPath(dirName);
        const parentNode = getNodeAt(parentPath.path);
        if (!parentNode || parentNode.type !== "directory") {
          output = `mkdir: cannot create directory '${dirName}': Parent directory does not exist`;
        } else {
          parentNode.children[parentPath.name] = { type: "directory", children: {} };
          setLocalFS({ ...localFS });
          output = "";
        }
        break;
      }

      case "touch": {
        if (cmdArgs.length === 0) {
          output = "touch: missing file operand";
          break;
        }
        const fileName = cmdArgs[0];
        const { node } = resolvePath(fileName);
        if (node) {
          // just update write timestamp (noop in simulation)
          output = "";
          break;
        }
        const parentPath = resolveParentPath(fileName);
        const parentNode = getNodeAt(parentPath.path);
        if (!parentNode || parentNode.type !== "directory") {
          output = `touch: cannot touch '${fileName}': Parent directory does not exist`;
        } else {
          parentNode.children[parentPath.name] = { type: "file", content: "" };
          setLocalFS({ ...localFS });
          output = "";
        }
        break;
      }

      case "echo": {
        const textParam = cmdArgs.join(" ");
        // Check for redirection: echo "content" > filename
        const redirectIndex = textParam.indexOf(">");
        if (redirectIndex !== -1) {
          const rawContent = textParam.slice(0, redirectIndex).trim();
          const targetFile = textParam.slice(redirectIndex + 1).trim();

          // remove wrapping quotes
          const cleanContent = rawContent.replace(/^['"]|['"]$/g, "");

          const parentPath = resolveParentPath(targetFile);
          const parentNode = getNodeAt(parentPath.path);

          if (!parentNode || parentNode.type !== "directory") {
            output = `bash: ${targetFile}: Parent directory does not exist`;
          } else {
            parentNode.children[parentPath.name] = {
              type: "file",
              content: cleanContent + "\n"
            };
            setLocalFS({ ...localFS });
            output = "";
          }
        } else {
          output = textParam.replace(/^['"]|['"]$/g, "");
        }
        break;
      }

      default:
        output = `bash: ${cmdName}: command not found. Type 'help' to see list of valid commands.`;
    }

    addCommand(trimmed, output);
  };

  // Helper to split "dir/subdir/file" into parent path "/dir/subdir" and target "file"
  const resolveParentPath = (fullPath: string): { path: string; name: string } => {
    let absolutePath = fullPath.startsWith("/")
      ? fullPath
      : currentDirectory === "/"
      ? `/${fullPath}`
      : `${currentDirectory}/${fullPath}`;

    const parts = absolutePath.split("/").filter(Boolean);
    const name = parts.pop() || "";
    const parentPath = "/" + parts.join("/");
    return { path: parentPath, name };
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputValue);
      setInputValue("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      // Traverse history
      const filterHistory = history.filter((h) => h.command);
      if (filterHistory.length > 0) {
        const nextIndex = historyIndex === -1 ? filterHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputValue(filterHistory[nextIndex].command);
      }
    } else if (e.key === "ArrowDown") {
      const filterHistory = history.filter((h) => h.command);
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= filterHistory.length) {
          setHistoryIndex(-1);
          setInputValue("");
        } else {
          setHistoryIndex(nextIndex);
          setInputValue(filterHistory[nextIndex].command);
        }
      }
    }
  };

  const getRelativePathForPrompt = () => {
    if (currentDirectory === "/home/student") return "~";
    if (currentDirectory.startsWith("/home/student/")) {
      return "~" + currentDirectory.slice(13);
    }
    return currentDirectory;
  };

  return (
    <div className="flex flex-col h-full rounded-xl border border-surface-200 bg-surface-950 text-emerald-400 font-mono shadow-xl overflow-hidden dark:border-surface-800">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-surface-800 bg-surface-900 px-4 py-2 select-none">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80 block" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80 block" />
            <span className="h-3 w-3 rounded-full bg-green-500/80 block" />
          </div>
          <span className="text-xs font-semibold text-surface-400 font-sans flex items-center gap-1.5 ml-2">
            <Terminal className="h-3.5 w-3.5 text-surface-400" /> bash — Linux OS Lab Terminal
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={clearHistory}
            title="Clear Terminal Screen"
            className="rounded p-1 text-surface-400 hover:bg-surface-800 hover:text-white transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => executeCommand("help")}
            title="Help"
            className="rounded p-1 text-surface-400 hover:bg-surface-800 hover:text-white transition-colors"
          >
            <HelpCircle className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => executeCommand("reset")}
            title="Reset Filesystem"
            className="rounded p-1 text-surface-400 hover:bg-surface-800 hover:text-white transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div
        onClick={focusInput}
        className="flex-1 overflow-y-auto p-4 space-y-2.5 cursor-text scrollbar-thin selection:bg-emerald-500/30 selection:text-white"
      >
        {/* Welcome Message */}
        <div className="text-surface-450 text-xs select-none">
          <p className="font-semibold text-surface-200">Virtual Lab OS Environment [Version 1.0.0]</p>
          <p>(c) 2026 Virtual Lab. All rights simulated. Powered by sandbox CLI.</p>
          <p className="mt-1">Type &apos;help&apos; to view commands. Click anywhere inside this prompt to focus.</p>
        </div>

        {/* Command logs */}
        {history.map((cmd, i) => (
          <div key={i} className="text-sm">
            {cmd.command !== undefined && (
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">student@virtuallab-nigeria</span>
                <span className="text-surface-300">:</span>
                <span className="text-blue-400">{getRelativePathForPrompt()}</span>
                <span className="text-surface-300">$</span>
                <span className="text-white font-medium">{cmd.command}</span>
              </div>
            )}
            {cmd.output && (
              <pre className="mt-1 whitespace-pre-wrap leading-relaxed text-surface-300 font-mono text-xs">
                {cmd.output}
              </pre>
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />

        {/* Input prompt */}
        <div className="flex items-center gap-2 text-sm pt-1">
          <span className="text-emerald-500 select-none">student@virtuallab-nigeria</span>
          <span className="text-surface-300 select-none">:</span>
          <span className="text-blue-400 select-none">{getRelativePathForPrompt()}</span>
          <span className="text-surface-300 select-none">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-0 outline-none text-white focus:ring-0 focus:outline-none p-0 m-0 font-mono text-sm leading-none"
            autoFocus
            aria-label="Terminal prompt input"
          />
        </div>
      </div>
    </div>
  );
}
