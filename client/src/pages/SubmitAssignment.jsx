import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SubmitAssignment.css';

function SubmitAssignment() {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please attach a file.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('topic', topic);
    formData.append('description', description);
    formData.append('file', file);

    try {
      const res = await axios.post('/api/assignments/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('token')
        }
      });
      alert("✅ Assignment submitted successfully!");
      setTitle('');
      setTopic('');
      setDescription('');
      setFile(null);
    } catch (err) {
      alert("❌ Failed to submit assignment");
    }
  };

  return (
    <div className="submit-assignment-container">
      <h2>📝 Submit Your Assignment</h2>
      <form onSubmit={handleSubmit} className="assignment-form">
        <input
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
        <textarea
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">Upload Assignment</button>
      </form>
    </div>
  );
}

export default SubmitAssignment;
