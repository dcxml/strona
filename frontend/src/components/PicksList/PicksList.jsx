import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { picksAPI } from '../../api/client';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import './PicksList.css';

export const PicksList = () => {
  const [picks, setPicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    matchName: '',
    tournament: '',
    player1: '',
    player2: '',
    pickDescription: '',
    confidenceLevel: 5,
    odds: 1.5,
    matchDate: ''
  });

  useEffect(() => {
    fetchPicks();
  }, []);

  const fetchPicks = async () => {
    try {
      const response = await picksAPI.getAll();
      setPicks(response.data);
    } catch (error) {
      console.error('Błąd pobierania typów:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await picksAPI.create(formData);
      setFormData({
        matchName: '',
        tournament: '',
        player1: '',
        player2: '',
        pickDescription: '',
        confidenceLevel: 5,
        odds: 1.5,
        matchDate: ''
      });
      setShowForm(false);
      fetchPicks();
    } catch (error) {
      console.error('Błąd dodawania typu:', error);
      alert('Błąd: ' + (error.response?.data?.error || error.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Na pewno chcesz usunąć ten typ?')) {
      try {
        await picksAPI.delete(id);
        fetchPicks();
      } catch (error) {
        console.error('Błąd usuwania typu:', error);
      }
    }
  };

  const handleUpdateResult = async (id, result) => {
    try {
      await picksAPI.update(id, { result });
      fetchPicks();
    } catch (error) {
      console.error('Błąd aktualizacji wyniku:', error);
    }
  };

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
    <div className="picks-container">
      <motion.div className="picks-header" variants={itemVariants}>
        <h2>Moje Typy</h2>
        <Button
          variant="primary"
          size="md"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Anuluj' : '+ Nowy Typ'}
        </Button>
      </motion.div>

      {showForm && (
        <motion.form
          className="picks-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Input
            label="Nazwa Meczu"
            value={formData.matchName}
            onChange={(e) => setFormData({ ...formData, matchName: e.target.value })}
            required
            placeholder="np. Federer vs Nadal"
          />

          <div className="form-row">
            <Input
              label="Turniej"
              value={formData.tournament}
              onChange={(e) => setFormData({ ...formData, tournament: e.target.value })}
              placeholder="np. Wimbledon"
            />
            <Input
              label="Data Meczu"
              type="datetime-local"
              value={formData.matchDate}
              onChange={(e) => setFormData({ ...formData, matchDate: e.target.value })}
            />
          </div>

          <div className="form-row">
            <Input
              label="Gracz 1"
              value={formData.player1}
              onChange={(e) => setFormData({ ...formData, player1: e.target.value })}
              placeholder="Imię i nazwisko"
            />
            <Input
              label="Gracz 2"
              value={formData.player2}
              onChange={(e) => setFormData({ ...formData, player2: e.target.value })}
              placeholder="Imię i nazwisko"
            />
          </div>

          <Textarea
            label="Opis Typu"
            value={formData.pickDescription}
            onChange={(e) => setFormData({ ...formData, pickDescription: e.target.value })}
            placeholder="Wyjaśnij dlaczego typujesz tego zawodnika..."
            required
            rows={3}
          />

          <div className="form-row">
            <div className="form-field">
              <label>Poziom Pewności (1-10)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.confidenceLevel}
                onChange={(e) => setFormData({ ...formData, confidenceLevel: parseInt(e.target.value) })}
              />
              <span className="range-value">{formData.confidenceLevel}</span>
            </div>
            <Input
              label="Kurs"
              type="number"
              step="0.01"
              value={formData.odds}
              onChange={(e) => setFormData({ ...formData, odds: parseFloat(e.target.value) })}
              placeholder="np. 1.50"
            />
          </div>

          <Button 
            type="submit" 
            variant="success" 
            size="lg" 
            className="submit-btn"
            disabled={submitting}
          >
            {submitting ? 'Dodawanie...' : 'Dodaj Typ'}
          </Button>
        </motion.form>
      )}

      {loading ? (
        <div className="loading">Ładowanie typów...</div>
      ) : picks.length === 0 ? (
        <motion.div className="empty-state" variants={itemVariants}>
          <p>Jeszcze nie masz żadnych typów. Dodaj swój pierwszy typ!</p>
        </motion.div>
      ) : (
        <motion.div className="picks-list" variants={containerVariants} initial="hidden" animate="visible">
          {picks.map((pick) => (
            <motion.div key={pick.id} className="pick-card" variants={itemVariants}>
              <div className="pick-header">
                <h3>{pick.match_name}</h3>
                <span className={`result-badge ${pick.result}`}>{pick.result}</span>
              </div>

              <div className="pick-details">
                <p><strong>Turniej:</strong> {pick.tournament}</p>
                <p><strong>Gracze:</strong> {pick.player1} vs {pick.player2}</p>
                <p><strong>Typ:</strong> {pick.pick_description}</p>
                <p><strong>Pewność:</strong> {pick.confidence_level}/10</p>
                <p><strong>Kurs:</strong> {pick.odds}</p>
                <p><strong>Data:</strong> {new Date(pick.match_date).toLocaleDateString('pl-PL')}</p>
              </div>

              <div className="pick-actions">
                {pick.result === 'pending' && (
                  <>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleUpdateResult(pick.id, 'win')}
                    >
                      Wygrana
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleUpdateResult(pick.id, 'loss')}
                    >
                      Przegrana
                    </Button>
                  </>
                )}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDelete(pick.id)}
                >
                  Usuń
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};
