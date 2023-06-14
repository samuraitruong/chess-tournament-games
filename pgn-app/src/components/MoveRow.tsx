import { ChangeEvent } from "react";

export interface Move {
  w: string;
  b: string;
}

export interface MoveRowProps {
  index: number;
  move: Move;
  onChange: (index: number, value: string, color: "w" | "b") => void;
}

export const MoveRow: React.FC<MoveRowProps> = ({ index, move, onChange }) => {
  const handleMoveChange = (
    event: ChangeEvent<HTMLInputElement>,
    color: "w" | "b"
  ) => {
    onChange(index, event.target.value, color);
  };

  return (
    <div className="flex w-full mt-0.5">
      <div className="w-32px">{index + 1}.</div>
      <input
        type="text"
        className="border border-gray-300 rounded-md p-1 flex-grow"
        value={move.w}
        onChange={(event) => handleMoveChange(event, "w")}
      />
      <input
        type="text"
        className="border border-gray-300 rounded-md p-1 flex-grow"
        value={move.b}
        onChange={(event) => handleMoveChange(event, "b")}
      />
    </div>
  );
};
