"use client";
import { PgnInputComponent } from "@/components/PgnInput";
import { ChessBoard } from "@/components/ChessBoard";

import { useState } from "react";

export default function Home() {
  const [currentMoves, setMoves] = useState<string[]>([]);

  const handleOnChange = (moves: string[]) => {
    setMoves([...moves]);
  };
  return (
    <main className="flex w-full  min-h-screen flex-row justify-between p-12">
      <div className="w-9/12 p-4  items-center justify-center">
        <ChessBoard moves={currentMoves} />
      </div>
      <div className="w-3/12 p-4">
        <div className="bg-gray-300 p-4">
          <PgnInputComponent onMoveChange={handleOnChange}></PgnInputComponent>
        </div>
      </div>
    </main>
  );
}
