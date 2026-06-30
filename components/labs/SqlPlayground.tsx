"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Play, RotateCcw, Database, Table, Columns, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Mock Database Tables
const MOCK_DB: Record<string, { columns: string[]; rows: Record<string, any>[] }> = {
  users: {
    columns: ["id", "email", "first_name", "last_name", "role", "level", "created_at"],
    rows: [
      { id: 1, email: "chinedu.o@university.edu", first_name: "Chinedu", last_name: "Okonkwo", role: "STUDENT", level: 300, created_at: "2026-06-01" },
      { id: 2, email: "amina.i@university.edu", first_name: "Amina", last_name: "Ibrahim", role: "STUDENT", level: 300, created_at: "2026-06-02" },
      { id: 3, email: "emmanuel.a@university.edu", first_name: "Emmanuel", last_name: "Adeyemi", role: "STUDENT", level: 200, created_at: "2026-06-03" },
      { id: 4, email: "fatima.b@university.edu", first_name: "Fatima", last_name: "Bello", role: "STUDENT", level: 400, created_at: "2026-05-15" },
      { id: 5, email: "john.doe@university.edu", first_name: "John", last_name: "Doe", role: "LECTURER", level: null, created_at: "2025-09-01" }
    ]
  },
  courses: {
    columns: ["id", "code", "title", "credit_units", "level", "semester"],
    rows: [
      { id: 1, code: "CSC301", title: "Structured Programming", credit_units: 3, level: 300, semester: 1 },
      { id: 2, code: "CSC302", title: "Database Systems", credit_units: 4, level: 300, semester: 2 },
      { id: 3, code: "CSC303", title: "Operating Systems", credit_units: 3, level: 300, semester: 1 },
      { id: 4, code: "CSC201", title: "Introduction to Computer Science", credit_units: 2, level: 200, semester: 1 },
      { id: 5, code: "CSC401", title: "Compiler Construction", credit_units: 4, level: 400, semester: 1 }
    ]
  },
  submissions: {
    columns: ["id", "user_id", "exercise_id", "status", "score", "execution_time"],
    rows: [
      { id: 101, user_id: 1, exercise_id: "hello-world", status: "COMPLETED", score: 100, execution_time: 15 },
      { id: 102, user_id: 2, exercise_id: "hello-world", status: "COMPLETED", score: 100, execution_time: 12 },
      { id: 103, user_id: 3, exercise_id: "even-odd", status: "FAILED", score: 40, execution_time: 25 },
      { id: 104, user_id: 4, exercise_id: "factorial", status: "COMPLETED", score: 95, execution_time: 30 },
      { id: 105, user_id: 1, exercise_id: "prime-check", status: "PENDING", score: null, execution_time: null }
    ]
  }
};

export function SqlPlayground() {
  const [query, setQuery] = useState("SELECT * FROM users WHERE level = 300;");
  const [resultColumns, setResultColumns] = useState<string[]>([]);
  const [resultRows, setResultRows] = useState<Record<string, any>[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [execTimeMs, setExecTimeMs] = useState<number | null>(null);

  const handleRun = () => {
    setErrorMsg("");
    setResultColumns([]);
    setResultRows([]);
    setExecTimeMs(null);

    const start = performance.now();

    // Normalizing query string
    const normalized = query.trim().replace(/;+$/, "").replace(/\s+/g, " ");

    // Simple select regex: SELECT (.*) FROM (\w+)(?: WHERE (.*))?(?: LIMIT (\d+))?
    const regex = /^SELECT\s+(.+?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+?))?(?:\s+LIMIT\s+(\d+))?$/i;
    const match = normalized.match(regex);

    if (!match) {
      setErrorMsg("SQL Syntax Error: Only basic SELECT queries are supported. Example: SELECT * FROM users WHERE level = 300;");
      return;
    }

    const selectColsStr = match[1].trim();
    const tableName = match[2].trim().toLowerCase();
    const whereClause = match[3] ? match[3].trim() : null;
    const limitClause = match[4] ? parseInt(match[4].trim()) : null;

    const dbTable = MOCK_DB[tableName];
    if (!dbTable) {
      setErrorMsg(`Table Error: Relation "${tableName}" does not exist in schema.`);
      return;
    }

    // Process Columns selection
    let colsToSelect: string[] = [];
    if (selectColsStr === "*") {
      colsToSelect = [...dbTable.columns];
    } else {
      colsToSelect = selectColsStr.split(",").map((c) => c.trim().toLowerCase());
      // Validate columns
      for (const col of colsToSelect) {
        if (!dbTable.columns.includes(col)) {
          setErrorMsg(`Attribute Error: Column "${col}" does not exist in table "${tableName}".`);
          return;
        }
      }
    }

    // Filter Rows with simple WHERE clause simulator
    let filteredRows = [...dbTable.rows];

    if (whereClause) {
      // support column = value, column > value, column < value, column LIKE value
      const condRegex = /(\w+)\s*(=|>|<|like)\s*(.+)/i;
      const condMatch = whereClause.match(condRegex);

      if (condMatch) {
        const colName = condMatch[1].trim().toLowerCase();
        const op = condMatch[2].trim().toLowerCase();
        let valueStr = condMatch[3].trim().replace(/^['"]|['"]$/g, ""); // strip quotes

        if (!dbTable.columns.includes(colName)) {
          setErrorMsg(`Attribute Error: Column "${colName}" in WHERE clause does not exist.`);
          return;
        }

        filteredRows = filteredRows.filter((row) => {
          const cellVal = row[colName];

          if (op === "=") {
            return String(cellVal).toLowerCase() === valueStr.toLowerCase();
          } else if (op === ">") {
            return Number(cellVal) > Number(valueStr);
          } else if (op === "<") {
            return Number(cellVal) < Number(valueStr);
          } else if (op === "like") {
            // Convert simple sql wildcards % to regex
            const regexStr = valueStr.replace(/%/g, ".*");
            const reg = new RegExp(`^${regexStr}$`, "i");
            return reg.test(String(cellVal));
          }
          return true;
        });
      } else {
        setErrorMsg("SQL WHERE Clause Error: Only simple filters like 'column = value', 'column > value' or 'column LIKE value' are simulated.");
        return;
      }
    }

    // Apply Limit
    if (limitClause !== null && !isNaN(limitClause)) {
      filteredRows = filteredRows.slice(0, limitClause);
    }

    // Extract selected fields
    const finalRows = filteredRows.map((row) => {
      const newRow: Record<string, any> = {};
      colsToSelect.forEach((col) => {
        newRow[col] = row[col];
      });
      return newRow;
    });

    const duration = performance.now() - start;

    setResultColumns(colsToSelect);
    setResultRows(finalRows);
    setExecTimeMs(duration);
  };

  const handleReset = () => {
    setQuery("SELECT * FROM users WHERE level = 300;");
    setErrorMsg("");
    setResultColumns([]);
    setResultRows([]);
    setExecTimeMs(null);
  };

  const loadTemplate = (sql: string) => {
    setQuery(sql);
  };

  return (
    <div className="flex h-full flex-col lg:flex-row bg-white dark:bg-surface-900 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-surface-200 dark:divide-surface-800">
      {/* Left Panel: Schema Navigator */}
      <div className="w-full lg:w-64 flex flex-col h-[200px] lg:h-full bg-surface-50 dark:bg-surface-950/45">
        <div className="flex h-12 items-center gap-2 border-b border-surface-200 px-4 dark:border-surface-800 select-none shrink-0">
          <Database className="h-4.5 w-4.5 text-primary-600 dark:text-primary-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-surface-600 dark:text-surface-300">Schema Explorer</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {Object.entries(MOCK_DB).map(([tableName, tableDef]) => (
            <div key={tableName} className="space-y-1.5">
              <button
                onClick={() => loadTemplate(`SELECT * FROM ${tableName} LIMIT 10;`)}
                className="flex items-center gap-2 text-xs font-bold text-surface-800 dark:text-surface-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Table className="h-3.5 w-3.5 text-surface-400 shrink-0" />
                {tableName}
              </button>
              <ul className="pl-5 space-y-1 border-l border-surface-200 dark:border-surface-800 ml-1.5">
                {tableDef.columns.map((colName) => (
                  <li key={colName} className="flex items-center gap-1.5 text-[11px] text-surface-550 dark:text-surface-400">
                    <Columns className="h-3 w-3 text-surface-400 shrink-0" />
                    {colName}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: Code area + Results */}
      <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-surface-900">
        {/* Editor Area */}
        <div className="h-[200px] lg:h-1/3 flex flex-col min-h-0 border-b border-surface-200 dark:border-surface-800">
          <div className="flex h-10 items-center justify-between border-b border-surface-205 bg-surface-50 px-4 dark:border-surface-850 dark:bg-surface-900/60 shrink-0">
            <span className="text-xs font-semibold text-surface-500">Query Editor</span>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                title="Reset editor"
                className="h-7 w-7 p-0 text-surface-500 hover:text-surface-700 dark:text-surface-400"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
              <div className="h-4 w-px bg-surface-200 dark:bg-surface-800" />
              <Button
                variant="primary"
                size="sm"
                onClick={handleRun}
                className="h-7 text-xs font-semibold shadow-sm px-2.5"
              >
                <Play className="mr-1 h-3 w-3 fill-current" /> Execute
              </Button>
            </div>
          </div>
          <div className="flex-1 min-h-0 relative">
            <Editor
              height="100%"
              language="sql"
              theme="vs-dark"
              value={query}
              onChange={(v) => setQuery(v || "")}
              options={{
                fontSize: 13,
                minimap: { enabled: false },
                lineNumbers: "on",
                automaticLayout: true,
                scrollBeyondLastLine: false,
                tabSize: 2
              }}
            />
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1 flex flex-col min-h-0 bg-surface-50 dark:bg-surface-950">
          <div className="flex h-9 items-center justify-between border-b border-surface-200 px-4 bg-surface-100/50 dark:border-surface-850 dark:bg-surface-900/40 shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-surface-500">Results Console</span>
            {execTimeMs !== null && (
              <span className="text-[10px] text-surface-400 font-mono flex items-center gap-1">
                <Clock className="h-3 w-3" /> Duration: {execTimeMs.toFixed(1)}ms
              </span>
            )}
          </div>

          <div className="flex-1 overflow-auto p-4 scrollbar-thin">
            {errorMsg ? (
              <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3.5 border border-red-200 text-xs text-red-700 dark:bg-red-950/20 dark:border-red-900/30 dark:text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <pre className="font-mono whitespace-pre-wrap font-medium">{errorMsg}</pre>
              </div>
            ) : resultRows.length > 0 ? (
              <div className="border border-surface-200 dark:border-surface-800 rounded-lg overflow-hidden bg-white dark:bg-surface-900">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-surface-50 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800">
                      {resultColumns.map((col) => (
                        <th key={col} className="px-4 py-3 font-semibold text-surface-700 dark:text-surface-300 font-mono">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-200 dark:divide-surface-800">
                    {resultRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface-50/50 dark:hover:bg-surface-950/20">
                        {resultColumns.map((col) => (
                          <td key={col} className="px-4 py-2.5 font-mono text-surface-650 dark:text-surface-300">
                            {row[col] === null ? <span className="italic text-surface-400">null</span> : String(row[col])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center flex-col gap-2.5 select-none text-surface-400 py-10">
                <Database className="h-10 w-10 text-surface-300 stroke-1" />
                <span className="text-xs font-semibold">No results returned. Execute a SELECT query to see rows.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
