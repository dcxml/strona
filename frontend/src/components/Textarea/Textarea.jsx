import React from 'react';
import './Textarea.css';

export const Textarea = React.forwardRef(
  ({ label, error, rows = 4, ...props }, ref) => {
    return (
      <div className="textarea-wrapper">
        {label && <label className="textarea-label">{label}</label>}
        <textarea ref={ref} className="textarea" rows={rows} {...props} />
        {error && <span className="textarea-error">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
