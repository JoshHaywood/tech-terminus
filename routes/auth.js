const express = require("express");
const router = express.Router();

const db = require("../config/db");
const { HashPassword, salt } = require("../lib/security");

const selectEmail = "SELECT * FROM users WHERE email = ?"; // Selects all emails

// Registering
router.post("/insert", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const insertRow = "INSERT INTO users (first_name, last_name, email, password, salt) VALUES (?, ?, ?, ?, ?)"; // Inserts new user

  // Checks if email already exists
  db.query(selectEmail, [email], (err, rows) => {
    // If email exists
    if (rows.length > 0) {
      res.send("Email already exists");
      // Else register user
    } else {
      let hashedPassword = HashPassword(password, salt);

      db.query(insertRow, [firstName, lastName, email, hashedPassword, salt], (err, rows) => {
        if (err) throw err;
        // Print user inserted
        console.log(
          "Registered: \n" + 
          "First name:" + firstName + "\n" + 
          "Last name:" + lastName + "\n" + 
          "Email:" + email
        );

        res.send("Successfully registered, please login");
      });
    };
  });
});

// Login
router.post("/validate", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Check all emails against input
  db.query(selectEmail, [email], (err, rows) => {
    if (err) throw err;
    // If email exists
    if (rows.length > 0) {
      // If password with salt and compares to database
      if (HashPassword(password, rows[0].salt) == rows[0].password) {
        // Creates session
        req.session.user = rows[0].first_name;
        req.session.email = rows[0].email;

        console.log("Session created:", req.session); // Print session
        res.send("Login successful");
        // Else password is incorrect
      } else {
        res.send("Incorrect password");
      };
      // Else email is incorrect
    } else {
      res.send("Email or password are incorrect");
    };
  });
});

// Get login information
router.get("/validate", (req, res) => {
  // If user is logged in
  if (req.session.email) {
    res.send({ loggedIn: true, user: req.session.user }); // Send boolean and first name
    // Else user is not logged in
  } else { 
    res.send({ loggedIn: false });
  };
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy(); // Destroy session
  res.send("Logged out");
});

module.exports = router;