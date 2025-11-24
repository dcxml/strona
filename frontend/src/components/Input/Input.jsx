import React from 'react';
import './Input.css';

export const Input = React.forwardRef(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="input-wrapper">
        {label && <label className="input-label">{label}</label>}
        <input ref={ref} className="input" {...props} />
        {error && <span className="input-error">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
