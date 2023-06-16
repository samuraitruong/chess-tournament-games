import { Chess } from "chess.js";

export function validateMove(validMoves: string[], move: string) {
  const game = new Chess();
  for (const validMove of validMoves) {
    game.move(validMove);
  }
  try {
    const m = game.move(move);
    console.log(m);
    return m;
  } catch (err) {
    return {};
  }
}
