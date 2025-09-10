const express = require('express');
const router = express.Router();
const db = require('../../db/db'); // Your DB connection file

// Get all leave requests
router.get('/', (req, res) => {
    db.query('SELECT * FROM leave_requests', (err, results) => {
            if (err) {
            console.error('Error fetching leaves:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Update leave request status
router.put('/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ error: 'Status is required' });
    }

    db.query(
        'UPDATE leave_requests SET status = ? WHERE id = ?',
        [status, id],
        (err, result) => {
            if (err) {
                console.error('Error updating status:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ message: 'Status updated successfully' });
        }
    );
});

module.exports = router;
