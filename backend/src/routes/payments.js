import express from 'express';
import pool from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Przeprowadź testową płatność
router.post('/test-payment', authenticateToken, async (req, res) => {
  try {
    const { planType, amount } = req.body;
    const userId = req.user.id;

    if (!['basic', 'pro', 'premium'].includes(planType)) {
      return res.status(400).json({ error: 'Nieważny typ planu' });
    }

    // Utwórz płatność
    const paymentResult = await pool.query(
      'INSERT INTO payments (user_id, amount, plan_type, status, payment_method) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, amount, planType, 'completed', 'test']
    );

    // Utwórz subskrypcję
    const expiresAt = new Date();
    const daysToAdd = planType === 'basic' ? 30 : planType === 'pro' ? 90 : 365;
    expiresAt.setDate(expiresAt.getDate() + daysToAdd);

    const subscriptionResult = await pool.query(
      'INSERT INTO subscriptions (user_id, plan_type, is_active, expires_at) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, planType, true, expiresAt]
    );

    // Utwórz powiadomienie
    await pool.query(
      'INSERT INTO notifications (user_id, title, message) VALUES ($1, $2, $3)',
      [userId, 'Subskrypcja aktywna', `Twoja subskrypcja ${planType} jest już aktywna!`]
    );

    res.json({
      payment: paymentResult.rows[0],
      subscription: subscriptionResult.rows[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Pobierz historię płatności
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      'SELECT * FROM payments WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
