export type Game = {
  id: number;
  cubeSets: Record<string, number>[];
};

export function parseGame(line: string): Game {
  const [gameTokens, cubeTokens] = line.split(":");
  let id: number;
  let cubeSets: Record<string, number>[];

  try {
    id = parseGameId(gameTokens);
  } catch (_e) {
    throw new Error(`Could not parse game id from line: ${line}`);
  }
  try {
    cubeSets = parseGameCubes(cubeTokens);
  } catch (_e) {
    throw new Error(`Could not parse cubes from line: ${line}`);
  }

  return { id, cubeSets };
}

function parseGameId(gameTokens: string): number {
  const id = gameTokens.match(/\d+/)?.[0];
  if (id === undefined) {
    throw new Error(`Could not parse game id`);
  }
  return parseInt(id);
}

function parseGameCubes(cubeTokens: string): Record<string, number>[] {
  const cubeTokensArray = cubeTokens.split(";");
  return cubeTokensArray.map(parseGameCubesSet);
}

function parseGameCubesSet(cubeSetTokens: string): Record<string, number> {
  const cubeTokens = cubeSetTokens.split(",");
  return Object.fromEntries(cubeTokens.map(parseCube));
}

function parseCube(cubeTokens: string): [string, number] {
  const [count, color] = cubeTokens.trim().split(" ");
  return [color, parseInt(count)];
}

export function isGamePossible(
  game: Game,
  referenceCubeSet: Record<string, number>,
): boolean {
  return game.cubeSets.every((cubeSet) =>
    isCubeSetPossible(cubeSet, referenceCubeSet)
  );
}

export function isCubeSetPossible(
  cubeSet: Record<string, number>,
  referenceCubeSet: Record<string, number>,
): boolean {
  return Object.entries(cubeSet).every(([color, count]) =>
    referenceCubeSet[color] >= count
  );
}

export function calculateSmallestPossibleRefSet(game: Game): Record<string, number> {
  return game.cubeSets.reduce((acc, cubeSet) => {
    Object.entries(cubeSet).forEach(([color, count]) => {
      if (color in acc) {
        acc[color] = Math.max(count, acc[color]);
      } else {
        acc[color] = count;
      }
    });

    return acc;
  }, game.cubeSets[0]);
}

export function calculateCubeSetPower(cubeSet: Record<string, number>): number {
  return Object.values(cubeSet).reduce((acc, value) => acc * value, 1);
}
