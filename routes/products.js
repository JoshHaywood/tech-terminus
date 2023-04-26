const express = require("express");
const router = express.Router();

const db = require("../config/db");

// Get all products
router.get("/get", (req, res) => {
  const selectAll = "SELECT * FROM products"; // Selects all products

  // Sends all rows
  db.query(selectAll, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Get product by name
router.get("/latest", (req, res) => {
  const selectName = `SELECT * FROM products WHERE name LIKE ('%phone%')`; // Selects all products with 'phone' in name

  // Sends rows
  db.query(selectName, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Get product by id
router.get("/featured", (req, res) => {
  const selectId = "SELECT * FROM products WHERE id IN (1, 2, 3)"; // Selects products with id 1, 2, 3

  // Sends rows
  db.query(selectId, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Get product by brand
router.get("/brands", (req, res) => {
  const selectBrand = "SELECT DISTINCT brand FROM products"; // Selects all brands with no duplicates

  // Sends rows
  db.query(selectBrand, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

module.exports = router;