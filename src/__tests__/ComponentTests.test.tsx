import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import GameCard from "../../game-hub/src/components/GameCard";
import GenreList from "../../game-hub/src/components/GenreList";
import PlatformSelector from "../../game-hub/src/components/PlatformSelector";
import SearchInput from "../../game-hub/src/components/SearchInput";
import SortSelector from "../../game-hub/src/components/SortSelector";
import ColorModeSwitch from "../../game-hub/src/components/ColorModeSwitch";
import { Genre } from "../../game-hub/src/hooks/useGenres";
import { Game, Platform } from "../../game-hub/src/hooks/useGames";

const mockGame: Game = {
    id: 1,
    name: "Test Game",
    background_image: "test.jpg",
    parent_platforms: [{ platform: { id: 1, name: "PC", slug: "pc" } }],
    metacritic: 85,
    rating_top: 4,
  };

describe("Component Rendering & Behavior", () => {
  test("GameCard component renders without errors", () => {
    render(<GameCard game={mockGame} />);
    expect(screen.getByText("Test Game")).toBeInTheDocument();
  });

  test("GenreList component renders without errors", () => {
    render(<GenreList onSelectGenre={function (genre: Genre): void {
        throw new Error("Function not implemented.");
    } } selectedGenre={null} />);
    expect(screen.getByTestId("genre-filter")).toBeInTheDocument();
  });

  test("PlatformSelector component renders without errors", () => {
    render(<PlatformSelector onSelectPlatform={function (platform: Platform): void {
        throw new Error("Function not implemented.");
    } } selectedPlatform={null} />);
    expect(screen.getByTestId("platform-filter")).toBeInTheDocument();
  });

  test("Search bar updates state correctly when users input text", () => {
    render(<SearchInput onSearch={function (searchText: string): void {
        throw new Error("Function not implemented.");
    } } />);
    const searchInput = screen.getByPlaceholderText("Search games...");
    fireEvent.change(searchInput, { target: { value: "Zelda" } });
    expect(searchInput).toHaveValue("Zelda");
  });

  test("Order by Relevance dropdown renders and updates sorting method", () => {
    render(<SortSelector onSelectSortOrder={function (sortOrder: string): void {
        throw new Error("Function not implemented.");
    } } sortOrder={""} />);
    const dropdown = screen.getByRole("combobox");
    fireEvent.change(dropdown, { target: { value: "popularity" } });
    expect(dropdown).toHaveValue("popularity");
  });

  test("Genre filter buttons apply correct filters", () => {
    render(<GenreList onSelectGenre={function (genre: Genre): void {
        throw new Error("Function not implemented.");
    } } selectedGenre={null} />);
    const actionButton = screen.getByText("Action");
    fireEvent.click(actionButton);
    expect(actionButton).toHaveClass("active");
  });

  test("Platform filter buttons apply correct filters", () => {
    render(<PlatformSelector onSelectPlatform={function (platform: Platform): void {
        throw new Error("Function not implemented.");
    } } selectedPlatform={null} />);
    const pcButton = screen.getByText("PC");
    fireEvent.click(pcButton);
    expect(pcButton).toHaveClass("active");
  });

  test("Dark mode toggle works correctly", () => {
    render(<ColorModeSwitch />);
    const toggleButton = screen.getByRole("switch");
    fireEvent.click(toggleButton);
    expect(document.body).toHaveClass("dark-mode");
  });
});
