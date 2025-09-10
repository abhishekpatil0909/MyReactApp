import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    gender: '',
    phone: '',
    dob: '',
    password: '',
    salary: '',
    manager_id: '',
    department: '',
    designation: ''
  });

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/hr/users');
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value ?? ''
    });
  };

  const handleEdit = (user) => {
    const normalizedUser = Object.fromEntries(
      Object.entries(user).map(([key, value]) => [key, value ?? ''])
    );
    setEditingUser(user.id);
    setFormData({ ...normalizedUser, password: '' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5001/api/hr/users/${id}`);
    fetchUsers();
  };

  // Normalizes data so empty strings become null where appropriate
  const normalizeFormData = (data) => ({
    ...data,
    salary: data.salary === '' ? null : data.salary,
    manager_id: data.manager_id === '' ? null : data.manager_id,
    department: data.department === '' ? null : data.department,
    designation: data.designation === '' ? null : data.designation,
    dob: data.dob === '' ? null : data.dob,
    password: editingUser ? undefined : data.password // Only send password on create
  });

  const handleSubmit = async () => {
    const payload = normalizeFormData(formData);

    if (editingUser) {
      await axios.put(`http://localhost:5001/api/hr/users/${editingUser}`, payload);
    } else {
      await axios.post('http://localhost:5001/api/hr/users', payload);
    }

    setFormData({
      name: '',
      email: '',
      role: '',
      gender: '',
      phone: '',
      dob: '',
      password: '',
      salary: '',
      manager_id: '',
      department: '',
      designation: ''
    });
    setEditingUser(null);
    fetchUsers();
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>🌟 User Management Dashboard</h2>

      <div style={formWrapperStyle}>
        {['name', 'email', 'role', 'gender', 'phone', 'salary', 'manager_id', 'department', 'designation']
          .map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
              value={formData[field] ?? ''}
              onChange={handleChange}
              style={inputStyle}
            />
          ))}
        <input
          name="dob"
          type="date"
          value={formData.dob ?? ''}
          onChange={handleChange}
          style={inputStyle}
        />
        {!editingUser && (
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password ?? ''}
            onChange={handleChange}
            style={inputStyle}
          />
        )}
        <button onClick={handleSubmit} style={submitButtonStyle}>
          {editingUser ? '✨ Update User' : '➕ Create User'}
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr style={theadRowStyle}>
              {['ID', 'Name', 'Email', 'Role', 'Phone', 'DOB', 'Salary', 'Manager ID', 'Department', 'Designation', 'Actions']
                .map((title) => (
                  <th key={title} style={thStyle}>{title}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={rowStyle}>
                <td style={tdStyle}>{u.id}</td>
                <td style={tdStyle}>{u.name}</td>
                <td style={tdStyle}>{u.email}</td>
                <td style={tdStyle}>{u.role}</td>
                <td style={tdStyle}>{u.phone}</td>
                <td style={tdStyle}>{u.dob ? u.dob.split('T')[0] : ''}</td>
                <td style={tdStyle}>{u.salary}</td>
                <td style={tdStyle}>{u.manager_id}</td>
                <td style={tdStyle}>{u.department}</td>
                <td style={tdStyle}>{u.designation}</td>
                <td style={tdStyle}>
                  <button onClick={() => handleEdit(u)} style={editButton}>Edit</button>
                  <button onClick={() => handleDelete(u.id)} style={deleteButton}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 🎨 INLINE STYLES
const containerStyle = {
  padding: '30px 5%',
  background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
  minHeight: '100vh',
  fontFamily: 'Segoe UI, sans-serif'
};

const headingStyle = {
  marginBottom: '30px',
  textAlign: 'center',
  fontSize: '32px',
  color: '#34495e'
};

const formWrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
  marginBottom: '30px',
  justifyContent: 'center'
};

const inputStyle = {
  padding: '10px 14px',
  fontSize: '14px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  flex: '1 1 200px',
  minWidth: '200px',
  outline: 'none',
  transition: 'all 0.3s ease',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
};

const submitButtonStyle = {
  padding: '10px 16px',
  cursor: 'pointer',
  background: 'linear-gradient(to right, #00b09b, #96c93d)',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  transition: 'transform 0.3s ease',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
};

const theadRowStyle = {
  backgroundColor: '#19242fff',
  color: '#fff'
};

const thStyle = {
  padding: '12px',
  border: '1px solid #ddd',
  textAlign: 'left'
};

const tdStyle = {
  padding: '12px',
  border: '1px solid #eee',
  backgroundColor: '#ffffff'
};

const rowStyle = {
  backgroundColor: '#fefefe'
};

const editButton = {
  marginRight: '8px',
  padding: '6px 12px',
  backgroundColor: '#3498db',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const deleteButton = {
  padding: '6px 12px',
  backgroundColor: '#e74c3c',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};
