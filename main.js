import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
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
const $result = document.getElementById("result");

const editor = monaco.editor.create($editor, {
  value: "function main() { \n\tconsole.log('Hello World')\n}",
  language: "javascript",
});

$button.addEventListener("click", async () => {
  const code = editor.getValue();
  const result = await execute(code);

  $result.innerText = result;
  console.log("result: ", result);
});
