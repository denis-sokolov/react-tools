export * from "./render";

export function silenceConsole<Result>(f: () => Result): () => Result {
  return function () {
    const orig = console.error;
    console.error = () => {};
    try {
      return f();
    } finally {
      console.error = orig;
    }
  };
}
