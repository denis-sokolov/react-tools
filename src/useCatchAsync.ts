import { useCrash } from "./useCrash";

const infinitePromise = new Promise<never>(() => {});

export function useCatchAsync() {
  const crash = useCrash();
  return function <Args extends any[], Result>(
    f: (...args: Args) => Promise<Result>,
  ): (...args: Args) => Promise<Result> {
    return (...args) =>
      f(...args).catch(function (err) {
        crash(err);
        return infinitePromise;
      });
  };
}
