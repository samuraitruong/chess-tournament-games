export interface PGNResult {
  attributes: Record<string, string>;
  moves: Array<[string, string]>;
}
const correctMove = (move: string) => {
  return move.replace("0-0", "O-O").replace("0-0-0", "O-O-O");
};
export function parsePGN(pgn: string): PGNResult {
  const attributes: Record<string, string> = {};
  const moves: Array<[string, string]> = [];

  const lines: string[] = pgn.split("\n");

  let currentMoves: string[] = [];

  const attributeLines = lines.filter((line) => line.startsWith("["));
  const moveLines = lines.filter((line) => !line.startsWith("["));

  attributeLines.forEach((line) => {
    const [key, ...valueParts] = line.substring(1, line.length - 1).split(" ");
    const value = valueParts.join(" ").replace(/"/g, "");
    attributes[key] = value;
  });

  const joinedLine = moveLines.join(" ");
  currentMoves = [];
  const moveParts = joinedLine.split(/\d+\./);
  const movesToAdd = moveParts
    .filter((move) => move.trim() !== "")
    .map((move) => move.trim())
    .filter((move) => move !== "");

  movesToAdd.forEach((move) => {
    const [whiteMove, blackMove] = move.split(" ");

    if (whiteMove && blackMove) {
      moves.push([correctMove(whiteMove), correctMove(blackMove)]);
    }
  });

  return { attributes, moves };
}
