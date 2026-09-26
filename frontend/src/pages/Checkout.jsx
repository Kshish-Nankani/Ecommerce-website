import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import '../styles/checkout.css';
import Alert from '../components/Alert';

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [form, setForm] = useState({
    fullName: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'Pakistan',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');

  const totalAmount = cartItems.reduce(
    (total, item) => total + (Number(item.price) || 0) * (Number(item.qty) || 1),
    0
  );

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
    const headers = { 'Content-Type': 'application/json' };
    if (userInfo?.token) {
      headers['Authorization'] = `Bearer ${userInfo.token}`;
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          products: cartItems.map((item) => ({
            product: item.productId || item._id,
            qut: Number(item.qty) || 1,
            price: Number(item.price) || 0,
          })),
          totalAmount,
          address: form,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to place order');
      }

      setPlacedOrderId(data._id || 'NEW');
      dispatch(clearCart());
      setOrderPlaced(true);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <main className="checkout-page">
        <div className="container checkout-success">
          <p className="checkout-eyebrow">AR SUNTECH CHECKOUT</p>
          <h1>Order Placed Successfully! 🎉</h1>
          <p>Thank you for your order! Please send payment confirmation to our WhatsApp for immediate dispatch.</p>

          <div className="payment-instructions-box">
            <h3>💳 Payment Account Details</h3>
            <div className="payment-details-grid">
              <div className="payment-detail-card">
                <strong>📱 JAZZ CASH</strong>
                <span className="account-number">03113445000</span>
                <span className="account-title">Account Title: <strong>Ri shop</strong></span>
              </div>
              <div className="payment-detail-card">
                <strong>🏦 BANK ACCOUNT (HBL)</strong>
                <span className="account-number">0001007901567803</span>
                <span className="account-title">Bank: <strong>Habib Bank Limited</strong></span>
              </div>
            </div>

            <div className="whatsapp-confirm-section">
              <p>Send screenshot or payment confirmation on WhatsApp:</p>
              <div className="wa-actions-row">
                <a
                  href={`https://wa.me/923113445000?text=Hello%20AR%20SUNTECH,%20I%20have%20placed%20order%20%23${placedOrderId}%20and%20sent%20the%20payment.`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-wa"
                >
                  💬 Confirm via WhatsApp 1 (03113445000)
                </a>
                <a
                  href={`https://wa.me/923003127377?text=Hello%20AR%20SUNTECH,%20I%20have%20placed%20order%20%23${placedOrderId}%20and%20sent%20the%20payment.`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-wa"
                >
                  💬 Confirm via WhatsApp 2 (03003127377)
                </a>
              </div>
            </div>
          </div>

          <Link to="/" className="btn btn-primary" style={{ marginTop: '20px' }}>Continue Shopping</Link>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <div className="container checkout-success">
          <h1>Your cart is empty</h1>
          <p>Add products before checking out.</p>
          <Link to="/" className="btn btn-primary">Browse Catalog</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="container checkout-container">
        <div className="checkout-heading">
          <p className="checkout-eyebrow">AR SUNTECH CHECKOUT</p>
          <h1>Delivery & Payment Details</h1>
          <p>Provide your delivery address below to complete your order without an account.</p>
        </div>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h3>Delivery Information</h3>
            <label>Full Name<input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Enter your full name" /></label>
            <label>Street Address<input name="street" value={form.street} onChange={handleChange} required placeholder="House/Apartment #, Street name" /></label>
            <div className="checkout-form-row">
              <label>City<input name="city" value={form.city} onChange={handleChange} required placeholder="City name" /></label>
              <label>Postal Code<input name="postalCode" value={form.postalCode} onChange={handleChange} required placeholder="Postal code" /></label>
            </div>
            <label>Country<input name="country" value={form.country} onChange={handleChange} required placeholder="Country" /></label>

            <div className="static-payment-info">
              <h3>💳 Accepted Payment Methods</h3>
              <div className="payment-card-mini">
                <div>
                  <strong>JAZZ CASH:</strong> <span>03113445000</span> (Ri shop)
                </div>
                <div>
                  <strong>BANK (HBL):</strong> <span>0001007901567803</span> (Habib Bank Limited)
                </div>
              </div>
            </div>

            {error && <div className="checkout-error"><Alert>{error}</Alert></div>}
            <button type="submit" className="btn btn-primary checkout-submit" disabled={submitting}>
              {submitting ? 'Placing Order...' : 'Place Order & Get Payment Details'}
            </button>
          </form>

          <aside className="checkout-summary">
            <h2>Order Summary</h2>
            {cartItems.map((item) => (
              <div className="checkout-summary-row" key={item._id}>
                <span>{item.name} x {Number(item.qty) || 1}</span>
                <strong>RS {(Number(item.price) * (Number(item.qty) || 1)).toLocaleString()}</strong>
              </div>
            ))}
            <div className="checkout-total">
              <span>Total</span>
              <strong>RS {totalAmount.toLocaleString()}</strong>
            </div>

            <div className="checkout-wa-help">
              <p>Need help placing order?</p>
              <a href="https://wa.me/923113445000" target="_blank" rel="noreferrer" className="wa-help-link">
                💬 Chat on WhatsApp 1: 03113445000
              </a>
              <a href="https://wa.me/923003127377" target="_blank" rel="noreferrer" className="wa-help-link">
                💬 Chat on WhatsApp 2: 03003127377
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
