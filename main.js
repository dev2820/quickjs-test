import "./style.css";
import { execute } from "./src/quickjs";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }

    return new editorWorker();
  },
};

const $editor = document.getElementById("editor");
const $button = document.getElementById("execute");
const $toLink = document.getElementById("to-link");
const $result = document.getElementById("result");

function getDefaultCode() {
  const defaultCode = `function main() { \n\tconsole.log('Hello World')\n}`;
  const codeDecoded = window.location.search.slice("?code=".length);
  if (codeDecoded === "") return defaultCode;
  try {
    const givenCode = atob(codeDecoded);
    return givenCode;
  } catch (err) {
    alert("코드 디코딩에 실패했습니다.");
  }

  return defaultCode;
}

const editor = monaco.editor.create($editor, {
  value: getDefaultCode(),
  language: "javascript",
});

$toLink.addEventListener("click", async () => {
  const str = editor.getValue();
  const base64 = btoa(str);

  const href = `${window.location.origin}${window.location.pathname}?code=${base64}`;

  try {
    await navigator.clipboard.writeText(href);
    alert("클립보드에 복사되었습니다.");
  } catch (err) {
    alert("링크 생성에 실패했습니다", err.message);
  }
});

$button.addEventListener("click", async () => {
  const code = editor.getValue();
  const result = await execute(code);

  $result.innerText = result;
  console.log("result: ", result);
});
