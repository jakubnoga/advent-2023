import { loadInput } from "../lib/load-input.ts";
import { isGamePossible, parseGame } from "./lib.ts";

const refGameSet = { red: 12, green: 13, blue: 14 };

const games = (await loadInput(2)).filter((line) => line.trim() != "").map(
  parseGame,
);
const possibleGames = games.filter((game) => isGamePossible(game, refGameSet));

console.log(possibleGames.reduce((acc, game) => acc + game.id, 0));
