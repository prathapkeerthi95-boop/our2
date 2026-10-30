import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

/* ═══════════════════════════════════════════════════════════════════════
   CLIENT THREADS DATA (Chat / Dialogue Experience)
   Nimmi and Mani completely removed. No 50+ Projects / 100% Satisfaction / 5.0 Rating.
   ═══════════════════════════════════════════════════════════════════════ */
const clientChats = [
  {
    id: 'gagner-sports',
    clientName: 'Balaji',
    role: 'Founder & CEO',
    company: 'Gagner Sports',
    location: 'Paris & Online',
    avatarLetter: 'B',
    avatarBg: 'linear-gradient(135deg, #0A2E5C, #00A896)',
    onlineStatus: 'Active now',
    projectTag: '3D Headless E-Commerce',
    messages: [
      {
        sender: 'nuzarox',
        time: '11:42 AM',
        text: 'Hey Balaji! The interactive 3D product customizer and the European payment nodes are officially live on gagnersports.com 🚀'
      },
      {
        sender: 'client',
        time: '11:45 AM',
        text: "Just tested the live build on mobile and desktop from Paris. The 3D render speed is unbelievable — under 0.8 seconds to load fully!"
      },
      {
        sender: 'client',
        time: '11:46 AM',
        text: "Our international orders surged within the first 48 hours. The custom checkout and UX exceeded all our expectations. Nuzarox elevated our brand to an elite global standard. 🔥",
        isHighlight: true
      },
      {
        sender: 'nuzarox',
        time: '11:48 AM',
        text: 'Proud to engineer this for Gagner Sports. Analytics show mobile conversions already up +120%!'
      }
    ]
  },
  {
    id: 'gagner-marketing',
    clientName: 'Siva',
    role: 'Marketing Director',
    company: 'Gagner Sports',
    location: 'Chennai',
    avatarLetter: 'S',
    avatarBg: 'linear-gradient(135deg, #00A896, #00E5FF)',
    onlineStatus: 'Active 5m ago',
    projectTag: 'Brand Growth & Performance UI',
    messages: [
      {
        sender: 'client',
        time: '03:15 PM',
        text: 'Quick update team: The bounce rate dropped by 42% after the new kinetic UI went live.'
      },
      {
        sender: 'nuzarox',
        time: '03:18 PM',
        text: 'That is huge! How is user engagement across the mobile platforms?'
      },
      {
        sender: 'client',
        time: '03:20 PM',
        text: "European partner and distributor inquiries jumped by 86%. Your technical depth paired with design aesthetics is genuinely unmatched. You guys made the entire journey effortless! 💯",
        isHighlight: true
      }
    ]
  },
  {
    id: 'ke19-studio',
    clientName: 'Keerthieswaran',
    role: 'Lead Developer',
    company: 'KE19 Studio',
    location: 'Chennai',
    avatarLetter: 'K',
    avatarBg: 'linear-gradient(135deg, #0A2E5C, #3B82F6)',
    onlineStatus: 'Active now',
    projectTag: 'WebGL Kinetic Showcase',
    messages: [
      {
        sender: 'client',
        time: '06:10 PM',
        text: 'Bro, the custom WebGL shader interactions on the portfolio are crazy smooth on 120Hz displays!'
      },
      {
        sender: 'nuzarox',
        time: '06:12 PM',
        text: 'Optimized the GPU draw calls and Lenis scroll ticker to lock 60-120fps with zero layout shifts 👌'
      },
      {
        sender: 'client',
        time: '06:14 PM',
        text: "Everyone who reviewed the showcase asked who engineered the tech. Nuzarox brought the portfolio to an international benchmark standard! ⚡",
        isHighlight: true
      }
    ]
  },
  {
    id: 'ruthra-consulting',
    clientName: 'Ruthra',
    role: 'Brand Strategist',
    company: 'Creative Consultant',
    location: 'Tamil Nadu',
    avatarLetter: 'R',
    avatarBg: 'linear-gradient(135deg, #00A896, #0A2E5C)',
    onlineStatus: 'Active 12m ago',
    projectTag: 'Brand Positioning & Ecosystem',
    messages: [
      {
        sender: 'client',
        time: '02:04 PM',
        text: "Reviewing the finished digital ecosystem today. The typography hierarchy and micro-interactions tell our story with absolute authority."
      },
      {
        sender: 'client',
        time: '02:06 PM',
        text: "Most agencies just build plain websites — Nuzarox engineers digital ecosystems that command real market presence. The obsessive attention to detail is pure class. 👏",
        isHighlight: true
      },
      {
        sender: 'nuzarox',
        time: '02:08 PM',
        text: 'Crafting brands with measurable authority is always our mission!'
      }
    ]
  },
  {
    id: 'aura-residence',
    clientName: 'Lokesh',
    role: 'Operations & Tech Lead',
    company: 'Aura Luxury Residence',
    location: 'Mayiladuthurai',
    avatarLetter: 'L',
    avatarBg: 'linear-gradient(135deg, #0A2E5C, #00E5FF)',
    onlineStatus: 'Active now',
    projectTag: '3D VR Estate Architecture',
    messages: [
      {
        sender: 'client',
        time: '05:32 PM',
        text: 'The 360° virtual villa walkthrough is performing brilliantly with our high-net-worth clients.'
      },
      {
        sender: 'nuzarox',
        time: '05:35 PM',
        text: 'Glad to hear! How is the online private consultation booking flow?'
      },
      {
        sender: 'client',
        time: '05:37 PM',
        text: "Client bookings doubled this month. Clients specifically praise how effortless and premium the experience feels. Nuzarox delivered pure luxury! 💎",
        isHighlight: true
      }
    ]
  }
];

const Testimonials = () => {
  const [activeChatIdx, setActiveChatIdx] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatAreaRef = useRef(null);

  const activeChat = clientChats[activeChatIdx];

  // Auto scroll messages to bottom on switch
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectChat = (idx) => {
    if (idx === activeChatIdx) return;
    setIsTyping(true);
    setActiveChatIdx(idx);

    if (chatAreaRef.current) {
      gsap.fromTo(
        chatAreaRef.current.querySelectorAll('.chat-bubble-anim'),
        { opacity: 0, y: 15, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          stagger: 0.08,
          ease: 'power2.out',
          onComplete: () => {
            setIsTyping(false);
            scrollToBottom();
          }
        }
      );
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChatIdx]);

  return (
    <section id="testimonials" className="chat-testi-section">
      <style>{`
        .chat-testi-section {
          position: relative;
          background: #F5F3EF;
          padding: 6.5rem 1.5rem;
          overflow: hidden;
          font-family: var(--font-body);
        }

        /* Subtle Ambient Brand Atmosphere */
        .chat-testi-ambient {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
          opacity: 0.45;
        }
        .chat-ambient-teal {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(0, 168, 150, 0.18) 0%, transparent 70%);
          top: -100px;
          right: -100px;
        }
        .chat-ambient-navy {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(10, 46, 92, 0.12) 0%, transparent 70%);
          bottom: -150px;
          left: -120px;
        }

        .chat-testi-container {
          max-width: 1220px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* Section Header */
        .chat-testi-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .chat-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.45rem 1.1rem;
          background: #FFFFFF;
          border: 1px solid rgba(10, 46, 92, 0.1);
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0A2E5C;
          box-shadow: 0 4px 14px rgba(10, 46, 92, 0.05);
          margin-bottom: 1.2rem;
        }

        .chat-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
          animation: chatPulseLive 2s infinite;
        }

        @keyframes chatPulseLive {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }

        .chat-testi-title {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          font-weight: 900;
          color: #0B0C10;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin: 0 0 1rem 0;
        }

        .chat-testi-title span {
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .chat-testi-sub {
          font-size: 1.05rem;
          color: #555566;
          max-width: 620px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Main Chat Showcase Window */
        .chat-app-window {
          background: #FFFFFF;
          border: 1px solid rgba(10, 46, 92, 0.12);
          border-radius: 28px;
          box-shadow: 
            0 30px 80px -15px rgba(10, 46, 92, 0.12),
            0 0 0 1px rgba(255, 255, 255, 0.8),
            inset 0 1px 0 rgba(255, 255, 255, 1);
          overflow: hidden;
          display: grid;
          grid-template-columns: 360px 1fr;
          min-height: 620px;
        }

        /* Sidebar - Client Contacts List */
        .chat-sidebar {
          background: #F8FAFC;
          border-right: 1px solid rgba(10, 46, 92, 0.08);
          display: flex;
          flex-direction: column;
        }

        .chat-sidebar-header {
          padding: 1.6rem 1.4rem;
          border-bottom: 1px solid rgba(10, 46, 92, 0.08);
          background: #FFFFFF;
        }

        .chat-sidebar-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.3rem;
        }

        .chat-sidebar-title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 800;
          color: #0B0C10;
        }

        .chat-channel-badge {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.2rem 0.55rem;
          border-radius: 999px;
          background: rgba(0, 168, 150, 0.12);
          color: #00A896;
        }

        .chat-sidebar-desc {
          font-size: 0.78rem;
          color: #64748B;
          margin: 0;
        }

        .chat-contacts-list {
          flex: 1;
          overflow-y: auto;
          padding: 0.8rem;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .chat-contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 1rem 1.1rem;
          border-radius: 18px;
          background: transparent;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
          width: 100%;
        }

        .chat-contact-item:hover {
          background: rgba(10, 46, 92, 0.03);
        }

        .chat-contact-item.active {
          background: #FFFFFF;
          border-color: rgba(0, 168, 150, 0.22);
          box-shadow: 0 8px 24px rgba(10, 46, 92, 0.06);
        }

        .chat-contact-avatar {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.05rem;
          font-weight: 800;
          color: #FFFFFF;
          font-family: var(--font-display);
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          position: relative;
        }

        .chat-online-indicator {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #10B981;
          border: 2px solid #FFFFFF;
        }

        .chat-contact-meta {
          flex: 1;
          min-width: 0;
        }

        .chat-contact-name-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2px;
        }

        .chat-contact-name {
          font-size: 0.94rem;
          font-weight: 800;
          color: #0B0C10;
          font-family: var(--font-display);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .chat-contact-company {
          font-size: 0.76rem;
          color: #00A896;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .chat-contact-preview {
          font-size: 0.72rem;
          color: #64748B;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 3px;
        }

        /* Main Chat Stream Screen */
        .chat-main-area {
          display: flex;
          flex-direction: column;
          background: #FDFEFE;
          position: relative;
        }

        /* Chat Header */
        .chat-active-header {
          padding: 1.2rem 1.8rem;
          border-bottom: 1px solid rgba(10, 46, 92, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #FFFFFF;
        }

        .chat-active-user-info {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .chat-active-avatar {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.15rem;
          font-weight: 800;
          color: #FFFFFF;
          font-family: var(--font-display);
          box-shadow: 0 4px 14px rgba(10, 46, 92, 0.12);
        }

        .chat-active-name {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 800;
          color: #0B0C10;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .chat-verified-check {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background: #00A896;
          color: #FFFFFF;
          font-size: 0.65rem;
          font-weight: 900;
        }

        .chat-active-status {
          font-size: 0.75rem;
          color: #64748B;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 1px;
        }

        .chat-active-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10B981;
        }

        .chat-project-pill {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.45rem 1rem;
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(10, 46, 92, 0.06), rgba(0, 168, 150, 0.08));
          color: #0A2E5C;
          border: 1px solid rgba(0, 168, 150, 0.2);
        }

        /* Message Stream */
        .chat-messages-container {
          flex: 1;
          padding: 2.2rem 2rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          background-image: 
            radial-gradient(rgba(10, 46, 92, 0.04) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        /* Chat Bubbles */
        .chat-bubble-row {
          display: flex;
          flex-direction: column;
          max-width: 78%;
        }

        .chat-bubble-row.client {
          align-self: flex-start;
        }

        .chat-bubble-row.nuzarox {
          align-self: flex-end;
          align-items: flex-end;
        }

        .chat-bubble-sender {
          font-size: 0.72rem;
          font-weight: 700;
          color: #64748B;
          margin-bottom: 4px;
          padding: 0 4px;
        }

        .chat-bubble {
          padding: 1.1rem 1.4rem;
          border-radius: 20px;
          font-size: 0.95rem;
          line-height: 1.6;
          position: relative;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
        }

        /* Client message styling */
        .chat-bubble-row.client .chat-bubble {
          background: #FFFFFF;
          color: #1E293B;
          border: 1px solid rgba(10, 46, 92, 0.1);
          border-bottom-left-radius: 4px;
        }

        /* Client Golden Highlight Message */
        .chat-bubble-row.client .chat-bubble.highlight {
          background: #FFFFFF;
          border: 2px solid #00A896;
          color: #0B0C10;
          font-weight: 600;
          box-shadow: 
            0 12px 30px rgba(0, 168, 150, 0.12),
            0 0 0 3px rgba(0, 168, 150, 0.06);
        }

        .chat-bubble-highlight-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
          background: #00A896;
          color: #FFFFFF;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        /* Nuzarox Team message styling */
        .chat-bubble-row.nuzarox .chat-bubble {
          background: linear-gradient(135deg, #0A2E5C 0%, #006E8C 100%);
          color: #FFFFFF;
          border-bottom-right-radius: 4px;
        }

        .chat-bubble-time {
          font-size: 0.65rem;
          color: #94A3B8;
          margin-top: 4px;
          padding: 0 6px;
        }

        .chat-bubble-row.nuzarox .chat-bubble-time {
          color: #64748B;
        }

        /* Bottom Footer / Verified Signature bar */
        .chat-bottom-bar {
          padding: 1.1rem 1.8rem;
          background: #FFFFFF;
          border-top: 1px solid rgba(10, 46, 92, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .chat-encryption-note {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          color: #64748B;
          font-weight: 500;
        }

        .chat-encryption-icon {
          color: #00A896;
        }

        .chat-google-review-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.55rem 1.25rem;
          border-radius: 999px;
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          color: #FFFFFF !important;
          text-decoration: none;
          font-size: 0.82rem;
          font-weight: 700;
          box-shadow: 0 4px 16px rgba(0, 168, 150, 0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .chat-google-review-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(0, 168, 150, 0.35);
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .chat-app-window {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .chat-sidebar {
            border-right: none;
            border-bottom: 1px solid rgba(10, 46, 92, 0.08);
          }
          .chat-contacts-list {
            flex-direction: row;
            overflow-x: auto;
            padding: 0.8rem 1rem;
            gap: 10px;
            scrollbar-width: none;
          }
          .chat-contacts-list::-webkit-scrollbar {
            display: none;
          }
          .chat-contact-item {
            min-width: 200px;
            padding: 0.8rem 1rem;
          }
          .chat-contact-preview {
            display: none;
          }
          .chat-messages-container {
            padding: 1.5rem 1.2rem;
          }
          .chat-bubble-row {
            max-width: 90%;
          }
        }

        @media (max-width: 560px) {
          .chat-testi-section {
            padding: 4.5rem 1rem;
          }
          .chat-app-window {
            border-radius: 20px;
          }
          .chat-active-header {
            padding: 1rem 1.2rem;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .chat-project-pill {
            align-self: flex-start;
          }
          .chat-bubble {
            font-size: 0.88rem;
            padding: 0.95rem 1.15rem;
          }
          .chat-bottom-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.8rem;
          }
          .chat-google-review-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      {/* Ambient background glows */}
      <div className="chat-testi-ambient chat-ambient-teal" />
      <div className="chat-testi-ambient chat-ambient-navy" />

      <div className="chat-testi-container">
        {/* Section Header */}
        <div className="chat-testi-header">
          <div className="chat-badge-pill">
            <span className="chat-badge-dot" />
            <span>Direct Client Feed</span>
          </div>
          <h2 className="chat-testi-title">
            Real Conversations. <span>Real Impact.</span>
          </h2>
          <p className="chat-testi-sub">
            Direct dialogue, unfiltered feedback, and live results from the founders and leaders who trust Nuzarox.
          </p>
        </div>

        {/* Main Interactive Chat Application Window */}
        <div className="chat-app-window">
          {/* Left Sidebar: Client List */}
          <div className="chat-sidebar">
            <div className="chat-sidebar-header">
              <div className="chat-sidebar-title-row">
                <span className="chat-sidebar-title">Client Threads</span>
                <span className="chat-channel-badge">Verified</span>
              </div>
              <p className="chat-sidebar-desc">Select a founder to view dialogue</p>
            </div>

            <div className="chat-contacts-list">
              {clientChats.map((chat, idx) => (
                <button
                  key={chat.id}
                  className={`chat-contact-item ${idx === activeChatIdx ? 'active' : ''}`}
                  onClick={() => handleSelectChat(idx)}
                >
                  <div className="chat-contact-avatar" style={{ background: chat.avatarBg }}>
                    {chat.avatarLetter}
                    <span className="chat-online-indicator" />
                  </div>
                  <div className="chat-contact-meta">
                    <div className="chat-contact-name-row">
                      <span className="chat-contact-name">{chat.clientName}</span>
                    </div>
                    <div className="chat-contact-company">{chat.company}</div>
                    <div className="chat-contact-preview">{chat.projectTag}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Main Screen: Active Chat Dialogue */}
          <div ref={chatAreaRef} className="chat-main-area">
            {/* Active Header */}
            <div className="chat-active-header">
              <div className="chat-active-user-info">
                <div className="chat-active-avatar" style={{ background: activeChat.avatarBg }}>
                  {activeChat.avatarLetter}
                </div>
                <div>
                  <div className="chat-active-name">
                    <span>{activeChat.clientName}</span>
                    <span className="chat-verified-check" title="Verified Client">✓</span>
                  </div>
                  <div className="chat-active-status">
                    <span className="chat-active-status-dot" />
                    <span>{activeChat.role} · {activeChat.company} ({activeChat.location})</span>
                  </div>
                </div>
              </div>
              <div className="chat-project-pill">
                {activeChat.projectTag}
              </div>
            </div>

            {/* Messages Feed */}
            <div className="chat-messages-container">
              {activeChat.messages.map((msg, mIdx) => (
                <div
                  key={mIdx}
                  className={`chat-bubble-row ${msg.sender} chat-bubble-anim`}
                >
                  <span className="chat-bubble-sender">
                    {msg.sender === 'client' ? activeChat.clientName : 'Nuzarox Studio'}
                  </span>
                  <div className={`chat-bubble ${msg.isHighlight ? 'highlight' : ''}`}>
                    {msg.isHighlight && (
                      <div className="chat-bubble-highlight-badge">
                        ★ Verified Client Review
                      </div>
                    )}
                    {msg.text}
                  </div>
                  <span className="chat-bubble-time">{msg.time}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Signature & Google Action Bar */}
            <div className="chat-bottom-bar">
              <div className="chat-encryption-note">
                <svg className="chat-encryption-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span>Direct production client feedback logged via Nuzarox Engine</span>
              </div>

              <a
                href="https://search.google.com/local/writereview?placeid=ChIJ-3eN1XpUUrkR4aWfR6Y9nZ0"
                target="_blank"
                rel="noopener noreferrer"
                className="chat-google-review-btn"
              >
                <span>★ Review Nuzarox on Google</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
