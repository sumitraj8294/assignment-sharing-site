import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import '../styles/Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded); // { id: ..., name: ..., ... }
      } catch (err) {
        console.error('Invalid token');
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">📚 ClassShare</Link>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>
      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/assignments">Assignments</Link></li>
        {token ? (
          <>
            <li><Link to="/submit">Submit</Link></li>
            <li className="user-dropdown">
              <span className="user-name">👤 {user?.name}</span>
              <div className="dropdown-content">
                <Link to="/profile">Dashboard</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
