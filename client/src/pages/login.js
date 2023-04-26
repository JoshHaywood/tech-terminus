import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import Helmet from "react-helmet";

import useFormData from "../components/auth/use-form-data";
import Input from "../components/auth/input";
import ErrorMessage from "../components/auth/error-message";
import Button from "@mui/material/Button";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { formData, handleChange } = useFormData(); // Form data state
  const [message, setMessage] = useState(""); // Error message state

  // Set register message
  useEffect(() => {
    setMessage(location.state);
  }, [location]);

  const validateRow = () => {
    // Validate login
    axios.post("/auth/validate", {
      email: formData.email,
      password: formData.password,
    })
    .then((res) => {
      setMessage(res.data);

      //If validation passed
      if (res.data === "Login successful") {
        navigate("/"); // Redirect to home page
        window.location.reload(); // Reload page to update user state
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault(); //Prevents page refresh
    setMessage(""); //Clear previous errors

    validateRow();
  };

  return (
    <>
      <Helmet>
        <title>Tech Terminus | Login</title>
      </Helmet>

      <div className="w-screen my-16 lg:my-20 xl:my-0 h-auto xl:h-screen flex justify-center items-center">
        <div className="p-5 sm:p-12 w-full sm:w-auto ml-5 mr-9 sm:mx-0 flex flex-col justify-center rounded-lg shadow bg-white">
          {/* Heading */}
          <h1 className="pt-4 text-3xl font-bold text-center text-gray-700">
            Login
          </h1>

          {/* Login form */}
          <form 
            onSubmit={submitHandler} // Submit form on submit
            onKeyDown={(e) => {
              e.key === "Enter" && submitHandler(); //Submit form on enter
            }}
            className="sm:mx-auto sm:w-[400px] py-8 bg-white rounded"
          >
            {/* Registered message */}
            {message === "Successfully registered, please login" && (
              <p className="mb-4 p-2 font-medium text-xs text-green-700 bg-green-300">
                Successfully registered, please login
              </p>
            )}

            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="email@email.com"
              value={formData.email}
              handleChange={handleChange}
              error={message === "Email or password are incorrect" ? message : ""}
            />

            <ErrorMessage error={message === "Email or password are incorrect" ? message : ""} />

            {/* Password */}
            <Input 
              label="Password" 
              type="password" 
              name="password"
              placeholder="Password123" 
              value={formData.password}
              handleChange={handleChange}
              error={
                message === "Incorrect password"
                  ? message
                  : message === "Email or password are incorrect"
                  ? message
                  : ""
              }
            />

            <ErrorMessage error={message === "Incorrect password" ? message : ""} />
            <ErrorMessage error={message === "Email or password are incorrect" ? message : ""} />

            {/* Submit button */}
            <div className="mb-6 text-center">
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
                Login
              </Button>
            </div>

            {/* Registration link */}
            <hr className="mb-6 border-t" />
            <div className="text-center">
              <Link
                className="inline-block text-sm align-baseline text-blue-600 hover:text-blue-800"
                to="/register"
              >
                Don't have an account? Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};