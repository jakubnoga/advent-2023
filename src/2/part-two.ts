import { loadInput } from "../lib/load-input.ts";
import {
  calculateCubeSetPower,
  calculateSmallestPossibleRefSet,
  parseGame,
} from "./lib.ts";

const games = (await loadInput(2)).filter((line) => line.trim() != "").map(
  parseGame,
);

const smallestPossibleRefSets = games.map(calculateSmallestPossibleRefSet);

const powerSum = smallestPossibleRefSets.reduce((acc, refSet) => {
  return acc + calculateCubeSetPower(refSet);
}, 0);

console.log(powerSum);
