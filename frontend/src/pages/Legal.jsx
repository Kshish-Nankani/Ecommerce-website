import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/legal.css";

const Legal = () => {
  const location = useLocation();
  const activeSection = location.pathname === "/terms" ? "terms" : "privacy";

  return (
    <main className="legal-page">
      <section className="legal-hero">
        <p className="legal-eyebrow">AR SUNTECH Legal</p>
        <h1>Privacy & Terms</h1>
        <p className="legal-lead">
          One clear place for how we protect your data and the terms that govern
          your use of AR SUNTECH.
        </p>
        <div className="legal-top-links">
          <Link
            to="/privacy"
            className={`legal-chip ${activeSection === "privacy" ? "is-active" : ""}`}
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className={`legal-chip ${activeSection === "terms" ? "is-active" : ""}`}
          >
            Terms & Conditions
          </Link>
        </div>
      </section>

      <section id="privacy" className="legal-card">
        <h2>Privacy Policy</h2>
        <p>
          We collect only the information required to process your orders,
          improve your shopping experience, and provide support.
        </p>

        <h3>What We Collect</h3>
        <ul>
          <li>Account details such as your name, email, and phone number.</li>
          <li>Order and delivery details needed for shipping and invoicing.</li>
          <li>Basic usage analytics to improve site performance and features.</li>
        </ul>

        <h3>How We Use It</h3>
        <ul>
          <li>To process transactions and send order updates via email and WhatsApp.</li>
          <li>To prevent fraud, misuse, and unauthorized access.</li>
          <li>To personalize recommendations and improve services.</li>
        </ul>

        <h3>Your Rights</h3>
        <p>
          You may request access, correction, or deletion of your personal data
          by contacting support on WhatsApp (03113445000 / 03003127377).
        </p>
      </section>

      <section id="terms" className="legal-card">
        <h2>Terms & Conditions</h2>
        <p>
          By using AR SUNTECH, you agree to follow these terms for purchases,
          account use, and platform behavior.
        </p>

        <h3>Use of Service</h3>
        <ul>
          <li>Provide accurate information when creating your account.</li>
          <li>Do not attempt to disrupt, abuse, or exploit the platform.</li>
          <li>Respect intellectual property and product content.</li>
        </ul>

        <h3>Orders & Payments</h3>
        <ul>
          <li>All orders are subject to stock availability and payment verification.</li>
          <li>Payments accepted via JazzCash (03113445000 - Ri shop) and HBL Bank.</li>
          <li>Prices and offers may change without prior notice.</li>
        </ul>

        <h3>Limitation of Liability</h3>
        <p>
          AR SUNTECH is not liable for indirect losses arising from service
          interruptions, third-party failures, or misuse of the platform beyond
          our reasonable control.
        </p>
      </section>
    </main>
  );
};

export default Legal;
