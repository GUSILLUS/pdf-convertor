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
    <ul className="flex grow flex-col gap-4 overflow-y-auto px-2 pt-4 md:px-6">
      {[...history].reverse().map(({ fileUrl, text, createdAt }) => (
        <li
          key={fileUrl}
          className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-3xl border border-transparent border-solid bg-transparent px-2 py-2 duration-300 hover:border-neutral-800 hover:bg-neutral-200 md:px-4"
        >
          <button onClick={() => onSelect(fileUrl)} type="button">
            <p className="w-[150px] overflow-hidden overflow-ellipsis whitespace-nowrap text-start md:w-[250px]">
              {text}
            </p>
            <p className="w-[150px] whitespace-nowrap text-start md:w-[250px]">
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
        <p className="px-4 text-neutral-400">No history yet.</p>
      )}
    </ul>
  );
};

export { HistoryList };
