import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

let _editor = null;

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }

    return new editorWorker();
  },
};

export function initEditor($target, defaultCode = "") {
  const editor = monaco.editor.create($target, {
    value: defaultCode,
    language: "javascript",
  });
  _editor = editor;
}

export function getEditor() {
  if (_editor) {
    return _editor;
  }
}
