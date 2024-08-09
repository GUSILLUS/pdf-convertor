import { Button } from "components/ui";
import type React from "react";
import type { HistoryItem } from "shared/types";

type HistoryListProps = {
  history: HistoryItem[];
  onSelect: (fileUrl: string) => void;
  onDelete: (fileUrl: string) => void;
};

const HistoryList: React.FC<HistoryListProps> = ({
  history,
  onSelect,
  onDelete,
}) => {
  return (
    <ul className="flex flex-col grow gap-4 overflow-y-auto pt-4 px-6">
      {history.map(({ fileUrl, text, createdAt }) => (
        <li
          key={fileUrl}
          className="flex gap-2 items-center w-full justify-between border border-solid border-transparent hover:border-neutral-800 rounded-3xl px-4 py-2 cursor-pointer hover:bg-neutral-200 bg-transparent duration-300"
        >
          <button onClick={() => onSelect(fileUrl)} type="button">
            <p className="overflow-ellipsis overflow-hidden text-start w-[250px] whitespace-nowrap">
              {text}
            </p>
            <p className="text-start w-[250px] whitespace-nowrap">
              {createdAt}
            </p>
          </button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(fileUrl)}
          >
            X
          </Button>
        </li>
      ))}

      {history.length === 0 && (
        <p className="text-neutral-400 px-4">No history yet.</p>
      )}
    </ul>
  );
};

export { HistoryList };
