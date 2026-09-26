import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <style>{`
        .footer {
          background: #1c1917;
          color: #f5f5f4;
          margin-top: 60px;
          border-top: 4px solid #d4a72c;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 55px 30px 25px;
        }

        .footer-main {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.8fr;
          gap: 40px;
          padding-bottom: 45px;
        }

        /* Brand */
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .footer-brand-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .footer-logo {
          width: 48px;
          height: 48px;
          object-fit: cover;
          border-radius: 10px;
          border: 2px solid #d4a72c;
        }

        .footer-brand h2 {
          margin: 0;
          font-size: 26px;
          font-weight: 800;
          letter-spacing: 0.5px;
          color: #ffffff;
        }

        .footer-brand p {
          color: #a8a29e;
          line-height: 1.7;
          font-size: 14px;
          margin: 0;
        }

        /* Footer Columns */
        .footer-column h3 {
          font-size: 16px;
          margin: 0 0 18px;
          font-weight: 700;
          color: #fde047;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .footer-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-column ul li {
          margin-bottom: 12px;
        }

        .footer-column ul li a {
          color: #d6d3d1;
          text-decoration: none;
          font-size: 14px;
          transition: 0.2s ease;
        }

        .footer-column ul li a:hover {
          color: #fde047;
          padding-left: 4px;
        }

        /* Payment Accounts Box */
        .footer-accounts-card {
          background: #292524;
          border: 1px solid #44403c;
          border-radius: 12px;
          padding: 16px;
          margin-top: 10px;
        }

        .footer-account-item {
          margin-bottom: 12px;
          padding-bottom: 10px;
          border-bottom: 1px solid #44403c;
        }

        .footer-account-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .footer-account-title {
          font-size: 12px;
          font-weight: 700;
          color: #fde047;
          text-transform: uppercase;
          display: block;
        }

        .footer-account-val {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          display: block;
          margin-top: 2px;
        }

        .footer-account-sub {
          font-size: 12px;
          color: #a8a29e;
        }

        /* WhatsApp Buttons */
        .footer-wa-buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 12px;
        }

        .footer-wa-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #25d366;
          color: #ffffff;
          font-size: 13px;
          font-weight: 700;
          padding: 10px 14px;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s ease;
        }

        .footer-wa-btn:hover {
          background: #1ebe57;
        }

        /* Bottom Footer */
        .footer-bottom {
          border-top: 1px solid #292524;
          padding-top: 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .footer-bottom p {
          margin: 0;
          color: #78716c;
          font-size: 13px;
        }

        .footer-bottom-links {
          display: flex;
          gap: 20px;
        }

        .footer-bottom-links a {
          color: #a8a29e;
          text-decoration: none;
          font-size: 13px;
          transition: 0.2s ease;
        }

        .footer-bottom-links a:hover {
          color: #fde047;
        }

        .rohan-access-link {
          color: #78716c !important;
          font-size: 12px !important;
          opacity: 0.7;
        }

        .rohan-access-link:hover {
          opacity: 1;
          color: #fde047 !important;
        }

        @media (max-width: 900px) {
          .footer-main {
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 600px) {
          .footer-main {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-main">

            {/* Brand Column */}
            <div className="footer-brand">
              <div className="footer-brand-header">
                <img src="/images/logo.jpeg" alt="AR SUNTECH Logo" className="footer-logo" />
                <h2>AR SUNTECH</h2>
              </div>

              <p>
                Your premier destination for high quality electronics, gadgets, and tech accessories in Pakistan.
                Delivering fast fulfillment and dedicated customer support.
              </p>

              {/* Payment Account Details */}
              <div className="footer-accounts-card">
                <div className="footer-account-item">
                  <span className="footer-account-title">📱 JAZZ CASH</span>
                  <span className="footer-account-val">03113445000</span>
                  <span className="footer-account-sub">Account Title: Ri shop</span>
                </div>
                <div className="footer-account-item">
                  <span className="footer-account-title">🏦 BANK ACCOUNT (HBL)</span>
                  <span className="footer-account-val">0001007901567803</span>
                  <span className="footer-account-sub">Habib Bank Limited</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/">Home Catalog</Link></li>
                <li><Link to="/cart">My Cart</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Support</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="footer-column">
              <h3>Information</h3>
              <ul>
                <li><Link to="/about">About AR SUNTECH</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms & Conditions</Link></li>
              </ul>
            </div>

            {/* Direct Contacts */}
            <div className="footer-column">
              <h3>Direct Contacts</h3>
              <p style={{ fontSize: '13px', color: '#a8a29e', marginBottom: '10px' }}>
                Contact us directly on WhatsApp or call for immediate assistance:
              </p>
              <div className="footer-wa-buttons">
                <a href="https://wa.me/923113445000" target="_blank" rel="noreferrer" className="footer-wa-btn">
                  💬 WhatsApp 1: 03113445000
                </a>
                <a href="https://wa.me/923003127377" target="_blank" rel="noreferrer" className="footer-wa-btn">
                  💬 WhatsApp 2: 03003127377
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <p>© 2026 AR SUNTECH. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/login" className="rohan-access-link">Access to rohan</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;