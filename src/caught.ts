export function caught(value: unknown): Error {
  if (value instanceof Error) return value;

  if (typeof value === "undefined") return new Error("Caught an undefined");
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "bigint"
  )
    return new Error(`Caught a primitive value: ${JSON.stringify(value)}`);
  if (typeof value === "object" && !value)
    return new Error("Caught a null value");

  // Can’t stringify arbitrary values, but can show them in the console
  console.info("Caught:", value);
  return new Error(`Caught a non-Error value, inspect it in the console`);
}
