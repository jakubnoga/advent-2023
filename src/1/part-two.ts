import { loadInput } from "../lib/load-input.ts";
import { findCalibrationSum, findCalibrationValues } from "./lib.ts";

const calibrationDocument = await loadInput(1);

const mapping = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
} as const;

// https://mtsknn.fi/blog/how-to-do-overlapping-matches-with-regular-expressions/
const tokens = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;

function findCalibrationValue(line: string): number {
  const tokensMatch = Array.from(line.matchAll(tokens), (match) => match[1]);

  const [first, last] = [
    mapToken(tokensMatch[0]),
    mapToken(tokensMatch[tokensMatch.length - 1]),
  ];
  return parseInt(first + last);
}

function mapToken(token: string): string {
  if (token in mapping) {
    return mapping[token as keyof typeof mapping];
  }
  return token;
}

console.log(
  findCalibrationSum(
    findCalibrationValues(calibrationDocument, findCalibrationValue),
  ),
);
