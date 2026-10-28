import React, { useState, useEffect } from 'react';

// Reviews dataset - Removed Nimmi & Mani as requested, keeping authentic client reviews + high impact tech & business feedback
const testimonialsData = [
  {
    id: '01',
    name: 'Balaji',
    role: 'Founder, Gagner Sports',
    location: 'Paris & Online',
    stars: 5,
    quote: 'Excellent work by Nuzarox. They understood our requirements clearly and engineered a high-converting digital platform with 3D product customization that completely elevated our sports brand internationally.',
    tag: 'Web Platform / Headless 3D'
  },
  {
    id: '02',
    name: 'Siva',
    role: 'Marketing Director, Gagner Sports',
    location: 'Europe & India',
    stars: 5,
    quote: 'Nuzarox made the entire process seamless and hyper-focused. The website speed, aesthetic polish, and modern interactive flow gave us an immediate boost in direct client inquiries and retention.',
    tag: 'E-Commerce / Conversion'
  },
  {
    id: '03',
    name: 'Lokesh',
    role: 'Operations & Community Lead',
    location: 'Chennai, TN',
    stars: 5,
    quote: 'Everything is structured, secure, and impeccably organized. The custom portal created by Nuzarox automated daily operations and brought instant convenience to all our stakeholders with zero downtime.',
    tag: 'Web Portal / Automation'
  },
  {
    id: '04',
    name: 'Keerthieswaran',
    role: 'Creative Tech & Founder',
    location: 'Chennai, TN',
    stars: 5,
    quote: 'Nuzarox delivered an extraordinary showcase with fluid animations, micro-interactions, and flawless mobile responsiveness. The precision in design and typography is truly world-class.',
    tag: 'Digital Experience / GSAP'
  },
  {
    id: '05',
    name: 'Ruthra',
    role: 'Product Designer',
    location: 'Bangalore, India',
    stars: 5,
    quote: 'Minimal, creative, and remarkably elite. The design aesthetic matches luxury global agency standards while maintaining blistering performance on both desktop and mobile devices.',
    tag: 'Product Design / UI-UX'
  }
];

const Testimonials = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Cycle through reviews smoothly
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonialsData.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  const currentReview = testimonialsData[activeIdx];
  const nextReview = testimonialsData[(activeIdx + 1) % testimonialsData.length];

  const handlePrev = () => {
    setIsAutoplay(false);
    setActiveIdx((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoplay(false);
    setActiveIdx((prev) => (prev + 1) % testimonialsData.length);
  };

  return (
    <section id="testimonials" className="nux-testimonials-section">
      <style>{`
        /* ========================================================
           NUZAROX LUXURY EDITORIAL TESTIMONIALS SECTION
           ======================================================== */
        .nux-testimonials-section {
          position: relative;
          width: 100%;
          background: #080B11;
          color: #FFFFFF;
          padding: 6rem 1.5rem 5rem;
          overflow: hidden;
          font-family: var(--font-body, 'Inter', sans-serif);
        }

        /* Subtle cyan & deep sapphire ambient glow orbs */
        .nux-test-glow-cyan {
          position: absolute;
          width: 550px;
          height: 550px;
          top: 10%;
          left: -120px;
          background: radial-gradient(circle, rgba(0, 229, 255, 0.12) 0%, rgba(10, 46, 92, 0.05) 50%, transparent 70%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        .nux-test-glow-blue {
          position: absolute;
          width: 600px;
          height: 600px;
          bottom: 0;
          right: -150px;
          background: radial-gradient(circle, rgba(0, 168, 150, 0.1) 0%, rgba(2, 132, 199, 0.08) 50%, transparent 70%);
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }

        /* Architectural Outer Frame */
        .nux-test-outer-frame {
          max-width: 1320px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          background: rgba(14, 19, 28, 0.72);
          border: 1px solid rgba(0, 229, 255, 0.14);
          border-radius: 36px;
          padding: 4.5rem 3.5rem 4rem;
          box-shadow: 0 35px 80px rgba(0, 0, 0, 0.65),
                      inset 0 1px 0 rgba(255, 255, 255, 0.08),
                      inset 0 0 60px rgba(0, 229, 255, 0.02);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }

        /* Top Bar: Section label + 5 Stars */
        .nux-test-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1.2rem;
        }

        .nux-test-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 18px;
          border-radius: 999px;
          background: rgba(0, 229, 255, 0.07);
          border: 1px solid rgba(0, 229, 255, 0.25);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #00E5FF;
          box-shadow: 0 0 20px rgba(0, 229, 255, 0.15);
        }

        .nux-test-stars {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #00E5FF;
          font-size: 1.15rem;
          letter-spacing: 2px;
          text-shadow: 0 0 12px rgba(0, 229, 255, 0.4);
        }

        /* Main Display Layout */
        .nux-test-main-stage {
          position: relative;
          min-height: 480px;
          display: grid;
          grid-template-columns: 1fr;
          align-items: center;
          margin-top: 1rem;
        }

        /* Massive Editorial Backdrop Title: "What they say?" */
        .nux-test-watermark-title {
          position: absolute;
          top: 42%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          text-align: center;
          font-family: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(3.8rem, 11.5vw, 10.2rem);
          font-style: italic;
          font-weight: 400;
          line-height: 0.88;
          color: rgba(255, 255, 255, 0.07);
          letter-spacing: -0.03em;
          pointer-events: none;
          user-select: none;
          z-index: 1;
          white-space: nowrap;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(0, 229, 255, 0.03) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Cards Layout Container (Two Asymmetric Luxury Frosted Glass Cards) */
        .nux-cards-grid {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3.5rem;
          align-items: flex-end;
          padding-top: 1rem;
        }

        /* Individual Luxury Glass Card */
        .nux-glass-card {
          background: linear-gradient(135deg, rgba(22, 28, 42, 0.78) 0%, rgba(13, 17, 26, 0.88) 100%);
          border: 1px solid rgba(0, 229, 255, 0.16);
          border-radius: 26px;
          padding: 2.4rem 2.2rem 2rem;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.45),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1),
                      0 0 30px rgba(0, 229, 255, 0.04);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .nux-glass-card:hover {
          border-color: rgba(0, 229, 255, 0.38);
          transform: translateY(-4px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.55),
                      0 0 35px rgba(0, 229, 255, 0.12);
        }

        /* Asymmetric Card Shifts like Reference Image */
        .nux-card-left {
          margin-top: 5rem;
        }

        .nux-card-right {
          margin-bottom: 2rem;
        }

        .nux-card-index {
          font-family: var(--font-display, 'Space Grotesk', sans-serif);
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #00E5FF;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nux-card-tag {
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.45);
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .nux-card-quote {
          font-size: 1.05rem;
          line-height: 1.65;
          color: rgba(240, 245, 255, 0.88);
          font-weight: 400;
          margin: 0 0 1.8rem 0;
          min-height: 110px;
        }

        .nux-card-author {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          font-size: 0.92rem;
          font-weight: 600;
          color: #FFFFFF;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 1.1rem;
        }

        .nux-card-author-name {
          color: #FFFFFF;
          letter-spacing: 0.01em;
        }

        .nux-card-author-role {
          color: rgba(0, 229, 255, 0.85);
          font-weight: 500;
          font-size: 0.84rem;
          margin-left: 6px;
        }

        /* Bottom Stats & Metrics Row like Reference Image (1200+ Reviews / 10,000+ Happy Clients) */
        .nux-test-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 4.5rem;
          padding-top: 2.5rem;
          border-top: 1px dashed rgba(255, 255, 255, 0.12);
          flex-wrap: wrap;
          gap: 2rem;
          position: relative;
          z-index: 3;
        }

        .nux-test-stats-group {
          display: flex;
          align-items: center;
          gap: 3.5rem;
          flex-wrap: wrap;
        }

        .nux-test-stat-item {
          display: flex;
          flex-direction: column;
        }

        .nux-test-stat-num {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.4rem, 4.2vw, 3.4rem);
          font-weight: 400;
          letter-spacing: -0.02em;
          color: #FFFFFF;
          line-height: 1;
          display: flex;
          align-items: baseline;
        }

        .nux-test-stat-num span {
          color: #00E5FF;
          font-size: 0.65em;
          margin-left: 2px;
          font-family: var(--font-display, sans-serif);
          font-weight: 700;
        }

        .nux-test-stat-label {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 0.5rem;
          font-weight: 500;
          letter-spacing: 0.03em;
        }

        /* Navigation Controls & Google Action */
        .nux-test-actions {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          flex-wrap: wrap;
        }

        .nux-nav-arrow-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(0, 229, 255, 0.25);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          outline: none;
        }

        .nux-nav-arrow-btn:hover {
          background: #00E5FF;
          color: #080B11;
          border-color: #00E5FF;
          transform: scale(1.06);
          box-shadow: 0 0 20px rgba(0, 229, 255, 0.4);
        }

        .nux-google-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1.6rem;
          border-radius: 999px;
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          border: 1px solid rgba(0, 229, 255, 0.35);
          color: #FFFFFF !important;
          text-decoration: none;
          font-size: 0.86rem;
          font-weight: 600;
          box-shadow: 0 8px 25px rgba(0, 168, 150, 0.25);
          transition: all 0.3s ease;
        }

        .nux-google-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0, 229, 255, 0.35);
          border-color: #00E5FF;
        }

        /* Mobile Responsive Adjustments */
        @media (max-width: 992px) {
          .nux-test-outer-frame {
            padding: 3.5rem 2rem 3rem;
          }
          .nux-cards-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .nux-card-left, .nux-card-right {
            margin: 0 !important;
          }
          .nux-card-quote {
            min-height: auto;
          }
          .nux-test-watermark-title {
            top: 25%;
            font-size: clamp(3rem, 14vw, 5.5rem);
          }
        }

        @media (max-width: 768px) {
          .nux-testimonials-section {
            padding: 4rem 1rem 3.5rem;
          }
          .nux-test-outer-frame {
            padding: 2.2rem 1.4rem;
            border-radius: 24px;
          }
          .nux-test-topbar {
            margin-bottom: 1.5rem;
          }
          .nux-test-watermark-title {
            font-size: 3.4rem;
            white-space: normal;
            line-height: 1;
            top: 15%;
          }
          .nux-glass-card {
            padding: 1.6rem 1.4rem;
            border-radius: 20px;
          }
          .nux-card-quote {
            font-size: 0.95rem;
            line-height: 1.55;
          }
          .nux-test-bottom-row {
            margin-top: 2.5rem;
            padding-top: 1.8rem;
            flex-direction: column;
            align-items: flex-start;
            gap: 1.8rem;
          }
          .nux-test-stats-group {
            gap: 2rem;
            width: 100%;
            justify-content: space-between;
          }
          .nux-test-actions {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>

      {/* Decorative Brand Ambient Orbs */}
      <div className="nux-test-glow-cyan" />
      <div className="nux-test-glow-blue" />

      {/* Main Luxury Architectural Glass Container */}
      <div className="nux-test-outer-frame">
        {/* Top Header Row with Verified Stars and Label */}
        <div className="nux-test-topbar">
          <div className="nux-test-pill">
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#00E5FF' }}></span>
            Testimonials & Endorsements
          </div>

          <div className="nux-test-stars" title="Rated 5.0 out of 5 stars by verified clients">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
        </div>

        {/* Central Stage with Big Typography + Asymmetric Glass Cards */}
        <div className="nux-test-main-stage">
          {/* Watermark Editorial Serif Backdrop: "What they say?" */}
          <div className="nux-test-watermark-title">
            What they say?
          </div>

          {/* Luxury Staggered Cards */}
          <div className="nux-cards-grid">
            {/* Card Left (Active Review) */}
            <div className="nux-glass-card nux-card-left">
              <div className="nux-card-index">
                <span>({currentReview.id})</span>
                <span className="nux-card-tag">{currentReview.tag}</span>
              </div>
              <p className="nux-card-quote">
                "{currentReview.quote}"
              </p>
              <div className="nux-card-author">
                <span className="nux-card-author-name">— {currentReview.name}</span>
                <span className="nux-card-author-role">({currentReview.role})</span>
              </div>
            </div>

            {/* Card Right (Next In Queue Review) */}
            <div className="nux-glass-card nux-card-right">
              <div className="nux-card-index">
                <span>({nextReview.id})</span>
                <span className="nux-card-tag">{nextReview.tag}</span>
              </div>
              <p className="nux-card-quote">
                "{nextReview.quote}"
              </p>
              <div className="nux-card-author">
                <span className="nux-card-author-name">— {nextReview.name}</span>
                <span className="nux-card-author-role">({nextReview.role})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Stats Metrics + Direction Controls + Google Action */}
        <div className="nux-test-bottom-row">
          <div className="nux-test-stats-group">
            <div className="nux-test-stat-item">
              <div className="nux-test-stat-num">
                100<span>+</span>
              </div>
              <div className="nux-test-stat-label">Verified Client Reviews</div>
            </div>

            <div className="nux-test-stat-item">
              <div className="nux-test-stat-num">
                10,000<span>+</span>
              </div>
              <div className="nux-test-stat-label">Happy Users Reached</div>
            </div>
          </div>

          <div className="nux-test-actions">
            {/* Left / Right Interactive Buttons */}
            <button 
              className="nux-nav-arrow-btn" 
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>

            <button 
              className="nux-nav-arrow-btn" 
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            {/* Google Review Direct Link Button */}
            <a 
              href="https://search.google.com/local/writereview?placeid=ChIJ-3eN1XpUUrkR4aWfR6Y9nZ0" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nux-google-btn"
            >
              <span>★ Review on Google</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
