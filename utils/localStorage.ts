const STORAGE_PREFIX = "virtuallab_";

export function getStorageKey(key: string): string {
  return `${STORAGE_PREFIX}${key}`;
}

export function setLocalStorage<T>(key: string, value: T): void {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(getStorageKey(key), serialized);
  } catch (e) {
    console.error("Error saving to localStorage:", e);
  }
}

export function getLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(getStorageKey(key));
    if (item) {
      return JSON.parse(item) as T;
    }
  } catch (e) {
    console.error("Error reading from localStorage:", e);
  }
  return defaultValue;
}

export function removeLocalStorage(key: string): void {
  localStorage.removeItem(getStorageKey(key));
}

export function clearLocalStorage(): void {
  const keys = Object.keys(localStorage);
  keys.forEach((key) => {
    if (key.startsWith(STORAGE_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
}

export function getEditorState(labType: string, exerciseId?: string) {
  const key = exerciseId ? `editor_${labType}_${exerciseId}` : `editor_${labType}`;
  return getLocalStorage(key, {
    code: "",
    language: "python",
    output: "",
    isRunning: false,
    lastSaved: null,
    executionTime: null,
  });
}

export function saveEditorState(labType: string, state: any, exerciseId?: string) {
  const key = exerciseId ? `editor_${labType}_${exerciseId}` : `editor_${labType}`;
  setLocalStorage(key, { ...state, lastSaved: new Date().toISOString() });
}

export function getRecentFiles(): any[] {
  return getLocalStorage("recent_files", []);
}

export function addRecentFile(file: any): void {
  const recent = getRecentFiles();
  const filtered = recent.filter((f) => f.id !== file.id);
  filtered.unshift(file);
  if (filtered.length > 10) filtered.pop();
  setLocalStorage("recent_files", filtered);
}

export function getUserPreferences(): Record<string, any> {
  return getLocalStorage("user_preferences", {
    theme: "light",
    fontSize: 14,
    tabSize: 4,
    wordWrap: "on",
    minimap: false,
    lineNumbers: true,
    autoSave: true,
    autoSaveInterval: 3000,
  });
}

export function setUserPreferences(prefs: Record<string, any>): void {
  setLocalStorage("user_preferences", prefs);
}