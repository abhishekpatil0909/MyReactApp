const express = require("express");
const router = express.Router();
const db = require("../db/db"); // Your MySQL connection file

// Get all subjects from DB
router.get("/subjects", (req, res) => {
    const query = "SELECT DISTINCT subject FROM contact_messages ORDER BY subject ASC";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results.map(r => r.subject));
    });
});

// Get all contact messages
router.get("/", (req, res) => {
    const query = "SELECT * FROM contact_messages ORDER BY created_at DESC";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Save new contact message
router.post("/", (req, res) => {
    const { name, email, mobile, subject, message } = req.body;
    if (!name || !email || !mobile || !subject || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const query = "INSERT INTO contact_messages (name, email, mobile, subject, message) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [name, email, mobile, subject, message], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: result.insertId });
    });
});

module.exports = router;
