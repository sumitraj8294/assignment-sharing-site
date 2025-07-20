import React from 'react';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-wrapper">
      <div className="home-hero">
        <h1>📚 Class Assignment Sharing Portal</h1>
        <p>
          Collaborate with your classmates by uploading and accessing daily documents
          in Hindi on any topic. Create your profile, explore shared resources, and stay updated.
        </p>
        <div className="home-buttons">
          <a href="/register" className="home-btn">Get Started</a>
          <a href="/assignments" className="home-btn secondary">Browse Assignments</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
