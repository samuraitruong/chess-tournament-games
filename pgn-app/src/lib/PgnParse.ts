export interface PGNResult {
  attributes: Record<string, string>;
  moves: Array<[string, string]>;
}

export function parsePGN(pgn: string): PGNResult {
  const attributes: Record<string, string> = {};
  const moves: Array<[string, string]> = [];

  const lines: string[] = pgn.split("\n");

  lines.forEach((line) => {
    line = line.trim();

    if (line.startsWith("[")) {
      const [key, ...valueParts] = line
        .substring(1, line.length - 1)
        .split(" ");
      const value = valueParts.join(" ").replace(/"/g, "");
      attributes[key] = value;
    } else if (line !== "1-0" && line !== "0-1" && line !== "*") {
      const currentMoves = line
        .split(/\d+\./)
        .filter((move) => move.trim() !== "");

      currentMoves.forEach((move) => {
        const [whiteMove, blackMove] = move.trim().split(" ");

        if (whiteMove && blackMove) {
          moves.push([whiteMove, blackMove]);
        }
      });
    }
  });

  return { attributes, moves };
}
