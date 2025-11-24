import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { paymentsAPI } from '../../api/client';
import { Button } from '../Button/Button';
import './PricingPlans.css';

export const PricingPlans = ({ currentPlan }) => {
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      name: 'Basic',
      price: 29,
      period: 'miesiąc',
      color: 'basic',
      features: [
        '✓ Do 5 typów na tydzień',
        '✓ Statystyki podstawowe',
        '✓ Historia typów',
        '✓ Powiadomienia email',
        '✗ Zaawansowana analiza',
        '✗ Prywatne typy eksperta'
      ],
      cta: 'Wybierz Basic'
    },
    {
      name: 'Pro',
      price: 79,
      period: '3 miesiące',
      color: 'pro',
      features: [
        '✓ Nieograniczone typy',
        '✓ Zaawansowane statystyki',
        '✓ Historia i eksport',
        '✓ Powiadomienia SMS',
        '✓ Zaawansowana analiza',
        '✗ Prywatne typy eksperta'
      ],
      cta: 'Wybierz Pro',
      highlighted: true
    },
    {
      name: 'Premium',
      price: 199,
      period: 'rok',
      color: 'premium',
      features: [
        '✓ Wszystko w Pro',
        '✓ Prywatne typy eksperta',
        '✓ Analiza AI',
        '✓ Wsparcie 24/7',
        '✓ Dostęp do webinarów',
        '✓ Zwrot pieniędzy 30 dni'
      ],
      cta: 'Wybierz Premium'
    }
  ];

  const handlePurchase = async (planType, amount) => {
    setLoading(true);
    try {
      const response = await paymentsAPI.testPayment(planType, amount);
      alert(`✓ Subskrypcja ${planType} aktywowana!\nWażna do: ${new Date(response.data.subscription.expires_at).toLocaleDateString('pl-PL')}`);
      window.location.reload();
    } catch (error) {
      alert('✕ Błąd: ' + (error.response?.data?.error || error.message));
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
    <div className="pricing-container">
      <motion.div className="pricing-header" variants={itemVariants}>
        <h2>Cennik i Plany</h2>
        <p>Wybierz plan dopasowany do Twoich potrzeb</p>
      </motion.div>

      <motion.div
        className="pricing-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className={`pricing-card ${plan.color} ${plan.highlighted ? 'highlighted' : ''} ${
              currentPlan === plan.name.toLowerCase() ? 'active' : ''
            }`}
            variants={itemVariants}
            whileHover={{ y: -8 }}
          >
            {plan.highlighted && <div className="badge">Najpopularniejszy</div>}

            <h3 className="plan-name">{plan.name}</h3>

            <div className="plan-price">
              <span className="currency">zł</span>
              <span className="amount">{plan.price}</span>
              <span className="period">/{plan.period}</span>
            </div>

            <ul className="features-list">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>

            <Button
              variant={plan.highlighted ? 'primary' : 'secondary'}
              size="lg"
              disabled={loading || currentPlan === plan.name.toLowerCase()}
              onClick={() => handlePurchase(plan.name.toLowerCase(), plan.price)}
              className="plan-cta"
            >
              {currentPlan === plan.name.toLowerCase() ? '✓ Aktywny Plan' : plan.cta}
            </Button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="pricing-note" variants={itemVariants}>
        <p>
          💳 Te są płatności testowe. Po finalnym uruchomieniu zostanie zintegrowany Stripe.
        </p>
      </motion.div>
    </div>
  );
};
