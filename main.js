import "./style.css";
import * as Editor from "./src/modules/editor";
import { TestCase } from "./src/components/TestCase/TestCase";

const $editor = document.getElementById("editor");
const $inputs = document.getElementById("inputs");

const defaultCode = `function main() { \n\treturn 3\n}`;
Editor.initEditor($editor, defaultCode);

const testcase1 = TestCase({ index: 1 });
const testcase2 = TestCase({ index: 2 });

$inputs.appendChild(testcase1.$dom);
$inputs.appendChild(testcase2.$dom);
