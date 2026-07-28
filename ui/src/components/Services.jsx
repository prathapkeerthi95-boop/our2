/**
 * Services.jsx — Cinematic Premium Storytelling Engine
 * Architecture: GSAP quickTo + RAF physics + Master Timeline + Glass System
 * Four unique worlds: BUILD / LAUNCH / BRAND / GROW
 */

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════
   CHAPTER DATA
═══════════════════════════════════════════════════════════════════ */
const CHAPTERS = [
  {
    step: '01', label: 'BUILD',  title: 'Web Platforms',
    sub: 'IMMERSIVE DIGITAL EXPERIENCES',
    desc: 'We engineer digital foundations — architecture, performance and beauty fused into living products.',
    bgFrom: '#F3F6FA', bgTo: '#F7F9FC',
    ambient: 'rgba(50,130,255,0.10)',
    pulse: 'rgba(50,130,255,0.22)',
    halo: 'rgba(50,130,255,0.14)',
    camScale: 1.02, camX: 0,
    isDark: false,
  },
  {
    step: '02', label: 'LAUNCH', title: 'Mobile Engineering',
    sub: 'NATIVE & CROSS-PLATFORM',
    desc: 'We launch seamless experiences — pixel-perfect on every device, every screen, every interaction.',
    bgFrom: '#F4F0FF', bgTo: '#F9F6FF',
    ambient: 'rgba(112,0,255,0.10)',
    pulse: 'rgba(112,0,255,0.22)',
    halo: 'rgba(112,0,255,0.14)',
    camScale: 0.99, camX: 10,
    isDark: false,
  },
  {
    step: '03', label: 'BRAND',  title: 'Brand Identity',
    sub: 'SYSTEMS & STRATEGY',
    desc: 'We craft identity systems that command memory — visual language built to last decades.',
    bgFrom: '#F6F3FF', bgTo: '#FAF8FF',
    ambient: 'rgba(255,42,84,0.08)',
    pulse: 'rgba(255,42,84,0.18)',
    halo: 'rgba(112,0,255,0.14)',
    camScale: 1.01, camX: -8,
    isDark: false,
  },
  {
    step: '04', label: 'GROW',   title: 'Growth Marketing',
    sub: 'DATA-DRIVEN DOMINANCE',
    desc: 'We grow revenue with precision strategy, creative performance and measurable compounding impact.',
    bgFrom: '#FAF6F0', bgTo: '#FFFDF9',
    ambient: 'rgba(255,184,0,0.10)',
    pulse: 'rgba(255,184,0,0.22)',
    halo: 'rgba(255,184,0,0.14)',
    camScale: 0.96, camX: 6,
    isDark: false,
  },
];

const MARQ_STR = ['NEXTJS','REACT','SWIFT','FLUTTER','NODE','GRAPHQL','SUPABASE','TYPESCRIPT','KOTLIN','TAILWIND'].map(w => `${w} •`).join('  ');

/* ═══════════════════════════════════════════════════════════════════
   SPLIT TEXT
═══════════════════════════════════════════════════════════════════ */
function SplitText({ text }) {
  return (
    <span style={{ display: 'inline-block' }}>
      {text.split('').map((ch, i) => (
        <span key={i} className="svc-char"
          style={{ display: 'inline-block', willChange: 'transform, opacity' }}>
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BROWSER DASHBOARD (BUILD)
═══════════════════════════════════════════════════════════════════ */
function BrowserUI() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#0D0F14', fontFamily: 'var(--font-body)', overflow: 'hidden', transformStyle: 'preserve-3d' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', gap: 12, transform: 'translateZ(12px)' }}>
        <div style={{ width: 26, height: 26, borderRadius: 7, background: 'linear-gradient(135deg,#FF2A54,#7000FF)', flexShrink: 0 }} />
        {['Product', 'Features', 'Pricing', 'Docs'].map(l => (
          <span key={l} style={{ fontSize: '0.57rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>{l}</span>
        ))}
        <div style={{ marginLeft: 'auto', height: 21, padding: '0 11px', borderRadius: 5, background: 'linear-gradient(90deg,#FF2A54,#7000FF)', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '0.54rem', color: '#fff', fontWeight: 700, letterSpacing: '0.09em' }}>GET STARTED</span>
        </div>
      </div>
      <div style={{ padding: '15px 18px 10px', borderBottom: '1px solid rgba(255,255,255,0.05)', transform: 'translateZ(20px)' }}>
        <div style={{ fontSize: '0.57rem', color: '#FF2A54', fontWeight: 700, letterSpacing: '0.18em', marginBottom: 5 }}>PLATFORM v3.0 — NOW LIVE</div>
        <div style={{ fontSize: '1.08rem', fontWeight: 800, color: '#fff', lineHeight: 1.18, fontFamily: 'var(--font-display)', letterSpacing: '-0.02em', marginBottom: 8 }}>Build the future<br />of digital products</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ height: 23, padding: '0 13px', borderRadius: 6, background: 'linear-gradient(90deg,#FF2A54,#7000FF)', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '0.57rem', color: '#fff', fontWeight: 700 }}>Start Building</span>
          </div>
          <div style={{ height: 23, padding: '0 13px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '0.57rem', color: 'rgba(255,255,255,0.65)' }}>View Demo</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '10px 18px', transformStyle: 'preserve-3d' }}>
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.06)', transform: 'translateZ(35px)', transformStyle: 'preserve-3d' }}>
          <div style={{ fontSize: '0.49rem', color: 'rgba(255,255,255,0.37)', marginBottom: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Revenue</div>
          <div style={{ fontSize: '0.87rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)', marginBottom: 7 }}>$48.2K</div>
          <svg viewBox="0 0 100 36" style={{ width: '100%', height: 36 }}>
            <defs>
              <linearGradient id="cg1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF2A54" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FF2A54" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,30 Q15,22 28,26 T55,12 T80,8 T100,4 V36 H0 Z" fill="url(#cg1)" />
            <path d="M0,30 Q15,22 28,26 T55,12 T80,8 T100,4" fill="none" stroke="#FF2A54" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, transformStyle: 'preserve-3d' }}>
          {[{ l: 'Users', v: '12,482', c: '#00E5FF', w: '72%' }, { l: 'Conversion', v: '+24.8%', c: '#7000FF', w: '55%' }, { l: 'Uptime', v: '99.99%', c: '#28C840', w: '90%' }].map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '7px 10px', border: '1px solid rgba(255,255,255,0.05)', transform: `translateZ(${25 + i * 10}px)` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: '0.46rem', color: 'rgba(255,255,255,0.37)', letterSpacing: '0.09em', textTransform: 'uppercase' }}>{s.l}</span>
                <span style={{ fontSize: '0.56rem', fontWeight: 700, color: s.c }}>{s.v}</span>
              </div>
              <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
                <div style={{ height: '100%', width: s.w, background: s.c, borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PHONE SCREEN (LAUNCH)
═══════════════════════════════════════════════════════════════════ */
function PhoneScreen() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#0A0A10', fontFamily: 'var(--font-body)', overflow: 'hidden', transformStyle: 'preserve-3d' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px 6px', marginTop: 22, transform: 'translateZ(15px)' }}>
        <span style={{ fontSize: '0.58rem', fontWeight: 700, color: '#fff' }}>9:41</span>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {[4, 6, 8, 10].map((h, i) => (
            <div key={i} style={{ width: 3, height: h, background: i < 3 ? '#fff' : 'rgba(255,255,255,0.3)', borderRadius: 1 }} />
          ))}
          <div style={{ width: 14, height: 8, border: '1px solid rgba(255,255,255,0.45)', borderRadius: 2, marginLeft: 4, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 1, top: 1, bottom: 1, width: '70%', background: '#28C840', borderRadius: 1 }} />
          </div>
        </div>
      </div>
      <div style={{ padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', transform: 'translateZ(20px)' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>Dashboard</div>
        <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.38)', marginTop: 1 }}>Good morning, Alex</div>
      </div>
      <div style={{ margin: '8px 16px', padding: '6px 10px', borderRadius: 8, background: 'rgba(255,42,84,0.14)', border: '1px solid rgba(255,42,84,0.24)', display: 'flex', alignItems: 'center', gap: 7, transform: 'translateZ(45px)', boxShadow: '0 8px 24px rgba(255,42,84,0.18)' }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF2A54', flexShrink: 0, animation: 'svcPulse 1.8s ease-in-out infinite' }} />
        <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.82)' }}>New deployment ready to ship</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, padding: '0 16px', transformStyle: 'preserve-3d' }}>
        {[{ l: 'Active Users', v: '4,821', c: '#00E5FF', t: '+12%' }, { l: 'Revenue', v: '$18.4K', c: '#FF2A54', t: '+24%' }].map((m, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '8px 10px', border: '1px solid rgba(255,255,255,0.07)', transform: `translateZ(${32 + i * 12}px)` }}>
            <div style={{ fontSize: '0.46rem', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.1em', marginBottom: 3, textTransform: 'uppercase' }}>{m.l}</div>
            <div style={{ fontSize: '0.77rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>{m.v}</div>
            <div style={{ fontSize: '0.48rem', color: m.c, fontWeight: 700, marginTop: 2 }}>{m.t} this week</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '10px 16px 0', display: 'flex', flexDirection: 'column', gap: 7, transformStyle: 'preserve-3d' }}>
        {[{ l: 'iOS Build', p: 88, c: '#7000FF' }, { l: 'Android', p: 64, c: '#00E5FF' }, { l: 'Deploy', p: 42, c: '#FFB800' }].map((b, i) => (
          <div key={i} style={{ transform: `translateZ(${20 + i * 8}px)` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ fontSize: '0.48rem', color: 'rgba(255,255,255,0.45)' }}>{b.l}</span>
              <span style={{ fontSize: '0.48rem', color: b.c, fontWeight: 700 }}>{b.p}%</span>
            </div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
              <div style={{ height: '100%', width: `${b.p}%`, background: b.c, borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   GLASS LAYER COMPONENT (Apple VisionOS quality)
═══════════════════════════════════════════════════════════════════ */
function GlassLayer({ style }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10, borderRadius: 'inherit',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.36) 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,0.06) 100%)',
      ...style,
    }} />
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════ */
export default function Services() {

  /* ── Atmosphere ── */
  const sectionRef  = useRef(null);
  const bgRef       = useRef(null);
  const ambRef      = useRef(null);
  const fogRef      = useRef(null);
  const noiseRef    = useRef(null);
  const meshRef     = useRef(null);
  const haloRef     = useRef(null);
  const cameraRef   = useRef(null);
  const canvasRef   = useRef(null);
  const raysRef     = useRef(null);
  const orbitsRef   = useRef([]);

  /* ── Left ── */
  const rowRefs     = useRef([]);
  const nodeRefs    = useRef([]);
  const pulseRefs    = useRef([]);
  const lineRef     = useRef(null);
  const titleRefs   = useRef([]);
  const subRefs     = useRef([]);
  const timelineColRef = useRef(null);

  /* ── Chapters ── */
  const chapRefs    = useRef([]);

  /* ── BUILD ── */
  const buildFrameRef  = useRef(null);
  const buildShdwRef   = useRef(null);
  const buildGlareRef  = useRef(null);

  /* ── LAUNCH ── */
  const phoneRef       = useRef(null);
  const phoneShdwRef   = useRef(null);
  const phoneGlareRef  = useRef(null);
  const marqOutRef     = useRef(null);
  const marqInRef      = useRef(null);
  const marqOut2Ref    = useRef(null);
  const marqIn2Ref     = useRef(null);

  /* ── BRAND ── */
  const macRef         = useRef(null);
  const bCard1Ref      = useRef(null);
  const bCard2Ref      = useRef(null);
  const bLogoRef       = useRef(null);
  const bLetterRef     = useRef(null);
  const bGuideRef      = useRef(null);
  const bFogRef        = useRef(null);
  const brandPRefs     = useRef([]);

  /* ── GROW ── */
  const deckRef        = useRef(null);
  const growCardRefs   = useRef([]);
  const revCounterRef  = useRef(null);
  const convCounterRef = useRef(null);
  const userCounterRef = useRef(null);
  const chartPathRef   = useRef(null);
  const chartPath2Ref  = useRef(null);

  /* ── Spotlight / Foil Ref overlays ── */
  const buildSpotlightRef = useRef(null);
  const phoneSpotlightRef = useRef(null);
  const bCard1FoilRef     = useRef(null);
  const bCard2FoilRef     = useRef(null);
  const growSpotlightRefs = useRef([]);

  /* ── QuickTo cache (hot RAF path — no tween overhead) ── */
  const QT = useRef({});

  /* ── Internal state ── */
  const activeRef  = useRef(0);
  const mouseRef   = useRef({ rx: 0, ry: 0, x: 0, y: 0 });
  const marqXRef   = useRef(0);
  const marqX2Ref  = useRef(-1100);
  const activeTL   = useRef(null);
  const idleAnims  = useRef([]);
  const growAnims  = useRef([]);
  const reduced    = useRef(false);
  const isVisibleRef = useRef(false);
  const sectionRectRef = useRef(null);

  /* ════════════════════════════════════════════════════
     INIT
  ════════════════════════════════════════════════════ */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    /* prefers-reduced-motion — respect user OS setting */
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ── Visibility gating — pause all heavy work when off-screen ── */
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      const wasVisible = isVisibleRef.current;
      isVisibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting && !wasVisible) {
        // Resume idle and grow animations
        idleAnims.current.forEach(a => a && a.play && a.play());
        growAnims.current.forEach(a => a && a.play && a.play());
      } else if (!entry.isIntersecting && wasVisible) {
        // Pause idle and grow animations to save CPU
        idleAnims.current.forEach(a => a && a.pause && a.pause());
        growAnims.current.forEach(a => a && a.pause && a.pause());
      }
    }, { threshold: 0.05 });
    visibilityObserver.observe(section);
    sectionRectRef.current = section.getBoundingClientRect();

    /* ── 1. Initial DOM state ── */
    chapRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0.92, y: i === 0 ? 0 : 36, z: 0 });
    });
    nodeRefs.current.forEach((n, i) => {
      if (!n) return;
      gsap.set(n, {
        backgroundColor: i === 0 ? '#FF2A54' : '#fff',
        borderColor: i === 0 ? '#FF2A54' : 'rgba(0,0,0,0.18)',
        boxShadow: i === 0 ? '0 0 0 5px rgba(255,42,84,0.18),0 0 18px rgba(255,42,84,0.32)' : 'none',
      });
      if (i === 0) n.classList.add('svc-node-active');
    });
    pulseRefs.current.forEach((p, i) => p && gsap.set(p, { scale: 1, opacity: i === 0 ? 0.55 : 0 }));
    titleRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        color: i === 0 ? '#0A0A10' : 'transparent',
        webkitTextStroke: i === 0 ? '0px transparent' : '1px rgba(0,0,0,0.22)',
      });
      gsap.set(el.querySelectorAll('.svc-char'), { yPercent: 40, opacity: 0 });
    });
    subRefs.current.forEach((el, i) => el && gsap.set(el, { color: i === 0 ? '#FF2A54' : 'rgba(0,0,0,0.35)' }));

    // Initialize HTML5 Canvas Particle System
    const canvas = canvasRef.current;
    let ctx, width, height, particles = [];
    if (canvas) {
      ctx = canvas.getContext('2d');
      width = canvas.width = section.offsetWidth;
      height = canvas.height = section.offsetHeight;

      const particleCount = 45;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0,
          vy: 0,
          baseVx: (Math.random() - 0.5) * 0.22,
          baseVy: (Math.random() - 0.5) * 0.22,
          radius: 1.2 + Math.random() * 2.8,
          alpha: 0.04 + Math.random() * 0.12,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.004 + Math.random() * 0.008,
        });
      }
    }

    const themeColors = [
      { r: 72,  g: 144, b: 255 }, // BUILD (cool blue)
      { r: 160, g: 100, b: 255 }, // LAUNCH (purple)
      { r: 255, g: 42,  b: 84  }, // BRAND (luxury red-pink)
      { r: 255, g: 184, b: 0   }, // GROW (champagne gold)
    ];
    let activeColor = { ...themeColors[0] };

    // Brand orbits
    orbitsRef.current = Array.from({ length: 12 }, (_, i) => ({
      a: 100 + i * 14,
      b: 60 + i * 8,
      speed: 0.003 + (i % 3) * 0.0015,
      angle: (i / 12) * Math.PI * 2,
      phase: i * 0.4
    }));

    /* ── 2. MASTER ORCHESTRATED ENTRY TIMELINE ── */
    const masterTL = gsap.timeline({ defaults: { ease: 'power4.out' } });

    /* a. Section: blur resolves, opacity rises */
    masterTL.fromTo(section,
      { autoAlpha: 0, filter: 'blur(20px)', y: 60 },
      { autoAlpha: 1, filter: 'blur(0px)', y: 0, duration: 1.4 },
      0
    );
    /* b. BG + noise layer wakes */
    masterTL.fromTo([bgRef.current, noiseRef.current].filter(Boolean),
      { opacity: 0 }, { opacity: 1, duration: 0.9 }, 0.1
    );
    /* c. Mesh gradients drift in */
    if (meshRef.current) masterTL.fromTo(meshRef.current,
      { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 1.1 }, 0.2
    );
    /* d. Ambient radial light blooms */
    if (ambRef.current) masterTL.fromTo(ambRef.current,
      { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }, 0.3
    );
    /* e. Depth fog appears */
    if (fogRef.current) masterTL.fromTo(fogRef.current,
      { opacity: 0 }, { opacity: 0.14, duration: 1.4 }, 0.4
    );
    /* f. Section header animates in */
    const svcHeader = section.querySelector('.svc-header');
    if (svcHeader) {
      masterTL.fromTo(svcHeader,
        { autoAlpha: 0, y: 24, filter: 'blur(6px)' },
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' },
        0.45
      );
    }
    /* g. Timeline rows stagger in */
    if (timelineColRef.current) {
      const rows = timelineColRef.current.querySelectorAll('.svc-row');
      masterTL.fromTo(rows,
        { autoAlpha: 0, x: -28, filter: 'blur(8px)' },
        { autoAlpha: 1, x: 0, filter: 'blur(0px)', duration: 0.75, stagger: 0.12, ease: 'expo.out' },
        0.65
      );
    }
    /* g. Title chars cascade in staggered */
    titleRefs.current.forEach((el, i) => {
      if (!el) return;
      const chars = el.querySelectorAll('.svc-char');
      masterTL.fromTo(chars,
        { yPercent: 40, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.015, ease: 'expo.out' },
        0.65 + i * 0.08
      );
    });
    /* h. Right scene fades + rises */
    if (chapRefs.current[0]) {
      masterTL.fromTo(chapRefs.current[0],
        { autoAlpha: 0, y: 40, scale: 0.94 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1.0, ease: 'expo.out' },
        0.65
      );
    }
    /* i. Cursor halo fades in */
    if (haloRef.current) masterTL.fromTo(haloRef.current,
      { opacity: 0 }, { opacity: 0.38, duration: 1.2 }, 0.8
    );

    /* ── 3. quickTo instances — hot RAF path, zero tween overhead ── */
    const q = QT.current;

    const tryQT = (el, prop, opts) => el ? gsap.quickTo(el, prop, opts) : null;
    const QO = (dur = 0.7) => ({ duration: dur, ease: 'power2.out' });

    /* BUILD */
    q.buildRY  = tryQT(buildFrameRef.current, 'rotationY', QO(0.7));
    q.buildRX  = tryQT(buildFrameRef.current, 'rotationX', QO(0.7));
    q.buildSX  = tryQT(buildShdwRef.current,  'x',         QO(0.65));
    q.buildSY  = tryQT(buildShdwRef.current,  'y',         QO(0.65));
    q.buildGX  = tryQT(buildGlareRef.current, 'x',         QO(0.9));
    q.buildGY  = tryQT(buildGlareRef.current, 'y',         QO(0.9));
    /* LAUNCH */
    q.phoneRY  = tryQT(phoneRef.current,      'rotationY', QO(0.7));
    q.phoneRX  = tryQT(phoneRef.current,      'rotationX', QO(0.7));
    q.phoneSX  = tryQT(phoneShdwRef.current,  'x',         QO(0.65));
    q.phoneSY  = tryQT(phoneShdwRef.current,  'y',         QO(0.65));
    q.phoneGX  = tryQT(phoneGlareRef.current, 'x',         QO(0.9));
    q.phoneGY  = tryQT(phoneGlareRef.current, 'y',         QO(0.9));
    /* BRAND */
    q.macRY    = tryQT(macRef.current,    'rotationY', QO(0.85));
    q.macRX    = tryQT(macRef.current,    'rotationX', QO(0.85));
    q.bc1RY    = tryQT(bCard1Ref.current, 'rotationY', QO(0.7));
    q.bc1RX    = tryQT(bCard1Ref.current, 'rotationX', QO(0.7));
    q.bc2RY    = tryQT(bCard2Ref.current, 'rotationY', QO(0.75));
    q.bc2RX    = tryQT(bCard2Ref.current, 'rotationX', QO(0.75));
    q.bLogoRY  = tryQT(bLogoRef.current,  'rotationY', QO(0.6));
    q.bLogoRX  = tryQT(bLogoRef.current,  'rotationX', QO(0.6));
    q.bFogX    = tryQT(bFogRef.current,   'x',         QO(1.2));
    q.bFogY    = tryQT(bFogRef.current,   'y',         QO(1.2));
    /* GROW — per-card */
    growCardRefs.current.forEach((c, i) => {
      q[`growRY${i}`] = tryQT(c, 'rotationY', QO(0.65));
      q[`growRX${i}`] = tryQT(c, 'rotationX', QO(0.65));
    });
    /* Brand extra cards */
    q.bLetterRY = tryQT(bLetterRef.current, 'rotationY', QO(0.78));
    q.bLetterRX = tryQT(bLetterRef.current, 'rotationX', QO(0.78));
    q.bGuideRY  = tryQT(bGuideRef.current,  'rotationY', QO(0.82));
    q.bGuideRX  = tryQT(bGuideRef.current,  'rotationX', QO(0.82));
    /* Rays */
    q.raysX     = tryQT(raysRef.current,    'x',         QO(0.95));
    q.raysY     = tryQT(raysRef.current,    'y',         QO(0.95));
    /* Halo */
    q.haloX = tryQT(haloRef.current, 'x', { duration: 0.45, ease: 'power2.out' });
    q.haloY = tryQT(haloRef.current, 'y', { duration: 0.45, ease: 'power2.out' });

    /* ── 4. Idle atmospheric animations ── */
    if (!reduced.current) {
      const push = (...anims) => idleAnims.current.push(...anims);

      /* Background layers — all move independently, very slow */
      push(
        gsap.to(ambRef.current,  { x: '38%', y: '20%', duration: 22, yoyo: true, repeat: -1, ease: 'sine.inOut' }),
        gsap.to(fogRef.current,  { xPercent: 10, yPercent: 6, duration: 30, yoyo: true, repeat: -1, ease: 'sine.inOut' }),
        gsap.to(meshRef.current, { xPercent: -5, yPercent: 8, duration: 26, yoyo: true, repeat: -1, ease: 'sine.inOut' }),
      );

      /* BUILD — browser 12s float */
      if (buildFrameRef.current) push(gsap.to(buildFrameRef.current, { y: -8, duration: 4.2, yoyo: true, repeat: -1, ease: 'sine.inOut' }));

      /* LAUNCH — phone 10s float */
      if (phoneRef.current) push(gsap.to(phoneRef.current, { y: -9, duration: 3.8, yoyo: true, repeat: -1, ease: 'sine.inOut' }));

      /* BRAND — each element unique speed/amplitude */
      if (macRef.current)    push(gsap.to(macRef.current,    { y: -7, rotation: 0.6,  duration: 5.2, yoyo: true, repeat: -1, ease: 'sine.inOut' }));
      if (bCard1Ref.current) push(gsap.to(bCard1Ref.current, { y: -9, rotation: -0.8, duration: 4.0, yoyo: true, repeat: -1, ease: 'sine.inOut' }));
      if (bCard2Ref.current) push(gsap.to(bCard2Ref.current, { y:  7, rotation:  0.5, duration: 4.8, yoyo: true, repeat: -1, ease: 'sine.inOut' }));
      if (bLogoRef.current)  push(gsap.to(bLogoRef.current,  { y: -6, rotation:  2.0, duration: 3.5, yoyo: true, repeat: -1, ease: 'sine.inOut' }));
      if (bLetterRef.current)push(gsap.to(bLetterRef.current,{ y: -5,                 duration: 6.0, yoyo: true, repeat: -1, ease: 'sine.inOut' }));
      if (bGuideRef.current) push(gsap.to(bGuideRef.current, { y:  5,                 duration: 5.5, yoyo: true, repeat: -1, ease: 'sine.inOut' }));
      if (bFogRef.current)   push(gsap.to(bFogRef.current,   { scale: 1.15, opacity: 0.6, duration: 8, yoyo: true, repeat: -1, ease: 'sine.inOut' }));

      /* BRAND particles — unique speeds */
      brandPRefs.current.forEach((p, i) => {
        if (!p) return;
        push(gsap.to(p, { y: -(10 + i * 3), x: i % 2 === 0 ? 5 : -5, rotation: i % 3 === 0 ? 14 : -10, duration: 3 + i * 0.65, yoyo: true, repeat: -1, ease: 'sine.inOut' }));
      });

      /* GROW — deck 16s float */
      if (deckRef.current) push(gsap.to(deckRef.current, { y: -5, duration: 4.5, yoyo: true, repeat: -1, ease: 'sine.inOut' }));

      /* 6-second ambient node pulse */
      const pulseItv = setInterval(() => {
        const p = pulseRefs.current[activeRef.current];
        if (!p) return;
        gsap.fromTo(p, { scale: 1, opacity: 0.55 }, { scale: 2.6, opacity: 0, duration: 1.2, ease: 'power2.out' });
      }, 6000);
      idleAnims.current.push({ kill: () => clearInterval(pulseItv) });
    }

    /* ── 5. GROW live counters + SVG chart draw ── */
    startGrowAnimations();

    /* ── 6. Scroll storytelling — pinning and step-by-step scrolling on desktop ── */
    let mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      const pinTrigger = ScrollTrigger.create({
        id: "services-pin",
        trigger: section,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          let index = Math.floor(progress * 5);
          if (index > 3) index = 3;
          if (index < 0) index = 0;
          
          if (index !== activeRef.current) {
            switchTo(index);
          }
        },
        onRefresh: (self) => {
          const progress = self.progress;
          let index = Math.floor(progress * 5);
          if (index > 3) index = 3;
          if (index < 0) index = 0;
          
          if (index !== activeRef.current) {
            switchTo(index);
          }
        }
      });
      return () => {
        pinTrigger.kill();
      };
    });

    /* ── 7. RAF — marquee + cursor physics via quickTo ── */
    // Cache characters array to completely prevent querySelectorAll layout thrashing in the RAF loop
    const charsByTitle = titleRefs.current.map(el => el ? Array.from(el.querySelectorAll('.svc-char')) : []);

    let raf;
    const tick = () => {
      /* Skip all work when section is not in viewport */
      if (!isVisibleRef.current) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const { rx, ry } = mouseRef.current;
      const q = QT.current;
      const idx = activeRef.current;
      const ch = CHAPTERS[idx];

      /* Cursor halo tracks mouse */
      q.haloX && q.haloX(mouseRef.current.x - 120);
      q.haloY && q.haloY(mouseRef.current.y - 120);

      // Light rays drift with cursor
      q.raysX && q.raysX(rx * 25);
      q.raysY && q.raysY(ry * 20);

      // Active title character depth & parallax text shadow (fully optimized direct style updates)
      const chars = charsByTitle[idx];
      if (chars) {
        chars.forEach((char, charIdx) => {
          const depthX = rx * 6 * (1 + (charIdx % 3) * 0.15);
          const depthY = ry * 4 * (1 + (charIdx % 2) * 0.2);
          char.style.transform = `translate3d(${depthX}px, ${depthY}px, 0)`;
          char.style.textShadow = `${-depthX * 1.5}px ${-depthY * 1.5}px 6px ${ch.isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}`;
        });
      }
      // Reset other titles
      for (let tIdx = 0; tIdx < charsByTitle.length; tIdx++) {
        if (tIdx !== idx) {
          const otherChars = charsByTitle[tIdx];
          if (otherChars) {
            otherChars.forEach(char => {
              if (char.style.transform || char.style.textShadow) {
                char.style.transform = '';
                char.style.textShadow = '';
              }
            });
          }
        }
      }

      // Canvas particles render loop
      if (canvas && ctx && !reduced.current) {
        ctx.clearRect(0, 0, width, height);
        
        // Smooth color interpolation
        const targetColor = themeColors[idx];
        activeColor.r += (targetColor.r - activeColor.r) * 0.08;
        activeColor.g += (targetColor.g - activeColor.g) * 0.08;
        activeColor.b += (targetColor.b - activeColor.b) * 0.08;

        particles.forEach(p => {
          p.phase += p.phaseSpeed;
          const driftX = Math.sin(p.phase) * 0.08;
          const driftY = Math.cos(p.phase) * 0.08;

          // Mouse repel physics with inertia
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxRepelDist = 260;

          if (dist < maxRepelDist) {
            const force = (maxRepelDist - dist) / maxRepelDist;
            p.vx -= (dx / dist) * force * 0.2;
            p.vy -= (dy / dist) * force * 0.2;
          }

          p.vx *= 0.94;
          p.vy *= 0.94;

          p.x += p.vx + p.baseVx + driftX;
          p.y += p.vy + p.baseVy + driftY;

          // Edge wrapping
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          const pAlpha = p.alpha * (0.6 + Math.sin(p.phase) * 0.4);
          ctx.fillStyle = `rgba(${Math.round(activeColor.r)}, ${Math.round(activeColor.g)}, ${Math.round(activeColor.b)}, ${pAlpha})`;
          ctx.fill();
        });
      }

      if (!reduced.current) {
        // Smoothly decay mouse velocity
        if (mouseRef.current.velocity !== undefined) {
          mouseRef.current.velocity *= 0.96;
        } else {
          mouseRef.current.velocity = 0;
        }

        /* Marquee physics (speed modulated by mouse velocity & position) */
        const speed = 1.8 + (mouseRef.current.velocity || 0) * 12 + Math.abs(rx) * 4;
        const dir   = rx >= 0 ? -1 : 1;
        marqXRef.current  += speed * dir;
        marqX2Ref.current += speed * dir;
        const x1 = marqXRef.current  % 2400;
        const x2 = marqX2Ref.current % 2400;
        
        // Fast direct DOM translates to avoid GSAP overhead
        if (marqOutRef.current)  marqOutRef.current.style.transform = `translate3d(${x1}px, 0, 0)`;
        if (marqOut2Ref.current) marqOut2Ref.current.style.transform = `translate3d(${x2}px, 0, 0)`;
        if (marqInRef.current)   marqInRef.current.style.transform = `translate3d(${x1}px, 0, 0)`;
        if (marqIn2Ref.current)  marqIn2Ref.current.style.transform = `translate3d(${x2}px, 0, 0)`;

        const time = Date.now();

        /* BUILD — 3D tilt + shadow + glare sweep */
        if (idx === 0) {
          q.buildRY && q.buildRY(rx * 22 + Math.sin(time * 0.0008) * 2);
          q.buildRX && q.buildRX(-ry * 22 + Math.cos(time * 0.0008) * 2);
          q.buildSX && q.buildSX(rx * 38);
          q.buildSY && q.buildSY(ry * 30 + Math.cos(time * 0.0008) * 3);
          q.buildGX && q.buildGX(-rx * 55 + Math.sin(time * 0.0008) * -5);
          q.buildGY && q.buildGY(-ry * 55 + Math.cos(time * 0.0008) * -5);

          // Update BUILD Spotlight
          if (buildSpotlightRef.current) {
            buildSpotlightRef.current.style.background = `radial-gradient(circle 160px at ${(rx + 1) * 50}% ${(ry + 1) * 50}%, rgba(0, 229, 255, 0.18), transparent)`;
          }
        }

        /* LAUNCH — phone + shadow + glare rocking */
        if (idx === 1) {
          q.phoneRY && q.phoneRY(rx * 20 + Math.sin(time * 0.001) * 2.5);
          q.phoneRX && q.phoneRX(-ry * 20 + Math.cos(time * 0.001) * 2.5);
          q.phoneSX && q.phoneSX(rx * 30);
          q.phoneSY && q.phoneSY(ry * 22 + Math.cos(time * 0.001) * 2.5);
          q.phoneGX && q.phoneGX(-rx * 45 + Math.sin(time * 0.001) * -4);
          q.phoneGY && q.phoneGY(-ry * 45 + Math.cos(time * 0.001) * -4);

          // Update LAUNCH Spotlight
          if (phoneSpotlightRef.current) {
            phoneSpotlightRef.current.style.background = `radial-gradient(circle 140px at ${(rx + 1) * 50}% ${(ry + 1) * 50}%, rgba(255, 42, 84, 0.16), transparent)`;
          }
        }

        /* BRAND — luxury orbital particle paths and cards tilt */
        if (idx === 2) {
          q.macRY   && q.macRY(rx * 14 + Math.sin(time * 0.0007) * 2);
          q.macRX   && q.macRX(-ry * 10 + Math.cos(time * 0.0007) * 2);
          q.bc1RY   && q.bc1RY(rx * 28 + Math.sin(time * 0.0012) * 3.5);
          q.bc1RX   && q.bc1RX(-ry * 22 + Math.cos(time * 0.0012) * 3.5);
          q.bc2RY   && q.bc2RY(rx * 20 + Math.sin(time * 0.0009) * 3);
          q.bc2RX   && q.bc2RX(-ry * 16 + Math.cos(time * 0.0009) * 3);
          q.bLogoRY && q.bLogoRY(rx * 38 + Math.sin(time * 0.0015) * 5);
          q.bLogoRX && q.bLogoRX(-ry * 30 + Math.cos(time * 0.0015) * 5);

          q.bLetterRY && q.bLetterRY(rx * 22 + Math.sin(time * 0.001) * 3);
          q.bLetterRX && q.bLetterRX(-ry * 18 + Math.cos(time * 0.001) * 3);
          q.bGuideRY  && q.bGuideRY(rx * 18 + Math.sin(time * 0.0008) * 2);
          q.bGuideRX  && q.bGuideRX(-ry * 14 + Math.cos(time * 0.0008) * 2);

          q.bFogX   && q.bFogX(rx * 28);
          q.bFogY   && q.bFogY(ry * 20);

          // Update BRAND metallic foil sheens
          if (bCard1FoilRef.current) {
            bCard1FoilRef.current.style.backgroundPosition = `${(rx + 1) * 100}% ${(ry + 1) * 100}%`;
          }
          if (bCard2FoilRef.current) {
            bCard2FoilRef.current.style.backgroundPosition = `${(-rx + 1) * 100}% ${(-ry + 1) * 100}%`;
          }

          /* 3D orbits for branding particles */
          brandPRefs.current.forEach((p, i) => {
            if (!p || !orbitsRef.current[i]) return;
            const orb = orbitsRef.current[i];
            orb.angle += orb.speed;
            const px = Math.cos(orb.angle) * orb.a;
            const py = Math.sin(orb.angle) * orb.b;
            gsap.set(p, {
              x: px + rx * (45 + i * 4),
              y: py + ry * (35 + i * 2) + Math.sin(time * 0.001 + orb.phase) * 5,
              z: Math.sin(orb.angle) * 60,
              overwrite: 'auto'
            });
          });
        }

        /* GROW — analytics cards fan dynamically based on cursor + rock offset */
        if (idx === 3) {
          const spreadMultiplier = 1 + Math.abs(rx) * 0.35;
          const c0 = growCardRefs.current[0];
          const c1 = growCardRefs.current[1];
          const c2 = growCardRefs.current[2];

          const rock0X = Math.sin(time * 0.001) * 2;
          const rock0Y = Math.cos(time * 0.001) * 2;
          const rock1X = Math.sin(time * 0.0012) * 2.5;
          const rock1Y = Math.cos(time * 0.0012) * 2.5;
          const rock2X = Math.sin(time * 0.0014) * 3;
          const rock2Y = Math.cos(time * 0.0014) * 3;

          if (c0 && q.growRY0 && q.growRX0) {
            q.growRY0(rx * 11 * 1.0 + rock0Y);
            q.growRX0(-ry * 8 * 1.0 + rock0X);
            gsap.set(c0, { x: -110 * spreadMultiplier, y: 35 + ry * 25, z: 20, rotation: -19 - rx * 7 });
          }
          if (c1 && q.growRY1 && q.growRX1) {
            q.growRY1(rx * 11 * 1.45 + rock1Y);
            q.growRX1(-ry * 8 * 1.45 + rock1X);
            gsap.set(c1, { x: rx * 20, y: -18 + ry * 20, z: 65, rotation: rx * 4 });
          }
          if (c2 && q.growRY2 && q.growRX2) {
            q.growRY2(rx * 11 * 1.9 + rock2Y);
            q.growRX2(-ry * 8 * 1.9 + rock2X);
            gsap.set(c2, { x: 110 * spreadMultiplier, y: 35 + ry * 25, z: 40, rotation: 19 - rx * 7 });
          }

          // Update GROW spotlights on each card
          growSpotlightRefs.current.forEach((spot, cardIdx) => {
            if (spot) {
              spot.style.background = `radial-gradient(circle 140px at ${(rx + 1) * 50}% ${(ry + 1) * 50}%, rgba(255, 184, 0, 0.12), transparent)`;
            }
          });

          /* Dynamic deck perspective shift */
          if (deckRef.current) {
            deckRef.current.style.perspective = `${1400 - ry * 350}px`;
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    /* ── 8. Mouse tracking (cached rect — no layout thrashing) ── */
    let lastX = 0, lastY = 0, lastTime = 0;
    const onResize = () => { sectionRectRef.current = section.getBoundingClientRect(); };
    window.addEventListener('resize', onResize, { passive: true });
    const onMove = (e) => {
      if (!isVisibleRef.current) return; /* skip when off-screen */
      const rect = sectionRectRef.current || section.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      const now = performance.now();
      const dt = now - lastTime;
      const dx = clientX - lastX;
      const dy = clientY - lastY;
      const distSq = dx * dx + dy * dy;
      const v = dt > 0 ? Math.sqrt(distSq) / dt : 0;

      mouseRef.current = {
        x:  clientX,
        y:  clientY,
        rx: (clientX / rect.width)  * 2 - 1,
        ry: (clientY / rect.height) * 2 - 1,
        velocity: Math.min((mouseRef.current.velocity || 0) * 0.7 + v * 0.3, 10)
      };

      lastX = clientX;
      lastY = clientY;
      lastTime = now;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    /* ── 9. Keyboard navigation (ARIA) ── */
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        const nextIdx = Math.min(activeRef.current + 1, 3);
        const triggerInstance = ScrollTrigger.getById('services-pin');
        if (triggerInstance) {
          const start = triggerInstance.start;
          const end = triggerInstance.end;
          const targetScroll = start + (nextIdx / 4) * (end - start);
          window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        } else {
          switchTo(nextIdx);
        }
      }
      if (e.key === 'ArrowUp'  || e.key === 'ArrowLeft') {
        const prevIdx = Math.max(activeRef.current - 1, 0);
        const triggerInstance = ScrollTrigger.getById('services-pin');
        if (triggerInstance) {
          const start = triggerInstance.start;
          const end = triggerInstance.end;
          const targetScroll = start + (prevIdx / 4) * (end - start);
          window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        } else {
          switchTo(prevIdx);
        }
      }
    };
    section.addEventListener('keydown', onKey);

    /* ── 10. Touch/swipe navigation ── */
    let touchX = 0;
    const onTS = (e) => { touchX = e.touches[0].clientX; };
    const onTE = (e) => {
      const dx = touchX - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 55) {
        if (dx > 0) {
          const nextIdx = Math.min(activeRef.current + 1, 3);
          const triggerInstance = ScrollTrigger.getById('services-pin');
          if (triggerInstance) {
            const start = triggerInstance.start;
            const end = triggerInstance.end;
            const targetScroll = start + (nextIdx / 4) * (end - start);
            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
          } else {
            switchTo(nextIdx);
          }
        } else {
          const prevIdx = Math.max(activeRef.current - 1, 0);
          const triggerInstance = ScrollTrigger.getById('services-pin');
          if (triggerInstance) {
            const start = triggerInstance.start;
            const end = triggerInstance.end;
            const targetScroll = start + (prevIdx / 4) * (end - start);
            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
          } else {
            switchTo(prevIdx);
          }
        }
      }
    };
    section.addEventListener('touchstart', onTS, { passive: true });
    section.addEventListener('touchend',   onTE, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      visibilityObserver.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      section.removeEventListener('keydown', onKey);
      section.removeEventListener('touchstart', onTS);
      section.removeEventListener('touchend', onTE);
      
      mm.revert();

      ScrollTrigger.getAll().forEach(t => {
        if (t.vars && t.vars.trigger === section) t.kill();
      });
      idleAnims.current.forEach(a => a && a.kill && a.kill());
      growAnims.current.forEach(a => a && a.kill && a.kill());
      masterTL.kill();
    };
  }, []);

  /* ════════════════════════════════════════════════════
     GROW LIVE ANIMATIONS
  ════════════════════════════════════════════════════ */
  const startGrowAnimations = () => {
    /* Revenue counter — animates 0→128,450 then loops */
    const rv = { v: 0 };
    growAnims.current.push(gsap.to(rv, {
      v: 128450, duration: 3.5, ease: 'power2.out', repeat: -1, repeatDelay: 2,
      onRepeat: () => { rv.v = 0; },
      onUpdate: () => { if (revCounterRef.current) revCounterRef.current.textContent = '$' + Math.round(rv.v).toLocaleString(); },
    }));
    const cv = { v: 0 };
    growAnims.current.push(gsap.to(cv, {
      v: 148.6, duration: 2.8, ease: 'power2.out', repeat: -1, repeatDelay: 2, delay: 0.3,
      onRepeat: () => { cv.v = 0; },
      onUpdate: () => { if (convCounterRef.current) convCounterRef.current.textContent = '+' + cv.v.toFixed(1) + '%'; },
    }));
    const uv = { v: 0 };
    growAnims.current.push(gsap.to(uv, {
      v: 32482, duration: 3.0, ease: 'power2.out', repeat: -1, repeatDelay: 2, delay: 0.5,
      onRepeat: () => { uv.v = 0; },
      onUpdate: () => { if (userCounterRef.current) userCounterRef.current.textContent = Math.round(uv.v).toLocaleString(); },
    }));
    /* SVG chart draw-on via strokeDashoffset */
    const tryChart = () => {
      if (chartPathRef.current) {
        try {
          const len = chartPathRef.current.getTotalLength();
          gsap.set(chartPathRef.current, { strokeDasharray: len, strokeDashoffset: len });
          growAnims.current.push(gsap.to(chartPathRef.current, {
            strokeDashoffset: 0, duration: 2.8, ease: 'power2.inOut', repeat: -1, repeatDelay: 1.5,
            onRepeat: () => gsap.set(chartPathRef.current, { strokeDashoffset: len }),
          }));
        } catch (e) {}
      }
      if (chartPath2Ref.current) {
        try {
          const len2 = chartPath2Ref.current.getTotalLength();
          gsap.set(chartPath2Ref.current, { strokeDasharray: len2, strokeDashoffset: len2 });
          growAnims.current.push(gsap.to(chartPath2Ref.current, {
            strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut', repeat: -1, repeatDelay: 1.5, delay: 0.4,
            onRepeat: () => gsap.set(chartPath2Ref.current, { strokeDashoffset: len2 }),
          }));
        } catch (e) {}
      }
    };
    setTimeout(tryChart, 300);
  };

  /* ════════════════════════════════════════════════════
     MASTER CHAPTER SWITCH TIMELINE
  ════════════════════════════════════════════════════ */
  const switchTo = (idx) => {
    if (idx === activeRef.current) return;
    const prev = activeRef.current;
    activeRef.current = idx;
    const ch = CHAPTERS[idx];
    const isDark = ch.isDark;

    if (activeTL.current) {
      activeTL.current.kill();
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
    });
    activeTL.current = tl;

    const duration = 0.85;

    /* Step 1 — Cinematic 3D Flight & Crossfade Exit for all inactive visuals */
    chapRefs.current.forEach((chap, i) => {
      if (i !== idx && chap) {
        if (i === prev) {
          tl.to(chap, {
            autoAlpha: 0,
            scale: 0.82,
            z: -250,
            rotationY: idx > prev ? -12 : 12,
            rotationX: 6,
            y: idx > prev ? -30 : 30,
            duration: duration,
            ease: 'power3.inOut'
          }, 0);
        } else {
          tl.to(chap, {
            autoAlpha: 0,
            duration: 0.2,
            ease: 'power2.in'
          }, 0);
        }
      }
    });

    /* Step 2 — Ambient light + background morph */
    if (bgRef.current) tl.to(bgRef.current,  { background: `linear-gradient(160deg,${ch.bgFrom},${ch.bgTo})`, duration: duration, ease: 'power3.inOut' }, 0);
    if (ambRef.current) tl.to(ambRef.current, { background: `radial-gradient(circle,${ch.ambient} 0%,transparent 68%)`, duration: duration }, 0);

    /* Step 3 — Halo tint morphs per chapter (unique lighting) */
    if (haloRef.current) tl.to(haloRef.current, {
      background: `radial-gradient(circle,${ch.halo} 0%,transparent 70%)`,
      duration: duration,
    }, 0);

    /* Step 4 — BRAND fog bloom on/off */
    if (idx === 2 && bFogRef.current)  tl.to(bFogRef.current, { opacity: 0.55, duration: duration }, 0.2);
    if (prev === 2 && bFogRef.current) tl.to(bFogRef.current, { opacity: 0,    duration: 0.35, ease: 'power2.in' }, 0);

    /* Step 5 — Camera shift per chapter */
    if (cameraRef.current) {
      tl.to(cameraRef.current, { x: ch.camX, scale: ch.camScale, duration: duration }, 0.12);
      tl.to(cameraRef.current, { x: 0, scale: 1, duration: 0.65, ease: 'power2.out' }, 0.82);
    }

    /* Step 6 — Text color adaptation */
    const descColor = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.32)';

    nodeRefs.current.forEach((n, i) => {
      if (!n) return;
      const isAct = i === idx, isDone = i < idx;
      
      n.classList.toggle('svc-node-active', isAct);

      tl.to(n, {
        backgroundColor: (isAct || isDone) ? '#FF2A54' : (isDark ? '#1C1A24' : '#fff'),
        borderColor:     (isAct || isDone) ? '#FF2A54' : (isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.18)'),
        boxShadow: isAct  ? '0 0 0 5px rgba(255,42,84,0.18),0 0 18px rgba(255,42,84,0.32)' :
                   isDone ? '0 0 0 3px rgba(255,42,84,0.12)' : 'none',
        duration: 0.32,
      }, 0.08);
    });

    pulseRefs.current.forEach((p, i) => p && gsap.set(p, { scale: 1, opacity: i === idx ? 0.55 : 0 }));

    titleRefs.current.forEach((el, i) => {
      if (!el) return;
      const isAct = i === idx;
      const strokeColor = isDark ? '1px rgba(255,255,255,0.25)' : '1px rgba(0,0,0,0.22)';
      const fontColor = isAct ? (isDark ? '#FFFFFF' : '#0A0A10') : 'transparent';
      
      tl.to(el, {
        color: fontColor,
        webkitTextStroke: isAct ? '0px transparent' : strokeColor,
        duration: 0.38
      }, 0.06);
    });

    rowRefs.current.forEach((r, i) => {
      if (!r) return;
      tl.to(r, {
        paddingLeft: i === idx ? 15 : 0,
        duration: 0.55,
        ease: 'power3.inOut'
      }, 0.05);
    });

    /* Step 7 — Inactive title characters stay visible (reset position only) */
    const prevTitle = titleRefs.current[prev];
    if (prevTitle) {
      const prevChars = prevTitle.querySelectorAll('.svc-char');
      if (prevChars.length) {
        tl.to(prevChars, { x: 0, y: 0, textShadow: 'none', duration: 0.38 }, 0);
      }
    }

    /* Step 8 — New scene flies in from foreground with crossfade */
    if (chapRefs.current[idx]) {
      tl.fromTo(chapRefs.current[idx],
        {
          autoAlpha: 0,
          scale: 1.15,
          z: 250,
          rotationY: idx > prev ? 12 : -12,
          rotationX: -6,
          y: idx > prev ? 30 : -30
        },
        {
          autoAlpha: 1,
          scale: 1,
          z: 0,
          rotationY: 0,
          rotationX: 0,
          y: 0,
          duration: duration,
          ease: 'power3.out'
        },
        0.05
      );
    }

    /* Step 9 — Active title characters reset position ready for cursor tick */

    /* Step 10 — BRAND: elements rise in + particles appear */
    if (idx === 2) {
      const brandEls = [macRef, bCard1Ref, bCard2Ref, bLogoRef, bLetterRef, bGuideRef].map(r => r.current).filter(Boolean);
      tl.fromTo(brandEls, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.72, stagger: 0.08, ease: 'power3.out' }, 0.30);
      tl.fromTo(brandPRefs.current.filter(Boolean), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.035, ease: 'back.out(1.5)' }, 0.48);
    }
    if (prev === 2) {
      tl.to(brandPRefs.current.filter(Boolean), { opacity: 0, scale: 0.5, duration: 0.28, ease: 'power2.in' }, 0);
    }

    /* Step 11 — GROW: fan cards out initially */
    if (idx === 3 && deckRef.current) {
      const cards = growCardRefs.current.filter(Boolean);
      tl.set(cards, { x: 0, y: 0, rotation: 0 }, 0.23);
      if (cards[0]) tl.fromTo(cards[0], { x: 0, y: 0, rotation: 0 }, { x: -110, y: 35, rotation: -19, duration: 0.95, ease: 'back.out(1.5)' }, 0.33);
      if (cards[1]) tl.fromTo(cards[1], { x: 0, y: 0, rotation: 0 }, { x: 0,    y:-18, rotation:   0, duration: 0.95, ease: 'back.out(1.5)' }, 0.37);
      if (cards[2]) tl.fromTo(cards[2], { x: 0, y: 0, rotation: 0 }, { x: 110,  y: 35, rotation:  19, duration: 0.95, ease: 'back.out(1.5)' }, 0.41);
    }
    if (prev === 3) {
      tl.to(growCardRefs.current.filter(Boolean), { x: 0, y: 0, rotation: 0, duration: 0.28, ease: 'power3.in' }, 0);
    }
  };

  /* ── Node hover micro-interaction ── */
  const onNodeEnter = (idx) => {
    const node = nodeRefs.current[idx];
    if (node && idx !== activeRef.current) gsap.to(node, { scale: 1.22, duration: 0.22, ease: 'back.out(2)' });
    
    // Only switch immediately on hover if scroll-pinning is NOT active
    const triggerInstance = ScrollTrigger.getById('services-pin');
    if (!triggerInstance) {
      switchTo(idx);
    }
  };
  const onNodeLeave = (idx) => {
    const node = nodeRefs.current[idx];
    if (node) gsap.to(node, { scale: 1, duration: 0.18, ease: 'power2.out' });
  };

  const handleChapterSelect = (idx) => {
    const triggerInstance = ScrollTrigger.getById('services-pin');
    if (triggerInstance) {
      const start = triggerInstance.start;
      const end = triggerInstance.end;
      const targetScroll = start + (idx / 4) * (end - start);
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    } else {
      switchTo(idx);
    }
  };

  /* ════════════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════════════ */
  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Our Services — Build, Launch, Brand, Grow"
      style={{
        position: 'relative', height: '100vh', minHeight: '100vh', width: '100%',
        display: 'flex', justifyContent: 'center',
        padding: '100px 4rem 20px', overflow: 'hidden', visibility: 'hidden',
        transform: 'translate3d(0,0,0)', /* GPU layer */
        background: 'linear-gradient(160deg, #F3F6FA, #F7F9FC)',
      }}
    >
      {/* ══════════════════════════════════════════════
          BG SYSTEM — 9 independent layers, all alive
      ══════════════════════════════════════════════ */}

      {/* L1: Colour gradient */}
      <div ref={bgRef} style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(160deg,#F3F6FA,#F7F9FC)', transition: 'background 0.8s ease' }} />

      {/* L2: SVG fractal noise (very subtle + animated) */}
      <div ref={noiseRef} style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.02, mixBlendMode: 'overlay',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '180px 180px',
        animation: 'noisePlay 0.6s steps(10) infinite',
      }} />

      {/* L3: Animated mesh (slow drift) */}
      <div ref={meshRef} style={{
        position: 'absolute', inset: -90, zIndex: 1, pointerEvents: 'none', opacity: 0,
        background: 'radial-gradient(circle at 80% 10%,rgba(0,229,255,0.13) 0%,transparent 40%),radial-gradient(circle at 12% 88%,rgba(255,184,0,0.09) 0%,transparent 40%),radial-gradient(circle at 50% 50%,rgba(112,0,255,0.04) 0%,transparent 55%)',
        willChange: 'transform',
      }} />

      {/* L4: Ambient radial light (colour-shifts per chapter) */}
      <div ref={ambRef} style={{
        position: 'absolute', top: '5%', left: '5%', width: 720, height: 720,
        borderRadius: '50%', zIndex: 1, pointerEvents: 'none', opacity: 0,
        background: 'radial-gradient(circle,rgba(72,144,255,0.12) 0%,transparent 68%)',
        filter: 'blur(60px)', willChange: 'transform',
      }} />

      {/* L5: Volumetric glow (pulsing extra drifting light) */}
      <div style={{
        position: 'absolute', inset: -150, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(circle at 35% 45%, rgba(255,255,255,0.3) 0%, transparent 60%), radial-gradient(circle at 75% 55%, rgba(255,255,255,0.25) 0%, transparent 60%)',
        mixBlendMode: 'overlay',
        opacity: 0.45,
        animation: 'svcVolumetric 24s ease-in-out infinite alternate',
      }} />

      {/* L6: Subtle Light Rays (God Rays) */}
      <div ref={raysRef} style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        opacity: 0.025, mixBlendMode: 'color-dodge',
        background: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 60px, transparent 60px, transparent 120px)',
        maskImage: 'radial-gradient(circle at 10% 10%, black 15%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(circle at 10% 10%, black 15%, transparent 70%)',
        willChange: 'transform',
        animation: 'svcRays 32s ease-in-out infinite alternate',
      }} />

      {/* L7: Depth fog */}
      <div ref={fogRef} style={{
        position: 'absolute', inset: -90, zIndex: 1, pointerEvents: 'none', opacity: 0,
        background: 'radial-gradient(ellipse at 50% 50%,rgba(255,255,255,0.92) 0%,transparent 60%)',
        filter: 'blur(35px)', willChange: 'transform',
      }} />

      {/* L8: Depth haze overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0) 40%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.25) 100%)',
        mixBlendMode: 'overlay',
        opacity: 0.8,
      }} />

      {/* L9: Canvas Particle System (Faint atmospheric particles) */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', opacity: 0.85 }} />

      {/* L10: Cursor halo (tint changes per chapter) */}
      <div ref={haloRef} style={{
        position: 'absolute', top: 0, left: 0, width: 240, height: 240,
        borderRadius: '50%', zIndex: 3, pointerEvents: 'none', opacity: 0,
        background: 'radial-gradient(circle,rgba(72,144,255,0.18) 0%,transparent 70%)',
        filter: 'blur(30px)', willChange: 'transform',
      }} />

      {/* ══════════════════════════════════════════════
          CONTENT
      ══════════════════════════════════════════════ */}
      <div className="services-desktop-view" style={{
        position: 'relative', zIndex: 10, display: 'flex', width: '100%', maxWidth: 1520,
        height: 'calc(100vh - 100px)', minHeight: 460, alignItems: 'flex-start', gap: '6rem',
      }}>

        {/* ════════════════════════════════════
            LEFT — CINEMATIC STORY TIMELINE
        ════════════════════════════════════ */}
        <div
          ref={timelineColRef}
          role="navigation"
          aria-label="Service chapters"
          style={{
            flex: '0 0 50%',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'flex-start',
            gap: '2.2rem',
            position: 'relative'
          }}
        >
          {/* Section Header */}
          <div className="svc-header" style={{ marginBottom: '2rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: '#FF2A54',
              marginBottom: '0.6rem',
            }}>
              <span style={{ width: 28, height: 2, background: '#FF2A54', borderRadius: 2, display: 'inline-block' }} />
              What We Do
            </span>
            <h2 className="svc-section-title" style={{
              fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
              fontWeight: 900,
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#0A0A10',
              margin: 0,
            }}>
              Our Services
            </h2>
          </div>

          {CHAPTERS.map((ch, idx) => (
            <div
              key={idx}
              ref={el => rowRefs.current[idx] = el}
              role="button"
              tabIndex={0}
              aria-label={`${ch.step} ${ch.label} — ${ch.title}`}
              onFocus={() => handleChapterSelect(idx)}
              onClick={() => handleChapterSelect(idx)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleChapterSelect(idx); } }}
              style={{ position: 'relative', cursor: 'pointer', zIndex: 2, paddingLeft: 0, willChange: 'padding-left', outline: 'none' }}
            >
              <h2
                ref={el => titleRefs.current[idx] = el}
                className="svc-title"
                style={{
                  display: 'inline-block',
                  margin: 0,
                  fontSize: 'clamp(2rem, 3.2vw, 3.2vw)',
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  letterSpacing: '0.01em',
                  lineHeight: 1.05,
                  color: idx === 0 ? '#0A0A10' : 'transparent',
                  WebkitTextStroke: idx === 0 ? '0px transparent' : '1px rgba(0,0,0,0.22)',
                  willChange: 'transform, color, -webkit-text-stroke'
                }}
              >
                <SplitText text={ch.title} />
              </h2>
            </div>
          ))}
        </div>

        {/* ════════════════════════════════════
            RIGHT — CAMERA WRAPPER
        ════════════════════════════════════ */}
        <div ref={cameraRef} style={{ flex: 1, height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', willChange: 'transform' }}>

          {/* ──────────────────────────────────
              CH 01: BUILD — Glass Browser
          ────────────────────────────────── */}
          <div ref={el => chapRefs.current[0] = el} aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: 1600, transformStyle: 'preserve-3d' }}>
            {/* Dynamic Backlight Ambient Glow */}
            <div style={{
              position: 'absolute',
              width: 500,
              height: 340,
              background: 'radial-gradient(circle, rgba(0, 229, 255, 0.22) 0%, rgba(72, 144, 255, 0.08) 50%, transparent 70%)',
              filter: 'blur(55px)',
              pointerEvents: 'none',
              zIndex: 0,
              transform: 'translateZ(-120px)',
              animation: 'svcBacklightBreathe 6s ease-in-out infinite alternate'
            }} />

            {/* Code particles/tech stream flying upwards */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  left: `${15 + i * 16}%`,
                  bottom: '-20px',
                  width: '2px',
                  height: `${30 + (i % 3) * 20}px`,
                  background: `linear-gradient(to top, transparent, ${i % 2 === 0 ? '#00E5FF' : '#7000FF'})`,
                  opacity: 0.3,
                  animation: `svcTechStream ${4 + (i % 2) * 2}s linear infinite`,
                  animationDelay: `${i * 0.7}s`
                }} />
              ))}
            </div>

            {/* Engineering particles (tiny squares + dots) */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
              {[
                { top: '18%', left: '4%',  w: 8, c: 'rgba(72,144,255,0.5)',  d: 3.2 },
                { top: '65%', left: '5%',  w: 5, c: 'rgba(72,144,255,0.4)',  d: 4.1 },
                { top: '30%', left: '92%', w: 6, c: 'rgba(112,0,255,0.3)',   d: 3.7 },
                { top: '75%', left: '90%', w: 9, c: 'rgba(0,229,255,0.35)', d: 2.9 },
                { top: '50%', left: '2%',  w: 4, c: 'rgba(255,42,84,0.3)',   d: 5.0 },
                { top: '42%', left: '94%', w: 5, c: 'rgba(72,144,255,0.25)', d: 4.4 },
                { top: '12%', left: '60%', w: 3, c: 'rgba(0,229,255,0.2)',   d: 5.8 },
              ].map((p, i) => (
                <div key={i} style={{ position: 'absolute', top: p.top, left: p.left, width: p.w, height: p.w, borderRadius: 2, background: p.c, filter: 'blur(1px)', animation: `svcB${i} ${p.d}s ease-in-out infinite alternate` }} />
              ))}
            </div>

            {/* Reactive depth shadow */}
            <div ref={buildShdwRef} style={{ position: 'absolute', width: 440, height: 30, bottom: '13%', left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(ellipse,rgba(0,0,0,0.18) 0%,transparent 70%)', filter: 'blur(28px)', zIndex: 0, pointerEvents: 'none', willChange: 'transform' }} />

            {/* Glass browser */}
            <div ref={buildFrameRef} style={{ position: 'relative', zIndex: 2, width: 440, height: 295, borderRadius: 22, background: 'rgba(255,255,255,0.22)', border: '1.5px solid rgba(255,255,255,0.62)', backdropFilter: 'blur(28px)', boxShadow: '0 38px 82px rgba(0,0,0,0.13),inset 0 1px 0 rgba(255,255,255,0.68)', overflow: 'hidden', willChange: 'transform', transformStyle: 'preserve-3d' }}>
              {/* Constant Glare Sweep */}
              <div style={{ position: 'absolute', inset: 0, zIndex: 12, pointerEvents: 'none', background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.1) 48%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 52%, transparent 70%)', backgroundSize: '300% 100%', backgroundPosition: '0% 0%', mixBlendMode: 'overlay', animation: 'svcGlareSweep 8s linear infinite' }} />
              {/* Moving glass glare */}
              <div ref={buildGlareRef} style={{ position: 'absolute', inset: -80, zIndex: 12, pointerEvents: 'none', willChange: 'transform', background: 'linear-gradient(135deg,rgba(255,255,255,0.40) 0%,rgba(255,255,255,0) 48%,rgba(255,255,255,0.08) 100%)' }} />
              {/* Interactive Spotlight Overlay */}
              <div ref={buildSpotlightRef} style={{ position: 'absolute', inset: 0, zIndex: 13, pointerEvents: 'none', mixBlendMode: 'screen', willChange: 'background' }} />
              {/* Glowing border sweep */}
              <svg style={{ position: 'absolute', inset: -1.5, width: 'calc(100% + 3px)', height: 'calc(100% + 3px)', pointerEvents: 'none', zIndex: 12 }}>
                <rect x="0.75" y="0.75" width="calc(100% - 1.5px)" height="calc(100% - 1.5px)" rx="22" fill="none" stroke="url(#buildBorderGrad)" strokeWidth="2" strokeDasharray="140 400" strokeDashoffset="0" style={{ animation: 'svcBorderSweep 6s linear infinite' }} />
                <defs>
                  <linearGradient id="buildBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="50%" stopColor="#7000FF" />
                    <stop offset="100%" stopColor="#00E5FF" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Chromatic edge */}
              <div style={{ position: 'absolute', inset: 0, borderRadius: 22, zIndex: 11, pointerEvents: 'none', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.55),inset 0 1px 0 rgba(255,255,255,0.8)' }} />
              {/* Window chrome */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '13px 18px', background: 'rgba(255,255,255,0.46)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                {['#FF5F57', '#FFBD2E', '#28C840'].map((c, i) => (<span key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c, display: 'block' }} />))}
                <div style={{ flex: 1, height: 22, borderRadius: 7, background: 'rgba(0,0,0,0.06)', margin: '0 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.57rem', color: 'rgba(0,0,0,0.4)', letterSpacing: '0.06em' }}>nuvarox.com/dashboard</span>
                </div>
              </div>
              <div style={{ height: 'calc(100% - 42px)', overflow: 'hidden' }}>
                <BrowserUI />
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────
              CH 02: LAUNCH — Phone + Kinetic Marquee
          ────────────────────────────────── */}
          <div ref={el => chapRefs.current[1] = el} aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: 1500, transformStyle: 'preserve-3d' }}>
            {/* Dynamic Backlight Ambient Glow */}
            <div style={{
              position: 'absolute',
              width: 320,
              height: 520,
              background: 'radial-gradient(circle, rgba(112, 0, 255, 0.25) 0%, rgba(255, 42, 84, 0.15) 50%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
              zIndex: 1,
              transform: 'translateZ(-130px)',
              animation: 'svcBacklightBreathe 7s ease-in-out infinite alternate-reverse'
            }} />

            {/* Dual-row OUTLINE marquee (behind phone) */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', transform: 'rotate(-8deg) scale(1.22)', overflow: 'hidden' }}>
              <div ref={marqOutRef} style={{ display: 'flex', whiteSpace: 'nowrap', willChange: 'transform' }}>
                {[...Array(5)].map((_, i) => (<span key={i} style={{ fontSize: '5.8rem', fontWeight: 900, color: 'transparent', WebkitTextStroke: '2px rgba(112, 0, 255, 0.5)', fontFamily: 'var(--font-display)', flexShrink: 0, paddingRight: '2rem' }}>{MARQ_STR}</span>))}
              </div>
              <div ref={marqOut2Ref} style={{ display: 'flex', whiteSpace: 'nowrap', willChange: 'transform', opacity: 0.8 }}>
                {[...Array(5)].map((_, i) => (<span key={i} style={{ fontSize: '5.8rem', fontWeight: 900, color: 'transparent', WebkitTextStroke: '2px rgba(112, 0, 255, 0.4)', fontFamily: 'var(--font-display)', flexShrink: 0, paddingRight: '2rem' }}>{MARQ_STR}</span>))}
              </div>
            </div>
            {/* Reactive shadow */}
            <div ref={phoneShdwRef} style={{ position: 'absolute', width: 190, height: 22, bottom: '11%', left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(ellipse,rgba(0,0,0,0.20) 0%,transparent 70%)', filter: 'blur(20px)', zIndex: 1, pointerEvents: 'none', willChange: 'transform' }} />
            {/* Phone */}
            <div ref={phoneRef} style={{ position: 'relative', width: 230, height: 448, borderRadius: 44, border: '9px solid #0A0A10', background: '#0A0A10', zIndex: 5, overflow: 'hidden', boxShadow: '0 42px 84px rgba(0,0,0,0.30),0 0 0 1px rgba(255,255,255,0.08)', willChange: 'transform', transformStyle: 'preserve-3d' }}>
              <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                <PhoneScreen />
                {/* SOLID marquee inside phone (crimson + violet) */}
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 2 }}>
                  <div style={{ position: 'absolute', top: '55%', left: '-120px', transform: 'rotate(-8deg) scale(1.22)' }}>
                    <div ref={marqInRef} style={{ display: 'flex', whiteSpace: 'nowrap', willChange: 'transform' }}>
                      {[...Array(5)].map((_, i) => (<span key={i} style={{ fontSize: '5.8rem', fontWeight: 900, color: '#FF2A54', fontFamily: 'var(--font-display)', flexShrink: 0, paddingRight: '2rem', textShadow: '0 0 28px rgba(255,42,84,0.55)' }}>{MARQ_STR}</span>))}
                    </div>
                    <div ref={marqIn2Ref} style={{ display: 'flex', whiteSpace: 'nowrap', willChange: 'transform', opacity: 0.5 }}>
                      {[...Array(5)].map((_, i) => (<span key={i} style={{ fontSize: '5.8rem', fontWeight: 900, color: '#7000FF', fontFamily: 'var(--font-display)', flexShrink: 0, paddingRight: '2rem' }}>{MARQ_STR}</span>))}
                    </div>
                  </div>
                </div>
                {/* Interactive Spotlight Overlay */}
                <div ref={phoneSpotlightRef} style={{ position: 'absolute', inset: 0, zIndex: 13, pointerEvents: 'none', mixBlendMode: 'screen', willChange: 'background' }} />
                <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', background: 'linear-gradient(to bottom,rgba(10,10,16,0.42) 0%,transparent 28%,transparent 66%,rgba(10,10,16,0.52) 100%)' }} />
              </div>
              {/* Phone Glowing Border Sweep */}
              <svg style={{ position: 'absolute', inset: -9, width: 'calc(100% + 18px)', height: 'calc(100% + 18px)', pointerEvents: 'none', zIndex: 12 }}>
                <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="44" fill="none" stroke="url(#phoneBorderGrad)" strokeWidth="2" strokeDasharray="180 500" strokeDashoffset="0" style={{ animation: 'svcBorderSweep 7s linear infinite' }} />
                <defs>
                  <linearGradient id="phoneBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF2A54" />
                    <stop offset="50%" stopColor="#7000FF" />
                    <stop offset="100%" stopColor="#FF2A54" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Constant Glare Sweep */}
              <div style={{ position: 'absolute', inset: 0, zIndex: 14, pointerEvents: 'none', background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 48%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.06) 52%, transparent 60%)', backgroundSize: '250% 100%', mixBlendMode: 'overlay', animation: 'svcGlareSweep 9s linear infinite' }} />
              {/* Moving glass glare */}
              <div ref={phoneGlareRef} style={{ position: 'absolute', inset: -60, zIndex: 15, pointerEvents: 'none', willChange: 'transform', background: 'linear-gradient(135deg,rgba(255,255,255,0.14) 0%,rgba(255,255,255,0) 50%)' }} />
              {/* Notch */}
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 90, height: 26, background: '#0A0A10', borderRadius: '0 0 16px 16px', zIndex: 20 }} />
            </div>
            <div style={{ position: 'absolute', bottom: '6%', fontSize: '0.63rem', color: 'rgba(0,0,0,0.36)', letterSpacing: '0.24em', fontFamily: 'var(--font-body)', textTransform: 'uppercase', zIndex: 8 }}>
              [ Move mouse to control speed + direction ]
            </div>
          </div>

          {/* ──────────────────────────────────
              CH 03: BRAND — Luxury Studio
          ────────────────────────────────── */}
          <div ref={el => chapRefs.current[2] = el} aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: 1800, transformStyle: 'preserve-3d', overflow: 'visible' }}>

            {/* Purple fog bloom — cursor moves light source */}
            <div ref={bFogRef} className="svc-brand-glow" style={{ position: 'absolute', width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle,rgba(112,0,255,0.13) 0%,rgba(200,140,255,0.06) 45%,transparent 70%)', filter: 'blur(80px)', opacity: 0, pointerEvents: 'none', zIndex: 0, willChange: 'transform, opacity' }} />

            {/* Spinning rings — background depth */}
            <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', border: '1px dashed rgba(112,0,255,0.12)', animation: 'svcSpin 55s linear infinite', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', width: 360, height: 360, borderRadius: '50%', border: '1px dashed rgba(255,42,84,0.08)', animation: 'svcSpinR 38s linear infinite', pointerEvents: 'none', zIndex: 0 }} />

            {/* MacBook — deepest layer */}
            <div ref={macRef} style={{ position: 'absolute', willChange: 'transform', transformStyle: 'preserve-3d', zIndex: 1, transform: 'translateX(-20px) translateY(30px) translateZ(-40px) rotate(-4deg)' }}>
              <div style={{ width: 320, height: 205, borderRadius: '10px 10px 4px 4px', background: 'linear-gradient(180deg,#C8C9CA,#B8B9BA)', padding: '10px 10px 0', boxShadow: '0 28px 55px rgba(0,0,0,0.22)' }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '5px 5px 0 0', background: '#0A0A10', overflow: 'hidden', position: 'relative' }}>
                  {/* Constant Glare Sweep */}
                  <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 48%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.05) 52%, transparent 60%)', backgroundSize: '250% 100%', mixBlendMode: 'overlay', animation: 'svcGlareSweep 10s linear infinite' }} />
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg,#0D0016,#1a0030)', padding: '16px 20px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg,#FF2A54,#7000FF)' }} />
                      <span style={{ fontSize: '0.55rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>NUVAROX — BRAND SYSTEM</span>
                    </div>
                    <div style={{ display: 'flex', gap: 5, marginBottom: 12 }}>
                      {['#FF2A54', '#7000FF', '#00E5FF', '#FFB800', '#0A0A10', '#F5F3EF'].map((c, i) => (<div key={i} style={{ flex: 1, height: 28, borderRadius: 5, background: c, boxShadow: `0 4px 12px ${c}44` }} />))}
                    </div>
                    <div style={{ marginBottom: 10 }}>
                      <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-display)', letterSpacing: '-0.04em', lineHeight: 1 }}>Aa</div>
                      <div style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', marginTop: 2 }}>SPACE GROTESK — PRIMARY TYPEFACE</div>
                    </div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginTop: 'auto' }}>
                      <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,#FF2A54,#7000FF)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-display)' }}>N</span>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.48rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>BRAND IDENTITY</div>
                        <div style={{ fontSize: '0.55rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-display)' }}>GUIDELINES v2.4</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(255,255,255,0.08) 0%,transparent 50%)', pointerEvents: 'none' }} />
                </div>
              </div>
              <div style={{ width: 350, height: 10, background: 'linear-gradient(180deg,#B8B9BA,#A8A9AA)', borderRadius: '0 0 8px 8px', marginLeft: -15 }} />
              <div style={{ width: 180, height: 4, background: '#9A9B9C', borderRadius: '0 0 4px 4px', margin: '0 auto' }} />
            </div>

            {/* Business Card 1 — dark, foreground left */}
            <div ref={bCard1Ref} style={{ position: 'absolute', width: 200, height: 115, borderRadius: 12, background: 'linear-gradient(135deg,#0A0A10,#1a0830)', border: '1px solid rgba(112,0,255,0.25)', boxShadow: '0 28px 55px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.06)', padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transform: 'translateX(-195px) translateY(-40px) translateZ(80px) rotate(-8deg)', willChange: 'transform', transformStyle: 'preserve-3d', zIndex: 4 }}>
              {/* Metallic Foil Overlay */}
              <div ref={bCard1FoilRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, opacity: 0.25, mixBlendMode: 'screen', borderRadius: 'inherit', background: 'linear-gradient(135deg, transparent 30%, #7000FF 45%, #FF2A54 50%, #00E5FF 55%, transparent 70%)', backgroundSize: '250% 250%', willChange: 'background-position' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#FF2A54,#7000FF)' }} />
                <div style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>Alex Morgan</div>
                <div style={{ fontSize: '0.47rem', color: 'rgba(255,255,255,0.44)', letterSpacing: '0.08em', marginTop: 2 }}>CREATIVE DIRECTOR</div>
              </div>
              <GlassLayer />
            </div>

            {/* Business Card 2 — white, mid layer */}
            <div ref={bCard2Ref} style={{ position: 'absolute', width: 200, height: 115, borderRadius: 12, background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 22px 45px rgba(0,0,0,0.14)', padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transform: 'translateX(185px) translateY(30px) translateZ(60px) rotate(7deg)', willChange: 'transform', transformStyle: 'preserve-3d', zIndex: 3 }}>
              {/* Metallic Foil Overlay */}
              <div ref={bCard2FoilRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, opacity: 0.18, mixBlendMode: 'color-dodge', borderRadius: 'inherit', background: 'linear-gradient(135deg, transparent 30%, #7000FF 45%, #FF2A54 50%, #00E5FF 55%, transparent 70%)', backgroundSize: '250% 250%', willChange: 'background-position' }} />
              <div style={{ width: 28, height: 28, borderRadius: '50%', border: '3px solid #0A0A10' }} />
              <div>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#0A0A10', fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>NUVAROX</div>
                <div style={{ fontSize: '0.47rem', color: 'rgba(0,0,0,0.38)', letterSpacing: '0.12em', marginTop: 2 }}>BRAND & IDENTITY STUDIO</div>
              </div>
              <GlassLayer style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.65) 0%,transparent 55%)' }} />
            </div>

            {/* Brand Guideline Booklet */}
            <div ref={bGuideRef} style={{ position: 'absolute', width: 140, height: 180, borderRadius: 10, background: 'linear-gradient(145deg,#0A0A10,#1a0030)', border: '1px solid rgba(112,0,255,0.2)', boxShadow: '0 18px 38px rgba(0,0,0,0.28)', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transform: 'translateX(195px) translateY(-90px) translateZ(20px) rotate(5deg)', willChange: 'transform', transformStyle: 'preserve-3d', zIndex: 2 }}>
              <div>
                <div style={{ fontSize: '0.42rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em', marginBottom: 6, textTransform: 'uppercase' }}>Brand Guide</div>
                <div style={{ width: '100%', height: 1, background: 'rgba(112,0,255,0.3)', marginBottom: 10 }} />
                {['#FF2A54', '#7000FF', '#00E5FF'].map((c, i) => (
                  <div key={i} style={{ display: 'flex', gap: 5, alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, background: c, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.38rem', color: 'rgba(255,255,255,0.4)' }}>{c}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '0.55rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-display)' }}>N</div>
              <GlassLayer />
            </div>

            {/* Letterhead */}
            <div ref={bLetterRef} style={{ position: 'absolute', width: 230, height: 90, borderRadius: 8, background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 12px 28px rgba(0,0,0,0.10)', padding: '14px 18px', transform: 'translateX(-185px) translateY(80px) translateZ(30px) rotate(-3deg)', willChange: 'transform', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 18, height: 18, borderRadius: 5, background: 'linear-gradient(135deg,#FF2A54,#7000FF)' }} />
                <span style={{ fontSize: '0.55rem', fontWeight: 700, color: '#0A0A10', fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}>NUVAROX STUDIO</span>
              </div>
              <div style={{ width: '100%', height: 1, background: 'rgba(0,0,0,0.08)', marginBottom: 8 }} />
              {[70, 58, 44].map((w, i) => (<div key={i} style={{ height: 4, width: `${w}%`, background: 'rgba(0,0,0,0.08)', borderRadius: 2, marginBottom: 4 }} />))}
            </div>

            {/* Glass Acrylic Logo Mark — foreground, fastest reaction */}
            <div ref={bLogoRef} style={{ position: 'absolute', width: 72, height: 72, borderRadius: 20, background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)', boxShadow: '0 16px 40px rgba(112,0,255,0.22),inset 0 1px 0 rgba(255,255,255,0.62)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translateX(0) translateY(-20px) translateZ(150px)', willChange: 'transform', transformStyle: 'preserve-3d', zIndex: 5 }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, background: 'linear-gradient(135deg,#FF2A54,#7000FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'var(--font-display)' }}>N</span>
              {/* Acrylic Border sweep */}
              <svg style={{ position: 'absolute', inset: -1.5, width: 'calc(100% + 3px)', height: 'calc(100% + 3px)', pointerEvents: 'none', zIndex: 12 }}>
                <rect x="0.75" y="0.75" width="calc(100% - 1.5px)" height="calc(100% - 1.5px)" rx="20" fill="none" stroke="url(#logoBorderGrad)" strokeWidth="2" strokeDasharray="60 200" strokeDashoffset="0" style={{ animation: 'svcBorderSweep 5s linear infinite' }} />
                <defs>
                  <linearGradient id="logoBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF2A54" />
                    <stop offset="50%" stopColor="#7000FF" />
                    <stop offset="100%" stopColor="#FF2A54" />
                  </linearGradient>
                </defs>
              </svg>
              <GlassLayer style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.48) 0%,transparent 60%)' }} />
            </div>

            {/* Logo Particles — circles, squares, crosses */}
            {[
              { t: '12%', l: '7%',  s: 10, type: 'circle', c: 'rgba(112,0,255,0.18)' },
              { t: '78%', l: '8%',  s: 7,  type: 'circle', c: 'rgba(255,42,84,0.14)' },
              { t: '20%', l: '88%', s: 8,  type: 'circle', c: 'rgba(112,0,255,0.16)' },
              { t: '82%', l: '85%', s: 6,  type: 'circle', c: 'rgba(200,140,255,0.20)' },
              { t: '40%', l: '5%',  s: 8,  type: 'square', c: 'rgba(112,0,255,0.13)' },
              { t: '62%', l: '90%', s: 6,  type: 'square', c: 'rgba(255,42,84,0.10)' },
              { t: '30%', l: '6%',  s: 5,  type: 'square', c: 'rgba(200,140,255,0.15)' },
              { t: '55%', l: '4%',  s: 10, type: 'cross',  c: 'rgba(112,0,255,0.15)' },
              { t: '25%', l: '91%', s: 8,  type: 'cross',  c: 'rgba(255,42,84,0.13)' },
              { t: '70%', l: '89%', s: 12, type: 'cross',  c: 'rgba(200,140,255,0.17)' },
              { t: '48%', l: '92%', s: 5,  type: 'circle', c: 'rgba(255,184,0,0.22)' },
              { t: '15%', l: '50%', s: 4,  type: 'square', c: 'rgba(112,0,255,0.09)' },
            ].map((p, i) => (
              <div key={i} ref={el => brandPRefs.current[i] = el} style={{ position: 'absolute', top: p.t, left: p.l, zIndex: 3, pointerEvents: 'none', opacity: 0, willChange: 'transform, opacity' }}>
                {p.type === 'circle' && <div style={{ width: p.s, height: p.s, borderRadius: '50%', background: p.c }} />}
                {p.type === 'square' && <div style={{ width: p.s, height: p.s, borderRadius: 2, background: p.c, transform: 'rotate(30deg)' }} />}
                {p.type === 'cross'  && (
                  <div style={{ position: 'relative', width: p.s, height: p.s }}>
                    <div style={{ position: 'absolute', left: '50%', top: 0, width: 1.5, height: p.s, background: p.c, transform: 'translateX(-50%)' }} />
                    <div style={{ position: 'absolute', top: '50%', left: 0, width: p.s, height: 1.5, background: p.c, transform: 'translateY(-50%)' }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ──────────────────────────────────
              CH 04: GROW — Analytics Experience
          ────────────────────────────────── */}
          <div ref={el => chapRefs.current[3] = el} aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: 1400, transformStyle: 'preserve-3d', overflow: 'visible' }}>
            {/* GROW Golden Ambient Backlight */}
            <div style={{
              position: 'absolute',
              width: 480,
              height: 480,
              background: 'radial-gradient(circle, rgba(255, 184, 0, 0.22) 0%, rgba(255, 120, 0, 0.06) 50%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
              zIndex: 0,
              transform: 'translateZ(-110px)',
              animation: 'svcBacklightBreathe 5s ease-in-out infinite alternate'
            }} />

            {/* Golden graph-dot particles */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
              {[
                { t: '15%', l: '8%',  s: 5, op: 0.26, d: 3.2 },
                { t: '72%', l: '7%',  s: 4, op: 0.18, d: 4.1 },
                { t: '20%', l: '88%', s: 6, op: 0.22, d: 3.7 },
                { t: '78%', l: '86%', s: 4, op: 0.16, d: 5.0 },
                { t: '45%', l: '5%',  s: 3, op: 0.13, d: 4.5 },
                { t: '50%', l: '91%', s: 3, op: 0.15, d: 3.9 },
                { t: '35%', l: '93%', s: 5, op: 0.12, d: 5.2 },
                { t: '60%', l: '3%',  s: 4, op: 0.10, d: 4.8 },
              ].map((p, i) => (
                <div key={i} style={{ position: 'absolute', top: p.t, left: p.l, width: p.s, height: p.s, borderRadius: '50%', background: `rgba(255,184,0,${p.op})`, filter: 'blur(1px)', animation: `svcGF${i % 6} ${p.d}s ease-in-out infinite alternate` }} />
              ))}
              {/* Light streaks */}
              <div style={{ position: 'absolute', inset: 0, opacity: 0.05, background: 'repeating-linear-gradient(90deg,transparent 0px,transparent 72px,rgba(255,184,0,0.35) 72px,rgba(255,184,0,0.35) 73px)' }} />
            </div>

            {/* Revenue glass widget (top) */}
            <div style={{ position: 'absolute', top: '7%', left: '50%', transform: 'translateX(-50%)', width: 340, height: 82, borderRadius: 16, background: 'rgba(255,255,255,0.22)', border: '1.5px solid rgba(255,255,255,0.55)', backdropFilter: 'blur(22px)', boxShadow: '0 18px 45px rgba(0,0,0,0.09),inset 0 1px 0 rgba(255,255,255,0.68)', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 20, zIndex: 6 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.53rem', color: 'rgba(0,0,0,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>Monthly Revenue</div>
                <div ref={revCounterRef} style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0A0A10', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>$0</div>
              </div>
              <div style={{ flex: 1, position: 'relative', height: 42 }}>
                <svg viewBox="0 0 120 44" style={{ width: '100%', height: '100%' }}>
                  <defs><linearGradient id="rg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#FFB800" stopOpacity="0.3" /><stop offset="100%" stopColor="#FFB800" stopOpacity="0" /></linearGradient></defs>
                  <path d="M0,36 Q20,28 35,32 T65,18 T90,10 T120,4 V44 H0 Z" fill="url(#rg)" />
                  <path ref={chartPathRef} d="M0,36 Q20,28 35,32 T65,18 T90,10 T120,4" fill="none" stroke="#FFB800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Golden spark following the chart path */}
                  <circle r="3.5" fill="#FFB800" style={{ offsetPath: `path('M0,36 Q20,28 35,32 T65,18 T90,10 T120,4')`, animation: 'chartSpark 3.2s linear infinite', filter: 'drop-shadow(0 0 4px #FFB800)' }} />
                </svg>
              </div>
              <GlassLayer style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.5) 0%,transparent 55%)' }} />
            </div>

            {/* Fan Card Deck */}
            <div ref={deckRef} style={{ position: 'relative', width: 290, height: 360, transformStyle: 'preserve-3d', marginTop: 30 }}>

              {/* Card 0 — Conversion (fans left) */}
              <div ref={el => growCardRefs.current[0] = el} style={{ position: 'absolute', inset: 0, borderRadius: 22, background: '#fff', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 30px 65px rgba(0,0,0,0.12)', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', willChange: 'transform', transformStyle: 'preserve-3d' }}>
                {/* Spotlight Overlay */}
                <div ref={el => growSpotlightRefs.current[0] = el} style={{ position: 'absolute', inset: 0, zIndex: 12, pointerEvents: 'none', mixBlendMode: 'screen', borderRadius: 'inherit', willChange: 'background' }} />
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(0,0,0,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', fontFamily: 'var(--font-body)' }}>Conversion Rate</div>
                  <div ref={convCounterRef} style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0A0A10', fontFamily: 'var(--font-display)', letterSpacing: '-0.04em', marginTop: '0.3rem' }}>+0.0%</div>
                  <div style={{ fontSize: '0.68rem', color: '#FF2A54', fontWeight: 600, marginTop: '0.2rem' }}>↑ 22.4% this month</div>
                </div>
                <div style={{ width: '100%', height: 72, background: 'rgba(0,0,0,0.025)', borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
                  <svg viewBox="0 0 100 50" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                    <defs><linearGradient id="g0" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#FF2A54" stopOpacity="0.22" /><stop offset="100%" stopColor="#FF2A54" stopOpacity="0" /></linearGradient></defs>
                    <path d="M0,42 Q18,26 36,30 T72,10 T100,4 V50 H0 Z" fill="url(#g0)" />
                    <path d="M0,42 Q18,26 36,30 T72,10 T100,4" fill="none" stroke="#FF2A54" strokeWidth="2.8" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Card 1 — Users (center, dark) */}
              <div ref={el => growCardRefs.current[1] = el} style={{ position: 'absolute', inset: 0, borderRadius: 22, background: 'linear-gradient(145deg,#0A0A10,#1a1030)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 38px 72px rgba(0,0,0,0.30),inset 0 1px 0 rgba(255,255,255,0.06)', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', willChange: 'transform', transformStyle: 'preserve-3d' }}>
                {/* Spotlight Overlay */}
                <div ref={el => growSpotlightRefs.current[1] = el} style={{ position: 'absolute', inset: 0, zIndex: 12, pointerEvents: 'none', mixBlendMode: 'screen', borderRadius: 'inherit', willChange: 'background' }} />
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', fontFamily: 'var(--font-body)' }}>Active Users</div>
                  <div ref={userCounterRef} style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)', letterSpacing: '-0.04em', marginTop: '0.3rem' }}>0</div>
                  <div style={{ fontSize: '0.68rem', color: '#00E5FF', fontWeight: 600, marginTop: '0.2rem' }}>+1,240 today · Live</div>
                </div>
                <div style={{ width: '100%', height: 72, background: 'rgba(255,255,255,0.04)', borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
                  <svg viewBox="0 0 100 50" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                    <defs><linearGradient id="g1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#00E5FF" stopOpacity="0.22" /><stop offset="100%" stopColor="#00E5FF" stopOpacity="0" /></linearGradient></defs>
                    <path d="M0,44 Q22,30 44,34 T80,10 T100,3 V50 H0 Z" fill="url(#g1)" />
                    <path ref={chartPath2Ref} d="M0,44 Q22,30 44,34 T80,10 T100,3" fill="none" stroke="#00E5FF" strokeWidth="2.8" strokeLinecap="round" />
                    {/* Cyan spark following the chart path */}
                    <circle r="3.5" fill="#00E5FF" style={{ offsetPath: `path('M0,44 Q22,30 44,34 T80,10 T100,3')`, animation: 'chartSpark 2.4s linear infinite', filter: 'drop-shadow(0 0 4px #00E5FF)' }} />
                  </svg>
                </div>
                <GlassLayer style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.06) 0%,transparent 50%)' }} />
              </div>

              {/* Card 2 — ROI (fans right) */}
              <div ref={el => growCardRefs.current[2] = el} style={{ position: 'absolute', inset: 0, borderRadius: 22, background: '#fff', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 30px 65px rgba(0,0,0,0.11)', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', willChange: 'transform', transformStyle: 'preserve-3d' }}>
                {/* Spotlight Overlay */}
                <div ref={el => growSpotlightRefs.current[2] = el} style={{ position: 'absolute', inset: 0, zIndex: 12, pointerEvents: 'none', mixBlendMode: 'screen', borderRadius: 'inherit', willChange: 'background' }} />
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(0,0,0,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', fontFamily: 'var(--font-body)' }}>Campaign ROI</div>
                  <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0A0A10', fontFamily: 'var(--font-display)', letterSpacing: '-0.04em', marginTop: '0.3rem' }}>8.4×</div>
                  <div style={{ fontSize: '0.68rem', color: '#FFB800', fontWeight: 600, marginTop: '0.2rem' }}>↑ Best performing month</div>
                </div>
                <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end', height: 72, paddingTop: 8 }}>
                  {[60, 80, 45, 90, 55, 75, 100, 68, 85, 95].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: `rgba(255,184,0,${0.3 + i * 0.07})` }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating KPI chips */}
            <div style={{ position: 'absolute', top: '10%', right: '4%', zIndex: 6, width: 150, height: 82, borderRadius: 14, background: 'rgba(255,255,255,0.86)', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 14px 32px rgba(0,0,0,0.10)', padding: '12px 14px', backdropFilter: 'blur(12px)', animation: 'svcGrow0 4.2s ease-in-out infinite alternate' }}>
              <div style={{ fontSize: '0.47rem', color: 'rgba(0,0,0,0.38)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>Performance</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}><span style={{ fontSize: '0.55rem', color: '#0A0A10', fontWeight: 600 }}>Email</span><span style={{ fontSize: '0.55rem', color: '#28C840', fontWeight: 700 }}>↑ 42%</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: '0.55rem', color: '#0A0A10', fontWeight: 600 }}>Paid</span><span style={{ fontSize: '0.55rem', color: '#FFB800', fontWeight: 700 }}>↑ 31%</span></div>
            </div>
            <div style={{ position: 'absolute', bottom: '9%', left: '4%', zIndex: 6, width: 140, height: 76, borderRadius: 14, background: 'rgba(255,255,255,0.84)', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 12px 28px rgba(0,0,0,0.09)', padding: '12px 14px', backdropFilter: 'blur(12px)', animation: 'svcGrow1 3.8s ease-in-out infinite alternate' }}>
              <div style={{ fontSize: '0.47rem', color: 'rgba(0,0,0,0.38)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>ROAS</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0A0A10', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>6.8×</div>
              <div style={{ fontSize: '0.48rem', color: '#FF2A54', fontWeight: 700, marginTop: 2 }}>+0.9× from last Q</div>
            </div>
          </div>

        </div>{/* /camera */}
      </div>{/* /content */}

      {/* MOBILE / TABLET VIEW (max-width: 900px) */}
      <div className="services-mobile-view" style={{ width: '100%', flexDirection: 'column', gap: '2rem', zIndex: 10, position: 'relative' }}>
        {CHAPTERS.map((ch, idx) => (
          <div 
            key={idx}
            style={{
              background: 'rgba(255, 255, 255, 0.72)',
              borderRadius: '24px',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              padding: '2.5rem 2rem',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.02)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Corner ambient glow */}
            <div style={{
              position: 'absolute',
              top: '-20%',
              right: '-20%',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: ch.ambient,
              filter: 'blur(40px)',
              zIndex: 0,
              pointerEvents: 'none'
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.18em', color: '#FF2A54', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                {ch.step} {ch.label} — {ch.sub}
              </div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: '#0A0A10', margin: '0 0 0.8rem', letterSpacing: '-0.02em' }}>
                {ch.title}
              </h3>
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(0,0,0,0.5)', fontFamily: 'var(--font-body)' }}>
                {ch.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Global Keyframes + Responsive + Accessibility ── */}
      <style>{`
        @keyframes svcSpin  { to { transform: rotate(360deg); } }
        @keyframes svcSpinR { to { transform: rotate(-360deg); } }
        @keyframes svcPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }

        /* SVG Noise Random Playback */
        @keyframes noisePlay {
          0% { background-position: 0px 0px; }
          10% { background-position: -20px 30px; }
          20% { background-position: 40px -10px; }
          30% { background-position: -30px -30px; }
          40% { background-position: 20px 40px; }
          50% { background-position: -10px 50px; }
          60% { background-position: 50px 10px; }
          70% { background-position: -40px -40px; }
          80% { background-position: 30px -60px; }
          90% { background-position: -20px 20px; }
          100% { background-position: 0px 0px; }
        }

        /* Volumetric Atmospheric Drift */
        @keyframes svcVolumetric {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-30px, 20px) scale(1.05); }
          100% { transform: translate(20px, -15px) scale(0.95); }
        }

        /* Ambient Light Rays */
        @keyframes svcRays {
          0% { transform: rotate(0deg) scale(1); opacity: 0.02; }
          50% { transform: rotate(4deg) scale(1.08); opacity: 0.035; }
          100% { transform: rotate(0deg) scale(1); opacity: 0.02; }
        }

        /* Active Timeline Node breathing glow */
        @keyframes nodeBreathe {
          0%, 100% { box-shadow: 0 0 0 5px rgba(255,42,84,0.18), 0 0 16px rgba(255,42,84,0.3); }
          50% { box-shadow: 0 0 0 8px rgba(255,42,84,0.28), 0 0 24px rgba(255,42,84,0.45); }
        }
        .svc-node-active {
          animation: nodeBreathe 3s ease-in-out infinite alternate !important;
        }

        /* Brand Neon Pulsing Background Glow */
        @keyframes brandGlowPulse {
          0% { filter: blur(80px) brightness(0.85); opacity: 0.45; }
          100% { filter: blur(100px) brightness(1.15); opacity: 0.65; }
        }
        .svc-brand-glow {
          animation: brandGlowPulse 4s ease-in-out infinite alternate;
        }

        /* Glass Reflection Constant Light Sweep */
        @keyframes svcGlareSweep {
          0% { background-position: 150% 0%; }
          100% { background-position: -150% 0%; }
        }

        /* Backlight Breathe Animation */
        @keyframes svcBacklightBreathe {
          0% { transform: translateZ(-100px) scale(0.95) rotate(0deg); opacity: 0.8; }
          100% { transform: translateZ(-100px) scale(1.08) rotate(8deg); opacity: 1; }
        }

        /* SVG Glowing Border Sweep */
        @keyframes svcBorderSweep {
          from { stroke-dashoffset: 700; }
          to { stroke-dashoffset: 0; }
        }

        /* Tech digital particle stream */
        @keyframes svcTechStream {
          0% { transform: translateY(0) scaleY(1); opacity: 0; }
          20% { opacity: 0.45; }
          80% { opacity: 0.45; }
          100% { transform: translateY(-380px) scaleY(0.7); opacity: 0; }
        }

        /* SVG Spark particle path follower */
        @keyframes chartSpark {
          0% { offset-distance: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }

        /* 3D Float orbiting elements */
        @keyframes svcFloatObj {
          0% { transform: translate3d(0, 0, 50px) rotate(2deg); }
          100% { transform: translate3d(0, -14px, 75px) rotate(-2deg); }
        }

        /* BUILD engineering particles */
        @keyframes svcB0 { from{transform:translateY(0)} to{transform:translateY(-14px)} }
        @keyframes svcB1 { from{transform:translateY(0)} to{transform:translateY(-9px)} }
        @keyframes svcB2 { from{transform:translateY(0)} to{transform:translateY(-16px)} }
        @keyframes svcB3 { from{transform:translateY(0)} to{transform:translateY(-11px)} }
        @keyframes svcB4 { from{transform:translateY(0)} to{transform:translateY(-8px)} }
        @keyframes svcB5 { from{transform:translateY(0)} to{transform:translateY(-13px)} }
        @keyframes svcB6 { from{transform:translateY(0)} to{transform:translateY(-7px)} }

        /* GROW golden data dots */
        @keyframes svcGF0 { from{transform:translateY(0) scale(1)} to{transform:translateY(-13px) scale(1.3)} }
        @keyframes svcGF1 { from{transform:translateY(0) scale(1)} to{transform:translateY(-8px)  scale(1.2)} }
        @keyframes svcGF2 { from{transform:translateY(0) scale(1)} to{transform:translateY(-15px) scale(1.4)} }
        @keyframes svcGF3 { from{transform:translateY(0) scale(1)} to{transform:translateY(-10px) scale(1.25)} }
        @keyframes svcGF4 { from{transform:translateY(0) scale(1)} to{transform:translateY(-17px) scale(1.35)} }
        @keyframes svcGF5 { from{transform:translateY(0) scale(1)} to{transform:translateY(-9px)  scale(1.2)} }

        /* GROW floating KPI chips */
        @keyframes svcGrow0 { from{transform:translateY(0) rotate(-1deg)} to{transform:translateY(-8px) rotate(1deg)} }
        @keyframes svcGrow1 { from{transform:translateY(0) rotate(1deg)}  to{transform:translateY(-6px) rotate(-1deg)} }

        /* Focus ring for accessibility */
        .svc-row:focus-visible {
          outline: 2px solid #FF2A54;
          outline-offset: 4px;
          border-radius: 6px;
        }

        /* Responsive — short screen heights */
        @media (max-height: 780px) and (min-width: 901px) {
          .svc-title {
            font-size: clamp(1.8rem, 3.2vw, 2.8rem) !important;
            margin: 0 !important;
            white-space: nowrap;
          }
          #services {
            padding-top: 70px !important;
            padding-bottom: 15px !important;
          }
        }

        /* Toggle desktop/mobile views */
        .services-desktop-view {
          display: flex !important;
        }
        .services-mobile-view {
          display: none !important;
        }

        /* Responsive — tablet */
        @media (max-width: 1024px) {
          #services { padding: 80px 2rem 50px !important; }
        }
        @media (max-width: 900px) {
          .services-desktop-view {
            display: none !important;
          }
          .services-mobile-view {
            display: flex !important;
          }
          #services {
            padding: 80px 1.5rem 60px !important;
            height: auto !important;
            min-height: auto !important;
            overflow: visible !important;
          }
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
