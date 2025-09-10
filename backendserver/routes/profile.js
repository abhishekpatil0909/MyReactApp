const express = require('express');
const router = express.Router();
const db = require('../db/db');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads/')),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// GET user profile (with salary, department, designation, manager_name)
router.get('/profile/:id', (req, res) => {
  const userId = req.params.id;

  const sql = `
    SELECT u.id, u.name, u.email, u.gender, u.phone, u.dob, 
           u.profile_picture, u.salary, u.manager_id, u.department, u.designation,
           m.name AS manager_name
    FROM users u
    LEFT JOIN users m ON u.manager_id = m.id
    WHERE u.id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    const profile = results[0];
    profile.profile_picture = profile.profile_picture
      ? `/uploads/${profile.profile_picture}`
      : '';

    res.json(profile);
  });
});

// UPDATE user profile (only editable fields)
router.put('/profile/:id', (req, res) => {
  const { name, email, gender, phone, dob, profile_picture } = req.body;
  const formattedDob = dob ? new Date(dob).toISOString().split('T')[0] : null;

  const query = `
    UPDATE users 
    SET name = ?, email = ?, gender = ?, phone = ?, dob = ?, profile_picture = ? 
    WHERE id = ?
  `;
  db.query(query, [name, email, gender, phone, formattedDob, profile_picture, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: 'Update failed' });
    res.json({ message: 'Profile updated successfully' });
  });
});

// Change password
router.put('/profile/:id/password', async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.params.id;

  db.query('SELECT password FROM users WHERE id = ?', [userId], async (err, results) => {
    if (err || results.length === 0) return res.status(500).json({ error: 'User not found' });

    const passwordMatch = await bcrypt.compare(currentPassword, results[0].password);
    if (!passwordMatch) return res.status(400).json({ error: 'Incorrect current password' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId], (err) => {
      if (err) return res.status(500).json({ error: 'Password update failed' });
      res.json({ message: 'Password updated successfully' });
    });
  });
});

// Upload profile picture
router.post('/profile/:id/upload', upload.single('image'), (req, res) => {
  const filename = req.file.filename;
  const userId = req.params.id;

  db.query('UPDATE users SET profile_picture = ? WHERE id = ?', [filename, userId], (err) => {
    if (err) return res.status(500).json({ error: 'Image upload failed' });
    res.json({ message: 'Profile picture updated', profile_picture: `/uploads/${filename}` });
  });
});

module.exports = router;
