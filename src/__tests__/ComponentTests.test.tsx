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
import { waitFor } from "@testing-library/react";

const mockGame: Game = {
    id: 1,
    name: "Test Game",
    background_image: "test.jpg",
    parent_platforms: [{ platform: { id: 1, name: "PC", slug: "pc" } }],
    metacritic: 85,
    rating_top: 4,
  };

const mockSelectGenre = jest.fn();
const mockSelectPlatform = jest.fn();

describe("Component Rendering & Behavior", () => {
  // ✅ Test 1: 
  test("GameCard component renders without errors", () => {
    render(<GameCard game={mockGame} />);
    expect(screen.getByText("Test Game")).toBeInTheDocument();
  });

  // ✅ Test 2:
  test("GenreList component renders without errors", () => {
    render(<GenreList onSelectGenre={function (genre: Genre): void {
        throw new Error("Function not implemented.");
    } } selectedGenre={null} />);
    expect(screen.getByTestId("genre-filter")).toBeInTheDocument();
  });

  // ✅ Test 3: 
  test("PlatformSelector component renders without errors", () => {
    render(<PlatformSelector onSelectPlatform={function (platform: Platform): void {
        throw new Error("Function not implemented.");
    } } selectedPlatform={null} />);
    expect(screen.getByTestId("platform-filter")).toBeInTheDocument();
  });

  // ✅ Test 4: 
  test("Search bar updates state correctly when users input text", () => {
    render(<SearchInput onSearch={function (searchText: string): void {
        throw new Error("Function not implemented.");
    } } />);
    const searchInput = screen.getByPlaceholderText("Search games...");
    fireEvent.change(searchInput, { target: { value: "Zelda" } });
    expect(searchInput).toHaveValue("Zelda");
  });

  // ✅ Test 5: 
  test("Order by Relevance dropdown renders and updates sorting method", async () => {
    render(<SortSelector onSelectSortOrder={jest.fn()} sortOrder={""} />);
  
    const dropdown = screen.getByRole("button", { name: /order by/i });
    fireEvent.click(dropdown);
    
    // ✅ Wait until the menu items are visible
    const popularityOption = await waitFor(() =>
      screen.getByRole("menuitem", { name: /popularity/i })
    );
  
    fireEvent.click(popularityOption);
    expect(dropdown).toHaveTextContent("Popularity");
  });

  // ✅ Test 6: 
  test("Genre filter buttons apply correct filters", () => {
    render(<GenreList onSelectGenre={mockSelectGenre} selectedGenre={null} />);
    const actionButton = screen.getByText("Action");
    fireEvent.click(actionButton);
    expect(mockSelectGenre).toHaveBeenCalled();
  });

  // ✅ Test 7: 
  test("Platform filter buttons apply correct filters", async () => {
    const mockSelectPlatform = jest.fn();
    render(<PlatformSelector onSelectPlatform={mockSelectPlatform} selectedPlatform={null} />);
    
    // Open the menu before searching for menu items
    const dropdown = screen.getByRole("button", { name: /platforms/i });
    fireEvent.click(dropdown);
  
    // Wait for the menu items to appear
    const pcButton = await screen.findByRole("menuitem", { name: /PC/i });
    fireEvent.click(pcButton);
  
    expect(mockSelectPlatform).toHaveBeenCalled();
  });

  // ✅ Test 8: 
  test("Dark mode toggle works correctly", () => {
    const toggleButton = screen.getByRole("checkbox");
    fireEvent.click(toggleButton);
    expect(document.body).toHaveClass("dark-mode");
  });
});
