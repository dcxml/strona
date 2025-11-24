import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';

export const Navigation = ({ user, subscription, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/auth');
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <motion.div
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/dashboard')}
        >
          🎾 Typy Tenisowe
        </motion.div>

        <motion.div
          className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}
          animate={mobileMenuOpen ? { x: 0 } : { x: '100%' }}
        >
          <a href="#dashboard">Dashboard</a>
          <a href="#picks">Moje Typy</a>
          <a href="#plans">Plany</a>
          
          <div className="nav-user-info">
            <span className="user-email">{user?.email}</span>
            {subscription && (
              <span className="subscription-status">
                Plan: {subscription.plan_type}
              </span>
            )}
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Wyloguj się
          </button>
        </motion.div>

        <motion.button
          className="hamburger"
          whileTap={{ scale: 0.95 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </motion.button>
      </div>
    </motion.nav>
  );
};
