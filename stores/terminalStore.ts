"use client";

import { create } from "zustand";
import type { TerminalCommand } from "@/types";

interface TerminalStore {
  history: TerminalCommand[];
  currentDirectory: string;
  fileSystem: Record<string, any>;
  addCommand: (command: string, output: string) => void;
  setDirectory: (dir: string) => void;
  clearHistory: () => void;
  reset: () => void;
}

const initialFileSystem = {
  "/": {
    type: "directory",
    children: {
      home: {
        type: "directory",
        children: {
          student: {
            type: "directory",
            children: {
              documents: { type: "directory", children: {} },
              downloads: { type: "directory", children: {} },
              projects: { type: "directory", children: {} },
              "notes.txt": { type: "file", content: "Welcome to Virtual Lab Terminal!\n\nThis is a simulated Linux environment.\nTry commands like: ls, pwd, cd, mkdir, touch, cat, echo, rm, cp, mv" },
            },
          },
        },
      },
      etc: {
        type: "directory",
        children: {
          "passwd": { type: "file", content: "student:x:1000:1000:Student:/home/student:/bin/bash" },
          "hostname": { type: "file", content: "virtuallab-nigeria" },
        },
      },
      var: {
        type: "directory",
        children: {
          log: { type: "directory", children: {} },
          tmp: { type: "directory", children: {} },
        },
      },
      bin: {
        type: "directory",
        children: {
          bash: { type: "file", content: "binary" },
          ls: { type: "file", content: "binary" },
          cat: { type: "file", content: "binary" },
        },
      },
    },
  },
};

export const useTerminalStore = create<TerminalStore>((set) => ({
  history: [],
  currentDirectory: "/home/student",
  fileSystem: initialFileSystem,
  addCommand: (command, output) =>
    set((state) => ({
      history: [
        ...state.history,
        { command, output, timestamp: Date.now() },
      ],
    })),
  setDirectory: (currentDirectory) => set({ currentDirectory }),
  clearHistory: () => set({ history: [] }),
  reset: () =>
    set({
      history: [],
      currentDirectory: "/home/student",
      fileSystem: initialFileSystem,
    }),
}));