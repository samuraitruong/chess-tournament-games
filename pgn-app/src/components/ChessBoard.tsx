"use client";
import { Chessboard } from "react-chessboard";
import { Chess, Move } from "chess.js";
import { useEffect, useState } from "react";
import { copyToClipboard } from "@/lib/CopyToClipboard";

export interface ChessBoardProps {
  moves: string[];
}
export const ChessBoard = (props: ChessBoardProps) => {
  const [game, setGame] = useState(new Chess());
  const [moveSteps, setMoveSteps] = useState<any[]>([]);
  const [fen, setFen] = useState("");

  useEffect(() => {
    const newGame = new Chess();

    props.moves.forEach((move) => {
      try {
        newGame.move(move);
      } catch (e) {
        // throw e;
        console.log("error", move);
      }
    });

    setGame(newGame);
    setFen(newGame.fen());
    setMoveSteps(newGame.history({ verbose: true }));
  }, [props.moves]);

  const stepClickHandle = (step: Move) => {
    setFen(step.after);
  };

  return (
    <div className="w-full ">
      <Chessboard id="BasicBoard" boardWidth={800} position={fen} />
      <div className="mt-4">
        <ul className="space-x-2">
          {moveSteps.map((step, index) => (
            <li key={index} className="inline-block">
              {index % 2 === 0 ? `${Math.floor((index + 1) / 2 + 1)}. ` : ""}
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => stepClickHandle(step)}
              >
                {step.san}
              </span>
            </li>
          ))}
        </ul>
        <blockquote className="border-l-4 border-gray-500 italic my-4 pl-4 relative">
          {" "}
          FEN: {fen}
          <button
            className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded"
            onClick={() => copyToClipboard(fen)}
          >
            Copy
          </button>
        </blockquote>
      </div>
    </div>
  );
};
