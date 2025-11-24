import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token nie znaleziony' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Nieważny token' });
  }
};

export const checkSubscription = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const pool = (await import('./db.js')).default;
    
    const result = await pool.query(
      'SELECT is_active, expires_at FROM subscriptions WHERE user_id = $1 AND is_active = true ORDER BY expires_at DESC LIMIT 1',
      [userId]
    );

    if (result.rows.length === 0 || (result.rows[0].expires_at && new Date(result.rows[0].expires_at) < new Date())) {
      return res.status(403).json({ error: 'Brak aktywnej subskrypcji' });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Błąd weryfikacji subskrypcji' });
  }
};
