/* global React, CLMark, CLHeaderLogo, HomeA, MetricsScreen, AIScreen, MedicineEditScreen, ProfileScreen, NutritionScreen, Ico */
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
          <a href="#features">제품</a>
          <a href="#ai">AI 도우미</a>
          <a href="#care">케어그룹</a>
          <a href="#how">사용법</a>
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
              <span>가족이 함께 확인</span>
            </div>
            <div className="bd-chip bd-chip--3">
              <span className="bd-chip-dot bd-chip-dot--rose"/>
              <span>AI 식단 코칭</span>
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
              <h3 className="bd-h3">여러 가족이,<br/>데이터별로 따로 공유</h3>
              <p className="bd-feat-desc">
                자녀·배우자·형제 누구든 초대해서 함께 봐요. 약은 자녀에게, 식단은 배우자에게 — 보호자별로 공개 범위를 따로 설정할 수 있어요.
              </p>
              <div className="bd-care-avatars">
                <div className="bd-avatar" style={{ background: 'var(--teal-700)' }}>김</div>
                <div className="bd-avatar" style={{ background: 'var(--coral-500)' }}>아</div>
                <div className="bd-avatar" style={{ background: 'var(--sand-500)' }}>딸</div>
                <div className="bd-avatar bd-avatar--plus">+1</div>
              </div>
            </div>
            <div className="bd-bento-visual">
              <MiniPhone scale={0.62}><ProfileScreen /></MiniPhone>
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
            <a href="#">소개 (준비 중)</a>
            <a href="#">블로그 (준비 중)</a>
          </div>
          <div className="bd-footer-col">
            <h4>지원</h4>
            <a href="#">FAQ (준비 중)</a>
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
      <Features />
      <HowItWorks />
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
