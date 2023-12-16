import { loadInput } from "../lib/load-input.ts";
import { findCalibrationSum, findCalibrationValues } from "./lib.ts";

const calibrationDocument = await loadInput(1);

const firstDigit = /^\D*(?<digit>\d)/;
const lastDigit = /(?<digit>\d)\D*$/;

function findCalibrationValue(line: string): number {
  const firstDigitMatchGroup = firstDigit.exec(line)?.groups?.digit ?? "";
  const lastDigitMatchGroup = lastDigit.exec(line)?.groups?.digit ?? "";

  const calibrationValue = Number(firstDigitMatchGroup + lastDigitMatchGroup);

  return isNaN(calibrationValue) ? 0 : calibrationValue;
}

console.log(
  findCalibrationSum(
    findCalibrationValues(calibrationDocument, findCalibrationValue),
  ),
);
