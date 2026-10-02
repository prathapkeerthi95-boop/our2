import React, { useState, useEffect } from 'react';

const SocialWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollY + windowHeight >= documentHeight - 250) {
        setIsNearFooter(true);
        setIsOpen(false);
      } else {
        setIsNearFooter(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  // Brand Icons as pure SVGs
  const WhatsAppIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.98 1.005-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );

  const LinkedInIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  const InstagramIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z"/>
    </svg>
  );

  // Plus icon for trigger
  const PlusIcon = ({ rotated }) => (
    <svg 
      width="20" height="20" viewBox="0 0 24 24" fill="none" 
      stroke="white" strokeWidth="2.5" strokeLinecap="round"
      style={{ 
        transition: 'transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        transform: rotated ? 'rotate(45deg)' : 'rotate(0deg)'
      }}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );

  const socials = [
    { href: 'https://wa.me/YOUR_NUMBER', icon: <WhatsAppIcon />, color: '#25D366', label: 'WhatsApp' },
    { href: 'https://linkedin.com', icon: <LinkedInIcon />, color: '#0077b5', label: 'LinkedIn' },
    { href: 'https://instagram.com', icon: <InstagramIcon />, color: '#E1306C', label: 'Instagram' },
  ];

  return (
    <>
      <style>{`
        .social-fab-item:hover {
          transform: scale(1.15) !important;
          box-shadow: 0 6px 20px rgba(0,0,0,0.25) !important;
        }
        .social-fab-trigger:hover {
          box-shadow: 0 0 0 8px rgba(112, 0, 255, 0.12), 0 8px 25px rgba(112, 0, 255, 0.35) !important;
        }
        .social-fab-label {
          opacity: 0;
          transform: translateX(-8px);
          transition: all 0.3s ease;
          pointer-events: none;
        }
        .social-fab-item:hover .social-fab-label {
          opacity: 1;
          transform: translateX(0);
        }

        .social-widget-wrapper {
          bottom: 2rem;
          left: 1.5rem;
        }
        .social-fab-trigger {
          width: 48px;
          height: 48px;
        }
        .social-fab-item {
          width: 42px !important;
          height: 42px !important;
        }
        
        @media (max-width: 768px) {
          .social-widget-wrapper {
            bottom: 1rem !important;
            left: 1rem !important;
          }
          .social-fab-trigger {
            width: 44px !important;
            height: 44px !important;
          }
          .social-fab-item {
            width: 36px !important;
            height: 36px !important;
          }
        }
      `}</style>

      <div
        className="social-widget-wrapper"
        style={{
          position: 'fixed',
          zIndex: 99999,
          opacity: isNearFooter ? 0 : 1,
          transform: isNearFooter ? 'translateY(40px) scale(0.5)' : 'translateY(0) scale(1)',
          transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          pointerEvents: isNearFooter ? 'none' : 'auto'
        }}
      >
        {/* Floating Social Icons — fan out vertically above trigger */}
        {socials.map((item, i) => (
          <div
            key={item.label}
            style={{
              position: 'absolute',
              bottom: isOpen ? `calc(${(i + 1) * 52}px)` : '0px',
              left: '3px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'scale(1) rotate(0deg)' : 'scale(0.3) rotate(90deg)',
              transition: `all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55) ${isOpen ? i * 0.08 : (2 - i) * 0.05}s`,
              pointerEvents: isOpen ? 'auto' : 'none'
            }}
          >
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-fab-item"
              style={{
                borderRadius: '50%',
                backgroundColor: item.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
                transition: 'all 0.25s ease',
                position: 'relative'
              }}
              title={item.label}
            >
              {item.icon}
              {/* Tooltip Label */}
              <span
                className="social-fab-label"
                style={{
                  position: 'absolute',
                  left: 'calc(100% + 10px)',
                  whiteSpace: 'nowrap',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: '#11131A',
                  background: 'white',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                {item.label}
              </span>
            </a>
          </div>
        ))}

        {/* Main FAB Trigger — Floating Action Button */}
        <div
          onClick={toggleOpen}
          className="social-fab-trigger"
          style={{
            position: 'relative',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7000FF 0%, #00E5FF 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(112, 0, 255, 0.3)',
            transition: 'all 0.4s ease',
            transform: isOpen ? 'rotate(0deg)' : 'rotate(0deg)'
          }}
        >
          <PlusIcon rotated={isOpen} />
          
          {/* Subtle pulse ring when closed */}
          {!isOpen && (
            <div style={{
              position: 'absolute',
              inset: '-4px',
              borderRadius: '50%',
              border: '1.5px solid rgba(112, 0, 255, 0.3)',
              animation: 'socialPulse 2.5s ease-in-out infinite'
            }} />
          )}
        </div>
      </div>

      <style>{`
        @keyframes socialPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.25); opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default SocialWidget;
