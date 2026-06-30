import axios from "axios";

const JUDGE0_API_URL = process.env.JUDGE0_API_URL || "https://judge0-ce.p.rapidapi.com";
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;
const PISTON_API_URL = process.env.PISTON_API_URL || "https://emkc.org/api/v2/piston";

const languageMap: Record<string, { judge0: number; piston: string; version: string }> = {
  python: { judge0: 71, piston: "python", version: "3.10.0" },
  javascript: { judge0: 63, piston: "javascript", version: "18.15.0" },
  java: { judge0: 62, piston: "java", version: "15.0.2" },
  cpp: { judge0: 54, piston: "cpp", version: "10.2.0" },
  c: { judge0: 50, piston: "c", version: "10.2.0" },
  html: { judge0: 0, piston: "", version: "" },
  css: { judge0: 0, piston: "", version: "" },
  sql: { judge0: 0, piston: "", version: "" },
};

export async function executeCodeWithJudge0(
  code: string,
  language: string,
  stdin?: string
) {
  const lang = languageMap[language];
  if (!lang || !lang.judge0) {
    throw new Error(`Language ${language} not supported by Judge0`);
  }

  const response = await axios.post(
    `${JUDGE0_API_URL}/submissions`,
    {
      source_code: code,
      language_id: lang.judge0,
      stdin: stdin || "",
      wait: true,
    },
    {
      headers: {
        "Content-Type": "application/json",
        ...(JUDGE0_API_KEY && { "X-RapidAPI-Key": JUDGE0_API_KEY }),
      },
    }
  );

  return response.data;
}

export async function executeCodeWithPiston(
  code: string,
  language: string,
  stdin?: string
) {
  const lang = languageMap[language];
  if (!lang || !lang.piston) {
    throw new Error(`Language ${language} not supported by Piston`);
  }

  const response = await axios.post(`${PISTON_API_URL}/execute`, {
    language: lang.piston,
    version: lang.version,
    files: [{ content: code }],
    stdin: stdin || "",
  });

  const data = response.data;
  return {
    stdout: data.run?.stdout || "",
    stderr: data.run?.stderr || "",
    compile_output: data.compile?.stderr || "",
    status: { id: data.run?.code === 0 ? 3 : 11, description: data.run?.code === 0 ? "Accepted" : "Runtime Error" },
    time: data.run?.runtime?.toString() || "0",
    memory: data.run?.memory || 0,
  };
}

export async function executeCode(
  code: string,
  language: string,
  stdin?: string,
  provider: "judge0" | "piston" = "piston"
) {
  if (provider === "judge0" && JUDGE0_API_KEY) {
    return executeCodeWithJudge0(code, language, stdin);
  }
  return executeCodeWithPiston(code, language, stdin);
}

export function getSupportedLanguages() {
  return [
    { id: "python", name: "Python", icon: "🐍", extension: ".py" },
    { id: "java", name: "Java", icon: "☕", extension: ".java" },
    { id: "javascript", name: "JavaScript", icon: "📜", extension: ".js" },
    { id: "cpp", name: "C++", icon: "⚡", extension: ".cpp" },
    { id: "c", name: "C", icon: "🔧", extension: ".c" },
  ];
}