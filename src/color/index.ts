import { hsl as fromHsl, rgb as fromRgb } from "color-convert";

import parse from "parse-css-color";

export type Color = {
  alpha: () => number;
  hex: () => string;
  hsl: () => string;
  hue: () => number;
  lightness: () => number;
  saturation: () => number;
  withAlpha: (hue: number) => Color;
  withHue: (hue: number) => Color;
  withLightness: (hue: number) => Color;
  withSaturation: (saturation: number) => Color;
};

function makeColor(
  hue: number,
  saturation: number,
  lightness: number,
  alpha: number
): Color {
  const result: Color = {
    alpha: () => alpha,
    hex: () =>
      "#" +
      fromHsl.hex([hue, saturation, lightness]).toLocaleLowerCase() +
      (alpha === 1 ? "" : Math.round(alpha * 255).toString(16)),
    hue: () => hue,
    lightness: () => lightness,
    saturation: () => saturation,
    hsl: () =>
      alpha === 1
        ? `hsl(${hue}, ${saturation}%, ${lightness}%)`
        : `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`,
    withAlpha: (value) => makeColor(hue, saturation, lightness, value),
    withHue: (value) => makeColor(value, saturation, lightness, alpha),
    withLightness: (value) => makeColor(hue, saturation, value, alpha),
    withSaturation: (value) => makeColor(hue, value, lightness, alpha),
  };
  return result;
}

export function color(input: string): Color {
  const parsed = parse(input);
  if (!parsed) throw new Error(`Unable to parse color ${input}`);
  if (parsed.type === "rgb") {
    const hsl = fromRgb.hsl(parsed.values);
    return makeColor(hsl[0], hsl[1], hsl[2], parsed.alpha);
  }
  if (parsed.type === "hsl")
    return makeColor(
      parsed.values[0],
      parsed.values[1],
      parsed.values[2],
      parsed.alpha
    );
  throw new Error(`Unfamiliar color type`);
}
