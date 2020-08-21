import TestRenderer, { ReactTestRenderer } from "react-test-renderer";

function wrapper(node: ReactTestRenderer) {
  const tree = node.toJSON();
  if (Array.isArray(tree))
    return {
      is: () => false,
      prop: (): unknown => undefined,
      text: () => "",
    };
  return {
    is: (element: string) => tree?.type === element,
    prop: (name: string): unknown => tree?.props[name],
    text: () =>
      node.root
        .findAll(() => true)
        .map((el) =>
          el.children.filter((child) => typeof child === "string").join("")
        )
        .join(""),
  };
}

export function render(input: React.ReactElement) {
  return wrapper(TestRenderer.create(input));
}
