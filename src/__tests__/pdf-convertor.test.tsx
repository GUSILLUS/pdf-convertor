import { act } from "react";
import { render, screen, fireEvent, renderHook } from "@testing-library/react";
import { PDFConvertor } from "features/pdf-convertor";
import type { HistoryItem } from "shared/types";
import { useLocalStorage } from "shared/hooks";

jest.mock("shared/lib/utils", () => ({
  blobToBase64: jest.fn(() => Promise.resolve("base64string")),
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  cn: jest.fn((...inputs: any[]) => {
    return inputs
      .filter(Boolean) // Remove falsy values
      .map(input => {
        if (typeof input === 'string') {
          return input;
        }
        if (typeof input === 'object') {
          return Object.keys(input)
            .filter(key => input[key])
            .join(' ');
        }
        return '';
      })
      .join(' ');
  }),
}));

describe("PDFConvertor", () => {
  const mockOnItemSelect = jest.fn();
  const mockOnConvert = jest.fn();
  const mockIsLoading = false;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("renders without crashing", () => {
    render(
      <PDFConvertor
        onItemSelect={mockOnItemSelect}
        onConvert={mockOnConvert}
        isLoading={mockIsLoading}
      />,
    );
  });

  test("toggles between Message and History tabs", () => {
    render(
      <PDFConvertor
        onItemSelect={mockOnItemSelect}
        onConvert={mockOnConvert}
        isLoading={mockIsLoading}
      />,
    );

    // Initially, Message tab should be active
    expect(screen.getByText("Message")).toHaveClass("text-black");
    expect(screen.getByText("History")).toHaveClass("text-neutral-400");

    // Click on History tab
    fireEvent.click(screen.getByText("History"));
    expect(screen.getByText("History")).toHaveClass("text-black");
    expect(screen.getByText("Message")).toHaveClass("text-neutral-400");
  });

  test("calls handleConvert with correct arguments", () => {
    render(
      <PDFConvertor
        onItemSelect={mockOnItemSelect}
        onConvert={mockOnConvert}
        isLoading={mockIsLoading}
      />,
    );

    // Switch to Message tab
    fireEvent.click(screen.getByText("Message"));

    // Simulate text conversion
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Sample text" } });
    fireEvent.click(screen.getByText("Convert to PDF"));

    expect(mockOnConvert).toHaveBeenCalledWith(
      "Sample text",
      expect.any(Function),
    );
  });

  test("calls onItemSelect when an item is selected from history", () => {
    const { result } = renderHook(() =>
      useLocalStorage("history", [] as HistoryItem[]),
    );

    act(() => {
      result.current[1]([
        {
          text: "Sample history item",
          fileUrl: "sample-file-url",
          createdAt: "2021-09-01",
        },
      ]);
    });

    render(
      <PDFConvertor
        onItemSelect={mockOnItemSelect}
        onConvert={mockOnConvert}
        isLoading={mockIsLoading}
      />,
    );

    // Switch to History tab
    fireEvent.click(screen.getByText("History"));

    // Simulate item selection
    const historyItem = screen.getByText("Sample history item");
    fireEvent.click(historyItem);

    expect(mockOnItemSelect).toHaveBeenCalledWith("sample-file-url");
  });

  test("removes an item from history when delete is clicked", () => {
    const { result } = renderHook(() =>
      useLocalStorage("history", [] as HistoryItem[]),
    );

    act(() => {
      result.current[1]([
        {
          text: "Sample history item",
          fileUrl: "sample-file-url",
          createdAt: "2021-09-01",
        },
      ]);
    });

    render(
      <PDFConvertor
        onItemSelect={mockOnItemSelect}
        onConvert={mockOnConvert}
        isLoading={mockIsLoading}
      />,
    );

    // Switch to History tab
    fireEvent.click(screen.getByText("History"));

    // Simulate item deletion
    const deleteButton = screen.getByText("X");
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Sample history item")).not.toBeInTheDocument();
  });
});
