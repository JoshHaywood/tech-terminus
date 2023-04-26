import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const checkboxes = [
  {
    label: "Up to £39.99",
    filter: "0",
    filterLimit: "39.99",
  },
  {
    label: "£40 to £59.99",
    filter: "40",
    filterLimit: "59.99",
  },
  {
    label: "£60 to £79.99",
    filter: "60",
    filterLimit: "79.99",
  },
  {
    label: "£80 to £99.99",
    filter: "80",
    filterLimit: "99.99",
  },
  {
    label: "£100 to £199.99",
    filter: "100",
    filterLimit: "199.99",
  },
];

export default function Sidebar(props) {
  const navigate = useNavigate();

  const { isntDesktop, sidebar, setSidebar, setLoading, setFilter, setFilterLimit } = props;
  const [filterReset, setFilterReset] = useState(false);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    //Gets all brands
    axios.get("/products/brands")
    .then((res) => {
      setRows(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <>
      {/* Overlay */}
      {sidebar && isntDesktop && ( // If sidebar is open and the user is on mobile
        <div className="h-screen w-screen fixed top-0 right-0 opacity-50 z-20 backdrop-blur bg-slate-400"></div>
      )}

      {/* Sidebar */}
      {sidebar && ( // If sidebar is open
        <div className="lg:w-1/5 h-screen absolute right-0 top-0 z-30 lg:relative p-20 lg:px-0 lg:py-2 space-y-5 rounded border-l border-gray-50 bg-slate-800 lg:bg-gray-50">
          {/* Close button */}
          {isntDesktop && (
            /* Attribution: https://heroicons.com */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              onClick={() => setSidebar(!sidebar)}
              className="w-6 h-6 absolute right-5 top-5 cursor-pointer text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}

          {/* Checkboxes */}
          <div>
            <h3 className="text-base text-white lg:text-gray-700 font-bold">
              Price
            </h3>

            {checkboxes.map((label, index) => {
              return (
                <div key={index} className="mt-2.5">
                  <input
                    onClick={() => {
                      setLoading(true); //Sets loading to true
                      setFilter(label.filter); //Sets filter to the filter value
                      setFilterLimit(label.filterLimit); //Sets filter limit to the filter limit value
                      setFilterReset(true); //Sets filter reset to true
                    }}
                    className="h-4 w-4 border border-gray-300 rounded-sm bg-white accent-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="checkbox"
                  />
                  <label className="inline-block text-white lg:text-gray-500">
                    {label.label}
                  </label>
                </div>
              );
            })}
          </div>

          <hr className="border-white lg:border-gray-300" />

          <div>
            <h3 className="text-base text-white lg:text-gray-700 font-bold">
              Brand
            </h3>

            {rows.map((row, index) => {
              return (
                <div key={index} className="mt-2.5">
                  <input
                    onClick={() => {
                      setLoading(true);
                      navigate(`/results/${row.brand}`);
                    }} // Redirects to results page with brand as a parameter
                    className="h-4 w-4 border border-gray-300 rounded-sm bg-white accent-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="checkbox"
                  />
                  <label className="inline-block text-white lg:text-gray-500">
                    {row.brand}
                  </label>
                </div>
              );
            })}
          </div>

          <hr className="border-white lg:border-gray-300" />

          {/* Reset button */}
          {filterReset && (
            <div className="space-y-5">
              <div className="flex items-center justify-between py-2 px-4 border rounded-lg text-white lg:text-gray-700">
                Current filters:{" "}
                <span className="ml-5 text-white lg:text-gray-500">
                  £{props.filter} - £{props.filterLimit}
                </span>
              </div>

              <div
                onClick={() => {
                  setFilterReset(false); //Sets filter reset to false
                  setFilter("0"); //Sets filter to default
                  setFilterLimit("2147483647"); //Sets filter limit to default
                  setLoading(true); //Sets loading to true

                  // If not on desktop
                  if (isntDesktop) {
                    setSidebar(!sidebar); //Toggle sidebar
                  }
                }}
                className="flex items-center justify-between py-2 px-4 border rounded-lg hover:shadow cursor-pointer transition-colors text-white lg:text-gray-700 hover:underline decoration-white lg:decoration-black lg:hover:text-gray-900 hover:cursor-pointer"
              >
                <label className="hover:cursor-pointer">Remove filters</label>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};