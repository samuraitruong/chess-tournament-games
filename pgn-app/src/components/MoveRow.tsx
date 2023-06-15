import { ChangeEvent } from "react";

export interface Move {
  w: string;
  b: string;
}

export interface MoveRowProps {
  index: number;
  move: Move;
  onTabPress: (index: number) => void;
  onChange: (index: number, value: string, color: "w" | "b") => void;
}

export const MoveRow: React.FC<MoveRowProps> = ({
  index,
  move,
  onChange,
  onTabPress,
}) => {
  const handleMoveChange = (
    event: ChangeEvent<HTMLInputElement>,
    color: "w" | "b"
  ) => {
    onChange(index, event.target.value, color);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Tab") {
      onTabPress(index);
    }
  };

  return (
    <div className="flex">
      <div className="w-32px pr-1">{index + 1}.</div>
      <input
        type="text"
        className="border border-gray-300 rounded-md p-1 flex-grow w-full"
        value={move.w}
        onChange={(event) => handleMoveChange(event, "w")}
      />
      <input
        type="text"
        className="border border-gray-300 rounded-md p-1 flex-grow w-full"
        value={move.b}
        onChange={(event) => handleMoveChange(event, "b")}
        onKeyUp={(e) => handleKeyDown(e)}
      />
    </div>
  );
};
