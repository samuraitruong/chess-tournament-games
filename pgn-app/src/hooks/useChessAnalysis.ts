import { Move } from "chess.js";
import { useEffect, useState } from "react";
async function getBestMove(fen: string) {
  const result = await (
    await fetch(
      `https://no-cors.fly.dev/cors/https://stockfish-chess-api-p7dmqtfpta-km.a.run.app/bestmove?depth=15&fen=${fen}`
    )
  ).json();
  console.log(result);
  return result.result;
}
async function analysisMove(move: any) {
  console.log("history", move);
  const newMove: any = { ...move };
  if (!newMove.score) {
    const { info = [] } = await getBestMove(move.before);
    console.log("result");
    const matchesMove = info.filter((x: any) => x.pv === move.lan);
    console.log("matchesMove", matchesMove);

    // find the move that matches with the san
    // get the score
    // calculate the move outcome base on the scole
    newMove.score = await getBestMove(move.before);
  }
  return newMove;
}
export function useChessAnalysis(moves: Move[]) {
  const [analysis, setAnalysis] = useState<Move[]>([]);
  useEffect(() => {
    const populateMoveWithAnalysis = async () => {
      const moveWithAnalysis = await Promise.all(moves.map(analysisMove));

      setAnalysis(moveWithAnalysis);
    };
    populateMoveWithAnalysis();
  }, [moves]);
  return analysis;
}
