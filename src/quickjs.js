import { getQuickJS, shouldInterruptAfterDeadline } from "quickjs-emscripten";

export async function execute(code, params) {
  const QuickJS = await getQuickJS();
  const vm = QuickJS.newContext();

  try {
    const targetCode = wrapBorn(code, params);
    console.log(targetCode);
    const result = vm.evalCode(targetCode, {
      shouldInterrupt: shouldInterruptAfterDeadline(Date.now() + 1000),
      memoryLimitBytes: 1024 * 1024,
    });

    if (result.error) {
      const value = vm.dump(result.error);
      // console.log("Execution failed:", vm.dump(result.error));
      result.error.dispose();

      return value;
    } else {
      const value = vm.dump(result.value);
      // console.log("Success:", vm.dump(result.value));
      result.value.dispose();

      return value;
    }
  } finally {
    vm.dispose();
  }
}

const wrapBorn = (code, params) => {
  return `${code}\nmain(${params.join(",")});`;
};
