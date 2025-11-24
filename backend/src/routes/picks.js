import express from 'express';
import pool from '../db.js';
import { authenticateToken, checkSubscription } from '../middleware/auth.js';

const router = express.Router();

// Utwórz typ (tylko dla subskrybentów)
router.post('/', authenticateToken, checkSubscription, async (req, res) => {
  try {
    const { matchName, tournament, player1, player2, pickDescription, confidenceLevel, odds, matchDate } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      `INSERT INTO tennis_picks (user_id, match_name, tournament, player1, player2, pick_description, confidence_level, odds, result, match_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending', $9)
       RETURNING *`,
      [userId, matchName, tournament, player1, player2, pickDescription, confidenceLevel, odds, matchDate]
    );

    // Aktualizuj statystyki
    await pool.query(
      'UPDATE user_stats SET total_picks = total_picks + 1 WHERE user_id = $1',
      [userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Pobierz typy (tylko dla subskrybentów)
router.get('/', authenticateToken, checkSubscription, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      'SELECT * FROM tennis_picks WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Pobierz typ po ID
router.get('/:id', authenticateToken, checkSubscription, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await pool.query(
      'SELECT * FROM tennis_picks WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Typ nie znaleziony' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Aktualizuj wynik typu
router.put('/:id', authenticateToken, checkSubscription, async (req, res) => {
  try {
    const { id } = req.params;
    const { result } = req.body;
    const userId = req.user.id;

    if (!['win', 'loss', 'push'].includes(result)) {
      return res.status(400).json({ error: 'Nieważny wynik' });
    }

    const pickResult = await pool.query(
      'SELECT * FROM tennis_picks WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (pickResult.rows.length === 0) {
      return res.status(404).json({ error: 'Typ nie znaleziony' });
    }

    const updateResult = await pool.query(
      'UPDATE tennis_picks SET result = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [result, id]
    );

    // Aktualizuj statystyki
    if (result === 'win') {
      await pool.query(
        'UPDATE user_stats SET winning_picks = winning_picks + 1 WHERE user_id = $1',
        [userId]
      );
    } else if (result === 'loss') {
      await pool.query(
        'UPDATE user_stats SET losing_picks = losing_picks + 1 WHERE user_id = $1',
        [userId]
      );
    }

    res.json(updateResult.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Usuń typ
router.delete('/:id', authenticateToken, checkSubscription, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await pool.query(
      'DELETE FROM tennis_picks WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Typ nie znaleziony' });
    }

    res.json({ message: 'Typ usunięty' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
