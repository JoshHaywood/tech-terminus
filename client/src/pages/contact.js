import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import { ContainsNumber, ContainsSpecial } from "../components/auth/input-formatter";
import Button from "@mui/material/Button";

const contactInfo = [
  {
    containerStyle: "mt-8",
    /* Attribution: https://heroicons.com/ */
    svgPaths: [
      {
        path: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
      },
      { path: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
    ],

    text: "Tech Terminus, Road road, Cornwall, TR1 2AB",
  },
  {
    containerStyle: "mt-4",
    /* Attribution: https://heroicons.com/ */
    svgPaths: [
      {
        path: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
      },
    ],

    text: "+44 1234 567 890",
  },
  {
    containerStyle: "mt-4",
    /* Attribution: https://heroicons.com/ */
    svgPaths: [
      {
        path: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      },
    ],

    text: "techterminus@gmail.com",
  },
];

const contactForm = [
  {
    containerStyle: "mt-8",
    label: "Full name",
    type: "text",
    placeholder: "Full name",
    maxLength: 200,
  },
  {
    containerStyle: "mt-4",
    label: "Email",
    type: "email",
    placeholder: "Email",
    maxLength: 200,
  },
  {
    containerStyle: "mt-4",
    label: "Telephone number",
    type: "tel",
    placeholder: "Telephone number",
    maxLength: 20,
  },
];

export default function Contact() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [input, setInput] = useState("");
  const [name, setName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault(); //Prevents page refresh
    setError(""); //Clear previous errors

    //If name contain numbers or special characters
    if (ContainsNumber(name) || ContainsSpecial(name)) {
      setError("Names may only contain alphabetic characters");
      return;
    }

    navigate("/success");
  };

  return (
    <>
      <Helmet>
        <title>Tech Terminus | Contact</title>
      </Helmet>

      <div className="h-screen my-16 lg:my-0 max-w-[1350px] mx-auto grid grid-cols-1 md:grid-cols-2">
        {/* Info */}
        <div className="relative flex justify-baseline lg:justify-center">
          <div className="py-36 lg:h-screen w-full"></div>
          <div className="absolute bottom-0 top-0 flex flex-col justify-center px-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-violet-600">
              Get in touch
            </h1>
            <p className="text-normal text-lg sm:text-xl font-medium text-gray-500 mt-2">
              Get in touch with us by filling in the form
            </p>

            {contactInfo.map((info, index) => (
              <div
                key={index}
                className={`flex items-center ${info.containerStyle} text-gray-600`}
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-blue-600"
                >
                  {info.svgPaths.map((svg, index) => (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d={svg.path}
                    />
                  ))}
                </svg>

                <div className="ml-4 text-md tracking-wide font-semibold w-40 text-gray-500">
                  {info.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={submitHandler}
          className="p-6 flex flex-col justify-center w-full xl:w-[600px] mx-auto"
        >
          {contactForm.map((form, index) => (
            <div key={index} className={form.containerStyle}>
              <label className="block mb-2 text-sm font-bold text-gray-700">
                {form.label}
              </label>
              <input
                type={form.type}
                placeholder={form.placeholder}
                maxLength={form.maxLength}
                required
                autofill="off"
                onClick={() => setInput(form.label)}
                onChange={(e) => {
                  if (input === "Full name") {
                    setName(e.target.value);
                  }
                }}
                className={`${
                  error === "Names may only contain alphabetic characters" &&
                  index === 0
                    ? "border-red-500"
                    : ""
                } w-full px-3 py-3 mb-3 text-sm leading-tight border text-gray-700 rounded shadow focus:outline-none`}
              />
            </div>
          ))}

          {error && <p className="text-xs italic text-red-500">{error}</p>}

          {/* Submit button */}
          <div className="mt-6 text-center">
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
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};