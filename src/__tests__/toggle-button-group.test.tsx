import { render, screen, fireEvent } from '@testing-library/react';
import { ToggleButtonGroup } from 'components/ui';

describe('ToggleButtonGroup', () => {
  const mockOnSelect = jest.fn();
  const options = ['Option 1', 'Option 2', 'Option 3'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<ToggleButtonGroup options={options} selectedOption="Option 1" onSelect={mockOnSelect} />);
  });

  test('displays all options', () => {
    render(<ToggleButtonGroup options={options} selectedOption="Option 1" onSelect={mockOnSelect} />);
    for (const option of options) {
      expect(screen.getByText(option)).toBeInTheDocument();
    }
  });

  test('applies correct class to selected option', () => {
    render(<ToggleButtonGroup options={options} selectedOption="Option 2" onSelect={mockOnSelect} />);
    expect(screen.getByText('Option 2')).toHaveClass('text-black');
    expect(screen.getByText('Option 1')).toHaveClass('text-neutral-400');
    expect(screen.getByText('Option 3')).toHaveClass('text-neutral-400');
  });

  test('calls onSelect with correct argument when an option is clicked', () => {
    render(<ToggleButtonGroup options={options} selectedOption="Option 1" onSelect={mockOnSelect} />);
    fireEvent.click(screen.getByText('Option 2'));
    expect(mockOnSelect).toHaveBeenCalledWith('Option 2');
  });
});