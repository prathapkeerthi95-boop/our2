import React, { useState } from 'react';

const WhatsAppBubbleWidget = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Phone number: +91 89394 31717
  const phoneNumber = '918939431717';
  const defaultMessage = 'Hi, I recently went through your website and I am interested in building some new things with you.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div
      className="whatsapp-widget-container"
      style={{
        position: 'fixed',
        bottom: '2.2rem',
        right: '2.2rem',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        pointerEvents: 'auto'
      }}
    >
      {/* ── FROSTED OPAQUE LIQUID GLASS TOOLTIP ── */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.7)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
          padding: '0.6rem 1.1rem',
          borderRadius: '20px',
          color: '#0F172A',
          fontSize: '0.85rem',
          fontWeight: 700,
          fontFamily: 'var(--font-body)',
          whiteSpace: 'nowrap',
          letterSpacing: '0.01em',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateX(0) scale(1)' : 'translateX(10px) scale(0.95)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        Chat with Us
      </div>

      {/* ── SOLID CLEAN WHATSAPP BUBBLE BUTTON ── */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Contact us on WhatsApp"
        className="liquid-whatsapp-bubble"
        style={{
          position: 'relative',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          border: 'none',
          outline: 'none',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)',
          cursor: 'pointer',
          textDecoration: 'none',
          WebkitTapHighlightColor: 'transparent',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}
      >
        {/* WHATSAPP HIGH-RES SOLID GREEN & WHITE SVG ICON */}
        <svg
          viewBox="0 0 32 32"
          style={{
            width: '38px',
            height: '38px',
            filter: 'drop-shadow(0 3px 8px rgba(37, 211, 102, 0.45))',
            transition: 'transform 0.3s ease'
          }}
        >
          {/* Solid Green Speech Bubble Body */}
          <path
            fill="#25D366"
            d="M16 2A13.93 13.93 0 0 0 4 23L2 30l7.2-1.9A13.93 13.93 0 1 0 16 2z"
          />
          {/* Crisp White Phone Handset */}
          <path
            fill="#FFFFFF"
            d="M12.4 9.7c-.3-.7-.6-.7-.9-.7h-.7c-.2 0-.7.1-1 .5s-1.3 1.3-1.3 3.1 1.3 3.6 1.5 3.8c.2.3 2.6 4 6.3 5.6 3.1 1.3 3.7 1 4.4 1s2.2-.9 2.5-1.8c.3-.9.3-1.6.2-1.8s-.4-.3-.9-.5-2.6-1.3-3-1.4c-.4-.2-.7-.3-1 .2s-1.1 1.4-1.3 1.7c-.2.2-.5.3-.9.1s-1.9-.7-3.6-2.2c-1.3-1.2-2.2-2.7-2.5-3.1s0-.7.2-.9c.2-.2.5-.5.7-.8.2-.2.3-.5.4-.7.1-.2 0-.5-.1-.7s-.9-2.3-1.2-3z"
          />
        </svg>
      </a>

      {/* LIQUID GLASS BUBBLE CSS STYLES */}
      <style>{`
        @keyframes liquidBubbleFloat {
          0%, 100% {
            transform: translateY(0px) scale(1);
            border-radius: 50%;
          }
          50% {
            transform: translateY(-8px) scale(1.03);
            border-radius: 48% 52% 51% 49% / 52% 48% 52% 48%;
          }
        }
        @keyframes liquidPulseGlow {
          0% {
            transform: scale(0.9);
            opacity: 0.4;
          }
          100% {
            transform: scale(1.3);
            opacity: 0.85;
          }
        }
        .liquid-whatsapp-bubble:hover {
          transform: translateY(-4px) scale(1.12) !important;
          box-shadow: 0 20px 45px rgba(37, 211, 102, 0.5), inset 0 2px 6px rgba(255, 255, 255, 1) !important;
        }
        .liquid-whatsapp-bubble:active {
          transform: scale(0.95) !important;
        }
        @media (max-width: 768px) {
          .whatsapp-widget-container {
            bottom: 1.2rem !important;
            right: 1.2rem !important;
            gap: 0.5rem !important;
          }
          .liquid-whatsapp-bubble {
            width: 52px !important;
            height: 52px !important;
          }
          .liquid-whatsapp-bubble svg {
            width: 30px !important;
            height: 30px !important;
          }
        }
        @media (max-width: 480px) {
          .whatsapp-widget-container {
            bottom: 1rem !important;
            right: 1rem !important;
          }
          .liquid-whatsapp-bubble {
            width: 46px !important;
            height: 46px !important;
          }
          .liquid-whatsapp-bubble svg {
            width: 26px !important;
            height: 26px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default WhatsAppBubbleWidget;
