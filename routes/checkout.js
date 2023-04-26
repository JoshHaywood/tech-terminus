const express = require("express");
const router = express.Router();

const db = require("../config/db");

// Add product to cart
router.post("/add", (req, res) => {
  const userEmail = req.session.email;
  const productName = req.body.productName;
  const quantity = req.body.quantity;
  const image = req.body.image;
  const price = req.body.price;
  const insertRow = "INSERT INTO checkout (user_email, product_name, quantity, image, price) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + 1"; // Add product to cart, if product already exists in users's cart, increase quantity by 1

  // If logged in
  if (userEmail) {
    db.query(
      insertRow,
      [userEmail, productName, quantity, image, price],
      (err, rows) => {
        // Take request product and add to cart
        if (err) throw err;
        res.send("Added to cart");

        console.log("Added: " + productName + " to " + userEmail + "'s cart"); // Log added product
      }
    );
    // Else not logged in
  } else {
    res.send("Please login to add to cart");
  };
});

// Get users cart items
router.get("/get", (req, res) => {
  const userEmail = req.session.email;
  const selectCart = "SELECT * FROM checkout WHERE user_email = ?"; // Selects all products in users cart

  // If logged in
  if (userEmail) {
    db.query(selectCart, [userEmail], (err, rows) => {
      // Send all products in users cart
      if (err) throw err;
      res.send(rows);
    });
    // Else not logged in
  } else { 
    res.send("Please login to view cart");
  };
});

// Delete all items from cart
router.delete("/clear", (req, res) => {
  const userEmail = req.session.email;
  const deleteCart = "DELETE FROM checkout WHERE user_email = ?"; // Deletes all products from users cart

  // Delete cart items for user
  db.query(deleteCart, [userEmail], (err, rows) => {
    if (err) throw err;

    console.log("Cleared cart for: " + userEmail); // Log cleared cart
  });
});

// Delete item from cart
router.delete("/delete/:id", (req, res) => {
  const userEmail = req.session.email;
  const productName = req.params.id;
  const deleteRow = "DELETE FROM checkout WHERE user_email = ? AND product_name = ?"; // Deletes product from cart by name

  // Delete item from cart
  db.query(deleteRow, [userEmail, productName], (err, rows) => {
    if (err) throw err;

    console.log("Deleted: " + productName + " from " + userEmail + "'s cart"); // Log deleted item
  });
});

// Update quantity
router.put("/update", (req, res) => {
  const userEmail = req.session.email;
  const productName = req.body.productName;
  const quantity = req.body.quantity;
  const updateRow = "UPDATE checkout SET quantity = ? WHERE user_email = ? AND product_name = ?"; // Updates quantity of product in cart

  // Update cart item quantity
  db.query(updateRow, [quantity, userEmail, productName], (err, rows) => {
    if (err) throw err;

    console.log("Updated: " + productName + " quantity to " + quantity + " for " + userEmail + "'s cart"); // Log updated item
  });
});

// Clear cart
router.delete("/clear", (req, res) => {
  const userEmail = req.session.email;
  const deleteCart = "DELETE FROM checkout WHERE user_email = ?";

  // Delete cart items for user
  db.query(deleteCart, [userEmail], (err, rows) => {
    if (err) throw err;

    console.log("Cleared cart for: " + userEmail); // Log cleared cart
  });
});

module.exports = router;