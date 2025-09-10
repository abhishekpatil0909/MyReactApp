const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db/db');
const { appendUserToSheet } = require('../utils/googleSheetService'); // ✅ Make sure this import exists

let lastLoggedInUser = null;
router.post('/register', (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate input
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields (name, email, password, role) are required' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Hashing error:', err);
      return res.status(500).json({ error: 'Error hashing password' });
    }

    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, hashedPassword, role], async (dbErr, result) => {
      if (dbErr) {
        console.error('DB error:', dbErr);
        return res.status(500).json({ error: 'DB error', details: dbErr.sqlMessage });
      }

      try {
        await appendUserToSheet(name, email, role);
        res.status(201).json({ message: 'User registered successfully & added to attendance sheet' });
      } catch (sheetErr) {
        console.error('Google Sheets Error:', sheetErr);
        res.status(500).json({
          error: 'User saved, but failed to add to Google Sheet',
          details: sheetErr.message,
        });
      }
    });
  });
});
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';

  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: 'Password check error' });

      if (isMatch) {
        lastLoggedInUser = {
          id: user.id, name: user.name, role: user.role, email: user.email
        };
        console.log(`🔐 ${user.role} "${user.name}" logged in at ${new Date().toLocaleString()}`);
        res.status(200).json({ message: 'Login successful', user: lastLoggedInUser });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  });
});

router.post('/logout', (req, res) => {
  console.log(`🔓 ${lastLoggedInUser?.role || 'User'} "${lastLoggedInUser?.name || 'Unknown'}" logged out at ${new Date().toLocaleString()}`);
  lastLoggedInUser = null;
  res.status(200).json({ message: 'Logout successful' });
});

router.get('/last-logged-in', (req, res) => {
  if (lastLoggedInUser) res.json({ user: lastLoggedInUser });
  else res.status(404).json({ message: 'No user logged in yet' });
});

module.exports = router;
