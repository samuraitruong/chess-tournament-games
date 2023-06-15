"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import { MoveRow } from "./MoveRow";
import styled from "styled-components";
import { validateMove } from "@/lib/Validator";
import DownloadModal from "@/components/Modal";

const MoveGrid = styled.div`
  grid-template-rows: repeat(2, 32px);
`;

export interface PgnInputProps {
  onMoveChange?: (listMoves: string[]) => void;
}

const PgnInput = ({ onMoveChange }: PgnInputProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [pgn, setPgn] = useState("");
  const [fileName, setFileName] = useState("chess.pgn");
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

  const [moves, setMoves] = useState(Array(20).fill({ w: "", b: "" }));
  const [isGridMode, setGridMode] = useState(true);

  const handleAddAttribute = () => {
    setPgnAttributes([...pgnAttributes, { label: "", value: "", lock: false }]);
  };

  const handleAttributeChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedAttributes = [...pgnAttributes];
    updatedAttributes[index].value = event.target.value;
    setPgnAttributes(updatedAttributes);
  };

  const handleUpdateAttributeName = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
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
    const status = color + "Status";
    const validMoves: string[] = [];

    for (const x of moves) {
      if (!x.w || (x.wStatus === false && x.w)) {
        break;
      }
      if (x.wStatus) {
        validMoves.push(x.w);
      }
      if (!x.b || (x.bStatus === false && x.b)) {
        break;
      }
      if (x.bStatus) validMoves.push(x.b);
    }

    const isValid = validateMove(validMoves, value);

    setMoves((prevMoves) => {
      const updatedMoves = [...prevMoves];
      updatedMoves[index] = {
        ...updatedMoves[index],
        [color]: value,
        [status]: isValid !== undefined ? isValid : true,
      };

      if (onMoveChange && isValid) {
        onMoveChange([...validMoves, value]);
      }
      return updatedMoves;
    });
  };

  const handleToggleGridMode = () => {
    setGridMode(!isGridMode);
  };

  const savePgn = () => {
    setShowModal(true);

    const contents = pgnAttributes.reduce((acc: string, curr: any) => {
      if (curr.label && curr.value) {
        return acc + `[${curr.label} "${curr.value}"]\n`;
      }
      return acc;
    }, "");

    const moveText = moves
      .filter((x) => x.w)
      .map((move, index) => `${index + 1}. ${move.w} ${move.b || ""}`)
      .join("");

    setPgn(contents + "\n" + moveText);
    setFileName(
      `${pgnAttributes.find((x) => x.label === "White")?.value} vs ${
        pgnAttributes.find((x) => x.label === "Black")?.value
      }.pgn`
    );
  };

  const handleTabEvent = (index: number) => {
    if (index === moves.length) {
      setMoves([...moves, { w: "", b: "" }]);
    }
  };

  const clearAllHandle = () => {
    setMoves(Array(20).fill({ w: "", b: "" }));
    if (onMoveChange) onMoveChange([]);
  };
  return (
    <div>
      <h2>Game Information</h2>
      <div className="space-y-2">
        {pgnAttributes.map((attribute, index) => (
          <div key={index} className="flex full-w">
            <input
              type="text"
              className={`border border-gray-300 rounded-md p-1 w-40 ${
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

      <h2>Moves</h2>
      <div className="mt-2">
        <button onClick={handleToggleGridMode} className="mb-2">
          {isGridMode ? "Switch to Raw Mode" : "Switch to Grid Mode"}
        </button>
        {isGridMode ? (
          <MoveGrid
            className="grid grid-cols-2 gap-1 h-500px overflow-y-auto"
            ref={ref}
          >
            {moves.map((move, index) => (
              <MoveRow
                onTabPress={handleTabEvent}
                key={index}
                index={index}
                move={move}
                onChange={handleMoveChange}
              />
            ))}
          </MoveGrid>
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

          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={clearAllHandle}
          >
            Clear
          </button>
        </div>
      </div>
      <DownloadModal
        show={showModal}
        value={pgn}
        fileName={fileName}
        onAction={() => setShowModal(false)}
      />
    </div>
  );
};

export { PgnInput as PgnInputComponent };
