import { getQuickJS, shouldInterruptAfterDeadline } from "quickjs-emscripten";

self.onerror = (e) => {
  console.log(e);
};
self.addEventListener("error", (e) => {
  console.log(8, e);
});

self.addEventListener("message", async function (e) {
  const { id, params, code } = e.data;

  try {
    const start = performance.now();
    const value = await execute(code, params);
    const end = performance.now();

    self.postMessage({
      message: `${id} has done`,
      result: {
        value,
        time: end - start,
      },
    });
  } catch (err) {
    self.postMessage({
      err,
    });
  }
});

async function execute(code, params = []) {
  const QuickJS = await getQuickJS();
  const vm = QuickJS.newContext();

  try {
    const result = vm.evalCode(wrapBorn(code, params), {
      shouldInterrupt: shouldInterruptAfterDeadline(Date.now() + 1000),
      memoryLimitBytes: 1024 * 1024,
    });

    if (result.error) {
      const value = vm.dump(result.error);
      result.error.dispose();

      return value;
    } else {
      const value = vm.dump(result.value);
      result.value.dispose();

      return value;
    }
  } finally {
    vm.dispose();
  }
}

const wrapBorn = (code, params = []) => {
  return `${code}\nmain(${params.join(",")});`;
};
