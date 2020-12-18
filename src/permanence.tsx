import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

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
