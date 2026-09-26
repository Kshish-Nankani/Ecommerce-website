import React from "react";
import "../styles/contact.css";

const Contact = () => {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <p className="contact-eyebrow">Contact AR SUNTECH</p>
        <h1>We Are Here To Assist You</h1>
        <p className="contact-lead">
          Questions about an order, payment confirmation, or product details?
          Reach out directly via WhatsApp or phone.
        </p>
      </section>

      <section className="contact-layout">
        <article className="contact-card contact-info-card">
          <h2>Direct Contact Channels</h2>
          <p>
            Connect with us on WhatsApp or call our support team directly.
          </p>

          <div className="contact-info-list">
            <div className="contact-info-item">
              <h3>📱 WhatsApp Support 1</h3>
              <p><strong>03113445000</strong></p>
              <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                <a href="https://wa.me/923113445000" target="_blank" rel="noreferrer" className="btn btn-wa" style={{ padding: '6px 12px', fontSize: '13px' }}>
                  💬 WhatsApp Chat
                </a>
                <a href="tel:03113445000" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '13px' }}>
                  📞 Call Now
                </a>
              </div>
            </div>

            <div className="contact-info-item">
              <h3>📱 WhatsApp Support 2</h3>
              <p><strong>03003127377</strong></p>
              <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                <a href="https://wa.me/923003127377" target="_blank" rel="noreferrer" className="btn btn-wa" style={{ padding: '6px 12px', fontSize: '13px' }}>
                  💬 WhatsApp Chat
                </a>
                <a href="tel:03003127377" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '13px' }}>
                  📞 Call Now
                </a>
              </div>
            </div>

            <div className="contact-info-item" style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
              <h3 style={{ color: '#f59e0b', marginBottom: '8px' }}>💳 Payment Accounts</h3>
              <p style={{ margin: '4px 0' }}><strong>JazzCash:</strong> 03113445000 (Title: Ri shop)</p>
              <p style={{ margin: '4px 0' }}><strong>HBL Bank:</strong> 0001007901567803 (Habib Bank Limited)</p>
            </div>
          </div>
        </article>

        <article className="contact-card contact-form-card">
          <h2>Send Us A Message</h2>

          <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
            <div className="contact-field-grid">
              <div className="contact-field">
                <label htmlFor="fullName">Full Name</label>
                <input id="fullName" type="text" placeholder="Your full name" />
              </div>

              <div className="contact-field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="you@example.com" />
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="subject">Subject</label>
              <input id="subject" type="text" placeholder="How can we help?" />
            </div>

            <div className="contact-field">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" placeholder="Write your message here..." />
            </div>

            <button type="submit" className="contact-submit-btn">
              Send Message
            </button>
          </form>
        </article>
      </section>
    </main>
  );
};

export default Contact;
