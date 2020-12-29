import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

/**
 * Allow deeply nested children to render at the custom location in the tree to preserve component state even if children components change
 */
export function makePermanence() {
  const context = createContext<(node: ReactNode) => void>(() => {});
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
        setDeepChildren(children);
        return () => setDeepChildren(null);
      });
      return null;
    },
  ] as const;
}
