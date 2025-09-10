const express = require('express');
const router = express.Router();
const db = require('../db/db');

// GET leave requests for a user
router.get('/leaves', (req, res) => {
  const userId = req.query.user_id;
  if (!userId) return res.status(400).json({ error: 'user_id required' });

  const sql = 'SELECT leave_date, reason, status, type FROM leave_requests WHERE user_id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).send("Server error");
    res.json(results);
  });
});

// POST leave application
router.post('/leaves/apply', (req, res) => {
  const { leaves } = req.body;
  if (!Array.isArray(leaves) || leaves.length === 0)
    return res.status(400).json({ error: 'Leave data required' });

  const values = leaves.map(({ user_id, leave_date, reason, type }) => [
    user_id,
    leave_date,
    reason,
    'pending',
    type || 'General', // default to General if not provided
  ]);

  const sql = 'INSERT INTO leave_requests (user_id, leave_date, reason, status, type) VALUES ?';

  db.query(sql, [values], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to apply leave' });
    res.status(201).json({ message: 'Leave(s) applied successfully' });
  });
});

module.exports = router;
