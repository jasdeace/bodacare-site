/* global React, ReactDOM, CLMark */
// bodacare — Press kit

function PressLayout({ children }) {
  React.useEffect(() => {
    document.title = '언론 키트 · bodacare';
  }, []);
  return (
    <div className="bd-legal">
      <nav className="bd-legal-nav">
        <div className="bd-legal-nav-inner">
          <a href="/" className="bd-logo">
            <CLMark size={26} />
            <span>bodacare</span>
          </a>
          <a href="/" className="bd-legal-back">← 메인으로</a>
        </div>
      </nav>

      <main className="bd-legal-main">
        <div className="bd-legal-doc">
          <div className="bd-legal-card">
            {children}
          </div>
        </div>
      </main>

      <footer className="bd-legal-footer">
        <div className="bd-legal-footer-row">
          <a href="/">메인</a>
          <a href="/about">회사 소개</a>
          <a href="/blog">블로그</a>
          <a href="privacy.html">개인정보처리방침</a>
          <a href="mailto:admin@bodacare.com">admin@bodacare.com</a>
        </div>
        <div className="bd-legal-footer-copy">© 2026 bodacare. All rights reserved.</div>
      </footer>
    </div>
  );
}

function CopyBox({ children, label }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <div style={{
      background: 'var(--cream-50)',
      border: '1px solid var(--line-soft)',
      borderRadius: 14,
      padding: '14px 16px',
      marginBottom: 10,
      display: 'flex', gap: 12, alignItems: 'flex-start',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, color: 'var(--ink-500)', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 14, color: 'var(--ink-900)', lineHeight: 1.55 }}>{children}</div>
      </div>
      <button
        onClick={copy}
        style={{
          flexShrink: 0,
          padding: '6px 12px',
          background: copied ? 'var(--teal-700)' : 'var(--paper)',
          color: copied ? 'white' : 'var(--ink-700)',
          border: '1px solid ' + (copied ? 'var(--teal-700)' : 'var(--line)'),
          borderRadius: 8,
          fontSize: 12, fontWeight: 600,
          cursor: 'pointer',
        }}
      >{copied ? '복사됨' : '복사'}</button>
    </div>
  );
}

function PressDoc() {
  return (
    <PressLayout>
      <div className="bd-legal-kicker">PRESS</div>
      <h1 className="bd-legal-title">언론·미디어 키트</h1>
      <div className="bd-legal-meta">
        <span><strong>업데이트</strong> · 2026년 5월</span>
        <span><strong>문의</strong> · admin@bodacare.com</span>
      </div>

      <div className="bd-legal-body">
        <h2>한 줄 소개</h2>
        <p style={{ color: 'var(--ink-500)', marginTop: -8, fontSize: 14 }}>아래 문구를 필요한 길이로 골라 인용해 주세요.</p>

        <CopyBox label="짧은 한 줄 (트윗·짧은 캡션용)">
          멀리 계신 부모님의 건강을, 가족이 함께 챙기는 한국 케어 앱.
        </CopyBox>

        <CopyBox label="제목·헤드라인용">
          Bodacare — 부모님 복약·혈압·검사·식단을 가족이 함께 챙기는 한국 케어 앱
        </CopyBox>

        <CopyBox label="엘리베이터 피치">
          한국은 곧 초고령 사회. 부모님의 약·혈압·검사 결과·식단을 멀리서도 옆에서 본 듯 챙길 수 있게 만든 가족 케어 앱입니다. 보호자가 약을 등록하면 본인이 한 번에 수락하는 흐름, AI와 대화로 검사지를 풀어주는 기능, 가족별 공개 범위 설정 — 한 사람이 아니라 한 관계를 위한 도구입니다.
        </CopyBox>

        <CopyBox label="상세 소개 (보도자료용 한 문단)">
          Bodacare는 멀리 계신 부모님의 건강을 가족이 함께 챙길 수 있게 돕는 한국 가족 케어 앱입니다. 복약 알림, 혈압·혈당 추적, 검사 결과 OCR + AI 해석, 인바디 결과 관리, AI 식단 분석을 하나의 앱에 모았고, 가족별로 공개 범위(약·혈압·식단)를 따로 설정할 수 있어 데이터의 통제권은 본인에게 있습니다. 식품의약품안전처(MFDS) 공식 약품 데이터와 Naver SENS·Apple·Google·Kakao 인증을 기반으로, 한국에서 만들고 한국 가족에게 맞춘 케어 도구입니다.
        </CopyBox>

        <h2>핵심 기능 (요약)</h2>
        <ul>
          <li><strong>복약 동기화</strong>: 보호자가 약 등록 → 본인이 수락. 처방전 카메라 OCR로 자동 입력</li>
          <li><strong>케어 그룹</strong>: 자녀·배우자·형제 등 누구든 초대해 함께 보기. 가족별 공개 범위 설정</li>
          <li><strong>AI 건강 대화</strong>: 검사지 해석, 식단·영양 코칭, 평소 건강 질문</li>
          <li><strong>건강 수치</strong>: 혈압·혈당·체중·체성분을 한 곳에서 추세로 추적</li>
          <li><strong>영양·식단</strong>: 식단 사진 한 장으로 칼로리·영양소 자동 분석</li>
        </ul>

        <h2>팩트 시트</h2>
        <ul>
          <li><strong>제품명</strong>: Bodacare (보다케어)</li>
          <li><strong>창업</strong>: 2025년</li>
          <li><strong>위치</strong>: 대한민국</li>
          <li><strong>운영자</strong>: Won Seok Chang</li>
          <li><strong>플랫폼</strong>: iOS · Android</li>
          <li><strong>요금제</strong>: 핵심 기능 무료 · AI 분석은 토큰 단위 또는 프리미엄 구독</li>
          <li><strong>대상 시장</strong>: 한국 (초고령 사회 진입 가족)</li>
          <li><strong>웹사이트</strong>: <a href="https://bodacare.com">bodacare.com</a></li>
          <li><strong>문의</strong>: <a href="mailto:admin@bodacare.com">admin@bodacare.com</a></li>
        </ul>

        <h2>로고·브랜드 자산</h2>
        <div style={{
          display: 'flex', gap: 16, alignItems: 'center',
          padding: '20px 22px',
          background: 'var(--cream-50)',
          border: '1px solid var(--line-soft)',
          borderRadius: 14,
          marginBottom: 12,
        }}>
          <CLMark size={64} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>bodacare 로고</div>
            <div style={{ fontSize: 13, color: 'var(--ink-500)', marginBottom: 10 }}>SVG 벡터 · 인쇄·웹 모두 사용 가능</div>
            <a href="favicon.svg" download style={{
              display: 'inline-block',
              padding: '7px 14px',
              background: 'var(--teal-700)', color: 'white',
              borderRadius: 8,
              fontSize: 13, fontWeight: 600, textDecoration: 'none',
            }}>로고 다운로드 (SVG)</a>
          </div>
        </div>
        <p style={{ fontSize: 13, color: 'var(--ink-500)' }}>
          앱 스크린샷·추가 자산이 필요하시면 <a href="mailto:admin@bodacare.com?subject=언론 자료 요청">admin@bodacare.com</a> 으로 요청 주세요.
        </p>

        <h2>브랜드 컬러</h2>
        <div style={{
          display: 'grid', gap: 10,
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          marginBottom: 14,
        }}>
          {[
            { name: 'Teal 700', hex: '#0F766E' },
            { name: 'Cream 50', hex: '#FAF7F1' },
            { name: 'Coral 500', hex: '#E66A4D' },
            { name: 'Ink 900', hex: '#1A2123' },
          ].map((c) => (
            <div key={c.hex} style={{
              padding: '14px 16px',
              background: 'var(--paper)',
              border: '1px solid var(--line-soft)',
              borderRadius: 12,
            }}>
              <div style={{ width: '100%', height: 48, borderRadius: 8, background: c.hex, marginBottom: 8, border: '1px solid var(--line-soft)' }}/>
              <div style={{ fontSize: 12, fontWeight: 700 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-500)', fontVariant: 'tabular-nums' }}>{c.hex}</div>
            </div>
          ))}
        </div>

        <h2>인터뷰·취재 문의</h2>
        <p>
          제품 데모, 창업자 인터뷰, 한국 디지털 헬스·고령화 관련 코멘트 요청은
          <a href="mailto:admin@bodacare.com?subject=취재 요청"> admin@bodacare.com</a> 으로 보내주세요.
          가능한 빠르게 회신해 드립니다. 영어 인터뷰도 가능합니다.
        </p>

        <h2>공식 채널</h2>
        <ul>
          <li>웹사이트: <a href="https://bodacare.com">bodacare.com</a></li>
          <li>블로그: <a href="/blog">bodacare.com/blog</a></li>
          <li>회사 소개: <a href="/about">bodacare.com/about</a></li>
          <li>이메일: <a href="mailto:admin@bodacare.com">admin@bodacare.com</a></li>
        </ul>
      </div>
    </PressLayout>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PressDoc />);
