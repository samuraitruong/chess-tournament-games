import React from "react";
import axios from "axios";

export interface DownloadModalProps {
  value: string;
  show: boolean;
  fileName: string;
  onAction?: (action: "save" | "cancel") => void;
}

const DownloadModal = ({
  value,
  show,
  onAction,
  fileName,
}: DownloadModalProps) => {
  if (!show) return null;

  const handleDownload = () => {
    const blob = new Blob([value], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "text-file.pgn";
    link.click();
    URL.revokeObjectURL(url);
  };

  const syncData = () => {
    // TODO: sync data to github
    axios.post(process.env.NEXT_PUBLIC_COMMIT_API_URL || "", {
      repoOwner: "samuraitruong",
      repoName: "chess-tournament-games",
      filePath: "tournaments/" + fileName,
      commitMessage: "Pgn file commit from pgn-editor",
      content: value,
    });
  };
  const handleOnClick = (action: "save" | "cancel") => {
    if (onAction) {
      onAction(action);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">PGN Download</h2>
        <textarea
          className="border border-gray-300 rounded-md p-2 w-full h-80 resize-y"
          value={value}
          onChange={(e) => console.log(e.target.value)} // Handle change event if needed
        />
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
            onClick={() => handleOnClick("cancel")}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
            onClick={handleDownload}
          >
            Download
          </button>

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
            onClick={syncData}
          >
            Sync
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
