import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tab } from 'components/ui';

describe('Tab', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<Tab isSelectedOption={false} option="Option 1" onSelect={mockOnSelect} />);
  });

  test('displays option text', () => {
    render(<Tab isSelectedOption={false} option="Option 1" onSelect={mockOnSelect} />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  test('applies correct class based on isSelectedOption', () => {
    const { rerender } = render(<Tab isSelectedOption={true} option="Option 1" onSelect={mockOnSelect} />);
    expect(screen.getByText('Option 1')).toHaveClass('text-black');

    rerender(<Tab isSelectedOption={false} option="Option 1" onSelect={mockOnSelect} />);
    expect(screen.getByText('Option 1')).toHaveClass('text-neutral-400');
  });

  test('calls onSelect with correct argument when button is clicked', () => {
    render(<Tab isSelectedOption={false} option="Option 1" onSelect={mockOnSelect} />);
    fireEvent.click(screen.getByText('Option 1'));
    expect(mockOnSelect).toHaveBeenCalledWith('Option 1');
  });
});