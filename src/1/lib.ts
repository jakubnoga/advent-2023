export function findCalibrationValues(
  calibrationDocument: string[],
  mapfn: (line: string) => number,
): Array<number> {
  return calibrationDocument.filter((str) =>
    str.trim() !==
      ""
  ).map(
    mapfn,
  );
}

export function findCalibrationSum(calibrationValues: Array<number>): number {
  return calibrationValues.reduce((sum, value) => sum + value, 0);
}
