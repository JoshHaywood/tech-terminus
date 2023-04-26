import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import SearchBar from "../search-bar";

test("searches for query when user inputs and submits search term", () => {
  const setSearchBar = jest.fn();
  const query = "phone"; // User input
  render(
    <Router>
      <SearchBar
        variant="hero"
        setSearchBar={setSearchBar}
        setOverlay={jest.fn()}
      />
    </Router>
  );

  const input = screen.getByPlaceholderText("What are you looking for?");
  fireEvent.change(input, { target: { value: query } });
  fireEvent.keyDown(input, { key: "Enter", code: 13, charCode: 13 }); // Simulate user pressing enter

  expect(setSearchBar).toHaveBeenCalledWith(false);
  expect(window.location.pathname).toBe(`/results/${query}`); // Expect to navigate to results page with query as ID
});