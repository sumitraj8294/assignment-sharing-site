import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AllAssignments.css';

function AllAssignments() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios.get('https://assignment-backend-4l7a.onrender.com/api/assignments/all')
      .then(res => {
        setAssignments(res.data);
      })
      .catch(err => {
        alert('Failed to fetch assignments');
      });
  }, []);

  return (
    <div className="assignments-container">
      <h2>📄 All Submitted Assignments</h2>
      {assignments.length === 0 ? (
        <p className="empty-state">No assignments uploaded yet.</p>
      ) : (
        <div className="assignment-list">
          {assignments.map(a => (
            <div className="assignment-card" key={a._id}>
              <h3>{a.title}</h3>
              <p><strong>Topic:</strong> {a.topic}</p>
              <p><strong>By:</strong> {a.user.name}</p>
              <p>{a.description}</p>
              <a href={`https://assignment-backend-4l7a.onrender.com${a.fileUrl}`} target="_blank" rel="noopener noreferrer">
                🔗 View File
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllAssignments;
