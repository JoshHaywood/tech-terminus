import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive"
import axios from "axios";
import Helmet from "react-helmet";

import Breadcrumb from "../components/breadcrumb";
import Sidebar from "../components/products/sidebar";
import ClipLoader from "react-spinners/ClipLoader";
import Product from "../components/products/product";
import ResultsStepper from "../components/products/results-stepper";

const sortByOptions = [
  {
    sortBy: "A to Z",
    label: "A to Z",
  },
  {
    sortBy: "Z to A",
    label: "Z to A",
  },
  {
    sortBy: "Price: Low to High",
    label: "Price: Low to High",
  },
  {
    sortBy: "Price: High to Low",
    label: "Price: High to Low",
  },
];

const productPerPage = [
  {
    limit: 20,
    label: "20",
  },
  {
    limit: 40,
    label: "40",
  },
  {
    limit: 60,
    label: "60",
  },
  {
    limit: 80,
    label: "80",
  },
  {
    limit: 100,
    label: "100",
  },
];

export default function Results() {
  const { id } = useParams(); //Extracts ID from URL
  const [rows, setRows] = useState([]);

  const isntDesktop = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [sidebar, setSidebar] = useState(isntDesktop ? false : true); //Sets sidebar to false if screen is smaller than desktop
  const [filter, setFilter] = useState("0"); //Sets to 0 to prevent default filtering
  const [filterLimit, setFilterLimit] = useState("2147483647"); //Set to max int value to include all products

  //Set drop down menus
  const [sortDropdown, setSortDropdown] = useState(false);
  const [sortBy, SetSortBy] = useState("A to Z"); //Set limit to A to Z by default

  const [perPageDropdown, setPerPageDropdown] = useState(false);
  const [limit, setLimit] = useState(40); //Sets limit 40 by default
  const [moreResults, setMoreResults] = useState(true); //Sets view more results to true by default

  const [loading, setLoading] = useState(false); //Sets loading to false by default

  //Gets all products
  useEffect(() => {
    axios.get("/products/get")
    .then((res) => {
      setRows(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  //Filters rows that match ID alphabetically
  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(id.toLowerCase())
  );

  setTimeout(() => setLoading(false), 500); //Sets load time

  return (
    <>
      <Helmet>
        <title>Tech Terminus | {id}</title>
      </Helmet>

      <Breadcrumb
        crumbOneLink="/"
        crumbOneRoute="/results"
        crumbOneName="Results"
        crumbTwoLink={`/results/${id}`}
        crumbTwoRoute="/results/"
        crumbTwoName={id}
      />

      <div className="py-16 max-w-[1350px] mx-5 2xl:mx-auto">
        {/* Heading */}
        <h1 className="lg:mt-10 text-4xl font-bold tracking-wide">
          Search results
        </h1>
        <p className="mt-4 text-lg font-medium text-gray-500">
          Heres a list of products based on your search term: {id}
        </p>

        <hr className="mt-10 border-gray-300"></hr>

        <div className="w-full lg:flex lg:space-x-10 mt-8">
          {/* Sidebar */}
          <Sidebar
            isntDesktop={isntDesktop}
            sidebar={sidebar}
            setSidebar={setSidebar}
            setLoading={setLoading}
            filter={filter}
            setFilter={setFilter}
            filterLimit={filterLimit}
            setFilterLimit={setFilterLimit}
          />

          <div className="w-full lg:w-4/5">
            {/* Drop downs */}
            <div className="sm:flex items-center md:justify-center lg:justify-start space-y-5 sm:space-y-0 sm:space-x-10 md:space-x-5">
              {/* Sort by dropdown */}
              <div className="relative w-full h-min sm:w-1/3 cursor-pointer">
                <div
                  onClick={() => {
                    // If sidebar is open, don't open dropdown
                    if (sidebar && isntDesktop) {
                      setSortDropdown(false);
                    }

                    // Else toggle dropdown
                    else {
                      setSortDropdown(!sortDropdown);
                    }
                  }}
                  className={`${
                    sidebar && isntDesktop ? "border-0" : "border"
                  } flex justify-between items-center py-2 px-4 border rounded`}
                >
                  <label className="font-bold text-gray-500 cursor-pointer">
                    Sort by: <span className="font-medium">query</span>
                  </label>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-600"
                  >
                    {" "}
                    {/* Attribution to https://heroicons.com/ */}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>

                <ul
                  className={`${
                    sortDropdown ? "block" : "hidden"
                  } absolute w-full z-10 mt-2 py-2.5 px-4 space-y-2.5 border rounded bg-gray-50`}
                >
                  {sortByOptions.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        // Sets query to selected option and sets loading to true
                        SetSortBy(item.sortBy);
                        setLoading(true);
                        setSortDropdown(false);
                      }}
                      className="cursor-pointer text-gray-500"
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Product per page dropdown */}
              <div className="relative w-full h-min sm:w-1/3 cursor-pointer">
                <div onClick={() => {
                    // If sidebar is open, don't open dropdown
                    if (sidebar && isntDesktop) {
                      setPerPageDropdown(false);
                      // Else toggle dropdown
                    } else {
                      setPerPageDropdown(!perPageDropdown);
                    }
                  }}
                  className={`${
                    sidebar && isntDesktop ? "border-0" : "border"
                  } flex justify-between items-center py-2 px-4 border rounded`}
                >
                  <label className="font-bold text-gray-500 cursor-pointer">
                    Products per page: <span className="font-medium">query</span>
                  </label>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-600"
                  >
                    {" "}
                    {/* Attribution to https://heroicons.com/ */}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>

                <ul
                  className={`${
                    perPageDropdown ? "block" : "hidden"
                  } absolute w-full z-10 mt-2 py-2.5 px-4 space-y-2.5 border rounded bg-gray-50`}
                >
                  {productPerPage.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setLimit(item.limit);
                        setLoading(true);
                        setPerPageDropdown(false);
                      }} // Sets query to selected option and sets loading to true
                      className="cursor-pointer text-gray-500"
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Filter dropdown for non-desktop */}
              {isntDesktop && (
                <div
                  onClick={() => setSidebar(!sidebar)} // Toggles sidebar
                  className={`${
                    sidebar ? "border-0" : "border"
                  } w-full h-min sm:w-1/3 flex justify-between items-center py-2 px-4 border rounded cursor-pointer`}
                >
                  <label className="font-bold text-gray-500 cursor-pointer">
                    Filters <span className="font-medium">query</span>
                  </label>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-600"
                  >
                    {" "}
                    {/* Attribution to https://heroicons.com/ */}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                    />
                  </svg>
                </div>
              )}
            </div>

            <p className="mt-6 italic text-gray-500">
              {filteredRows.length} results found
            </p>

            {/* Loading animation */}
            {loading ? (
              <div className="lg:absolute lg:top-[50%] lg:translate-y-[-50%] lg:left-0 lg:right-0 my-60 lg:my-0 flex justify-center">
                <ClipLoader size={50} />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                {
                  //Product list
                  //Sorting method
                  (sortBy === "A to Z" && filteredRows.sort((a, b) => a.name.localeCompare(b.name)),
                    sortBy === "Z to A" && filteredRows.sort((a, b) => b.name.localeCompare(a.name)),
                    sortBy === "Price: Low to High" && filteredRows.sort(
                      (a, b) => parseFloat(a.price) - parseFloat(b.price)
                    ),
                    sortBy === "Price: High to Low" && filteredRows.sort(
                      (a, b) => parseFloat(b.price) - parseFloat(a.price)
                    ),
                    filteredRows
                    .slice(0, limit + 1) //Slice to limit, with plus one to reach limit
                    .filter(
                      (row) => row.price > filter && row.price < filterLimit
                    ) //Filter by price
                    .map((row, index) => {
                      //Map products
                      return (
                        <Product
                          row={row}
                          index={index}
                          setMoreResults={setMoreResults}
                          isMobile={isMobile}
                        />
                      );
                    })
                  )
                }
              </div>
            )}

            {!loading && (
              /* Pagination */
              <ResultsStepper
                limit={limit}
                setLimit={setLimit}
                moreResults={moreResults}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};