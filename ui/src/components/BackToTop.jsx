import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import MagneticElement from './MagneticElement';

const BackToTop = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate scroll progress percentage
      const totalScroll = documentHeight - windowHeight;
      const currentProgress = totalScroll > 0 ? (scrollY / totalScroll) * 100 : 0;
      setScrollProgress(currentProgress);

      // Show after scrolling 500px
      if (scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Hide if reached the footer (within 250px of the bottom)
      if (scrollY + windowHeight >= documentHeight - 250) {
        setIsNearFooter(true);
      } else {
        setIsNearFooter(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  const showWidget = isVisible && !isNearFooter;

  return (
    <div
      className="btt-wrapper"
      style={{
        position: 'fixed',
        zIndex: 9999,
        opacity: showWidget ? 1 : 0,
        transform: showWidget ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.8)',
        pointerEvents: showWidget ? 'auto' : 'none',
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
    >
      <MagneticElement>
        <div
          className="btt-btn"
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: 'relative',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            background: isHovered ? 'linear-gradient(135deg, #00E5FF 0%, #7000FF 100%)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            boxShadow: isHovered ? '0 10px 25px rgba(112,0,255,0.4)' : '0 4px 15px rgba(0,0,0,0.1)',
            transition: 'all 0.4s ease',
            color: isHovered ? 'white' : '#11131A'
          }}
        >
          {/* SVG Scroll Progress Ring */}
          <svg
            className="btt-ring"
            width="60"
            height="60"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              transform: 'rotate(-90deg)',
              pointerEvents: 'none'
            }}
          >
            {/* Background Track */}
            <circle
              cx="30"
              cy="30"
              r={radius}
              fill="none"
              stroke={isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)'}
              strokeWidth="2"
            />
            {/* Progress Fill */}
            <circle
              cx="30"
              cy="30"
              r={radius}
              fill="none"
              stroke={isHovered ? 'white' : 'url(#progress-gradient)'}
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.1s ease-out, stroke 0.4s ease' }}
            />
            <defs>
              <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00E5FF" />
                <stop offset="100%" stopColor="#7000FF" />
              </linearGradient>
            </defs>
          </svg>
          
          <ArrowUp 
            size={22} 
            strokeWidth={isHovered ? 2.5 : 2} 
            className="btt-icon"
            style={{ 
              transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
              transition: 'transform 0.3s ease'
            }} 
          />
        </div>
      </MagneticElement>
      <style>{`
        .btt-wrapper {
          bottom: 2rem;
          right: 2rem;
        }
        .btt-btn {
          width: 60px;
          height: 60px;
        }
        @media (max-width: 768px) {
          .btt-wrapper {
            bottom: 1rem !important;
            right: 1rem !important;
          }
          .btt-btn {
            width: 46px !important;
            height: 46px !important;
          }
          .btt-btn svg.btt-ring {
            width: 46px !important;
            height: 46px !important;
          }
          .btt-btn svg.btt-ring circle {
            cx: 23 !important;
            cy: 23 !important;
            r: 18 !important;
          }
          .btt-icon {
            width: 18px !important;
            height: 18px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BackToTop;
