import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Select from "react-select";
import countryList from "react-select-country-list"; /* Attribution: https://www.npmjs.com/package/react-select-country-list */

import { ContainsNumber, ContainsSpecial } from "../auth/input-formatter";
import useFormData from "../auth/use-form-data";
import Input from "../auth/input";
import ErrorMessage from "../auth/error-message";
import Button from "@mui/material/Button";

export default function CheckoutForm() {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const { formData, handleChange } = useFormData(); // Form data state
  const [error, setError] = useState("");

  //Adds space between words
  formData.postalCode = formData.postalCode.replace(/\s+/g, "-");
  formData.phoneNumber = formData.phoneNumber.replace(/\s+/g, "-");
  formData.cardNumber = formData.cardNumber.replace(/\s+/g, "-");

  //Country dropdown handler
  const changeHandler = (value) => {
    setValue(value); //Sets value to selected country
  };

  const submitHandler = (e) => {
    e.preventDefault(); //Prevents page refresh
    setError(""); //Clear previous errors

    //If first or last name contain numbers or special characters
    if (ContainsNumber(formData.firstName) || ContainsSpecial(formData.firstName) || ContainsNumber(formData.lastName) || ContainsSpecial(formData.lastName)) {
      setError("Names may only contain alphabetic characters");
      return;
    };

    //Clear cart
    axios.delete("/checkout/clear")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

    navigate("/confirmation"); //On successful submit, navigate to confirmation page
    window.location.reload(); //Reload page to clear cart
  };

  return (
    <form
      onSubmit={submitHandler}
      className="w-full lg:w-1/2 order-2 lg:order-1 pr-5 lg:pr-0"
    >
      {/* Contact information */}
      <h3 className="mb-4 text-xl font-['Inter'] font-semibold">Contact information</h3>

      {/* Email */}
      <Input
        label="Email"
        type="email"
        name="email"
      />

      {/* Shipping information */}
      <h4 className="mt-12 text-xl font-['Inter'] font-semibold">
        Shipping information
      </h4>

      <div className="mt-4 w-full lg:flex lg:space-x-5">
        {/* First name */}
        <div className="w-full">
          <Input
            label="First name"
            type="text"
            name="firstName"
            value={formData.firstName}
            handleChange={handleChange}
            error={error === "Names may only contain alphabetic characters"}
          />
        </div>

        {/* Last name */}
        <div className="w-full">
          <Input
            label="Last name"
            type="text"
            name="lastName"
            value={formData.lastName}
            handleChange={handleChange}
            error={error === "Names may only contain alphabetic characters"}
          />
        </div>
      </div>

      <ErrorMessage error={error === "Names may only contain alphabetic characters" ? error : ""} />

      {/* Company */}
      <Input  
        label="Company"
        type="text"
        name="company"
      />

      {/* Address */}
      <Input 
        label="Address"
        type="text"
        name="address"
      />

      {/* Building number */}
      <Input
        label="Apartment, flat, etc."
        type="text"
        name="buildingNumber"
      />

      <div className="mt-4 w-full lg:flex lg:space-x-5">
        {/* City */}
        <div className="w-full lg:w-1/2">
          <Input
            label="City"
            type="text"
            name="city"
          />
        </div>

        {/* Country */}
        <div className="mt-4 lg:mt-0 w-full lg:w-1/2">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Country
          </label>
          <div className="w-full text-sm text-gray-700 rounded focus:outline-blue-600">
            <Select
              required
              placeholder="United Kingdom"
              options={options}
              value={value}
              onChange={changeHandler}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 w-full lg:flex lg:space-x-5">
        {/* County */}
        <div className="w-full lg:w-1/2">
          <Input 
            label="County / Province"
            type="text"
            name="county"
          />
        </div>

        {/* Postcode */}
        <div className="w-full lg:w-1/2">
          <Input  
            label="Postal Code"
            type="text"
            name="postalCode"
            value={formData.postalCode}
            handleChange={handleChange}
          />
        </div>
      </div>

      {/* Phone number */}
      <div className="mt-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Phone <span className="text-red-500">*</span>
        </label>

        <div className="mb-3 flex items-center">
          <label className="text-sm p-2 border border-r-0 rounded-tl rounded-bl shadow text-gray-700 bg-gray-100">
            +44
          </label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="123-456-7890"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border border-l-0 rounded-tr rounded-br shadow focus:outline-none"
          />
        </div>
      </div>

      {/* Payment information */}
      <h5 className="mt-12 mb-4 text-xl font-['Inter'] font-semibold">
        Payment
      </h5>

      {/* Card number */}
      <Input
        label="Card number"
        type="text"
        name="cardNumber"
        placeholder="1234-5678-9012-3456"
        value={formData.cardNumber}
        handleChange={handleChange}
      />

      {/* Name holder */}
      <Input
        label="Name on card"
        type="text"
        name="nameHolder"
        placeholder="e.g. John Smith"
      />

      <div className="mt-4 w-full lg:flex lg:space-x-5">
        {/* Expiry date */}
        <div className="w-full lg:w-3/4">
          <Input
            label="Expiration date"
            type="date"
            name="expirationDate"
          />
        </div>

        {/* CVV */}
        <div className="w-full lg:w-1/4">
          <Input
            label="CVV"
            type="number"
            name="cvv"
            placeholder="123"
          />
        </div>
      </div>

      {/* Submit button */}
      <Button
        variant="contained"
        type="submit"
        sx={{
          width: "100%",
          marginTop: "2rem",
          bgcolor: "#7C3AED",
          textTransform: "none",
          borderRadius: "0.25rem",
          padding: "0.5rem 0",

          ":hover": {
            bgcolor: "#6d28d9",
          },
        }}
      >
        Submit
      </Button>
    </form>
  );
};