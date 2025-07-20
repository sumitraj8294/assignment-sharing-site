import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchData = async () => {
      try {
        const userRes = await axios.get('/api/auth/me', {
          headers: { Authorization: token }
        });
        setUser(userRes.data);

        const assignRes = await axios.get(`/api/assignments/user/${userRes.data._id}`);
        setAssignments(assignRes.data);
      } catch (err) {
        alert('Failed to fetch profile info.');
      }
    };

    fetchData();
  }, []);

  if (!user) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <h2>👋 Hello, {user.name}!</h2>
      <p className="profile-email">Email: {user.email}</p>
      <h3>Your Submissions</h3>
      <div className="profile-assignments">
        {assignments.length === 0 ? (
          <p>You haven’t uploaded any assignments yet.</p>
        ) : (
          assignments.map((a) => (
            <div className="profile-assignment-card" key={a._id}>
              <h4>{a.title}</h4>
              <p><strong>Topic:</strong> {a.topic}</p>
              <p>{a.description}</p>
              <a href={a.fileUrl} target="_blank" rel="noopener noreferrer">🔗 View File</a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;
