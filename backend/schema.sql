-- Tabela użytkowników
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- Tabela subskrypcji
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  plan_type VARCHAR(50) NOT NULL, -- 'basic', 'pro', 'premium'
  is_active BOOLEAN DEFAULT true,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela typów tenisowych
CREATE TABLE tennis_picks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  match_name VARCHAR(255) NOT NULL,
  tournament VARCHAR(255),
  player1 VARCHAR(100),
  player2 VARCHAR(100),
  pick_description TEXT,
  confidence_level INTEGER, -- 1-10
  odds DECIMAL(10, 2),
  result VARCHAR(50), -- 'win', 'loss', 'pending', 'push'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  match_date TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela statystyk użytkownika
CREATE TABLE user_stats (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  total_picks INTEGER DEFAULT 0,
  winning_picks INTEGER DEFAULT 0,
  losing_picks INTEGER DEFAULT 0,
  roi DECIMAL(10, 2) DEFAULT 0,
  win_percentage DECIMAL(5, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela płatności (testowych)
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2),
  plan_type VARCHAR(50),
  status VARCHAR(50), -- 'pending', 'completed', 'failed'
  payment_method VARCHAR(50), -- 'test', 'stripe'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela notyfikacji
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indeksy
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_is_active ON subscriptions(is_active);
CREATE INDEX idx_tennis_picks_user_id ON tennis_picks(user_id);
CREATE INDEX idx_tennis_picks_created_at ON tennis_picks(created_at);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
