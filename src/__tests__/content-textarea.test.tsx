import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ContentTextarea } from "features/content-textarea";

describe("ContentTextarea", () => {
  const mockOnConvert = jest.fn();

  const setup = (isLoading = false) => {
    render(<ContentTextarea onConvert={mockOnConvert} isLoading={isLoading} />);
  };

  beforeEach(() => {
    mockOnConvert.mockClear();
  });

  test("renders correctly", () => {
    setup();
    expect(screen.getByPlaceholderText("Type your message here.")).toBeInTheDocument();
    expect(screen.getByText("Convert to PDF")).toBeInTheDocument();
  });

  test("updates textarea value on change", () => {
    setup();
    const textarea = screen.getByPlaceholderText("Type your message here.");
    fireEvent.change(textarea, { target: { value: "Hello, world!" } });
    expect(textarea).toHaveValue("Hello, world!");
  });

  test("calls onConvert with correct text and clears textarea on button click", () => {
    setup();
    const textarea = screen.getByPlaceholderText("Type your message here.");
    const button = screen.getByText("Convert to PDF");

    fireEvent.change(textarea, { target: { value: "Hello, world!" } });
    fireEvent.click(button);

    expect(mockOnConvert).toHaveBeenCalledWith("Hello, world!");
    expect(textarea).toHaveValue("");
  });

  test("button is disabled when isLoading is true", () => {
    setup(true);
    const button = screen.getByText("Convert to PDF");
    expect(button).toBeDisabled();
  });

  test("button is disabled when textarea is empty", () => {
    setup();
    const button = screen.getByText("Convert to PDF");
    expect(button).toBeDisabled();
  });

  test("button is enabled when textarea is not empty and isLoading is false", () => {
    setup();
    const textarea = screen.getByPlaceholderText("Type your message here.");
    const button = screen.getByText("Convert to PDF");

    fireEvent.change(textarea, { target: { value: "Hello, world!" } });
    expect(button).not.toBeDisabled();
  });
});