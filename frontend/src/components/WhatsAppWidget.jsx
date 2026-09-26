import React, { useState } from 'react';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    { number: '03113445000', wa: '923113445000', name: 'Sales & Support 1' },
    { number: '03003127377', wa: '923003127377', name: 'Order Confirmation & Support 2' }
  ];

  return (
    <div className="wa-widget-wrapper">
      {isOpen && (
        <div className="wa-popup-card">
          <div className="wa-popup-header">
            <div className="wa-popup-title">
              <span className="wa-badge-icon">💬</span>
              <div>
                <strong>AR SUNTECH Support</strong>
                <p>Order assistance & inquiries</p>
              </div>
            </div>
            <button type="button" className="wa-close-btn" onClick={() => setIsOpen(false)} aria-label="Close">×</button>
          </div>

          <div className="wa-popup-body">
            <p className="wa-intro-text">Choose a WhatsApp contact or call directly to confirm your order:</p>
            {contacts.map((contact, index) => (
              <div key={index} className="wa-contact-box">
                <div className="wa-contact-info">
                  <span className="wa-contact-name">{contact.name}</span>
                  <span className="wa-contact-number">{contact.number}</span>
                </div>
                <div className="wa-contact-actions">
                  <a
                    href={`https://wa.me/${contact.wa}?text=Hello%20AR%20SUNTECH,%20I%20have%20an%20inquiry/order%20confirmation.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wa-btn wa-btn-chat"
                  >
                    💬 WhatsApp
                  </a>
                  <a
                    href={`tel:${contact.number}`}
                    className="wa-btn wa-btn-call"
                  >
                    📞 Call
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="wa-popup-footer">
            <p><strong>JazzCash / Bank Transfer Support Available</strong></p>
          </div>
        </div>
      )}

      <button
        type="button"
        className="wa-floating-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact Support on WhatsApp"
      >
        <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
          <path d="M16 2a14 14 0 0 0-12 21.2L2 30l7.1-1.8A14 14 0 1 0 16 2zm0 25.6a11.5 11.5 0 0 1-5.9-1.6l-.4-.2-4.4 1.1 1.2-4.3-.3-.4A11.6 11.6 0 1 1 16 27.6zm6.4-8.7c-.3-.2-2-.9-2.3-1s-.5-.2-.7.2-.8 1-.9 1.2-.3.2-.6.1a8.2 8.2 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6s.3-.4.5-.6l.3-.4c.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4A3.8 3.8 0 0 0 10 12a6.6 6.6 0 0 0 1.4 3.5 15.1 15.1 0 0 0 6.2 5.5c2 .8 2.8.9 3.8.7a3.2 3.2 0 0 0 2.1-1.5 2.6 2.6 0 0 0 .2-1.5c-.2-.2-.5-.3-.9-.4z"/>
        </svg>
        <span className="wa-btn-label">Support</span>
      </button>
    </div>
  );
};

export default WhatsAppWidget;
