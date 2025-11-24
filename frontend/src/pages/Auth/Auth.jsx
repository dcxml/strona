import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import './Auth.css';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(emailRef.current.value, passwordRef.current.value);
      } else {
        await register(
          emailRef.current.value,
          passwordRef.current.value,
          firstNameRef.current?.value || '',
          lastNameRef.current?.value || ''
        );
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Błąd');
    } finally {
      setLoading(false);
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
    <div className="auth-container">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="auth-header"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="auth-title">
            🎾 Typy Tenisowe
          </motion.h1>
          <motion.p variants={itemVariants} className="auth-subtitle">
            {isLogin ? 'Zaloguj się do konta' : 'Utwórz nowe konto'}
          </motion.p>
        </motion.div>

        {error && (
          <motion.div
            className="auth-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            ref={emailRef}
            type="email"
            label="Email"
            placeholder="twoj@email.com"
            required
            disabled={loading}
          />

          {!isLogin && (
            <>
              <Input
                ref={firstNameRef}
                type="text"
                label="Imię"
                placeholder="Twoje imię"
                disabled={loading}
              />
              <Input
                ref={lastNameRef}
                type="text"
                label="Nazwisko"
                placeholder="Twoje nazwisko"
                disabled={loading}
              />
            </>
          )}

          <Input
            ref={passwordRef}
            type="password"
            label="Hasło"
            placeholder="••••••••"
            required
            disabled={loading}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            className="auth-submit"
          >
            {loading ? 'Ładowanie...' : isLogin ? 'Zaloguj się' : 'Zarejestruj się'}
          </Button>
        </form>

        <motion.p className="auth-toggle">
          {isLogin ? 'Nie masz konta? ' : 'Masz już konto? '}
          <motion.button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="auth-toggle-btn"
          >
            {isLogin ? 'Zarejestruj się' : 'Zaloguj się'}
          </motion.button>
        </motion.p>
      </motion.div>
    </div>
  );
};
