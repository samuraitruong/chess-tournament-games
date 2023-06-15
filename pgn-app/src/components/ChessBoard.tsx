"use client";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useEffect, useState } from "react";

export interface ChessBoardProps {
  moves: string[];
}
export const ChessBoard = (props: ChessBoardProps) => {
  const [game, setGame] = useState(new Chess());

  useEffect(() => {
    const newGame = new Chess();

    props.moves.forEach((move) => {
      try {
        newGame.move(move);
      } catch (e) {}
    });

    setGame(newGame);
  }, [props.moves]);

  return (
    <div className="w-full ">
      <Chessboard id="BasicBoard" boardWidth={900} position={game.fen()} />;
    </div>
  );
};
