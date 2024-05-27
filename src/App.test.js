import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { act } from "react-dom/test-utils";

test("renders the App component", async () => {
  render(<App />);

  // Wait for the initial data to load
  await screen.findByText("Loading...");

  // Check if the search input and photo cards are rendered
  expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();

  // Simulate search input
  const searchInput = screen.getByPlaceholderText("Search");
  userEvent.type(searchInput, "example search");

  // Wait for debounce timeout
  await new Promise((r) => setTimeout(r, 2000));
});
