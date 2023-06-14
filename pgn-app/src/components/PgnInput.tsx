"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import { MoveRow } from "./MoveRow";

export interface PgnInputProps {
  onPgnChange?: (pgn: string) => void;
}

const PgnInput = ({ onPgnChange }: PgnInputProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pgnAttributes, setPgnAttributes] = useState([
    { label: "Event", value: "", lock: true },
    { label: "Site", value: "", lock: true },
    { label: "Date", value: "", lock: true },
    { label: "Board", value: "", lock: true },
    { label: "Round", value: "", lock: true },
    { label: "White", value: "", lock: true },
    { label: "Black", value: "", lock: true },
    { label: "Result", value: "", lock: true },
    { label: "TimeControl", value: "", lock: true },
  ]);

  const [moves, setMoves] = useState(Array(15).fill({ w: "", b: "" }));
  const [isGridMode, setGridMode] = useState(true);

  const handleAddAttribute = () => {
    setPgnAttributes([...pgnAttributes, { label: "", value: "", lock: false }]);
  };

  const handleAttributeChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedAttributes = [...pgnAttributes];
    updatedAttributes[index].value = event.target.value;
    setPgnAttributes(updatedAttributes);
  };

  const handleUpdateAttributeName = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedAttributes = [...pgnAttributes];
    updatedAttributes[index].label = event.target.value;
    setPgnAttributes(updatedAttributes);
  };

  const handleAddFenRow = () => {
    const newMoves = [...moves];
    for (let i = 0; i < 10; i++) {
      newMoves.push({ w: "", b: "" });
    }

    setMoves(newMoves);
  };

  const handleMoveChange = (index: number, value: string, color: "w" | "b") => {
    setMoves((prevMoves) => {
      const updatedMoves = [...prevMoves];
      updatedMoves[index] = {
        ...updatedMoves[index],
        [color]: value,
      };
      return updatedMoves;
    });
  };

  const handleToggleGridMode = () => {
    setGridMode(!isGridMode);
  };

  const savePgn = () => {
    console.log(pgnAttributes);
    console.log(moves);
  };

  return (
    <div>
      <h2>PGN Attributes</h2>
      <div className="space-y-2">
        {pgnAttributes.map((attribute, index) => (
          <div key={index} className="flex">
            <input
              type="text"
              className={`border border-gray-300 rounded-md p-1 w-48 ${
                attribute.lock ? "disabled" : ""
              }`}
              disabled={attribute.lock}
              value={attribute.label}
              onChange={(event) => handleUpdateAttributeName(index, event)}
            />
            <input
              type="text"
              className="border border-gray-300 rounded-md p-1 flex-1"
              value={attribute.value}
              onChange={(event) => handleAttributeChange(index, event)}
            />
          </div>
        ))}
        <button onClick={handleAddAttribute} className="mt-2">
          Add Attribute
        </button>
      </div>

      <h2>PGN Moves</h2>
      <div className="mt-2">
        <button onClick={handleToggleGridMode} className="mb-2">
          {isGridMode ? "Switch to Raw Mode" : "Switch to Grid Mode"}
        </button>
        {isGridMode ? (
          <div
            className="grid grid-cols-1 gap-1 h-500px overflow-y-auto"
            ref={ref}
          >
            {moves.map((move, index) => (
              <MoveRow
                key={index}
                index={index}
                move={move}
                onChange={handleMoveChange}
              />
            ))}
          </div>
        ) : (
          <textarea
            className="border border-gray-300 rounded-md p-2 w-full h-500px resize-none"
            rows={moves.length}
            value=""
            onChange={(event) => {
              const updatedmoves = event.target.value
                .split(" ")
                .map((fen, index) => ({
                  moveIndex: index + 1,
                  fen,
                }));
              setMoves(updatedmoves);
            }}
          />
        )}

        <div className="flex space-x-4 mt-3">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleAddFenRow}
          >
            + Row
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={savePgn}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export { PgnInput as PgnInputComponent };
