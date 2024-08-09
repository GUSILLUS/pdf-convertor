import { render, screen, fireEvent } from '@testing-library/react';
import { HistoryList } from 'features/history-list';
import type { HistoryItem } from 'shared/types';

describe('HistoryList', () => {
  const mockHistory: HistoryItem[] = [
    { fileUrl: 'file1.txt', text: 'File 1', createdAt: '2023-01-01' },
    { fileUrl: 'file2.txt', text: 'File 2', createdAt: '2023-01-02' },
  ];

  const mockOnSelect = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<HistoryList history={mockHistory} onSelect={mockOnSelect} onDelete={mockOnDelete} />);
  });

  test('displays history items', () => {
    render(<HistoryList history={mockHistory} onSelect={mockOnSelect} onDelete={mockOnDelete} />);
    expect(screen.getByText('File 1')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    expect(screen.getByText('File 2')).toBeInTheDocument();
    expect(screen.getByText('2023-01-02')).toBeInTheDocument();
  });

  test('calls onSelect with correct argument when a history item is clicked', () => {
    render(<HistoryList history={mockHistory} onSelect={mockOnSelect} onDelete={mockOnDelete} />);
    fireEvent.click(screen.getByText('File 1'));
    expect(mockOnSelect).toHaveBeenCalledWith('file1.txt');
  });

  test('calls onDelete with correct argument when delete button is clicked', () => {
    render(<HistoryList history={mockHistory} onSelect={mockOnSelect} onDelete={mockOnDelete} />);
    fireEvent.click(screen.getAllByText('X')[0]);
    expect(mockOnDelete).toHaveBeenCalledWith('file1.txt');
  });

  test('displays empty state message when there are no history items', () => {
    render(<HistoryList history={[]} onSelect={mockOnSelect} onDelete={mockOnDelete} />);
    expect(screen.getByText('No history yet.')).toBeInTheDocument();
  });
});