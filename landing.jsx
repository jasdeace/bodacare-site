/* global React, CLMark, CLHeaderLogo, HomeA, MetricsScreen, AIScreen, MedicineEditScreen, ProfileScreen, NutritionScreen, GiverDashboardScreen, Ico */
// bodacare — marketing landing page sections

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
function MiniPhone({ children, scale = 1, width = 360, height = 760 }) {
  // Inner: actual phone frame at 360×760
  return (
    <div style={{
      width: width * scale,
      height: height * scale,
      position: 'relative',
    }}>
      <div style={{
        width, height,
        boxSizing: 'border-box',
        background: 'var(--cream-50)',
        borderRadius: 38,
        border: '8px solid #0F2C2E',
        boxShadow: '0 30px 60px -20px rgba(15,44,46,0.32), 0 0 0 1px rgba(15,44,46,0.05)',
        // clip-path is a hard mask that's honored even when the element is
        // transformed inside a nested overflow:hidden ancestor — which is
        // exactly the bento-card situation where border-radius + overflow
        // alone was leaking content past the bezel.
        clipPath: 'inset(0 round 38px)',
        overflow: 'hidden',
        isolation: 'isolate',
        position: 'absolute',
        top: 0, left: 0,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      }}>
        <div style={{
          position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
          width: 90, height: 26, borderRadius: 999, background: '#0F2C2E', zIndex: 50,
        }}/>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Nav
// ─────────────────────────────────────────────────────────────
function LandingNav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const root = document.querySelector('.bd-page') || window;
    const target = root === window ? window : root;
    const handler = () => {
      const y = target === window ? window.scrollY : target.scrollTop;
      setScrolled(y > 8);
    };
    target.addEventListener('scroll', handler, { passive: true });
    return () => target.removeEventListener('scroll', handler);
  }, []);
  return (
    <nav className={`bd-nav${scrolled ? ' bd-nav--scrolled' : ''}`}>
      <div className="bd-nav-inner">
        <a href="#" className="bd-logo">
          <CLMark size={28} />
          <span>bodacare</span>
        </a>
        <div className="bd-nav-links">
          <a href="#story">소개</a>
          <a href="#features">제품</a>
          <a href="#who">추천</a>
          <a href="#how">사용법</a>
          <a href="#trust">안전</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="bd-nav-cta">
          <a href="#download" className="bd-btn bd-btn--primary">앱 다운로드</a>
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="bd-hero">
      <div className="bd-hero-inner">
        <div className="bd-hero-text">
          <div className="bd-eyebrow">
            <span className="bd-eyebrow-dot"/>
            멀리서도, 곁에서 챙기는 건강 케어
          </div>
          <h1 className="bd-h1">
            소중한분의 건강, <br/>
            이제 <span className="bd-h1-accent">함께 챙겨요</span>
          </h1>
          <p className="bd-lead">
            부모님 복약부터 혈압·검사 결과까지.<br className="bd-hide-mobile"/>
            멀리 계셔도, 옆에 있는 것처럼.
          </p>
          <div className="bd-cta-row">
            <a href="#" className="bd-store bd-store--ios">
              <svg width="22" height="26" viewBox="0 0 22 26" fill="currentColor"><path d="M17.3 13.7c0-3.3 2.7-4.9 2.8-5-1.5-2.3-3.9-2.6-4.8-2.6-2-.2-3.9 1.2-5 1.2-1.1 0-2.7-1.2-4.4-1.1-2.3 0-4.4 1.3-5.5 3.4-2.4 4.1-.6 10.2 1.7 13.5 1.1 1.6 2.5 3.4 4.2 3.4 1.7-.1 2.4-1.1 4.4-1.1 2 0 2.6 1.1 4.4 1.1 1.8 0 3-1.6 4.1-3.3 1.3-1.9 1.8-3.7 1.9-3.8-.1-.1-3.7-1.4-3.8-5.7zM14 4c.9-1.1 1.5-2.7 1.3-4.2-1.3.1-2.9.9-3.8 2-.8 1-1.6 2.6-1.4 4 1.5.1 3-.7 3.9-1.8z"/></svg>
              <div className="bd-store-inner">
                <span className="bd-store-top">Download on the</span>
                <span className="bd-store-bot">App Store</span>
              </div>
            </a>
            <a href="#" className="bd-store bd-store--google">
              <svg width="24" height="26" viewBox="0 0 24 26" fill="none"><path d="M1 1.7v22.6c0 .7.4 1.3 1 1.5L13.6 13 1 1.7z" fill="#5BC9F4"/><path d="M17.6 9.5L14.5 11.6 2.1 1l-.1.1L13.6 13l4 4-3-3 3 3 3.1-2.1c1.4-.8 1.4-2.7 0-3.4z" fill="#FBC02D"/><path d="M14.5 11.6L2 1l-.4.2 12 12 .9-.6z" fill="#E53935"/><path d="M14.5 14.4l-.9-.6L1.7 25.7l.4.2L14.5 14.4z" fill="#4CAF50"/></svg>
              <div className="bd-store-inner">
                <span className="bd-store-top">GET IT ON</span>
                <span className="bd-store-bot">Google Play</span>
              </div>
            </a>
          </div>
          <ul className="bd-hero-bullets">
            <li><Check /> 보호자가 약 등록하면 본인이 수락 — 안전하게 함께</li>
            <li><Check /> 혈압·혈당·검사·식단까지 한 곳에서</li>
            <li><Check /> AI와 대화로 풀어가는 건강 — 검사지·영양·식단</li>
          </ul>
        </div>

        <div className="bd-hero-visual">
          <div className="bd-hero-glow"/>
          <div className="bd-hero-phones">
            <div className="bd-hero-phone bd-hero-phone--back">
              <MiniPhone scale={0.78}><MetricsScreen /></MiniPhone>
            </div>
            <div className="bd-hero-phone bd-hero-phone--front">
              <MiniPhone scale={0.88}><HomeA /></MiniPhone>
            </div>
            {/* Floating chips */}
            <div className="bd-chip bd-chip--1">
              <span className="bd-chip-dot bd-chip-dot--teal"/>
              <span>09:00 복약 알림</span>
            </div>
            <div className="bd-chip bd-chip--2">
              <span className="bd-chip-dot bd-chip-dot--coral"/>
              <span>딸이 약 추가</span>
            </div>
            <div className="bd-chip bd-chip--3">
              <span className="bd-chip-dot bd-chip-dot--rose"/>
              <span>혈압 120/80</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pulse() {
  return (
    <span style={{ position: 'relative', display: 'inline-block', width: 8, height: 8, marginRight: 6 }}>
      <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--teal-500)', opacity: 0.4, animation: 'bdPulse 1.6s ease-out infinite' }}/>
      <span style={{ position: 'absolute', top: 2, left: 2, width: 4, height: 4, borderRadius: '50%', background: 'var(--teal-700)' }}/>
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// Problem section
// ─────────────────────────────────────────────────────────────
function Problems() {
  const items = [
    { kicker: '01', q: '부모님은 잘 챙기시나?', a: '멀리 계신 가족의 복약과 건강을 확인하고 싶을 때.' },
    { kicker: '02', q: '오늘 약 먹었나?', a: '하루에도 몇 번씩, 기억을 더듬게 되는 순간들.' },
    { kicker: '03', q: '이 검사 수치, 괜찮은 건가?', a: '병원에서 받아온 결과지 앞에서 막막한 순간.' },
  ];
  return (
    <section className="bd-problems">
      <div className="bd-section-inner">
        <div className="bd-section-head">
          <span className="bd-kicker">왜 bodacare인가요</span>
          <h2 className="bd-h2">매일 마주하는<br/><em>작은 불안</em>들</h2>
        </div>
        <div className="bd-prob-grid">
          {items.map((it) => (
            <div key={it.kicker} className="bd-prob-card">
              <span className="bd-prob-num">{it.kicker}</span>
              <h3 className="bd-prob-q">"{it.q}"</h3>
              <p className="bd-prob-a">{it.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Features bento
// ─────────────────────────────────────────────────────────────
function Features() {
  return (
    <section id="features" className="bd-features">
      <div className="bd-section-inner">
        <div className="bd-section-head bd-section-head--center">
          <span className="bd-kicker">기능</span>
          <h2 className="bd-h2">하나의 앱,<br/><em>온전한 케어</em></h2>
          <p className="bd-section-lead">
            복약 관리 · 건강 수치 · AI 분석 · 가족 공유까지.<br className="bd-hide-mobile"/>
            건강을 챙기는 모든 순간을 부드럽게 잇습니다.
          </p>
        </div>

        <div className="bd-bento">
          {/* Big: medication */}
          <div className="bd-bento-card bd-bento-card--lg" style={{ background: 'var(--paper)' }}>
            <div className="bd-bento-text">
              <span className="bd-feat-tag" style={{ background: 'var(--teal-100)', color: 'var(--teal-800)' }}>
                <Ico.pill /> 복약 동기화
              </span>
              <h3 className="bd-h3">보호자가 등록,<br/>본인이 수락</h3>
              <p className="bd-feat-desc">
                가족이 약을 대신 등록해두면 본인이 한 번에 수락. 처방전을 카메라로 찍어 자동 입력도 가능해요.
              </p>
              <ul className="bd-feat-list">
                <li><Check /> 보호자가 약 등록 → 본인이 수락</li>
                <li><Check /> 처방전 사진 한 장으로 약 정보 자동 입력</li>
                <li><Check /> "약 복용 재촉하기"로 놓친 약 가볍게 챙김</li>
              </ul>
            </div>
            <div className="bd-bento-visual">
              <MiniPhone scale={0.66}><HomeA /></MiniPhone>
            </div>
          </div>

          {/* AI */}
          <div id="ai" className="bd-bento-card bd-bento-card--ai" style={{ background: 'linear-gradient(160deg, #0E5C5A, #0F766E)' }}>
            <div className="bd-bento-text bd-bento-text--dark">
              <span className="bd-feat-tag" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>
                <Ico.spark /> AI 건강 대화
              </span>
              <h3 className="bd-h3">건강에 대한 모든 질문,<br/>대화로 풀어요</h3>
              <p className="bd-feat-desc" style={{ color: 'rgba(255,255,255,0.78)' }}>
                건강검진 수치 해석부터 식단·영양 코칭, 평소 궁금한 건강 질문까지. 한 화면에서 대화하듯 AI가 짚어드려요.
              </p>
            </div>
            <div className="bd-bento-visual">
              <MiniPhone scale={0.62}><AIScreen /></MiniPhone>
            </div>
          </div>

          {/* Vitals */}
          <div className="bd-bento-card" style={{ background: 'var(--paper)' }}>
            <div className="bd-bento-text">
              <span className="bd-feat-tag" style={{ background: 'var(--rose-100)', color: '#A24652' }}>
                <Ico.pulse /> 건강 수치
              </span>
              <h3 className="bd-h3">혈압·혈당·체중,<br/>한 곳에서 기록</h3>
              <p className="bd-feat-desc">
                간단한 입력만으로 그래프와 추세선이 그려져요. 정상 범위에서 벗어나면 부드럽게 알려드려요.
              </p>
            </div>
            <div className="bd-bento-visual bd-bento-visual--small">
              <MiniPhone scale={0.55}><MetricsScreen /></MiniPhone>
            </div>
          </div>

          {/* Nutrition + Calorie */}
          <div className="bd-bento-card" style={{ background: 'var(--cream-100)' }}>
            <div className="bd-bento-text">
              <span className="bd-feat-tag" style={{ background: 'var(--coral-100)', color: '#A85A45' }}>
                <Ico.cam /> 영양·식단
              </span>
              <h3 className="bd-h3">식단 사진 한 장,<br/>칼로리·영양 자동 계산</h3>
              <p className="bd-feat-desc">
                밥상 사진을 찍으면 AI가 칼로리·영양소를 분석. 목표에 맞춰 식단을 코칭해드려요.
              </p>
            </div>
            <div className="bd-bento-visual bd-bento-visual--small">
              <MiniPhone scale={0.55}><NutritionScreen /></MiniPhone>
            </div>
          </div>

          {/* Family */}
          <div id="care" className="bd-bento-card bd-bento-card--family" style={{ background: 'var(--paper)' }}>
            <div className="bd-bento-text">
              <span className="bd-feat-tag" style={{ background: 'var(--sand-100)', color: 'var(--warn-500)' }}>
                <Ico.share /> 케어 그룹
              </span>
              <h3 className="bd-h3">멀리 계신 부모님,<br/>곁에서 챙기는 돌봄</h3>
              <p className="bd-feat-desc">
                자녀·배우자·형제 누구든 초대해서 함께 봐요. 보호자별로 약·혈압·식단 공개 범위를 따로 정할 수 있어요.
              </p>
              <div className="bd-care-avatars">
                <div className="bd-avatar" style={{ background: 'var(--teal-700)' }}>김</div>
                <div className="bd-avatar" style={{ background: 'var(--coral-500)' }}>아</div>
                <div className="bd-avatar" style={{ background: 'var(--sand-500)' }}>딸</div>
                <div className="bd-avatar bd-avatar--plus">+1</div>
              </div>
            </div>
            <div className="bd-bento-visual">
              <MiniPhone scale={0.62}><GiverDashboardScreen /></MiniPhone>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Check() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10" fill="var(--teal-100)"/><path d="M7.5 12.5l3 3 6-7" stroke="var(--teal-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

// ─────────────────────────────────────────────────────────────
// Story — why Bodacare exists
// ─────────────────────────────────────────────────────────────
function Story() {
  const principles = [
    {
      icon: '✦',
      title: '거리를 좁히는 일',
      desc: '멀리 계신 부모님의 약, 혈압, 식단 — 옆에 있는 듯 살펴보세요.',
    },
    {
      icon: '◆',
      title: '부담을 나누는 일',
      desc: '보호자가 등록, 본인은 수락. 복용 여부는 가족이 함께 확인합니다.',
    },
    {
      icon: '◉',
      title: '정보를 풀어주는 일',
      desc: '어려운 검사 수치도, 매일의 식단도, AI와 대화로 쉽게 이해해요.',
    },
  ];
  return (
    <section id="story" className="bd-story">
      <div className="bd-section-inner">
        <div className="bd-section-head bd-section-head--center">
          <span className="bd-kicker">왜 만들었나요</span>
          <h2 className="bd-h2">건강은 혼자 챙기는 것이<br/><em>아닙니다</em></h2>
          <p className="bd-section-lead">
            한국은 곧 초고령 사회입니다. 부모님 약을 멀리서 챙기고, 검사 결과지를 함께 해석하고,<br className="bd-hide-mobile"/>
            식단을 같이 고민하는 일 — 그 모든 게 따로 흩어져 있다는 점에서 Bodacare가 시작되었어요.
          </p>
        </div>
        <div className="bd-story-grid">
          {principles.map((p) => (
            <div key={p.title} className="bd-story-card">
              <div className="bd-story-icon">{p.icon}</div>
              <h3 className="bd-story-title">{p.title}</h3>
              <p className="bd-story-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Personas — 이런 분께 추천해요
// ─────────────────────────────────────────────────────────────
function Personas() {
  const items = [
    {
      tint: 'var(--rose-100)',
      fg: '#A24652',
      avatar: '딸',
      title: '멀리 계신 부모님을 챙기는 자녀',
      desc: '주말에만 뵙는 부모님, 매일 약·혈압·식단까지 옆에서 본 듯 확인하세요.',
      tags: ['보호자가 약 등록', '실시간 복용 확인', '약 복용 재촉'],
    },
    {
      tint: 'var(--teal-100)',
      fg: 'var(--teal-800)',
      avatar: '나',
      title: '만성질환을 관리하는 본인',
      desc: '고혈압·당뇨·고지혈증 약과 수치, 검사 결과까지 한 곳에서. AI가 풀어드려요.',
      tags: ['복약 자동 알림', '혈압·혈당 그래프', '검사지 OCR + AI 해석'],
    },
    {
      tint: 'var(--coral-100)',
      fg: '#A85A45',
      avatar: '부부',
      title: '서로의 건강을 챙기는 부부',
      desc: '당뇨 있는 남편, 혈압 재는 아내. 서로의 변화를 옆에서 보고 함께 챙겨요.',
      tags: ['양방향 케어 그룹', '데이터별 공개 설정', '검사·식단 공유'],
    },
    {
      tint: 'var(--sand-100)',
      fg: 'var(--warn-500)',
      avatar: 'IB',
      title: '체형·다이어트 관리 중인 분',
      desc: '인바디 결과, 매일 식단 사진, AI 영양 코칭. 목표까지 함께 갑니다.',
      tags: ['인바디 OCR', 'AI 식단 분석', '목표·트렌드 추적'],
    },
  ];
  return (
    <section id="who" className="bd-personas">
      <div className="bd-section-inner">
        <div className="bd-section-head bd-section-head--center">
          <span className="bd-kicker">이런 분께 추천해요</span>
          <h2 className="bd-h2">한 사람이 아니라,<br/><em>한 관계를 위한 앱</em></h2>
        </div>
        <div className="bd-persona-grid">
          {items.map((p) => (
            <div key={p.title} className="bd-persona-card">
              <div className="bd-persona-head">
                <span className="bd-persona-avatar" style={{ background: p.tint, color: p.fg }}>{p.avatar}</span>
                <h3 className="bd-persona-title">{p.title}</h3>
              </div>
              <p className="bd-persona-desc">{p.desc}</p>
              <div className="bd-persona-tags">
                {p.tags.map((t) => (
                  <span key={t} className="bd-persona-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Trust — 안전하게 함께
// ─────────────────────────────────────────────────────────────
function Trust() {
  const pillars = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: '본인이 초대한 가족만',
      desc: '내가 직접 초대한 사람만 데이터를 볼 수 있어요. 가족별로 약·혈압·식단 권한을 따로 켜고 끌 수 있습니다.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="10" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M8 10V7a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      ),
      title: '저장 시 암호화 · TLS 전송',
      desc: '비밀번호와 민감 데이터는 모두 암호화되어 저장됩니다. 전송 구간도 SSL/TLS로 보호돼요.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M3 9h18" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M8 14l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: '사진 원본은 저장 안 해요',
      desc: '검사지·식단 사진은 AI 분석을 위해 일시적으로 전송될 뿐, 운영자 서버에 보관하지 않습니다. 텍스트 결과만 본인 계정에 남아요.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 21s-7-4.5-7-11a7 7 0 0114 0c0 6.5-7 11-7 11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
          <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
        </svg>
      ),
      title: '한국 PIPA 기준 운영',
      desc: '민감정보(건강 정보)는 일반 개인정보와 분리해 별도 동의를 받습니다. 회원 탈퇴 시 모든 데이터가 즉시 삭제돼요.',
    },
  ];
  return (
    <section id="trust" className="bd-trust">
      <div className="bd-section-inner">
        <div className="bd-section-head bd-section-head--center">
          <span className="bd-kicker">안전하게 함께</span>
          <h2 className="bd-h2">건강 데이터, <em>내가 정한 만큼만</em></h2>
          <p className="bd-section-lead">
            건강 정보는 무엇보다 민감해요. 본인이 초대한 가족만, 본인이 정한 항목만,<br className="bd-hide-mobile"/>
            안전한 방식으로 처리합니다.
          </p>
        </div>
        <div className="bd-trust-grid">
          {pillars.map((p) => (
            <div key={p.title} className="bd-trust-card">
              <div className="bd-trust-icon">{p.icon}</div>
              <h3 className="bd-trust-title">{p.title}</h3>
              <p className="bd-trust-desc">{p.desc}</p>
            </div>
          ))}
        </div>
        <p className="bd-trust-footnote">
          자세한 내용은 <a href="https://bodacare.com/privacy">개인정보처리방침</a> · <a href="https://bodacare.com/consent">민감정보 동의</a> 에 정리돼 있어요.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// How it works
// ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n: '01', title: '앱을 받고 가입', desc: '30초면 충분해요. 이름과 생년월일만 알려주세요.' },
    { n: '02', title: '약과 측정값 등록', desc: '처방전을 사진으로 찍거나, 직접 입력하세요.' },
    { n: '03', title: '매일 부드럽게 챙김', desc: '알림이 오면 한 번에 기록. 가족과 함께 보세요.' },
  ];
  return (
    <section id="how" className="bd-how">
      <div className="bd-section-inner">
        <div className="bd-section-head bd-section-head--center">
          <span className="bd-kicker">사용법</span>
          <h2 className="bd-h2">3단계로 시작</h2>
        </div>
        <ol className="bd-steps">
          {steps.map((s) => (
            <li key={s.n} className="bd-step">
              <span className="bd-step-num">{s.n}</span>
              <h3 className="bd-step-title">{s.title}</h3>
              <p className="bd-step-desc">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────
function FAQ() {
  const items = [
    {
      q: '부모님이 디지털에 익숙하지 않으셔도 쓸 수 있나요?',
      a: '네. 보호자가 처방전을 사진으로 등록하면 부모님 화면엔 "수락하기" 버튼만 떠요. 복약 시간엔 알림이 오고, 한 번 탭으로 기록 완료. 화면 조작은 최소화했습니다.',
    },
    {
      q: '제 건강 데이터는 누가 볼 수 있나요?',
      a: '본인이 직접 초대한 가족만 봐요. 그리고 가족별로 보여줄 항목을 따로 정할 수 있어요 — 자녀에겐 약만, 배우자에겐 식단까지. 운영자나 외부 의료기관에 직접 공유되지 않습니다.',
    },
    {
      q: '무료인가요? 결제는 어떻게 되나요?',
      a: '핵심 기능(복약 알림 · 혈압·혈당 기록 · 가족 공유 · 검사지 보관)은 무료입니다. AI 분석(검사지 해석, 식단 분석)은 사용량 토큰 단위로, 또는 프리미엄 구독으로 무제한 이용할 수 있어요.',
    },
    {
      q: '약 정보는 어디서 가져오나요?',
      a: '식품의약품안전처(MFDS) 공식 데이터 기반입니다. 처방전을 카메라로 찍으면 약 이름·용량·복용법이 자동으로 입력돼요.',
    },
    {
      q: '검사지·식단 사진을 AI에 보내도 괜찮은가요?',
      a: '사진 원본은 운영자 서버에 저장하지 않습니다. 분석을 위해 일시적으로 전송하고, 결과 텍스트만 본인 계정에 보관해요. 자세한 처리 방식은 개인정보처리방침에 정리돼 있어요.',
    },
    {
      q: 'iOS와 안드로이드 모두 지원하나요?',
      a: '네. 두 OS 모두 지원하고, 같은 케어 그룹 안의 가족이 서로 다른 기기를 써도 데이터가 함께 동기화됩니다.',
    },
  ];
  return (
    <section id="faq" className="bd-faq">
      <div className="bd-section-inner">
        <div className="bd-section-head bd-section-head--center">
          <span className="bd-kicker">자주 묻는 질문</span>
          <h2 className="bd-h2">궁금한 점,<br/><em>먼저 풀어볼게요</em></h2>
        </div>
        <div className="bd-faq-list">
          {items.map((it, i) => (
            <details key={i} className="bd-faq-item">
              <summary className="bd-faq-q">
                <span>{it.q}</span>
                <span className="bd-faq-chev" aria-hidden>+</span>
              </summary>
              <p className="bd-faq-a">{it.a}</p>
            </details>
          ))}
        </div>
        <p className="bd-faq-footnote">
          더 궁금한 점은 <a href="mailto:admin@bodacare.com">admin@bodacare.com</a> 으로 보내주세요.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Final CTA
// ─────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section id="download" className="bd-cta">
      <div className="bd-cta-inner">
        <div className="bd-cta-bg"/>
        <span className="bd-kicker bd-kicker--light">지금 시작하세요</span>
        <h2 className="bd-cta-h">오늘부터, 더 가볍게<br/>건강을 챙겨봐요.</h2>
        <div className="bd-cta-row">
          <a href="#" className="bd-store bd-store--ios bd-store--light">
            <svg width="22" height="26" viewBox="0 0 22 26" fill="currentColor"><path d="M17.3 13.7c0-3.3 2.7-4.9 2.8-5-1.5-2.3-3.9-2.6-4.8-2.6-2-.2-3.9 1.2-5 1.2-1.1 0-2.7-1.2-4.4-1.1-2.3 0-4.4 1.3-5.5 3.4-2.4 4.1-.6 10.2 1.7 13.5 1.1 1.6 2.5 3.4 4.2 3.4 1.7-.1 2.4-1.1 4.4-1.1 2 0 2.6 1.1 4.4 1.1 1.8 0 3-1.6 4.1-3.3 1.3-1.9 1.8-3.7 1.9-3.8-.1-.1-3.7-1.4-3.8-5.7zM14 4c.9-1.1 1.5-2.7 1.3-4.2-1.3.1-2.9.9-3.8 2-.8 1-1.6 2.6-1.4 4 1.5.1 3-.7 3.9-1.8z"/></svg>
            <div className="bd-store-inner">
              <span className="bd-store-top">Download on the</span>
              <span className="bd-store-bot">App Store</span>
            </div>
          </a>
          <a href="#" className="bd-store bd-store--google bd-store--light">
            <svg width="24" height="26" viewBox="0 0 24 26" fill="none"><path d="M1 1.7v22.6c0 .7.4 1.3 1 1.5L13.6 13 1 1.7z" fill="#5BC9F4"/><path d="M17.6 9.5L14.5 11.6 2.1 1l-.1.1L13.6 13l4 4-3-3 3 3 3.1-2.1c1.4-.8 1.4-2.7 0-3.4z" fill="#FBC02D"/><path d="M14.5 11.6L2 1l-.4.2 12 12 .9-.6z" fill="#E53935"/><path d="M14.5 14.4l-.9-.6L1.7 25.7l.4.2L14.5 14.4z" fill="#4CAF50"/></svg>
            <div className="bd-store-inner">
              <span className="bd-store-top">GET IT ON</span>
              <span className="bd-store-bot">Google Play</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────
function LandingFooter() {
  return (
    <footer className="bd-footer">
      <div className="bd-footer-inner">
        <div className="bd-footer-brand">
          <a href="#" className="bd-logo">
            <CLMark size={32} />
            <span>bodacare</span>
          </a>
          <p className="bd-footer-tag">매일의 건강을 가족과 함께.</p>
        </div>
        <div className="bd-footer-cols">
          <div className="bd-footer-col">
            <h4>제품</h4>
            <a href="#features">기능</a>
            <a href="#ai">AI 도우미</a>
            <a href="#care">케어그룹</a>
            <a href="#download">다운로드</a>
          </div>
          <div className="bd-footer-col">
            <h4>회사</h4>
            <a href="/about">소개</a>
            <a href="/blog">블로그</a>
          </div>
          <div className="bd-footer-col">
            <h4>지원</h4>
            <a href="#faq">FAQ</a>
            <a href="mailto:admin@bodacare.com">admin@bodacare.com</a>
          </div>
          <div className="bd-footer-col">
            <h4>법적 정보</h4>
            <a href="terms.html">이용약관</a>
            <a href="privacy.html">개인정보처리방침</a>
            <a href="consent.html">민감정보 수집·이용 동의</a>
          </div>
        </div>
      </div>
      <div className="bd-footer-bottom">
        <span>© 2026 bodacare. All rights reserved.</span>
        <span className="bd-footer-meta">bodacare.com</span>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// Page composition
// ─────────────────────────────────────────────────────────────
function LandingPage() {
  return (
    <div className="bd-page">
      <LandingNav />
      <Hero />
      <Problems />
      <Story />
      <Features />
      <Personas />
      <HowItWorks />
      <Trust />
      <FAQ />
      <FinalCTA />
      <LandingFooter />
    </div>
  );
}

// Iframe wrapper so canvas artboards get true viewport-based media queries.
function LandingFrame({ width, height }) {
  return (
    <iframe
      src="bodacare.com.html"
      title="bodacare landing"
      style={{
        width: width,
        height: height,
        border: 'none',
        display: 'block',
        background: 'var(--cream-50)',
      }}
    />
  );
}

Object.assign(window, { LandingPage, LandingFrame, MiniPhone });
