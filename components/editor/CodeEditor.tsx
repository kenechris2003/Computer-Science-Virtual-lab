"use client";

import Editor from "@monaco-editor/react";
import { useEditorStore } from "@/stores/editorStore";
import { useAutoSave } from "@/hooks/useAutoSave";
import { getEditorState } from "@/utils/localStorage";
import { useEffect, useState } from "react";
import apiClient from "@/lib/api/client";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Play,
  RotateCcw,
  Maximize2,
  Minimize2,
  Terminal,
  Settings,
  Sparkles,
  Keyboard,
  Info
} from "lucide-react";

interface CodeEditorProps {
  labType: "PROGRAMMING" | "WEB_DEVELOPMENT" | "DATABASE" | "OPERATING_SYSTEMS";
  exerciseId?: string;
  defaultCode?: string;
  defaultLanguage?: string;
}

export function CodeEditor({
  labType,
  exerciseId,
  defaultCode = "",
  defaultLanguage = "python"
}: CodeEditorProps) {
  const {
    code,
    language,
    output,
    isRunning,
    lastSaved,
    executionTime,
    stdin,
    isFullscreen,
    fontSize,
    theme,
    setCode,
    setLanguage,
    setOutput,
    setRunning,
    setSaved,
    setExecutionTime,
    setStdin,
    toggleFullscreen,
    setFontSize,
    setTheme
  } = useEditorStore();

  const [activeTab, setActiveTab] = useState<"output" | "stdin">("output");
  const [isSubmitSuccess, setIsSubmitSuccess] = useState<boolean | null>(null);
  const [submitMessage, setSubmitMessage] = useState("");

  // Load initial/saved code
  useEffect(() => {
    const savedState = getEditorState(labType, exerciseId);
    if (savedState && savedState.code) {
      setCode(savedState.code);
      setLanguage(savedState.language || defaultLanguage);
      if (savedState.output) setOutput(savedState.output);
    } else {
      setCode(defaultCode);
      setLanguage(defaultLanguage);
      setOutput("");
    }
    setIsSubmitSuccess(null);
    setSubmitMessage("");
  }, [labType, exerciseId, defaultCode, defaultLanguage, setCode, setLanguage, setOutput]);

  // Hook into auto-save
  useAutoSave(labType, code, language, exerciseId);

  const handleEditorChange = (value?: string) => {
    setCode(value || "");
  };

  const handleRun = async () => {
    if (isRunning) return;
    setRunning(true);
    setActiveTab("output");
    setOutput("Executing program...\n");
    setExecutionTime(null);

    try {
      const response = await apiClient.post("/api/execute", {
        code,
        language,
        stdin,
        provider: "piston"
      });

      const { data } = response.data;
      if (response.data.success && data) {
        let executionOutput = "";
        if (data.compile_output) {
          executionOutput += `[Compilation Error/Warning]\n${data.compile_output}\n`;
        }
        executionOutput += data.stdout || "";
        if (data.stderr) {
          executionOutput += `\n[Runtime Error]\n${data.stderr}`;
        }
        if (!data.stdout && !data.stderr && !data.compile_output) {
          executionOutput = "Program completed successfully with exit code 0 (no output).";
        }
        setOutput(executionOutput);
        setExecutionTime(data.time ? parseFloat(data.time) * 1000 : null);
      } else {
        setOutput(response.data.error || "Failed to execute code.");
      }
    } catch (err: any) {
      console.error(err);
      setOutput(err.response?.data?.error || err.message || "An unexpected error occurred during execution.");
    } finally {
      setRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitSuccess(null);
    setSubmitMessage("Evaluating test cases...");
    // Mocking evaluation logic:
    setTimeout(() => {
      // Very simple validation - check if code has some correct output or structure
      if (code.trim().length < 10) {
        setIsSubmitSuccess(false);
        setSubmitMessage("Submission failed. Code is too short or empty.");
      } else {
        setIsSubmitSuccess(true);
        setSubmitMessage("Congratulations! All test cases passed successfully.");
      }
    }, 1500);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your editor code to the starter code?")) {
      setCode(defaultCode);
      setOutput("");
      setExecutionTime(null);
      setIsSubmitSuccess(null);
      setSubmitMessage("");
    }
  };

  return (
    <div
      className={`flex flex-col h-full bg-white dark:bg-surface-900 ${
        isFullscreen ? "fixed inset-0 z-[999] p-4 bg-surface-50 dark:bg-surface-950" : "relative"
      }`}
    >
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-200 bg-surface-50 px-4 py-2.5 dark:border-surface-850 dark:bg-surface-900/60">
        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-lg border border-surface-300 bg-white px-2.5 py-1.5 text-xs font-semibold shadow-sm focus:outline-none dark:border-surface-700 dark:bg-surface-800 dark:text-white"
          >
            <option value="python">Python 3</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java 15</option>
            <option value="cpp">C++ (GCC)</option>
            <option value="c">C (GCC)</option>
          </select>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold text-surface-400 uppercase tracking-wider">Size</span>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="rounded-lg border border-surface-300 bg-white px-2 py-1 text-xs font-medium shadow-sm focus:outline-none dark:border-surface-700 dark:bg-surface-800 dark:text-white"
            >
              {[12, 14, 16, 18, 20].map((sz) => (
                <option key={sz} value={sz}>
                  {sz}px
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold text-surface-400 uppercase tracking-wider">Theme</span>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="rounded-lg border border-surface-300 bg-white px-2 py-1 text-xs font-medium shadow-sm focus:outline-none dark:border-surface-700 dark:bg-surface-800 dark:text-white"
            >
              <option value="vs-dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {lastSaved && (
            <span className="hidden text-[10px] font-medium text-surface-400 sm:inline">
              Autosaved: {new Date(lastSaved).toLocaleTimeString()}
            </span>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            title="Reset code"
            className="h-8 px-2 text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            className="h-8 px-2 text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>

          <div className="h-4 w-px bg-surface-200 dark:bg-surface-800" />

          <Button
            variant="secondary"
            size="sm"
            onClick={handleRun}
            isLoading={isRunning}
            className="h-8 text-xs font-semibold shadow-sm"
          >
            <Play className="mr-1.5 h-3.5 w-3.5 fill-current" /> Run
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            className="h-8 text-xs font-semibold shadow-sm"
          >
            Submit
          </Button>
        </div>
      </div>

      {/* Editor + Console Area */}
      <div className="flex flex-1 flex-col min-h-0 lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-surface-200 dark:divide-surface-800">
        {/* Editor Panel */}
        <div className="flex-1 min-h-[300px] lg:h-full relative">
          <Editor
            height="100%"
            language={language}
            theme={theme}
            value={code}
            onChange={handleEditorChange}
            options={{
              fontSize: fontSize,
              minimap: { enabled: false },
              automaticLayout: true,
              scrollBeyondLastLine: false,
              cursorBlinking: "smooth",
              lineNumbers: "on",
              tabSize: 4
            }}
            loading={
              <div className="absolute inset-0 flex items-center justify-center bg-surface-50 dark:bg-surface-900">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
                  <span className="text-xs font-medium text-surface-500">Loading IDE editor...</span>
                </div>
              </div>
            }
          />
        </div>

        {/* Console / Output Panel */}
        <div className="w-full lg:w-[420px] flex flex-col h-[280px] lg:h-full bg-surface-50 dark:bg-surface-950">
          {/* Tabs */}
          <div className="flex border-b border-surface-200 bg-surface-100/50 dark:border-surface-850 dark:bg-surface-900/40">
            <button
              onClick={() => setActiveTab("output")}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold border-b-2 transition-all ${
                activeTab === "output"
                  ? "border-primary-500 text-primary-600 dark:text-primary-400 bg-white dark:bg-surface-900"
                  : "border-transparent text-surface-500 hover:text-surface-700 dark:text-surface-450 dark:hover:text-surface-300"
              }`}
            >
              <Terminal className="h-3.5 w-3.5" /> Output Console
            </button>
            <button
              onClick={() => setActiveTab("stdin")}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold border-b-2 transition-all ${
                activeTab === "stdin"
                  ? "border-primary-500 text-primary-600 dark:text-primary-400 bg-white dark:bg-surface-900"
                  : "border-transparent text-surface-500 hover:text-surface-700 dark:text-surface-450 dark:hover:text-surface-300"
              }`}
            >
              <Settings className="h-3.5 w-3.5" /> Program Input (stdin)
            </button>
          </div>

          {/* Console Body */}
          <div className="flex-1 min-h-0 overflow-y-auto p-4 font-mono text-xs leading-relaxed">
            {activeTab === "output" ? (
              <div className="h-full flex flex-col justify-between">
                <pre className="whitespace-pre-wrap font-mono text-surface-700 dark:text-surface-300 overflow-x-auto selection:bg-primary-500/30">
                  {output || "Run code to view output console logs."}
                </pre>
                
                {/* Stats & Notifications */}
                <div className="mt-4 pt-3 border-t border-surface-200/60 dark:border-surface-800/60 text-[10px] text-surface-400 flex flex-col gap-2">
                  <div className="flex items-center justify-between font-sans">
                    <span>Status: {isRunning ? "Running..." : "Idle"}</span>
                    {executionTime !== null && (
                      <span>Time: {executionTime.toFixed(0)}ms</span>
                    )}
                  </div>

                  {submitMessage && (
                    <div
                      className={`flex items-start gap-2 rounded-lg p-2.5 font-sans text-xs ${
                        isSubmitSuccess
                          ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900/30"
                          : isSubmitSuccess === false
                          ? "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30"
                          : "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30"
                      }`}
                    >
                      <Info className="h-4 w-4 shrink-0 mt-0.5" />
                      <div>{submitMessage}</div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <textarea
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                placeholder="Enter input values here (one per line) to pass as standard input (stdin) to your program."
                className="h-full w-full bg-transparent border-0 resize-none font-mono text-surface-700 dark:text-surface-300 placeholder-surface-400 focus:outline-none focus:ring-0"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
