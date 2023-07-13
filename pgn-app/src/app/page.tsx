"use client";
import { useState } from "react";
import { PgnInputComponent } from "@/components/PgnInput";
import { ChessBoard } from "@/components/ChessBoard";

export default function Home() {
  const [currentMoves, setMoves] = useState<string[]>([]);

  const handleOnChange = (moves: string[]) => {
    setMoves([...moves]);
  };
  return (
    <main className="flex w-full min-h-screen flex-row justify-between p-6 p-md-2">
      <div className="w-8/12  items-center justify-center">
        <ChessBoard moves={currentMoves} />
      </div>
      <div className="w-4/12">
        <div className="bg-gray-300 p-4">
          <PgnInputComponent onMoveChange={handleOnChange}></PgnInputComponent>
        </div>
      </div>
    </main>
  );
}
