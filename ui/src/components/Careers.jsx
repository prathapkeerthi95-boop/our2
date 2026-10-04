import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Careers = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{`
        .careers-page {
          min-height: 100vh;
          background: #F5F3EF;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 120px 2rem 80px;
        }

        /* Animated grid background */
        .careers-grid-bg {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridPulse 4s ease-in-out infinite;
        }

        @keyframes gridPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        /* Floating orbs */
        .careers-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: orbFloat 8s ease-in-out infinite;
        }

        .careers-orb-1 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(0, 229, 255, 0.12) 0%, transparent 70%);
          top: -10%; left: -5%;
          animation-delay: 0s;
        }

        .careers-orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.10) 0%, transparent 70%);
          bottom: -10%; right: -5%;
          animation-delay: -3s;
        }

        .careers-orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%);
          top: 40%; right: 20%;
          animation-delay: -5s;
        }

        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -20px) scale(1.05); }
          50% { transform: translate(-15px, 25px) scale(0.95); }
          75% { transform: translate(20px, 15px) scale(1.03); }
        }

        /* Main content */
        .careers-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 700px;
        }

        /* Radar ping effect */
        .careers-radar {
          width: 120px;
          height: 120px;
          margin: 0 auto 3rem;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .careers-radar-dot {
          width: 16px;
          height: 16px;
          background: linear-gradient(135deg, #00B4D8, #00E5FF);
          border-radius: 50%;
          position: relative;
          z-index: 2;
          box-shadow: 0 0 20px rgba(0, 180, 216, 0.4), 0 0 40px rgba(0, 180, 216, 0.15);
        }

        .careers-radar-ring {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid rgba(0, 180, 216, 0.3);
          border-radius: 50%;
          animation: radarPing 2.5s ease-out infinite;
        }

        .careers-radar-ring:nth-child(2) { animation-delay: 0s; }
        .careers-radar-ring:nth-child(3) { animation-delay: 0.8s; }
        .careers-radar-ring:nth-child(4) { animation-delay: 1.6s; }

        @keyframes radarPing {
          0% { width: 16px; height: 16px; opacity: 1; }
          100% { width: 140px; height: 140px; opacity: 0; }
        }

        /* Badge */
        .careers-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 180, 216, 0.08);
          border: 1.5px solid rgba(0, 180, 216, 0.2);
          color: #0077B6;
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 10px 24px;
          border-radius: 50px;
          margin-bottom: 2rem;
          animation: badgeGlow 3s ease-in-out infinite;
        }

        .careers-badge-dot {
          width: 8px;
          height: 8px;
          background: #00B4D8;
          border-radius: 50%;
          animation: dotBlink 1.5s ease-in-out infinite;
        }

        @keyframes dotBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @keyframes badgeGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(0, 180, 216, 0.05); }
          50% { box-shadow: 0 0 30px rgba(0, 180, 216, 0.12); }
        }

        /* Heading */
        .careers-heading {
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 7vw, 5rem);
          font-weight: 900;
          color: #0A2540;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -2px;
        }

        .careers-heading .glow-text {
          background: linear-gradient(135deg, #00B4D8, #A855F7, #00B4D8);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 4s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Subtext */
        .careers-sub {
          font-family: var(--font-body);
          font-size: 1.15rem;
          color: #64748B;
          line-height: 1.7;
          margin-bottom: 3rem;
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Animated line */
        .careers-line {
          width: 80px;
          height: 3px;
          margin: 0 auto 3rem;
          border-radius: 10px;
          background: linear-gradient(90deg, #00B4D8, #A855F7);
          animation: lineExpand 3s ease-in-out infinite;
        }

        @keyframes lineExpand {
          0%, 100% { width: 80px; opacity: 0.6; }
          50% { width: 160px; opacity: 1; }
        }

        /* Back to home button */
        .careers-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 36px;
          background: #FFFFFF;
          border: 1.5px solid rgba(0, 0, 0, 0.08);
          color: #0A2540;
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          border-radius: 50px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.35s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .careers-back-btn:hover {
          border-color: #00B4D8;
          color: #00B4D8;
          box-shadow: 0 8px 25px rgba(0, 180, 216, 0.12);
          transform: translateY(-2px);
        }

        /* Floating particles */
        .careers-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(0, 180, 216, 0.35);
          border-radius: 50%;
          pointer-events: none;
          animation: particleFloat 6s linear infinite;
        }

        @keyframes particleFloat {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }

        /* Notification bell icon animation */
        .careers-bell {
          font-size: 1.2rem;
          display: inline-block;
          animation: bellRing 2s ease-in-out infinite;
          transform-origin: top center;
        }

        @keyframes bellRing {
          0%, 70%, 100% { transform: rotate(0); }
          75% { transform: rotate(15deg); }
          80% { transform: rotate(-15deg); }
          85% { transform: rotate(10deg); }
          90% { transform: rotate(-10deg); }
          95% { transform: rotate(0); }
        }

        @media (max-width: 768px) {
          .careers-page {
            padding: 100px 1.5rem 60px;
          }
          .careers-heading {
            letter-spacing: -1px;
          }
          .careers-sub {
            font-size: 1rem;
          }
          .careers-radar {
            width: 90px;
            height: 90px;
            margin-bottom: 2rem;
          }
        }
      `}</style>

      <section ref={containerRef} className="careers-page">
        {/* Grid background */}
        <div className="careers-grid-bg" />

        {/* Floating orbs */}
        <div className="careers-orb careers-orb-1" />
        <div className="careers-orb careers-orb-2" />
        <div className="careers-orb careers-orb-3" />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="careers-particle"
            style={{
              left: `${8 + (i * 7.5)}%`,
              bottom: `${-5 - (i * 3)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${5 + (i % 4)}s`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              background: i % 3 === 0 
                ? 'rgba(0, 180, 216, 0.3)' 
                : i % 3 === 1 
                  ? 'rgba(168, 85, 247, 0.25)' 
                  : 'rgba(16, 185, 129, 0.25)'
            }}
          />
        ))}

        {/* Content */}
        <div className="careers-content">
          {/* Radar animation */}
          <div className="careers-radar">
            <div className="careers-radar-dot" />
            <div className="careers-radar-ring" />
            <div className="careers-radar-ring" />
            <div className="careers-radar-ring" />
          </div>

          {/* Badge */}
          <div className="careers-badge">
            <span className="careers-badge-dot" />
            Careers
          </div>

          {/* Heading */}
          <h1 className="careers-heading">
            Openings Are<br />
            <span className="glow-text">Coming Soon</span>
          </h1>

          {/* Animated line */}
          <div className="careers-line" />

          {/* Subtext */}
          <p className="careers-sub">
            We're building something extraordinary. Stay tuned — exciting opportunities to join the NUZAROX crew will be announced here soon.
            <br /><br />
            <span className="careers-bell">🔔</span> Check back for updates.
          </p>

          {/* Back button */}
          <Link to="/" className="careers-back-btn">
            ← Back to Home
          </Link>
        </div>
      </section>
    </>
  );
};

export default Careers;
