import { render, screen, fireEvent } from "@testing-library/react";
import SearchInput from "../../game-hub/src/components/SearchInput";
import { jest } from '@jest/globals';
import React from "react";

test("updates search field on user input", () => {
  const mockOnSearch = jest.fn();

  render(<SearchInput onSearch={mockOnSearch} />);

  const input = screen.getByPlaceholderText("Search for games...") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "Halo" } });

  expect(input.value).toBe("Halo");
});
