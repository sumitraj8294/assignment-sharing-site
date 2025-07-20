import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>📚 Assignment Sharing Site</h3>
        <p>Built with ❤️ by classmates for classmates. Share, learn, and grow together!</p>
        <p className="footer-copy">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
