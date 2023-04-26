import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive"
import { Helmet } from "react-helmet";
import axios from "axios";

import Button from "@mui/material/Button";
import Breadcrumb from "../components/breadcrumb";
import LatestProducts from "../components/index/latest-products";

export default function ProductView() {
  const { id } = useParams(); // Gets the id from the url
  const [rows, setRows] = useState([]);

  const [error, setError] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  useEffect(() => {
    // Gets product
    axios
      .get("/products/get")
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Filters rows that match ID alphabetically
  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().startsWith(id.toLowerCase())
  );

  const addToCart = () => {
    // Add product to cart
    axios.post("/checkout/add", {
      productName: filteredRows[0].name,
      price: filteredRows[0].price,
      image: filteredRows[0].image,
      quantity: 1,
    })
    .then((res) => {
      setError(res.data);

      //Prevents refresh if not logged in
      if (res.data === "Added to cart") {
        window.location.reload();
      };
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <Helmet>
        <title>Tech Terminus | {id}</title>
      </Helmet>

      <Breadcrumb
        crumbOneLink={`/results/${id}`}
        crumbOneRoute="/product"
        crumbOneName="Product"
        crumbTwoLink={`/product/${id}`}
        crumbTwoRoute="/product"
        crumbTwoName={id}
      />

      <div className="my-16 lg:my-0 max-w-[1350px] lg:h-screen mx-auto relative">
        {filteredRows.map((row, index) => {
          return (
            <div
              key={index}
              className="mx-5 lg:mx-0 my-16 lg:my-0 lg:absolute lg:top-[50%] lg:-translate-y-[50%] lg:flex lg:space-x-10 space-y-10 lg:space-y-0"
            >
              {/* If mobile description is on top */}
              {isMobile && (
                /* Description */
                <div className="w-full mb-10 md:mb-0">
                  <h1 className="font-bold text-3xl leading-tight">{row.name}</h1>

                  <p className="text-base mt-6 font-normal text-gray-400">
                    {row.description}
                  </p>
                </div>
              )}

              <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col justify-center mx-auto">
                {/* Main image */}
                <div className="overflow-hidden">
                  <img
                    src={row.image}
                    width="615"
                    height="465"
                    alt="Product"
                    className="cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
                  ></img>
                </div>

                {/* Additional images */}
                <div className="mt-4 w-full flex space-x-5">
                  <div className="w-1/4 overflow-hidden">
                    <img
                      src={row.image}
                      width="140"
                      height="105"
                      alt="Product"
                      className="cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
                    ></img>
                  </div>
                  <div className="w-1/4 overflow-hidden">
                    <img
                      src={row.image}
                      width="140"
                      height="105"
                      alt="Product"
                      className="cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
                    ></img>
                  </div>
                  <div className="w-1/4 overflow-hidden">
                    <img
                      src={row.image}
                      width="140"
                      height="105"
                      alt="Product"
                      className="cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
                    ></img>
                  </div>
                  <div className="w-1/4 overflow-hidden">
                    <img
                      src={row.image}
                      width="140"
                      height="105"
                      alt="Product"
                      className="cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
                    ></img>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
                {/* If desktop description below image */}
                {!isMobile && (
                  <div>
                    <h1 className="font-bold leading-tight">{row.name}</h1>
                    <h2 className="mt-4 font-medium font-['Inter'] text-gray-700">
                      £ {row.price}
                    </h2>

                    <p className="text-base mt-6 font-normal text-gray-400">
                      {row.description}
                    </p>
                  </div>
                )}

                {/* If mobile alter structure */}
                {isMobile ? (
                  <>
                    <div className="flex justify-evenly items-center">
                      {/* Colours */}
                      <div className="mt-6">
                        <label className="font-semibold text-gray-700">
                          Colour
                        </label>

                        <div className="mt-3 flex space-x-5">
                          <div className="h-10 w-10 rounded-full outline outline-offset-1 bg-gray-500 shadow"></div>
                          <div className="h-10 w-10 rounded-full bg-white border shadow"></div>
                          <div className="h-10 w-10 rounded-full bg-slate-500 shadow"></div>
                        </div>
                      </div>

                      {/* Keywords */}
                      <div>
                        <h4 className="mt-16 font-semibold text-base text-blue-600">
                          Features
                        </h4>
                        <ul className="mt-4 px-2.5 space-y-1">
                          <li className="text-gray-600">- {row.keyword_one}</li>
                          <li className="text-gray-600">- {row.keyword_two}</li>
                          <li className="text-gray-600">- {row.keyword_three}</li>
                        </ul>
                      </div>
                    </div>

                    {/* Add to cart */}
                    <Button
                      onClick={addToCart}
                      variant="contained"
                      sx={{
                        bgcolor: "#7C3AED",
                        textTransform: "none",
                        margin: "3.5rem auto auto 0",
                        padding: "0.75rem 0rem",
                        width: "100%",

                        ":hover": {
                          bgcolor: "#6d28d9",
                        },
                      }}
                    >
                      Add to cart
                    </Button>

                    {error === "Please login to add to cart" && (
                      <p className="mt-4 text-sm italic text-red-500">
                        Please log in to add to cart
                      </p>
                    )}
                  </>
                ) : (
                  <div>
                    <div className="mt-6">
                      {/* Colours */}
                      <label className="font-semibold text-gray-700">Colour</label>

                      <div className="mt-3 flex space-x-5">
                        <div className="h-10 w-10 rounded-full outline outline-offset-1 bg-gray-500 shadow"></div>
                        <div className="h-10 w-10 rounded-full bg-white border shadow"></div>
                        <div className="h-10 w-10 rounded-full bg-slate-500 shadow"></div>
                      </div>
                    </div>

                    {/* Add to cart */}
                    <Button
                      onClick={addToCart}
                      variant="contained"
                      sx={{
                        bgcolor: "#7C3AED",
                        textTransform: "none",
                        margin: "3.5rem auto auto 0",
                        padding: "0.75rem 0rem",
                        width: "100%",

                        ":hover": {
                          bgcolor: "#6d28d9",
                        },
                      }}
                    >
                      Add to cart
                    </Button>

                    {error === "Please login to add to cart" && (
                      <p className="mt-4 text-sm italic text-red-500">
                        Please log in to add to cart
                      </p>
                    )}

                    {/* Keywords */}
                    <h4 className="mt-16 font-semibold text-base text-blue-600">
                      Features
                    </h4>
                    <ul className="mt-2 space-y-1">
                      <li className="text-gray-600">- {row.keyword_one}</li>
                      <li className="text-gray-600">- {row.keyword_two}</li>
                      <li className="text-gray-600">- {row.keyword_three}</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-32 mb-36 md:mb-48 px-5 2xl:px-0 mx-auto max-w-[1350px]">
        {/* Additional products */}
        <LatestProducts />
      </div>
    </>
  );
};