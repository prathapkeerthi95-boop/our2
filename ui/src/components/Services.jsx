/**
 * Services.jsx — Premium 2026 Digital Product Studio Experience
 * Scoped strictly to #services section.
 * Architecture: Expanded Full-Width 3-Column Composition + 100% Exact Matching Background with About (#F5F3EF)
 * Enhancements: Occupies vertical space, Responsive 3D Cursor Tilt, Localized Backlight Glow Spillage behind Right Card
 * 01 Web Platforms | 02 Mobile Engineering | 03 Brand Identity | 04 Growth Marketing
 */

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════
   SERVICES DATA
   ═══════════════════════════════════════════════════════════════════ */
const SERVICES_DATA = [
  {
    id: '01',
    label: '01 — Web Platforms',
    shortTitle: 'Web Platforms',
    tagline: 'High-performance websites & web apps built for growth.',
    centerHeading: 'Building powerful digital products for ambitious brands.',
    centerSubtext: 'From idea to impact – we build platforms that scale with your vision.',
    keyPoints: ['Performance-first', 'Secure & scalable', 'Built for growth'],
    ctaText: 'See How We Work →',
    accentColor: '#3282FF',
    gradient: 'linear-gradient(135deg, #00E5FF 0%, #3282FF 50%, #7000FF 100%)',
    glowColor: 'rgba(50, 130, 255, 0.45)',
    animClass: 'svc-anim-glass-flip'
  },
  {
    id: '02',
    label: '02 — Mobile Engineering',
    shortTitle: 'Mobile Engineering',
    tagline: 'Native and cross-platform apps engineered for 60fps performance.',
    centerHeading: 'Native & cross-platform apps built for 60fps performance.',
    centerSubtext: 'Engineering mobile experiences with offline-first sync and flawless touch response.',
    keyPoints: ['iOS & Android Native', '60fps Micro-animations', 'Enterprise Security'],
    ctaText: 'See Mobile Showcase →',
    accentColor: '#3282FF',
    gradient: 'linear-gradient(135deg, #00E5FF 0%, #3282FF 50%, #7000FF 100%)',
    glowColor: 'rgba(50, 130, 255, 0.45)',
    animClass: 'svc-anim-spring-drop'
  },
  {
    id: '03',
    label: '03 — Brand Identity',
    shortTitle: 'Brand Identity',
    tagline: 'Memory-commanding visual identity systems and brand typography.',
    centerHeading: 'Identity systems that command authority and recognition.',
    centerSubtext: 'Crafting memory-commanding visual identities, typography, and comprehensive design guidelines.',
    keyPoints: ['Design Systems', 'Bespoke Typeface', 'Brand Guidelines'],
    ctaText: 'Explore Brand Systems →',
    accentColor: '#3282FF',
    gradient: 'linear-gradient(135deg, #00E5FF 0%, #3282FF 50%, #7000FF 100%)',
    glowColor: 'rgba(50, 130, 255, 0.45)',
    animClass: 'svc-anim-studio-unfold'
  },
  {
    id: '04',
    label: '04 — Growth Marketing',
    shortTitle: 'Growth Marketing',
    tagline: 'Compounding revenue growth with data-driven funnel optimization.',
    centerHeading: 'Data-driven strategies driving compounding revenue growth.',
    centerSubtext: 'Optimizing full-funnel conversion with rapid A/B testing and precision analytics.',
    keyPoints: ['Conversion CRO', 'Performance Campaigns', 'Real-Time Analytics'],
    ctaText: 'View Growth Results →',
    accentColor: '#3282FF',
    gradient: 'linear-gradient(135deg, #00E5FF 0%, #3282FF 50%, #7000FF 100%)',
    glowColor: 'rgba(50, 130, 255, 0.45)',
    animClass: 'svc-anim-chart-explosion'
  }
];

const MARQ_STR = ['NEXTJS','REACT','SWIFT','FLUTTER','NODE','GRAPHQL','SUPABASE','TYPESCRIPT','KOTLIN'].map(w => `${w} •`).join(' ');

/* 01: WEB PLATFORMS — 3D PERSPECTIVE GLASS BROWSER UI */
function WebPlatformsVisual({ webCardRef, webStats1Ref, webStats2Ref }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
      <div style={{ position: 'absolute', width: 460, height: 24, bottom: '4%', background: 'radial-gradient(ellipse, rgba(0,0,0,0.22) 0%, transparent 70%)', filter: 'blur(16px)', pointerEvents: 'none' }} />

      <div ref={webCardRef} style={{ position: 'relative', zIndex: 2, width: 500, height: 340, borderRadius: 24, background: 'rgba(255,255,255,0.88)', border: '1.5px solid rgba(255,255,255,0.95)', backdropFilter: 'blur(28px)', boxShadow: '0 38px 80px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.95)', overflow: 'hidden', transformStyle: 'preserve-3d' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 12, pointerEvents: 'none', background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 48%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.2) 52%, transparent 70%)', backgroundSize: '300% 100%', mixBlendMode: 'overlay', animation: 'svcGlareSweep 8s linear infinite' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '12px 18px', background: 'rgba(240,244,250,0.9)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          {['#FF5F57', '#FFBD2E', '#28C840'].map((c, i) => (<span key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'block' }} />))}
          <div style={{ flex: 1, height: 22, borderRadius: 7, background: 'rgba(0,0,0,0.05)', margin: '0 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.62rem', color: 'rgba(0,0,0,0.45)', letterSpacing: '0.06em', fontWeight: 500 }}>nuzarox.com/dashboard</span>
          </div>
        </div>

        <div style={{ width: '100%', height: 'calc(100% - 46px)', background: '#0C0D12', padding: '18px 22px', color: '#fff', transformStyle: 'preserve-3d' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
            <div>
              <div style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Total Revenue</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>$48.2K</div>
            </div>
            <div style={{ background: 'rgba(50,130,255,0.18)', border: '1px solid rgba(50,130,255,0.3)', borderRadius: 10, padding: '4px 10px' }}>
              <span style={{ fontSize: '0.58rem', color: '#3282FF', fontWeight: 700 }}>↑ 12.4%</span>
            </div>
          </div>

          <div style={{ width: '100%', height: 65, position: 'relative', marginTop: 4 }}>
            <svg viewBox="0 0 300 60" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <path d="M0,48 Q45,38 90,42 T180,26 T240,14 T300,20 V60 H0 Z" fill="rgba(50,130,255,0.22)" />
              <path d="M0,48 Q45,38 90,42 T180,26 T240,14 T300,20" fill="none" stroke="#3282FF" strokeWidth="2.8" strokeLinecap="round" />
              <circle r="3.5" fill="#3282FF" style={{ offsetPath: `path('M0,48 Q45,38 90,42 T180,26 T240,14 T300,20')`, animation: 'chartSpark 2.8s linear infinite', filter: 'drop-shadow(0 0 6px #3282FF)' }} />
            </svg>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14, transformStyle: 'preserve-3d' }}>
            <div ref={webStats1Ref} style={{ background: '#16171F', borderRadius: 12, padding: '12px 14px', border: '1px solid rgba(255,255,255,0.08)', transformStyle: 'preserve-3d' }}>
              <div style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 2 }}>Users</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>12,482</div>
              <div style={{ fontSize: '0.52rem', color: '#3282FF', fontWeight: 700, marginTop: 2 }}>↑ 8.1% vs last month</div>
            </div>

            <div ref={webStats2Ref} style={{ background: '#16171F', borderRadius: 12, padding: '12px 14px', border: '1px solid rgba(255,255,255,0.08)', transformStyle: 'preserve-3d' }}>
              <div style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 2 }}>Conversion</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>+24.8%</div>
              <div style={{ fontSize: '0.52rem', color: '#7000FF', fontWeight: 700, marginTop: 2 }}>↑ 5.2% ROAS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 02: MOBILE ENGINEERING — KINETIC MARQUEE + 3D FLOATING PHONE UI */
function MobileEngineeringVisual({ phoneCardRef, phonePillRef }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', opacity: 0.25, overflow: 'hidden' }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'svcMarquee 14s linear infinite' }}>
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{ fontSize: '3.6rem', fontWeight: 900, color: 'transparent', WebkitTextStroke: '1.5px #3282FF', fontFamily: 'var(--font-display)', flexShrink: 0, paddingRight: '1.5rem' }}>{MARQ_STR}</span>
          ))}
        </div>
      </div>

      <div ref={phoneCardRef} style={{ position: 'relative', width: 255, height: 370, borderRadius: 42, border: '9px solid #0C0D12', background: '#0C0D12', zIndex: 5, overflow: 'hidden', boxShadow: '0 38px 75px rgba(0,0,0,0.32), 0 0 0 1px rgba(255,255,255,0.1)', transformStyle: 'preserve-3d' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 90, height: 22, background: '#0C0D12', borderRadius: '0 0 14px 14px', zIndex: 20 }} />

        <div style={{ padding: '28px 18px 16px', color: '#fff', fontFamily: 'var(--font-body)', transformStyle: 'preserve-3d' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: 2 }}>Mobile Engine</div>
          <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>Native iOS & Android Architecture</div>

          <div ref={phonePillRef} style={{ padding: '9px 12px', borderRadius: 10, background: 'rgba(50,130,255,0.22)', border: '1px solid rgba(50,130,255,0.4)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14, transformStyle: 'preserve-3d' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#3282FF', animation: 'svcPulse 1.5s ease-in-out infinite' }} />
            <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.92)' }}>60fps Micro-interactions Live</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
            <div style={{ background: '#16171F', borderRadius: 8, padding: '10px 10px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.44rem', color: 'rgba(255,255,255,0.4)' }}>USERS</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#3282FF' }}>4,821</div>
            </div>
            <div style={{ background: '#16171F', borderRadius: 8, padding: '10px 10px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.44rem', color: 'rgba(255,255,255,0.4)' }}>RATING</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#7000FF' }}>4.9 ★</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[{ l: 'iOS Native', p: 95, c: '#3282FF' }, { l: 'Android Flutter', p: 88, c: '#7000FF' }].map((b, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.5)' }}>{b.l}</span>
                  <span style={{ fontSize: '0.5rem', color: b.c, fontWeight: 700 }}>{b.p}%</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                  <div style={{ height: '100%', width: `${b.p}%`, background: b.c, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* 03: BRAND IDENTITY — 3D LUXURY STUDIO SETUP WITH FOIL CARDS & MACBOOK */
function BrandIdentityVisual({ card1Ref, card2Ref, badgeRef, laptopRef }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
      <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', border: '1px dashed rgba(50,130,255,0.25)', animation: 'svcSpin 45s linear infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', border: '1px dashed rgba(112,0,255,0.18)', animation: 'svcSpinR 30s linear infinite', pointerEvents: 'none' }} />

      <div ref={laptopRef} style={{ position: 'absolute', transform: 'translateX(-10px) translateY(20px) translateZ(-20px) rotateX(10deg) rotateY(-5deg)', zIndex: 1, transformStyle: 'preserve-3d' }}>
        <div style={{ width: 330, height: 205, borderRadius: '12px 12px 4px 4px', background: 'linear-gradient(180deg,#C8C9CA,#B8B9BA)', padding: '10px 10px 0', boxShadow: '0 28px 55px rgba(0,0,0,0.25)' }}>
          <div style={{ width: '100%', height: '100%', borderRadius: '6px 6px 0 0', background: '#0A0A10', overflow: 'hidden', padding: '14px 16px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <div style={{ width: 18, height: 18, borderRadius: 4, background: 'linear-gradient(135deg,#3282FF,#7000FF)' }} />
              <span style={{ fontSize: '0.52rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>NUZAROX — BRAND SYSTEM</span>
            </div>
            <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
              {['#3282FF', '#7000FF', '#FF2A54', '#0A0A10', '#F5F3EF'].map((c, i) => (<div key={i} style={{ flex: 1, height: 24, borderRadius: 4, background: c }} />))}
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-display)', letterSpacing: '-0.04em' }}>Aa</div>
            <div style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>SPACE GROTESK TYPEFACE</div>
          </div>
        </div>
        <div style={{ width: 350, height: 9, background: 'linear-gradient(180deg,#B8B9BA,#A8A9AA)', borderRadius: '0 0 10px 10px', marginLeft: -10 }} />
      </div>

      <div ref={card1Ref} style={{ position: 'absolute', width: 185, height: 112, borderRadius: 14, background: 'linear-gradient(135deg,#0A0A10,#0d1a38)', border: '1px solid rgba(50,130,255,0.35)', boxShadow: '0 26px 50px rgba(0,0,0,0.35)', padding: '16px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transform: 'translateX(-140px) translateY(-32px) translateZ(60px) rotate(-8deg)', zIndex: 4, transformStyle: 'preserve-3d' }}>
        <div style={{ width: 26, height: 26, borderRadius: 6, background: 'linear-gradient(135deg,#3282FF,#7000FF)' }} />
        <div>
          <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>Alex Morgan</div>
          <div style={{ fontSize: '0.46rem', color: 'rgba(255,255,255,0.44)', letterSpacing: '0.08em' }}>CREATIVE DIRECTOR</div>
        </div>
      </div>

      <div ref={card2Ref} style={{ position: 'absolute', width: 185, height: 112, borderRadius: 14, background: '#16171F', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 24px 45px rgba(0,0,0,0.25)', padding: '16px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transform: 'translateX(130px) translateY(22px) translateZ(40px) rotate(6deg)', zIndex: 3, transformStyle: 'preserve-3d' }}>
        <div style={{ width: 26, height: 26, borderRadius: '50%', border: '3px solid #3282FF' }} />
        <div>
          <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-display)' }}>NUZAROX</div>
          <div style={{ fontSize: '0.46rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em' }}>IDENTITY STUDIO</div>
        </div>
      </div>

      <div ref={badgeRef} style={{ position: 'absolute', width: 68, height: 68, borderRadius: 20, background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(16px)', boxShadow: '0 18px 40px rgba(50,130,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translateX(0) translateY(-15px) translateZ(120px)', zIndex: 5, transformStyle: 'preserve-3d' }}>
        <span style={{ fontSize: '1.5rem', fontWeight: 900, background: 'linear-gradient(135deg,#3282FF,#7000FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'var(--font-display)' }}>N</span>
      </div>
    </div>
  );
}

/* 04: GROWTH MARKETING — 3D FAN CARD DECK & ANALYTICS WIDGETS */
function GrowthMarketingVisual({ cardLeftRef, cardCenterRef, cardRightRef, topWidgetRef }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>

      <div ref={topWidgetRef} style={{ position: 'absolute', top: '2%', left: '50%', transform: 'translateX(-50%) translateZ(60px)', width: 310, height: 72, borderRadius: 16, background: '#16171F', border: '1.5px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)', boxShadow: '0 18px 40px rgba(0,0,0,0.25)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, zIndex: 6, transformStyle: 'preserve-3d' }}>
        <div>
          <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Monthly Revenue</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-display)' }}>$48.2K</div>
        </div>
        <div style={{ flex: 1, position: 'relative', height: 36 }}>
          <svg viewBox="0 0 120 44" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <path d="M0,36 Q20,28 35,32 T65,22 T90,14 T120,10 V44 H0 Z" fill="rgba(50,130,255,0.22)" />
            <path d="M0,36 Q20,28 35,32 T65,22 T90,14 T120,10" fill="none" stroke="#3282FF" strokeWidth="2.5" strokeLinecap="round" />
            <circle r="3.5" fill="#3282FF" style={{ offsetPath: `path('M0,36 Q20,28 35,32 T65,22 T90,14 T120,10')`, animation: 'chartSpark 3s linear infinite', filter: 'drop-shadow(0 0 4px #3282FF)' }} />
          </svg>
        </div>
      </div>

      <div style={{ position: 'relative', width: 265, height: 285, transformStyle: 'preserve-3d', marginTop: 38 }}>
        <div ref={cardLeftRef} style={{ position: 'absolute', inset: 0, borderRadius: 20, background: '#16171F', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 22px 50px rgba(0,0,0,0.25)', padding: '1.4rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transform: 'rotate(-9deg) translateX(-38px) translateZ(10px)', transformStyle: 'preserve-3d' }}>
          <div>
            <div style={{ fontSize: '0.56rem', color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase' }}>Conversion Rate</div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-display)', marginTop: '0.2rem' }}>+24.8%</div>
            <div style={{ fontSize: '0.56rem', color: '#3282FF', fontWeight: 600, marginTop: '0.1rem' }}>↑ 22.4% this month</div>
          </div>
          <div style={{ width: '100%', height: 50, background: 'rgba(255,255,255,0.04)', borderRadius: 10, overflow: 'hidden' }}>
            <svg viewBox="0 0 100 50" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <path d="M0,42 Q18,28 36,32 T72,16 T100,10 V50 H0 Z" fill="rgba(50,130,255,0.22)" />
              <path d="M0,42 Q18,28 36,32 T72,16 T100,10" fill="none" stroke="#3282FF" strokeWidth="2.5" />
            </svg>
          </div>
        </div>

        <div ref={cardCenterRef} style={{ position: 'absolute', inset: 0, borderRadius: 20, background: 'linear-gradient(145deg,#0C0D12,#16171F)', border: '1px solid rgba(50,130,255,0.3)', boxShadow: '0 30px 60px rgba(0,0,0,0.35)', padding: '1.4rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}>
          <div>
            <div style={{ fontSize: '0.56rem', color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase' }}>Active Users</div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)', marginTop: '0.2rem' }}>12,482</div>
            <div style={{ fontSize: '0.56rem', color: '#3282FF', fontWeight: 600, marginTop: '0.1rem' }}>+1,240 today · Live</div>
          </div>
          <div style={{ width: '100%', height: 50, background: 'rgba(50,130,255,0.08)', borderRadius: 10, overflow: 'hidden' }}>
            <svg viewBox="0 0 100 50" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <path d="M0,44 Q22,32 44,36 T80,16 T100,10 V50 H0 Z" fill="rgba(50,130,255,0.22)" />
              <path d="M0,44 Q22,32 44,36 T80,16 T100,10" fill="none" stroke="#3282FF" strokeWidth="2.5" />
            </svg>
          </div>
        </div>

        <div ref={cardRightRef} style={{ position: 'absolute', inset: 0, borderRadius: 20, background: '#16171F', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 22px 50px rgba(0,0,0,0.25)', padding: '1.4rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transform: 'rotate(9deg) translateX(38px) translateZ(20px)', transformStyle: 'preserve-3d' }}>
          <div>
            <div style={{ fontSize: '0.56rem', color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase' }}>Campaign ROI</div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-display)', marginTop: '0.2rem' }}>8.4×</div>
            <div style={{ fontSize: '0.56rem', color: '#7000FF', fontWeight: 600, marginTop: '0.1rem' }}>↑ Best performing month</div>
          </div>
          <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 50 }}>
            {[60, 80, 45, 90, 55, 75, 100, 68].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '2px 2px 0 0', background: `rgba(50,130,255,${0.35 + i * 0.08})` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════
   MAIN SERVICES COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export default function Services() {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentService = SERVICES_DATA[activeIdx];

  const sectionRef = useRef(null);
  const rightWrapperRef = useRef(null);
  const visualRef = useRef(null);
  const centerRef = useRef(null);
  const headerRef = useRef(null);

  // Sub-element refs for 01 Web Platforms
  const webCardRef = useRef(null);
  const webStats1Ref = useRef(null);
  const webStats2Ref = useRef(null);

  // Sub-element refs for 02 Mobile Engineering
  const phoneCardRef = useRef(null);
  const phonePillRef = useRef(null);

  // Sub-element refs for deep 3D card tilt
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const badgeRef = useRef(null);
  const laptopRef = useRef(null);

  const cardLeftRef = useRef(null);
  const cardCenterRef = useRef(null);
  const cardRightRef = useRef(null);
  const topWidgetRef = useRef(null);

  const cardWaterCanvasRef = useRef(null);

  /* ── LIVE WATER DROP CONCENTRIC RIPPLE EFFECT BEHIND THE 4 CARDS ── */
  useEffect(() => {
    const canvas = cardWaterCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let ripples = [];
    let lastAutoDrop = 0;
    let lastMouseDrop = 0;

    const spawnWaterDrop = (x, y, strength = 1) => {
      for (let i = 0; i < 3; i++) {
        ripples.push({
          x,
          y,
          radius: 8 + i * 18,
          maxRadius: Math.max(canvas.width, canvas.height) * 0.9,
          speed: 1.8 + strength * 0.4 + i * 0.3,
          lineWidth: 2.8 - i * 0.5,
          opacity: 0.85 * strength - i * 0.18,
          decay: 0.003 + i * 0.0008,
          phase: Math.random() * Math.PI * 2,
          distortFreq: 4 + Math.floor(Math.random() * 3)
        });
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = performance.now();
      if (now - lastMouseDrop > 180) {
        spawnWaterDrop(x, y, 0.5);
        lastMouseDrop = now;
      }
    };

    const wrapper = rightWrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener('mousemove', handleMouseMove);
    }

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0 });
    observer.observe(canvas);

    const render = (time) => {
      if (!isVisible) { animationFrameId = requestAnimationFrame(render); return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Automatic Water Drop from Center of the Cards every 2.0 seconds
      if (time - lastAutoDrop > 2000) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        spawnWaterDrop(centerX, centerY, 1.0);
        lastAutoDrop = time;
      }

      ctx.globalCompositeOperation = 'source-over';

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.opacity -= r.decay;
        r.phase += 0.03;

        if (r.opacity <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        const alpha = Math.max(0, r.opacity);
        const points = 64;

        const drawLiquidWavePath = (radiusOffset = 0, perspectiveRatio = 0.85) => {
          ctx.beginPath();
          for (let j = 0; j <= points; j++) {
            const angle = (j / points) * Math.PI * 2;
            const distort = Math.sin(angle * r.distortFreq + r.phase) * (6 + r.radius * 0.028)
                          + Math.cos(angle * 2.5 - r.phase * 1.3) * (4 + r.radius * 0.018);
            const rad = Math.max(1, r.radius + distort + radiusOffset);
            const px = r.x + Math.cos(angle) * rad;
            const py = r.y + Math.sin(angle) * rad * perspectiveRatio;

            if (j === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
        };

        // 1. Water Caustics Dark Reflection Shadow
        ctx.save();
        drawLiquidWavePath(1.2, 0.85);
        ctx.lineWidth = r.lineWidth + 1.2;
        ctx.strokeStyle = `rgba(15, 23, 42, ${alpha * 0.16})`;
        ctx.stroke();
        ctx.restore();

        // 2. Specular Water Crest Refraction Highlight
        ctx.save();
        drawLiquidWavePath(0, 0.85);
        ctx.lineWidth = r.lineWidth;
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.88})`;
        ctx.stroke();
        ctx.restore();

        // 3. Faint Electric Cyan Water Rim Tint
        ctx.save();
        drawLiquidWavePath(-1.5, 0.85);
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.35})`;
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (wrapper) {
        wrapper.removeEventListener('mousemove', handleMouseMove);
      }
      observer.disconnect();
    };
  }, []);

  /* ── ADAPTIVE PINNED SCROLL TRIGGER FOR STEPPING THROUGH 01, 02, 03, 04 ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      let pinTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=1800",
        pin: true,
        pinSpacing: true,
        refreshPriority: 3,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          let newIdx = 0;
          if (progress < 0.25) newIdx = 0;
          else if (progress < 0.50) newIdx = 1;
          else if (progress < 0.75) newIdx = 2;
          else newIdx = 3;

          setActiveIdx((prev) => (prev !== newIdx ? newIdx : prev));
        }
      });

      return () => {
        if (pinTrigger) pinTrigger.kill();
      };
    });

    return () => mm.revert();
  }, []);

  /* ── REPEATABLE SCROLL ENTRANCE ANIMATION (Header & Selector Cards) ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Entrance Timeline for Header & Selector Cards
      const entranceTl = gsap.timeline({ paused: true });

      entranceTl
        .fromTo('.svc-hdr-line',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.45, ease: 'power3.inOut' }
        )
        .fromTo('.svc-hdr-label',
          { x: -40, opacity: 0, letterSpacing: '0.05em', filter: 'blur(8px)' },
          { x: 0, opacity: 1, letterSpacing: '0.25em', filter: 'blur(0px)', duration: 0.45, ease: 'back.out(1.7)' },
          '-=0.2'
        )
        .fromTo('.svc-hdr-char',
          { x: -45, opacity: 0, scale: 0.55, rotateY: -40, filter: 'blur(8px)' },
          { x: 0, opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)', duration: 0.55, stagger: 0.055, ease: 'back.out(2.0)' },
          '-=0.25'
        )
        .fromTo('.svc-selector-card',
          { opacity: 0, x: -60, filter: 'blur(10px)' },
          { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.55, stagger: 0.06, ease: 'back.out(1.8)' },
          '-=0.3'
        );

      ScrollTrigger.create({
        trigger: section,
        start: 'top 85%',
        once: true,
        onEnter: () => entranceTl.play()
      });

      // Window resize refresh listener for real-time responsive recalculation
      const handleResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, section);

    return () => ctx.revert();
  }, []);

  /* ── GSAP Dynamic 3D Card-Origin Entrance for Center Text Content ── */
  useEffect(() => {
    if (!centerRef.current) return;

    const heading = centerRef.current.querySelector('h3');
    const subtext = centerRef.current.querySelector('p');
    const keypoints = centerRef.current.querySelectorAll('.svc-key-point-item');
    const cta = centerRef.current.querySelector('.svc-cta-link');

    // Kill any active tweens on center text elements to prevent transition glitching
    if (heading) gsap.killTweensOf(heading);
    if (subtext) gsap.killTweensOf(subtext);
    if (keypoints.length) gsap.killTweensOf(keypoints);
    if (cta) gsap.killTweensOf(cta);

    // Calculate vertical offset matching the active selector card's exact position
    const yOffsets = [-75, -25, 25, 75];
    const cardY = yOffsets[activeIdx] || 0;

    const tlSwitch = gsap.timeline({ overwrite: 'auto' });

    if (heading) {
      tlSwitch.fromTo(heading,
        { 
          x: -60, 
          y: cardY * 0.4, 
          rotateY: -20, 
          scale: 0.9, 
          opacity: 0, 
          filter: 'blur(8px)', 
          transformOrigin: '0% 50%' 
        },
        { 
          x: 0, 
          y: 0, 
          rotateY: 0, 
          scale: 1, 
          opacity: 1, 
          filter: 'blur(0px)', 
          duration: 0.48, 
          ease: 'back.out(1.8)' 
        }
      );
    }

    if (subtext) {
      tlSwitch.fromTo(subtext,
        { 
          x: -45, 
          y: cardY * 0.3, 
          opacity: 0, 
          filter: 'blur(6px)' 
        },
        { 
          x: 0, 
          y: 0, 
          opacity: 1, 
          filter: 'blur(0px)', 
          duration: 0.42, 
          ease: 'power3.out' 
        },
        '-=0.32'
      );
    }

    if (keypoints.length) {
      tlSwitch.fromTo(keypoints,
        { 
          x: -35, 
          y: cardY * 0.2, 
          opacity: 0, 
          scale: 0.92, 
          filter: 'blur(4px)' 
        },
        { 
          x: 0, 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          filter: 'blur(0px)', 
          duration: 0.4, 
          stagger: 0.06, 
          ease: 'back.out(1.7)' 
        },
        '-=0.3'
      );

      // Checkmark icon spring spin
      const checkIcons = centerRef.current.querySelectorAll('.svc-key-point-item svg');
      if (checkIcons.length) {
        gsap.killTweensOf(checkIcons);
        gsap.fromTo(checkIcons,
          { scale: 0, rotate: -140 },
          { scale: 1, rotate: 0, duration: 0.4, stagger: 0.06, ease: 'back.out(2.5)', delay: 0.1 }
        );
      }
    }

    if (cta) {
      tlSwitch.fromTo(cta,
        { 
          x: -30, 
          opacity: 0, 
          scale: 0.92 
        },
        { 
          x: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 0.38, 
          ease: 'back.out(1.8)' 
        },
        '-=0.22'
      );
    }
  }, [activeIdx]);

  /* Highly Responsive Multi-Layer 3D Cursor Motion for Right Visual Container & Cards */
  const handleMouseMove = (e) => {
    if (!rightWrapperRef.current) return;
    const rect = rightWrapperRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    
    // Normalized cursor offsets (-1.5 to 1.5)
    const dx = Math.max(-1.5, Math.min(1.5, (e.clientX - cx) / (rect.width / 2)));
    const dy = Math.max(-1.5, Math.min(1.5, (e.clientY - cy) / (rect.height / 2)));

    // 1. Primary Container 3D Tilt
    if (visualRef.current) {
      gsap.to(visualRef.current, {
        rotateY: dx * 35,
        rotateX: -dy * 32,
        rotateZ: dx * 4,
        x: dx * 22,
        y: dy * 22,
        transformPerspective: 1000,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }

    // 2. 01 Web Platforms Sub-Cards Parallax Tilt
    if (webCardRef.current) {
      gsap.to(webCardRef.current, {
        rotateY: dx * 32,
        rotateX: -dy * 28,
        rotateZ: dx * 4,
        x: dx * 24,
        y: dy * 24,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }

    if (webStats1Ref.current) {
      gsap.to(webStats1Ref.current, {
        x: dx * 14,
        y: dy * 14,
        rotateY: dx * 15,
        rotateX: -dy * 15,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }

    if (webStats2Ref.current) {
      gsap.to(webStats2Ref.current, {
        x: dx * 14,
        y: dy * 14,
        rotateY: dx * 15,
        rotateX: -dy * 15,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }

    // 3. 02 Mobile Engineering Phone Card Parallax Tilt
    if (phoneCardRef.current) {
      gsap.to(phoneCardRef.current, {
        rotateY: dx * 35,
        rotateX: -dy * 32,
        rotateZ: dx * 5,
        x: dx * 26,
        y: dy * 26,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }

    if (phonePillRef.current) {
      gsap.to(phonePillRef.current, {
        x: dx * 18,
        y: dy * 18,
        rotateY: dx * 18,
        rotateX: -dy * 18,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }

    // 4. 03 Brand Identity Sub-Cards Parallax Tilt
    if (card1Ref.current) {
      gsap.to(card1Ref.current, {
        x: -140 + dx * 32,
        y: -32 + dy * 32,
        rotateY: dx * 22,
        rotateX: -dy * 20,
        rotateZ: -8 + dx * 6,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }

    if (card2Ref.current) {
      gsap.to(card2Ref.current, {
        x: 130 + dx * 26,
        y: 22 + dy * 26,
        rotateY: dx * 18,
        rotateX: -dy * 16,
        rotateZ: 6 + dx * 5,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }

    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        x: dx * 45,
        y: -15 + dy * 45,
        rotateY: dx * 28,
        rotateX: -dy * 25,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }

    if (laptopRef.current) {
      gsap.to(laptopRef.current, {
        x: -10 + dx * 12,
        y: 20 + dy * 12,
        rotateY: -5 + dx * 10,
        rotateX: 10 - dy * 10,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }

    // 5. 04 Growth Marketing Sub-Cards Parallax Tilt
    if (cardLeftRef.current) {
      gsap.to(cardLeftRef.current, {
        x: -38 + dx * 24,
        y: dy * 24,
        rotateY: -9 + dx * 18,
        rotateX: -dy * 16,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }

    if (cardCenterRef.current) {
      gsap.to(cardCenterRef.current, {
        x: dx * 30,
        y: dy * 30,
        rotateY: dx * 22,
        rotateX: -dy * 20,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }

    if (cardRightRef.current) {
      gsap.to(cardRightRef.current, {
        x: 38 + dx * 24,
        y: dy * 24,
        rotateY: 9 + dx * 18,
        rotateX: -dy * 16,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }

    if (topWidgetRef.current) {
      gsap.to(topWidgetRef.current, {
        x: dx * 38,
        y: dy * 20,
        rotateY: dx * 15,
        rotateX: -dy * 15,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  };

  const handleMouseLeave = () => {
    if (visualRef.current) {
      gsap.to(visualRef.current, {
        rotateY: 0,
        rotateX: 0,
        rotateZ: 0,
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }

    if (webCardRef.current) {
      gsap.to(webCardRef.current, { rotateY: 0, rotateX: 0, rotateZ: 0, x: 0, y: 0, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
    }
    if (webStats1Ref.current) {
      gsap.to(webStats1Ref.current, { rotateY: 0, rotateX: 0, x: 0, y: 0, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
    }
    if (webStats2Ref.current) {
      gsap.to(webStats2Ref.current, { rotateY: 0, rotateX: 0, x: 0, y: 0, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
    }

    if (phoneCardRef.current) {
      gsap.to(phoneCardRef.current, { rotateY: 0, rotateX: 0, rotateZ: 0, x: 0, y: 0, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
    }
    if (phonePillRef.current) {
      gsap.to(phonePillRef.current, { rotateY: 0, rotateX: 0, x: 0, y: 0, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
    }

    if (card1Ref.current) {
      gsap.to(card1Ref.current, { x: -140, y: -32, rotateY: 0, rotateX: 0, rotateZ: -8, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
    }
    if (card2Ref.current) {
      gsap.to(card2Ref.current, { x: 130, y: 22, rotateY: 0, rotateX: 0, rotateZ: 6, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
    }
    if (badgeRef.current) {
      gsap.to(badgeRef.current, { x: 0, y: -15, rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
    }
    if (laptopRef.current) {
      gsap.to(laptopRef.current, { x: -10, y: 20, rotateY: -5, rotateX: 10, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
    }

    if (cardLeftRef.current) {
      gsap.to(cardLeftRef.current, { x: -38, y: 0, rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
    }
    if (cardCenterRef.current) {
      gsap.to(cardCenterRef.current, { x: 0, y: 0, rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
    }
    if (cardRightRef.current) {
      gsap.to(cardRightRef.current, { x: 38, y: 0, rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
    }
    if (topWidgetRef.current) {
      gsap.to(topWidgetRef.current, { x: 0, y: 0, rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        minHeight: '100vh',
        boxSizing: 'border-box',
        padding: '54px 3.5% 24px',
        background: '#F5F3EF',
        overflow: 'hidden',
        fontFamily: 'var(--font-body)',
        color: '#0A0A10',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <div style={{ maxWidth: '1440px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Section Header — with unique scroll entrance effects */}
        <div ref={headerRef} style={{ marginBottom: '12px', perspective: '600px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="svc-hdr-line" style={{ width: 22, height: 2.5, background: 'linear-gradient(90deg, #FF2A54, #7000FF)', borderRadius: 2, transformOrigin: 'left center', display: 'inline-block' }} />
            <span className="svc-hdr-label" style={{ background: 'linear-gradient(90deg, #FF2A54 0%, #7000FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
              WHAT WE DO
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)', fontWeight: 900, fontFamily: 'var(--font-display)', color: '#0A0A10', letterSpacing: '-0.035em', margin: 0, lineHeight: 1.05, display: 'flex', gap: '0.28em', flexWrap: 'wrap', overflow: 'hidden' }}>
            <div style={{ display: 'inline-flex', transformStyle: 'preserve-3d' }}>
              {["O", "u", "r"].map((char, i) => (
                <span key={i} className="svc-hdr-char" style={{ position: 'relative', zIndex: 10 - i, display: 'inline-block', transformStyle: 'preserve-3d', willChange: 'transform, opacity, filter' }}>{char}</span>
              ))}
            </div>
            <div style={{ display: 'inline-flex', transformStyle: 'preserve-3d' }}>
              {["S", "e", "r", "v", "i", "c", "e", "s"].map((char, i) => (
                <span key={i} className="svc-hdr-char" style={{ position: 'relative', zIndex: 10 - i, display: 'inline-block', transformStyle: 'preserve-3d', willChange: 'transform, opacity, filter' }}>{char}</span>
              ))}
            </div>
          </h2>
        </div>

        {/* 3-Column Grid Container */}
        <div className="services-grid-container">

          {/* LEFT: SERVICE SELECTOR */}
          <div className="svc-selector-col" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {SERVICES_DATA.map((svc, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={svc.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`svc-selector-card ${isActive ? 'is-active' : ''}`}
                  style={{
                    position: 'relative',
                    borderRadius: '18px',
                    padding: isActive ? '16px 20px' : '13px 18px',
                    height: isActive ? '120px' : '52px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    background: isActive ? svc.gradient : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : '#0A0A10',
                    border: isActive ? 'none' : '1px solid rgba(0, 0, 0, 0.07)',
                    boxShadow: isActive ? `0 16px 36px ${svc.glowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.3)` : '0 4px 14px rgba(0, 0, 0, 0.02)',
                    cursor: 'pointer',
                    transition: 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    backdropFilter: 'blur(12px)',
                    transform: isActive ? 'scale(1.02) translateX(4px)' : 'scale(1) translateX(0)',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, height: '28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 800, color: isActive ? '#FFFFFF' : 'rgba(10, 10, 16, 0.4)', fontFamily: 'var(--font-display)', transition: 'color 0.35s ease' }}>
                        {svc.id}
                      </span>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '-0.01em', transition: 'color 0.35s ease' }}>
                        {svc.shortTitle}
                      </span>
                    </div>

                    <div style={{ width: isActive ? 34 : 28, height: isActive ? 34 : 28, borderRadius: '50%', background: isActive ? 'rgba(255, 255, 255, 0.22)' : 'rgba(0, 0, 0, 0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isActive ? '#FFFFFF' : '#0A0A10', transition: 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)', flexShrink: 0, transform: isActive ? 'rotate(0deg) scale(1.05)' : 'rotate(-45deg) scale(0.9)' }}>
                      <svg width={isActive ? "15" : "14"} height={isActive ? "15" : "14"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>

                  {isActive && (
                    <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.2)', animation: 'svcFadeSlideDown 0.45s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                      <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.42, color: 'rgba(255, 255, 255, 0.94)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {svc.tagline}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CENTER: SELECTED SERVICE CONTENT */}
          <div ref={centerRef} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 10px' }}>
            <h3 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.8rem)', fontWeight: 800, fontFamily: 'var(--font-display)', lineHeight: 1.25, color: '#0A0A10', letterSpacing: '-0.015em', margin: '0 0 14px 0' }}>
              {currentService.centerHeading}
            </h3>

            <p style={{ fontSize: '1.05rem', lineHeight: 1.62, color: 'rgba(10, 10, 16, 0.68)', margin: '0 0 22px 0', fontFamily: 'var(--font-body)' }}>
              {currentService.centerSubtext}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {currentService.keyPoints.map((point, i) => (
                <div key={i} className="svc-key-point-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', animation: `svcBulletSlideIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${0.12 + i * 0.08}s both` }}>
                  <div style={{ width: 25, height: 25, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(255,42,84,0.15), rgba(112,0,255,0.15))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7000FF', flexShrink: 0 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="url(#checkGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <defs>
                        <linearGradient id="checkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FF2A54" />
                          <stop offset="100%" stopColor="#7000FF" />
                        </linearGradient>
                      </defs>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: '#0A0A10' }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <a href="#contact" className="svc-cta-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '1.02rem', fontWeight: 800, textDecoration: 'none', transition: 'gap 0.3s ease' }}>
                <span style={{ background: 'linear-gradient(90deg, #FF2A54 0%, #7000FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {currentService.ctaText}
                </span>
              </a>
            </div>
          </div>

          {/* RIGHT: ANIMATED 3D VISUAL SCENES WITH DYNAMIC CURSOR TILT & LOCALIZED BACKLIGHT SPILLAGE */}
          <div ref={rightWrapperRef} className="svc-visual-container" style={{ position: 'relative', width: '100%', height: '440px', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: 1200 }}>
            
            {/* Live Water Drop Concentric Ripple Wave Canvas behind the cards */}
            <canvas
              ref={cardWaterCanvasRef}
              style={{
                position: 'absolute',
                inset: '-25px',
                width: 'calc(100% + 50px)',
                height: 'calc(100% + 50px)',
                zIndex: 0,
                pointerEvents: 'none',
                borderRadius: '40px'
              }}
            />

            {/* Localized Spillage Glow Aura directly behind the visual card */}
            <div style={{ position: 'absolute', inset: '-15px', borderRadius: '40px', background: currentService.glowColor, filter: 'blur(55px)', opacity: 0.85, transition: 'background 0.6s ease', pointerEvents: 'none', zIndex: 0 }} />

            <div
              ref={visualRef}
              key={currentService.id}
              className={currentService.animClass}
              style={{
                width: '100%',
                height: '100%',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                pointerEvents: 'none',
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {activeIdx === 0 && <WebPlatformsVisual webCardRef={webCardRef} webStats1Ref={webStats1Ref} webStats2Ref={webStats2Ref} />}
              {activeIdx === 1 && <MobileEngineeringVisual phoneCardRef={phoneCardRef} phonePillRef={phonePillRef} />}
              {activeIdx === 2 && <BrandIdentityVisual card1Ref={card1Ref} card2Ref={card2Ref} badgeRef={badgeRef} laptopRef={laptopRef} />}
              {activeIdx === 3 && <GrowthMarketingVisual cardLeftRef={cardLeftRef} cardCenterRef={cardCenterRef} cardRightRef={cardRightRef} topWidgetRef={topWidgetRef} />}
            </div>
          </div>

        </div>
      </div>

      {/* Scoped CSS */}
      <style>{`
        #services .services-grid-container {
          display: grid;
          grid-template-columns: 1.05fr 1.15fr 1.3fr;
          gap: clamp(20px, 2.8vw, 42px);
          align-items: center;
          width: 100%;
        }

        #services .svc-selector-card:hover {
          transform: translateY(-2px) scale(1.03) translateX(6px) !important;
        }

        #services .svc-cta-link:hover {
          gap: 14px !important;
        }

        @keyframes svcFadeSlideDown {
          from { opacity: 0; transform: translateY(-8px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        @keyframes svcBulletSlideIn {
          from { opacity: 0; transform: translateX(-14px); filter: blur(4px); }
          to { opacity: 1; transform: translateX(0); filter: blur(0); }
        }

        /* ── BESPOKE SIGNATURE 3D TRANSITIONS PER SERVICE ── */

        /* 01 Web Platforms: Glass Y-Axis Perspective Flip */
        .svc-anim-glass-flip {
          animation: svcGlassFlipIn 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes svcGlassFlipIn {
          0% {
            opacity: 0;
            transform: perspective(1200px) rotateY(-90deg) scale(0.85);
            filter: blur(12px);
          }
          100% {
            opacity: 1;
            transform: perspective(1200px) rotateY(0deg) scale(1);
            filter: blur(0px);
          }
        }

        /* 02 Mobile Engineering: Spring Launcher Bounce Drop */
        .svc-anim-spring-drop {
          animation: svcSpringDropIn 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes svcSpringDropIn {
          0% {
            opacity: 0;
            transform: perspective(1200px) translateY(-70px) rotateX(35deg) scale(0.8);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: perspective(1200px) translateY(0) rotateX(0deg) scale(1);
            filter: blur(0px);
          }
        }

        /* 03 Brand Identity: Luxury Studio 3D Spiral Unfold */
        .svc-anim-studio-unfold {
          animation: svcStudioUnfoldIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes svcStudioUnfoldIn {
          0% {
            opacity: 0;
            transform: perspective(1200px) rotate(-15deg) rotateY(45deg) scale(0.75);
            filter: blur(14px);
          }
          100% {
            opacity: 1;
            transform: perspective(1200px) rotate(0deg) rotateY(0deg) scale(1);
            filter: blur(0px);
          }
        }

        /* 04 Growth Marketing: Analytics Chart Explosion Fan-Out */
        .svc-anim-chart-explosion {
          animation: svcChartExplosionIn 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes svcChartExplosionIn {
          0% {
            opacity: 0;
            transform: perspective(1200px) scale(0.7) translateZ(-80px) rotateX(-25deg);
            filter: blur(12px);
          }
          60% {
            transform: perspective(1200px) scale(1.05) translateZ(10px) rotateX(5deg);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: perspective(1200px) scale(1) translateZ(0) rotateX(0deg);
            filter: blur(0px);
          }
        }

        @keyframes svcSpin  { to { transform: rotate(360deg); } }
        @keyframes svcSpinR { to { transform: rotate(-360deg); } }
        @keyframes svcPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
        @keyframes svcGlareSweep { 0%{background-position:150% 0%} 100%{background-position:-150% 0%} }
        @keyframes chartSpark { 0%{offset-distance:0%;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{offset-distance:100%;opacity:0} }
        @keyframes svcMarquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes svcFloatObj { 0%{transform:translateY(0) rotate(0deg)} 100%{transform:translateY(-12px) rotate(2deg)} }

        @media (max-width: 1100px) {
          #services {
            height: auto !important;
            min-height: auto !important;
            padding: 60px 4% 35px !important;
          }
          #services .services-grid-container {
            grid-template-columns: 1fr 1fr;
            gap: 28px;
          }
          #services .svc-visual-container {
            grid-column: span 2;
            height: 400px !important;
            margin-top: 10px;
          }
        }

        @media (max-width: 680px) {
          #services {
            padding: 55px 4% 30px !important;
          }
          #services .services-grid-container {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          #services .svc-visual-container {
            grid-column: span 1;
            height: 320px !important;
          }
          #services .svc-selector-col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }
          #services .svc-selector-card {
            height: auto !important;
            padding: 10px 12px !important;
          }
        }

        @media (max-width: 480px) {
          #services .svc-selector-col {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}


