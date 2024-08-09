import { cn } from "shared/lib/utils";

interface Props {
  isSelectedOption: boolean;
  option: string;
  onSelect: (value: string) => void;
}

export const Tab = ({ isSelectedOption, option, onSelect }: Props) => (
  <button
    className="px-4 py-2 duration-300"
    type="button"
    onClick={() => onSelect(option)}
  >
    <p
      className={cn(
        "duration-300",
        { "text-black": isSelectedOption },
        { "text-neutral-400": !isSelectedOption },
      )}
    >
      {option}
    </p>
  </button>
);
