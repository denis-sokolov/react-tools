declare module "parse-css-color" {
  type ParsedColor =
    | { type: "rgb"; values: [number, number, number]; alpha: number }
    | { type: "hsl"; values: [number, number, number]; alpha: number }
    | null;
  const f: (input: string) => ParsedColor;
  export = f;
}
