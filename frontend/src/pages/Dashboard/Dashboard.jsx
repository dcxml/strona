import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { usersAPI, subscriptionsAPI } from '../../api/client';
import { Button } from '../../components/Button/Button';
import './Dashboard.css';
import { Navigation } from '../../components/Navigation/Navigation';
import { PicksList } from '../../components/PicksList/PicksList';
import { PricingPlans } from '../../components/PricingPlans/PricingPlans';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('picks');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, subRes] = await Promise.all([
          usersAPI.getProfile(),
          subscriptionsAPI.getActive()
        ]);
        setProfile(profileRes.data);
        setSubscription(subRes.data);
      } catch (error) {
        console.error('Błąd pobierania danych:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="loading-spinner"
        />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="dashboard">
      <Navigation user={user} subscription={subscription} onLogout={logout} />

      <motion.main
        className="dashboard-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="dashboard-header" variants={itemVariants}>
          <div className="header-top">
            <h1>Witaj, {user?.firstName || user?.email}! 🎾</h1>
            <div className="header-actions">
              <Button variant="secondary" size="sm">
                Mój Profil
              </Button>
              <Button variant="secondary" size="sm" onClick={logout}>
                Wyloguj się
              </Button>
            </div>
          </div>

          {subscription ? (
            <div className="subscription-badge active">
              ✓ Plan: {subscription.plan_type} (Aktywna do {new Date(subscription.expires_at).toLocaleDateString('pl-PL')})
            </div>
          ) : (
            <div className="subscription-badge inactive">
              ⚠ Brak aktywnej subskrypcji
            </div>
          )}
        </motion.div>

        {profile && (
          <motion.div className="stats-grid" variants={containerVariants}>
            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h3>Wszystkie Typy</h3>
                <p className="stat-value">{profile.stats?.total_picks || 0}</p>
              </div>
            </motion.div>

            <motion.div className="stat-card win" variants={itemVariants}>
              <div className="stat-icon">✓</div>
              <div className="stat-content">
                <h3>Wygrane</h3>
                <p className="stat-value">{profile.stats?.winning_picks || 0}</p>
              </div>
            </motion.div>

            <motion.div className="stat-card loss" variants={itemVariants}>
              <div className="stat-icon">✕</div>
              <div className="stat-content">
                <h3>Przegrane</h3>
                <p className="stat-value">{profile.stats?.losing_picks || 0}</p>
              </div>
            </motion.div>

            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-icon">%</div>
              <div className="stat-content">
                <h3>Procent Wygranych</h3>
                <p className="stat-value">{profile.stats?.win_percentage?.toFixed(1) || 0}%</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        <motion.div className="tabs" variants={itemVariants}>
          <button
            className={`tab ${activeTab === 'picks' ? 'active' : ''}`}
            onClick={() => setActiveTab('picks')}
          >
            Moje Typy
          </button>
          <button
            className={`tab ${activeTab === 'pricing' ? 'active' : ''}`}
            onClick={() => setActiveTab('pricing')}
          >
            Plany i Cennik
          </button>
        </motion.div>

        {activeTab === 'picks' ? (
          subscription ? (
            <PicksList />
          ) : (
            <motion.div className="no-subscription" variants={itemVariants}>
              <h2>Aby dodawać i przeglądać typy, potrzebujesz aktywnej subskrypcji</h2>
              <Button
                variant="primary"
                size="lg"
                onClick={() => setActiveTab('pricing')}
              >
                Wybierz Plan
              </Button>
            </motion.div>
          )
        ) : (
          <PricingPlans currentPlan={subscription?.plan_type} />
        )}
      </motion.main>
    </div>
  );
};
