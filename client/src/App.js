import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Header from "./components/header";
import Footer from "./components/footer";
import Index from "./pages/index";
import Products from "./pages/results";
import Login from "./pages/login";
import Register from "./pages/register";
import Contact from "./pages/contact";
import ProductDetailed from "./pages/product-view";
import CheckoutPage from "./pages/checkout";
import Message from "./pages/message";

axios.defaults.withCredentials = true;

// Local
axios.defaults.baseURL = process.env.REACT_APP_BACK_END_PORT;

const messages = [
  {
    path: "/success",
    title: "Success",
    heading: "Form submitted",
    message: "Thank you for your submission. A member of our team will be in touch with you shortly.",
    route: "/",
    button: "Return",
  },
  {
    path: "/confirmation",
    title: "Confirmation",
    heading: "Purchase successful",
    message: "Thank you for your purchase. You will receive confirmation shortly.",
    route: "/",
    button: "Return",
  },
  {
    path: "*",
    title: "Page not found",
    heading: "This page does not exist",
    message:"The page you were looking for does not exist or has been removed.",
    route: -1,
    button: "Go back",
  },
  {
    // Redirect to prevent users from registering during study period
    path: "/register",
    title: "Register",
    heading: "Registration has been disabled",
    message: "Registration has been disabled during the study period. Please contact the conductor: JH248828@falmouth.ac.uk for more information.",
    route: -1,
    button: "Go back",
  },
];

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    axios.get("/auth/validate")
      .then((res) => {
        if (res.data.loggedIn) {
          setLoggedIn(true);
        };
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/results/:id" element={<Products />} />{" "}
        {/* Passes route with ID from input */}
        <Route path="/login" element={<Login />} />
        {/* 
          Disabled to prevent users from registering during study period
          <Route path="/register" element={<Register />} /> 
        */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetailed />} />
        {loggedIn ? (
          // If user is logged in show checkout page
          <Route path="/checkout" element={<CheckoutPage />} />
        ) : (
          // Else user is not logged in show login page
          <Route path="/checkout" element={<Login />} />
        )}
        {messages.map((message, index) => (
          <Route
            key={index}
            path={message.path}
            element={
              <Message
                title={message.title}
                heading={message.heading}
                message={message.message}
                route={message.route}
                button={message.button}
              />
            }
          />
        ))}
      </Routes>

      <Footer />
    </>
  );
};