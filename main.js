import "./style.css";
import { execute } from "./src/quickjs";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import EvalWorker from "./src/workers/eval.worker?worker";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }

    return new editorWorker();
  },
};

const $editor = document.getElementById("editor");
const $execute = document.getElementById("execute");
const $params = document.getElementById("params");
const $toLink = document.getElementById("to-link");
const $testing = document.getElementById("testing");
const $result = document.getElementById("result");
const $test1params = document.getElementById("test-1");
const $test2params = document.getElementById("test-2");
const $test3params = document.getElementById("test-3");

function getDefaultCode() {
  const defaultCode = `function main() { \n\treturn 3\n}`;
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

$execute.addEventListener("click", async () => {
  const code = editor.getValue();
  const params = JSON.parse($params.value);

  const result = await execute(code, params);

  $result.innerText = result;
  console.log("result: ", result);
});

$testing.addEventListener("click", () => {
  const worker1 = new EvalWorker();
  const params1 = JSON.parse($test1params.value || "[]");
  worker1.addEventListener("message", (evt) => {
    const { result } = evt.data;
    document.querySelector("#test-1 ~ .result").innerText = result;
  });

  worker1.postMessage({
    id: 1,
    params: params1,
    code: editor.getValue(),
  });

  const worker2 = new EvalWorker();

  const params2 = JSON.parse($test2params.value || "[]");
  worker2.addEventListener("message", (evt) => {
    const { result } = evt.data;
    document.querySelector("#test-2 ~ .result").innerText = result;
  });

  worker2.postMessage({
    id: 2,
    params: params2,
    code: editor.getValue(),
  });
});
