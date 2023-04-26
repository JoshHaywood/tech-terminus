import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Helmet from "react-helmet";

import { ContainsNumber, ContainsCapital, ContainsSpecial } from "../components/auth/input-formatter";
import useFormData from "../components/auth/use-form-data";
import Input from "../components/auth/input";
import ErrorMessage from "../components/auth/error-message";
import Button from "@mui/material/Button";

export default function Register() {
  const navigate = useNavigate();

  const { formData, handleChange } = useFormData(); // Form data state
  const [error, setError] = useState("");

  const insertRow = () => {
    // Insert user into database
    axios.post("/auth/insert", {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    })
    .then((res) => {
      setError(res.data);

      // If validation passed
      if (res.data === "Successfully registered, please login") {
        navigate("/login", { state: res.data });
      }
    });
  };

  const submitHandler = (e) => {
    e.preventDefault(); // Prevents page refresh
    setError(""); // Clear previous errors

    // If first or last name contain numbers or special characters
    if (ContainsNumber(formData.firstName) || ContainsSpecial(formData.firstName) || ContainsNumber(formData.lastName) || ContainsSpecial(formData.lastName)) {
      setError("Names may only contain alphabetic characters");
      return;
    };

    // If password doesn't contain a capital
    if (!ContainsCapital(formData.password)) {
      setError("Password must contain at least one uppercase letter");
      return;
    };

    // If password doesn't contain a number
    if (!ContainsNumber(formData.password)) {
      setError("Password must contain at least one number");
      return;
    };

    // If password is less than 8 characters
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    };

    // If passwords don't match
    if (formData.confirmPassword !== formData.password) {
      setError("Passwords do not match");
      return;
    };

    insertRow();
  };

  return (
    <>
      <Helmet>
        <title>Tech Terminus | Register</title>
      </Helmet>

      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-full sm:w-auto flex flex-col justify-center mx-5 sm:mx-0 p-5 sm:p-12 shadow-lg bg-white">
          {/* Heading */}
          <h1 className="mb-3 text-center font-bold text-3xl tracking-wide text-black">
            Sign Up
          </h1>

          <div className="text-center tracking-wide text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="inline-block text-sm text-cyan-1000 align-baseline text-blue-600 hover:text-blue-800 hover:underline"
            >
              Sign in here.
            </Link>
          </div>

          {/* Registration form */}
          <form 
            onSubmit={submitHandler} // Submit form on submit
            onKeyDown={(e) => {
              e.key === "Enter" && submitHandler(); //Submit form on enter
            }}
            className="sm:w-[400px] py-8"
          >
            {/* Names row */}
            <div className="sm:flex sm:justify-between">
              {/* First name */}
              <Input
                label="First name"
                type="text"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                handleChange={handleChange}
                error={error === "Names may only contain alphabetic characters" ? error : ""}
                />

              {/* Last name */}
              <Input
                label="Last name"
                type="text"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                handleChange={handleChange}
                error={error === "Names may only contain alphabetic characters" ? error : ""}
                />
            </div>

            <ErrorMessage error={error === "Names may only contain alphabetic characters" ? error : ""} />

            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="email@email.com"
              value={formData.email}
              handleChange={handleChange}
              error={error === "Email already exists" ? error : ""}
            />

            <ErrorMessage error={error === "Email already exists" ? error : ""} />

            {/* Password */}
            <Input 
              label="Password" 
              type="password" 
              name="password"
              placeholder="Password123" 
              value={formData.password}
              handleChange={handleChange}
              error={error === "Password must contain at least one uppercase letter" || error === "Password must contain at least one number" || error === "Password must be at least 8 characters long" ? error : ""}
            />

            {/* Confirm password */}
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Password123"
              value={formData.confirmPassword}
              handleChange={handleChange}
              error={error === "Passwords do not match" ? error : ""}
            />

            <ErrorMessage 
              error={
                error === "Password must contain at least one uppercase letter" ||
                error === "Password must contain at least one number" || 
                error === "Password must be at least 8 characters long" ||
                error === "Passwords do not match"
                  ? error 
                  : ""
              } 
            />

            {/* Submit button */}
            <div className="mb-6 mt-10 text-center">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "#7C3AED",
                  textTransform: "none",
                  width: "100%",

                  ":hover": {
                    bgcolor: "#6d28d9",
                  },
                }}
              >
                Register Account
              </Button>
            </div>

            {/* Registration link */}
            <hr className="border-t" />
          </form>
        </div>
      </div>
    </>
  );
};