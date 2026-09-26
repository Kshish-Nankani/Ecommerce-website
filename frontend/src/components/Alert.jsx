import React from 'react';

const Alert = ({ children, variant = 'error', role = 'alert' }) => (
  <div className={`app-alert app-alert-${variant}`} role={role}>
    <span className="app-alert-mark" aria-hidden="true">{variant === 'success' ? '✓' : '!'}</span>
    <span>{children}</span>
  </div>
);

export default Alert;
