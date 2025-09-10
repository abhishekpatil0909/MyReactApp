import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import defaultPic from '../assets/profile.jpg'; // fallback image

export default function Profile() {
  const userId = localStorage.getItem('userId');
  const [profile, setProfile] = useState({
    name: '', email: '', gender: '', phone: '', dob: '', profile_picture: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5001/api/profile/${userId}`)
      .then(res => setProfile(res.data))
      .catch(() => setMessage('Failed to load profile'));
  }, [userId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const res = await axios.post(`http://localhost:5001/api/profile/${userId}/upload`, formData);
      setProfile(prev => ({ ...prev, profile_picture: res.data.profile_picture }));
      setMessage('✅ Profile picture updated');
    } catch {
      setMessage('❌ Upload failed');
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5001/api/profile/${userId}`, profile);
      setMessage(res.data.message);
    } catch {
      setMessage('❌ Update failed');
    }
  };

  const handlePasswordChange = async () => {
    try {
      const res = await axios.put(`http://localhost:5001/api/profile/${userId}/password`, passwords);
      setMessage(res.data.message);
      setPasswords({ currentPassword: '', newPassword: '' });
    } catch (err) {
      setMessage(err.response?.data?.error || '❌ Password update failed');
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <img
          className="profile-img"
          src={profile.profile_picture ? `http://localhost:5001${profile.profile_picture}` : defaultPic}
          alt="Profile"
        />
        <h2>{profile.name || 'User Profile'}</h2>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="profile-body">
        <div className="form-section">
          <label>Name</label>
          <input type="text" name="name" value={profile.name} onChange={handleChange} />

          <label>Email</label>
          <input type="email" name="email" value={profile.email} onChange={handleChange} />

          <label>Gender</label>
          <select name="gender" value={profile.gender} onChange={handleChange}>
            <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option>
          </select>

          <label>Phone</label>
          <input type="text" name="phone" value={profile.phone} onChange={handleChange} />

          <label>Date of Birth</label>
          <input type="date" name="dob" value={profile.dob ? profile.dob.split('T')[0] : ''} onChange={handleChange} />

          <button onClick={handleUpdate}>💾 Update Profile</button>
        </div>

        <div className="form-section">
          <label>Upload Profile Picture</label>
          <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
          <button onClick={handleImageUpload}>📤 Upload Picture</button>

          <hr />

          <h3>Change Password</h3>
          <input type="password" placeholder="Current Password" value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} />
          <input type="password" placeholder="New Password" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} />
          <button onClick={handlePasswordChange}>🔑 Update Password</button>
        </div>
      </div>
    </div>
  );
}
