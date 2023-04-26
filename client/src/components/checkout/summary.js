import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "@mui/material/Button";

const quantityOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
];

export default function Summary() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  let subTotal = 0;
  let shipping = 4.99;
  let total = 0;

  const [dropdown, setDropdown] = useState("");

  // Get products from cart
  useEffect(() => {
    axios.get("/checkout/get")
    .then((res) => {
      setRows(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  // Clear cart
  const clearCart = () => {
    window.location.reload(); // Refresh page after clearing cart

    axios.delete("/checkout/clear") // Delete all products from cart
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  // Delete product from cart
  const deleteItem = (id) => {
    window.location.reload(); // Refresh page after deleting product

    axios.delete(`/checkout/delete/${id}`) // Delete product from cart by passed id
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  // Update product quantity
  const updateQuantity = (productName, quantity) => {
    axios.put("/checkout/update", {
      productName: productName,
      quantity: quantity,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

    window.location.reload(); // Refresh page after updating quantity
  };

  return (
    <div className="w-full lg:w-1/2 order-1 lg:order-2 mb-10 lg:mb-0 pr-5 lg:pr-">
      <div className="flex flex-row justify-between items-center">
        {/* Heading */}
        <h2 className="text-xl font-['Inter'] font-semibold">Order summary</h2>

        {rows.length > 0 && (
          <Button
            onClick={clearCart}
            variant="contained"
            sx={{
              color: "#000000",
              background: "#ffffff",
              textTransform: "none",
              boxShadow: "0px 0px 0px 1px rgba(0, 0, 0, 0.05)",
              borderRadius: "0.5rem",
              marginRight: "1rem",
              padding: "0.5rem 1rem",

              "&:hover": {
                background: "#ffffff",
                boxShadow: "0",
              },
            }}
          >
            Clear cart
          </Button>
        )}
      </div>

      <div className="h-[1300px] mt-5 p-5 rounded border shadow overflow-y-auto bg-white">
        {/* Product cards */}
        {/* If there are product in cart */}
        {rows.length > 0 ? (
          <>
            {rows.map((row, index) => {
              subTotal += row.price * row.quantity; // Calculate subtotal
              total = (subTotal + shipping).toFixed(2); // Applies calculated subtotal to total, to 2 decimals points

              return (
                <div key={index.value}>
                  <div className="flex flex-col sm:flex-row justify-between space-y-5 sm:space-y-0">
                    {/* Product information */}
                    <div className="flex flex-col sm:flex-row sm:space-x-5">
                      <div className="order-2 sm:order-1 mt-5 sm:mt-0 overflow-hidden bg-gradient-to-t from-gray-200 to-white">
                        <img
                          src={row.image}
                          width="200"
                          height="150"
                          alt="Product thumbnail"
                          className="object-fit sm:w-full mx-auto h-60 sm:h-36 hover:scale-105 transition duration-300 ease-in-out"
                        ></img>
                      </div>

                      <div className="order-1 sm:order-2 flex flex-col justify-between">
                        <div>
                          <div className="font-medium">{row.product_name}</div>
                          <div className="mt-2.5 text-sm text-gray-500">
                            Product type
                          </div>
                        </div>

                        <div>£ {row.price}</div>
                      </div>
                    </div>

                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between">
                      {/* Delete button */}
                      <svg
                        onClick={() => {
                          deleteItem(row.product_name);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="order-2 sm:order-1 w-6 h-6 hover:cursor-pointer text-blue-600"
                      >
                        {" "}
                        {/* Attribute: https://heroicons.com/ */}
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>

                      {/* Quantity dropdown */}
                      <div className="order-1 sm:order-2 relative sm:w-full cursor-pointer">
                        <div
                          onClick={() => {
                            setDropdown(quantityOptions[index].value);
                          }} /* Set dropdown value to current quantity */
                          className="flex justify-between items-center py-2 px-4 space-x-5 border rounded"
                        >
                          <label className="text-gray-500 cursor-pointer">
                            {row.quantity}
                          </label>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
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

                        {/* If dropdown value is equal to the value of the current element, display dropdown */}
                        <ul
                          className={`${
                            dropdown === quantityOptions[index].value
                              ? "block"
                              : "hidden"
                          } absolute w-full z-10 mt-2 py-2.5 px-4 space-y-2.5 border rounded bg-white`}
                        >
                          {quantityOptions.map((option, index) => {
                            return (
                              <li
                                key={index}
                                onClick={() => {
                                  setDropdown("");
                                  updateQuantity(row.product_name, quantityOptions[index].label);
                                }} /* Set dropdown value to empty string and update quantity */
                                className="cursor-pointer text-gray-500"
                              >
                                {option.label}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <hr className="my-5 -mx-5"></hr>
                </div>
              );
            })}

            {/* Total summaries */}
            <div className="mt-5 flex justify-between text-gray-700">
              <div>Subtotal</div>
              <div>£ {subTotal}</div>
            </div>

            <div className="mt-8 flex justify-between text-gray-700">
              <div>Shipping</div>
              <div>£ {shipping}</div>
            </div>

            <hr className="mt-5"></hr>

            <div className="mt-5 flex justify-between">
              <div>Total</div>
              <div>£ {total}</div>
            </div>
          </>
        ) : (
          /* If there are no products in cart */
          <div className="space-y-5">
            <p className="text-base italic text-red-500">
              Your cart is currently empty
            </p>

            <div
              onClick={() => {
                navigate(-1);
              }}
              className="w-min py-2 px-4 border rounded-lg hover:shadow cursor-pointer transition-colors text-gray-600 hover:underline hover:text-gray-800"
            >
              Return
            </div>
          </div>
        )}
      </div>
    </div>
  );
};