import {
  type ReactNode,
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

/**
 * Allow deeply nested children to render at the custom location in the tree to preserve component state even if children components change
 */
export function makePermanence() {
  const context = createContext<"no-parent" | ((node: ReactNode) => void)>(
    "no-parent",
  );
  return [
    function Parent(props: { children: ReactNode }) {
      const { children } = props;
      const [deepChildren, setDeepChildren] = useState<ReactNode>(null);
      return (
        <context.Provider value={setDeepChildren}>
          {deepChildren}
          {children}
        </context.Provider>
      );
    },
    function Child(props: { children: ReactNode }) {
      const { children } = props;
      const setDeepChildren = useContext(context);
      useLayoutEffect(function () {
        if (setDeepChildren === "no-parent") return;
        setDeepChildren(children);
        return () => setDeepChildren(null);
      });
      if (setDeepChildren === "no-parent") return <>{children}</>;
      return null;
    },
  ] as const;
}
