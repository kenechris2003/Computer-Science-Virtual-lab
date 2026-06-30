"use client";

import { useEffect, useRef, useCallback } from "react";
import { saveEditorState } from "@/utils/localStorage";

export function useAutoSave(
  labType: string,
  code: string,
  language: string,
  exerciseId?: string,
  interval: number = 3000
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedRef = useRef<string>(code);

  const save = useCallback(() => {
    if (code !== lastSavedRef.current) {
      saveEditorState(labType, { code, language }, exerciseId);
      lastSavedRef.current = code;
    }
  }, [code, language, labType, exerciseId]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(save, interval);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [code, save, interval]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      save();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [save]);

  return { save };
}