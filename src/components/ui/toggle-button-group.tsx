
import { cn } from 'shared/lib/utils';
import { Tab } from './tab';

interface Props {
  options: string[];
  selectedOption: string;
  onSelect: (value: string) => void;
}

export const ToggleButtonGroup = ({ options, selectedOption, onSelect }: Props) => (
  <ul className="flex w-min mb-2">
    {options.map((option) => {
      const isSelectedOption = selectedOption === option;

      return (
        <li key={option}>
          <Tab isSelectedOption={isSelectedOption} onSelect={onSelect} option={option} />
        </li>
      );
    })}
  </ul>
);
