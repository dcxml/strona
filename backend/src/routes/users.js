import express from 'express';
import pool from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Pobierz profil użytkownika
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    const statsResult = await pool.query('SELECT * FROM user_stats WHERE user_id = $1', [userId]);
    const subscriptionResult = await pool.query(
      'SELECT * FROM subscriptions WHERE user_id = $1 AND is_active = true ORDER BY expires_at DESC LIMIT 1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
    }

    res.json({
      user: userResult.rows[0],
      stats: statsResult.rows[0] || {},
      subscription: subscriptionResult.rows[0] || null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Aktualizuj profil
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName } = req.body;

    const result = await pool.query(
      'UPDATE users SET first_name = $1, last_name = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [firstName || '', lastName || '', userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Pobierz powiadomienia
router.get('/notifications', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 20',
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
