import "./style.css";
import { createEditor } from "./src/modules/editor";
import { execute } from "./src/quickjs";
import EvalWorker from "./src/workers/eval.worker?worker";

const $editor = document.getElementById("editor");
const $execute = document.getElementById("execute");
const $params = document.getElementById("params");
const $testing = document.getElementById("testing");
const $result = document.getElementById("result");
const $test1params = document.getElementById("test-1");
const $test2params = document.getElementById("test-2");

const defaultCode = `function main() { \n\treturn 3\n}`;
const editor = createEditor($editor, defaultCode);

$execute.addEventListener("click", async () => {
  const code = editor.getValue();
  const params = JSON.parse($params.value ?? "[]");

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
