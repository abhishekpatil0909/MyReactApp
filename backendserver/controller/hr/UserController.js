const db = require('../../db/db'); // Adjust this path to your MySQL connection setup
const bcrypt = require('bcrypt');

// Get all users
exports.getAllUsers = async (req, res) => {
  db.query(
    `SELECT id, name, email, role, gender, profile_picture, phone, dob, 
            salary, manager_id, department, designation, created_at 
     FROM users`,
    (err, results) => {
      if (err) return res.status(500).json({ error: "Failed to fetch users" });
      res.json(results);
    }
  );
};

// Create user
exports.createUser = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    gender,
    phone,
    dob,
    salary,
    manager_id,
    department,
    designation
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      `INSERT INTO users 
        (name, email, password, role, gender, phone, dob, salary, manager_id, department, designation, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [name, email, hashedPassword, role, gender, phone, dob, salary, manager_id, department, designation],
      (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to create user" });
        res.json({ message: "User created", id: result.insertId });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update user
exports.updateUser = (req, res) => {
  const id = req.params.id;
  const {
    name,
    email,
    role,
    gender,
    phone,
    dob,
    salary,
    manager_id,
    department,
    designation
  } = req.body;

  db.query(
    `UPDATE users 
     SET name=?, email=?, role=?, gender=?, phone=?, dob=?, salary=?, manager_id=?, department=?, designation=? 
     WHERE id=?`,
    [name, email, role, gender, phone, dob, salary, manager_id, department, designation, id],
    (err) => {
      if (err) return res.status(500).json({ error: "Failed to update user" });
      res.json({ message: "User updated" });
    }
  );
};

// Delete user
exports.deleteUser = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM users WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Failed to delete user" });
    res.json({ message: "User deleted" });
  });
};
