import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

export default function SearchBar(props) {
  const { variant, setSearchBar, setOverlay } = props;

  const [query, setQuery] = useState(""); // State for search query
  const navigate = useNavigate();

  function submitHandler() {
    // If user hasn't inputted a search on submit and it is on the hero
    if (query.length === 0 && variant === "hero") {
      alert("Search bar is empty. Please enter a value to search.");
      // Else if user hasn't inputted a search on submit and isn't on the header
    } else if (query.length === 0) {
      setSearchBar(false);
       // Else user has made input
    } else {
      navigate(`/results/${query}`); // Navigates to results page with query as ID
      setSearchBar(false); // Closes search bar
    };

    // Clears search bar
    setQuery("");
  };

  return (
    <div
      className={`${
        variant === "hero" ? "shadow-lg" : "border"
      } w-full flex items-center justify-between rounded-lg bg-white`}
    >
      {/* Input */}
      <input
        id="search-bar"
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyDown={(e) => {
          e.key === "Enter" && submitHandler(); //Search on enter
        }}
        placeholder={
          variant === "hero" ? "What are you looking for?" : "Search products"
        }
        className={`${
          variant === "hero"
            ? "py-5 px-4 focus:outline-blue-600"
            : "p-2.5 focus:outline-none"
        } w-full text-sm rounded bg-white `}
      />

      {/* Search button */}
      <div onClick={submitHandler}>
        {/* If on hero */}
        {variant === "hero" ? (
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(to right, #7C3AED, #2563EB)",
              textTransform: "none",
              borderRadius: "0.5rem",
              margin: "0 1rem",
              padding: "0.5rem 1rem",

              ":hover": {
                background: "linear-gradient(to right, #7C3AED, #7C3AED)",
              },
            }}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
              {/* Attribution to https://heroicons.com/ */}
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            Search
          </Button>
        ) : (
          /* Else on header */
          <svg
            onClick={() => {
              setOverlay(false);
            }}
            className="w-5 h-5 mx-2.5 text-violet-600 hover:text-violet-700 hover:cursor-pointer"
            viewBox="0 0 24 24"
            fill="none"
          >
            {/* Attribution to https://heroicons.com/ */}
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        )}
      </div>
    </div>
  );
};