const dotenv = require("dotenv");
dotenv.config(); // Load environment variables
const express = require("express");
const path = require("path");
const cors = require("cors");

const session = require("./lib/session");

const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");
const checkoutRoutes = require("./routes/checkout");

const app = express();
const PORT = process.env.PORT;

// Dependencies
app.use(
  cors({
    origin: [process.env.FRONT_END_PORT],
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Allow cookies
  })
);

app.use(session); //Session config

// Routes
app.use("/auth", authRoutes); //Login and register routes
app.use("/products", productsRoutes); //Products routes
app.use("/checkout", checkoutRoutes); //Checkout routes

// React build serve
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build")); // Set static folder
  // Handles routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
};

// Server port
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});