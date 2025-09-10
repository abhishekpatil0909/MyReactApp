const express = require("express");
const router = express.Router();
const db = require("../../db/db"); // Your MySQL connection file

// Get all careers
router.get("/", (req, res) => {
  db.query("SELECT * FROM careers ORDER BY created_at DESC", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

module.exports = router;
