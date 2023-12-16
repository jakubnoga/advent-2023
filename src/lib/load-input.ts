import { join } from "https://deno.land/std@0.209.0/path/mod.ts";

export async function loadInput(day: number): Promise<string[]> {
  const decoder = new TextDecoder("utf-8");
  const bytes = await Deno.readFile(join("src", String(day), "input.txt"));
  const content = decoder.decode(bytes);
  return content.split("\n");
}
