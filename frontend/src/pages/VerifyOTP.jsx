import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import '../styles/auth.css';

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || '');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to verify OTP');
      }

      setVerified(true);
    } catch (verifyError) {
      setError(verifyError.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (verified) {
    return (
      <div className="auth-container">
        <div className="auth-form auth-result">
          <h2>Email verified</h2>
          <Alert variant="success" role="status">Your account is verified. You can now log in.</Alert>
          <button type="button" className="btn" onClick={() => navigate('/login')}>Go to login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <p className="auth-eyebrow">AR SUNTECH ACCOUNT</p>
        <h2>Verify your email</h2>
        <p className="auth-helper">Enter the one-time code sent to your email address.</p>
        {error && <Alert>{error}</Alert>}
        <label className="auth-label" htmlFor="otp-email">Email address</label>
        <input id="otp-email" type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <label className="auth-label" htmlFor="otp-code">Verification code</label>
        <input id="otp-code" className="otp-input" type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength="6" placeholder="000000" value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ''))} required />
        <button type="submit" className="btn" disabled={submitting}>{submitting ? 'Verifying...' : 'Verify email'}</button>
        <p>Already verified? <Link to="/login">Log in</Link></p>
      </form>
    </div>
  );
};

export default VerifyOTP;
