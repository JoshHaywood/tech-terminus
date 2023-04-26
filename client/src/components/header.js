import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive"
import axios from "axios";

import SearchBar from "./search-bar";
import Button from "@mui/material/Button";

export default function Header() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  const [dropdown, setDropdown] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [cartNumber, setCartNumber] = useState(0);
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    // Get username
    axios.get("/auth/validate")
    .then((res) => {
      //If user is logged in
      if (res.data.loggedIn === true) {
        //Set username to user's first name
        setUsername(res.data.user);
      }
    })
    .catch((err) => {
      console.log(err);
    });

    // Get cart number
    axios.get("/checkout/get")
    .then((res) => {
      if (res.data !== "Please login to view cart") {
        setCartNumber(res.data.length);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  // Logout handler
  const logoutHandler = () => {
    // Logout user
    axios.post("/auth/logout")
    .then((res) => {
      setUsername(""); // Defaults username
      setCartNumber(0); // Defaults cart number
      navigate("/"); // Redirects to home page
    })
    .catch((err) => {
      console.log(err);
    });
  };

  // Mobile header component
  function MobileHeader() {
    return (
      <div className="relative w-full flex items-center mx-auto py-3">
        {/* Search bar */}
        {searchBar ? (
          <>
            <div className="z-50 absolute left-0 right-0 -ml-5 mt-28 py-2 bg-white w-screen">
              <div className="w-2/3 mx-auto">
                <SearchBar
                  searchBar={searchBar}
                  setSearchBar={setSearchBar}
                  setOverlay={setOverlay}
                />
              </div>
            </div>

            {/* Close button */}
            <div className="z-10 justify-start cursor-pointer transition-colors hover:text-violet-600">
              {/* Attribution: https://heroicons.com */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                onClick={() => setSearchBar(!searchBar)}
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </>
        ) : (
          <div
            className="z-10 justify-start cursor-pointer"
            onClick={() => {
              setSearchBar(!searchBar);
              setOverlay(true);
            }}
          >
            <svg
              className="w-5 h-5 transition-colors hover:text-violet-600"
              viewBox="0 0 24 24"
              fill="none"
            >
              {" "}
              {/* Attribution to https://heroicons.com/ */}
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
        )}

        {/* Logo */}
        <Link to="/" className="z-30 absolute left-0 right-0 w-min mx-auto">
          <div
            id="logo"
            className="font-['FreeSans'] font-bold text-2xl text-gray-700 hover:cursor-pointer"
          >
            TechTerminus
          </div>
        </Link>

        {/* Nav links */}
        <div className="w-full flex justify-end items-center z-10">
          {username ? (
            <div className="flex flex-row items-center space-x-2.5">
              <div
                onMouseEnter={() => {
                  setDropdown(true);
                  setOverlay(true);
                }}
                className="m-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 transition-colors hover:text-violet-500"
                >
                  {/* Attribution: Heroicons */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
          ) : (
            <Link to="/login" className="m-2 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 transition-colors hover:text-violet-500"
              >
                {/* Attribution: https://heroicons.com */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Link>
          )}

          {/* Cart */}
          <Link
            to={username ? "/checkout" : "/login"}
            className="relative cursor-pointer"
          >
            {/* Attribution: https://heroicons.com */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 transition-colors hover:text-violet-500"
            >
              {/* Attribution: https://heroicons.com */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            {cartNumber > 0 && (
              <div className="absolute top-0 right-0 -mt-0.5 -mr-0.5 w-4 h-4 text-[11px] text-center rounded-full text-white bg-red-600">
                {cartNumber}
              </div>
            )}
          </Link>
        </div>

        {/* If dropdown set to active */}
        {dropdown && (
          <div className="z-50 absolute right-0 mt-52 px-2.5 py-4 text-sm shadow-lg border rounded bg-white">
            <div className="text-xs text-center mr-5">
              Hello <span className="font-bold text-violet-600">{username}</span>
            </div>

            <hr className="mt-5 border-t" />

            <div className="mt-2 whitespace-nowrap font-semibold">
              Your Account
            </div>

            <div
              onClick={() => {
                logoutHandler();
                setDropdown(false);
                setOverlay(false);
              }}
              className="mt-2 cursor-pointer hover:underline text-gray-500"
            >
              Logout
            </div>

            <hr className="h-px mt-4 border-t" />
          </div>
        )}
      </div>
    );
  };

  // Desktop header component
  function DesktopHeader() {
    return (
      <div className="max-w-[1350px] mx-auto flex flex-row justify-between items-center py-2">
        <div className="flex items-center">
          {/* Logo */}
          <Link to="/" className="mr-5">
            <div
              id="logo"
              className="font-['FreeSans'] font-bold text-2xl text-gray-700"
            >
              TechTerminus
            </div>
          </Link>

          <Link to="/contact" className="mx-3.5 my-2 cursor-pointer">
            Contact
          </Link>
        </div>

        {/* Nav links */}
        <div className="flex items-center">
          {/* Search bar */}
          {searchBar ? (
            <div className="z-50 ml-4">
              <SearchBar
                searchBar={searchBar}
                setSearchBar={setSearchBar}
                setOverlay={setOverlay}
              />
            </div>
          ) : (
            <div
              className="cursor-pointer"
              onClick={() => {
                setSearchBar(!searchBar);
                setOverlay(true);
              }}
            >
              <svg
                className="w-5 h-5 transition-colors hover:text-violet-600"
                viewBox="0 0 24 24"
                fill="none"
              >
                {" "}
                {/* Attribution to https://heroicons.com/ */}
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          )}

          {/* Cart */}
          <Link
            to={username ? "/checkout" : "/login"}
            className="relative mx-8 cursor-pointer"
          >
            {/* Attribution: https://heroicons.com */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 transition-colors hover:text-violet-500"
            >
              {/* Attribution: https://heroicons.com */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>

            {cartNumber > 0 && (
              <div className="absolute top-0 right-0 -mt-0.5 -mr-0.5 w-4 h-4 text-[11px] text-center rounded-full text-white bg-red-600">
                {cartNumber}
              </div>
            )}
          </Link>

          {username ? (
            <div className="relative">
              <div
                onMouseEnter={() => {
                  setDropdown(true);
                  setOverlay(true);
                }}
                className="flex flex-col mx-2.5    cursor-pointer "
              >
                <div className="text-xs">
                  Hello{" "}
                  <span className="font-bold text-violet-600">{username}</span>
                </div>

                <div className="flex items-center space-x-1">
                  <div className="text-sm">Account</div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    {/* Attribution: https://heroicons.com/ */}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
              </div>

              {dropdown && (
                <div className="z-50 absolute right-0 mt-2 p-5 space-y-1 text-sm border rounded bg-white">
                  <div className="whitespace-nowrap font-semibold">
                    Your Account
                  </div>
                  <div
                    onClick={() => {
                      logoutHandler();
                      setDropdown(false);
                      setOverlay(false);
                    }}
                    className="cursor-pointer text-gray-500"
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              onClick={() => {navigate("/login")}}
              variant="contained"
              sx={{
                background: "linear-gradient(to right, #7C3AED, #2563EB)",
                textTransform: "none",
                borderRadius: "0.5rem",
                width: "8rem",

                ":hover": {
                  background: "linear-gradient(to right, #7C3AED, #7C3AED)",
                },
              }}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Overlays */}
      {searchBar && overlay && (
        <div
          onMouseEnter={() => {
            setSearchBar(false);
            setDropdown(false);
            setOverlay(false);
          }}
          className={`${
            isMobile ? "top-16" : "top-[59px]"
          } h-screen w-screen fixed top-16 right-4 opacity-50 z-40 backdrop-blur bg-slate-400`}
        ></div>
      )}

      {dropdown && overlay && (
        <div
          onMouseEnter={() => {
            setSearchBar(false);
            setDropdown(false);
            setOverlay(false);
          }}
          className={`${
            isMobile ? "top-16" : "top-[57px]"
          } h-screen w-screen fixed top-16 right-4 opacity-50 z-40 backdrop-blur bg-slate-400`}
        ></div>
      )}

      <div className="pl-2 pr-5 2xl:px-0 w-screen top-0 z-50 bg-white shadow">
        {isMobile ? <MobileHeader /> : <DesktopHeader />}
      </div>
    </>
  );
};