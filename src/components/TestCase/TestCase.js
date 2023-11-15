import * as Editor from "../../modules/editor";
import EvalWorker from "../../workers/eval.worker?worker";

export const TestCase = ({ index }) => {
  const $self = document.createElement("div");
  $self.innerHTML = view({ index });

  const worker = new EvalWorker();
  worker.addEventListener("message", function (evt) {
    const { result } = evt.data;
    console.log(result);
    $self.querySelector(".result").innerText = `
      time: ${result.time}
      value: ${result.value}
    `;
  });
  $self.querySelector("button").addEventListener("click", function () {
    execTestcase();
  });

  function getTestcase() {
    return $self.querySelector("textarea").value || "[]";
  }

  function runTestcase(code, inputs) {
    worker.postMessage({
      params: inputs,
      code,
    });
  }

  function execTestcase() {
    const editor = Editor.getEditor();
    const inputs = JSON.parse(getTestcase());
    const code = editor.getValue();

    runTestcase(code, inputs);
  }

  return {
    getTestcase,
    execTestcase,
    $dom: $self,
  };
};

const view = ({ index }) => {
  return `
  <h3>테스트케이스 ${index}</h3>
  <textarea
    placeholder="인자를 배열 형태로 입력하세요. ex) [1,2]"
  ></textarea>
  <button>실행</button>
  result: <span class="result"></span>
`;
};
