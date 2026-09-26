import React, { useContext, useState } from "react";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <div className="top-banner">
        <div className="top-banner-content">
          <span>⚡ Welcome to <strong>AR SUNTECH</strong> - Official Tech Store</span>
          <div className="top-contacts">
            <span>📞 Order Help: <a href="https://wa.me/923113445000" target="_blank" rel="noreferrer">03113445000</a> | <a href="https://wa.me/923003127377" target="_blank" rel="noreferrer">03003127377</a></span>
          </div>
        </div>
      </div>

      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <Link to="/" className="brand-link" onClick={closeMenu}>
              <img src="/images/logo.jpeg" alt="AR SUNTECH logo" className="navbar-logo" />
              <span className="brand-name">AR SUNTECH</span>
            </Link>
          </div>

          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          <ul className={`navbar-links ${mobileMenuOpen ? 'is-open' : ''}`}>
            <li><Link to="/" onClick={closeMenu}>Shop Catalog</Link></li>
            <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
            <li>
              <Link to="/cart" className="cart-nav-link" onClick={closeMenu}>
                Cart
                <span className="cart-badge">{cartItems.reduce((acc, item) => acc + (Number(item.qty) || 1), 0)}</span>
              </Link>
            </li>
            {user && (
              <>
                {user.role === 'admin' && <li><Link to="/admin" className="admin-nav-link" onClick={closeMenu}>Admin Workspace</Link></li>}
                <li><button type="button" onClick={() => { closeMenu(); handleLogout(); }} className="btn-logout">Logout</button></li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;