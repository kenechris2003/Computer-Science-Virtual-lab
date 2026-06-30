"use client";

import { create } from "zustand";
import type { EditorState } from "@/types";

interface EditorStore {
  code: string;
  language: string;
  output: string;
  isRunning: boolean;
  lastSaved: string | null;
  executionTime: number | null;
  stdin: string;
  isFullscreen: boolean;
  fontSize: number;
  theme: string;
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  setOutput: (output: string) => void;
  setRunning: (isRunning: boolean) => void;
  setSaved: (lastSaved: string | null) => void;
  setExecutionTime: (time: number | null) => void;
  setStdin: (stdin: string) => void;
  toggleFullscreen: () => void;
  setFontSize: (size: number) => void;
  setTheme: (theme: string) => void;
  reset: () => void;
}

const defaultState = {
  code: "",
  language: "python",
  output: "",
  isRunning: false,
  lastSaved: null,
  executionTime: null,
  stdin: "",
  isFullscreen: false,
  fontSize: 14,
  theme: "vs-dark",
};

export const useEditorStore = create<EditorStore>((set) => ({
  ...defaultState,
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  setOutput: (output) => set({ output }),
  setRunning: (isRunning) => set({ isRunning }),
  setSaved: (lastSaved) => set({ lastSaved }),
  setExecutionTime: (executionTime) => set({ executionTime }),
  setStdin: (stdin) => set({ stdin }),
  toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),
  setFontSize: (fontSize) => set({ fontSize }),
  setTheme: (theme) => set({ theme }),
  reset: () => set(defaultState),
}));