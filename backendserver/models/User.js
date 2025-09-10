const db = require('../db'); 
const bcrypt = require('bcrypt');

const insertUser = (name, email, password, role, callback) => {
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return callback(err);
    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, hashedPassword, role], callback);
  });
};


const findUserByEmailAndPassword = (email, password, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, []);

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return callback(err);
      if (isMatch) {
        callback(null, [user]);
      } else {
        callback(null, []);
      }
    });
  });
};

module.exports = { insertUser, findUserByEmailAndPassword };
