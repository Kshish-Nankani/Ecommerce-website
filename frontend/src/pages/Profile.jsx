import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/profile.css';
import Alert from '../components/Alert';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');

      if (!userInfo?.token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('/api/orders/my-orders', {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Unable to load your orders');
        }

        setOrders(Array.isArray(data) ? data : []);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (!user && !localStorage.getItem('userInfo')) return null;

  return (
    <main className="profile-page">
      <div className="container profile-container">
        <header className="profile-header">
          <div>
            <p className="profile-eyebrow">AR SUNTECH ACCOUNT</p>
            <h1>Welcome, {user?.name || 'customer'}</h1>
            <p>{user?.email}</p>
          </div>
          <Link to="/" className="profile-store-link">Continue shopping</Link>
        </header>

        <section className="profile-orders-section">
          <div className="profile-section-heading">
            <h2>Your orders</h2>
            <span>{orders.length} {orders.length === 1 ? 'order' : 'orders'}</span>
          </div>

          {loading && <p className="profile-message">Loading your orders...</p>}
          {error && <div className="profile-message profile-error"><Alert>{error}</Alert></div>}
          {!loading && !error && orders.length === 0 && (
            <div className="profile-empty-state">
              <h2>No orders yet</h2>
              <p>Your purchased products will appear here after checkout.</p>
              <Link to="/" className="btn btn-primary">Browse products</Link>
            </div>
          )}

          {!loading && !error && orders.length > 0 && (
            <div className="profile-order-list">
              {orders.map((order) => (
                <article className="profile-order" key={order._id}>
                  <div className="profile-order-header">
                    <div>
                      <p>Order #{order._id.slice(-8)}</p>
                      <span>{order.products?.length || 0} product lines</span>
                    </div>
                    <span className={`profile-order-status profile-status-${order.status}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="profile-product-list">
                    {(order.products || []).map((item, index) => {
                      const product = item.product;
                      const price = Number(item.price || product?.price) || 0;
                      const quantity = Number(item.qut) || 1;

                      return (
                        <div className="profile-product" key={`${order._id}-${product?._id || index}`}>
                          <div>
                            <h3>{product?.name || 'Product no longer available'}</h3>
                            <p>Quantity: {quantity}</p>
                          </div>
                          <strong>${(price * quantity).toFixed(2)}</strong>
                        </div>
                      );
                    })}
                  </div>

                  <div className="profile-order-total">
                    <span>Order total</span>
                    <strong>${Number(order.totalAmount || 0).toFixed(2)}</strong>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Profile;
