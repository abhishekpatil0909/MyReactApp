const express = require('express');
const router = express.Router();
const db = require('../db/db'); // ✅ Adjust this path

// GET notifications for a specific user
router.get('/notifications/:userId', (req, res) => {
    const { userId } = req.params;
    const sql = `SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC`;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching notifications:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

module.exports = router;
