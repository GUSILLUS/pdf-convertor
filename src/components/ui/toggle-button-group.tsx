
import { cn } from 'shared/lib/utils';
import { Tab } from './tab';

interface Props {
  options: string[];
  selectedOption: string;
  onSelect: (value: string) => void;
  className?: string;
}

export const ToggleButtonGroup = ({ options, selectedOption, onSelect, className }: Props) => (
  <ul className={cn('flex w-min', className)}>
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
