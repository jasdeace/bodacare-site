/* global React, ReactDOM, CLMark */
// bodacare — About / Company page

function AboutLayout({ children }) {
  React.useEffect(() => {
    document.title = '회사 소개 · bodacare';
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
          <a href="/blog">블로그</a>
          <a href="privacy.html">개인정보처리방침</a>
          <a href="terms.html">이용약관</a>
          <a href="mailto:admin@bodacare.com">admin@bodacare.com</a>
        </div>
        <div className="bd-legal-footer-copy">© 2026 bodacare. All rights reserved.</div>
      </footer>
    </div>
  );
}

function AboutDoc() {
  return (
    <AboutLayout>
      <div className="bd-legal-kicker">ABOUT</div>
      <h1 className="bd-legal-title">함께 챙기는 건강,<br/>Bodacare 이야기</h1>
      <div className="bd-legal-meta">
        <span><strong>설립</strong> · 2025년</span>
        <span><strong>운영</strong> · 대한민국</span>
      </div>

      <div className="bd-legal-body">
        <h2>우리가 풀려는 문제</h2>
        <p>
          한국은 곧 초고령 사회로 진입합니다. 부모님 약을 멀리서 챙기고, 병원에서 받아온 검사 결과지를 함께 해석하고,
          오늘 무엇을 드셨는지 같이 고민하는 일 — 그 모든 게 따로따로 흩어져 있습니다. 복약 알림은 알림 앱, 혈압은
          수첩, 검사 결과는 사진, 식단은 머릿속에. 가족과 공유할 길도 없습니다.
        </p>
        <p>
          Bodacare는 이 흩어진 정보를 한 곳에 모으고, 본인이 정한 가족과 함께 보는 방식으로 해결합니다. 혼자
          짊어지는 건강 관리에서, 함께 챙기는 케어로.
        </p>

        <h2>핵심 가치</h2>
        <ul>
          <li><strong>관계 중심</strong> — 한 사람이 아니라, 돌보고 돌봄받는 관계를 위한 도구입니다.</li>
          <li><strong>본인 통제</strong> — 데이터는 본인의 것. 가족별로 공개 범위를 따로 정합니다.</li>
          <li><strong>한국 우선</strong> — 식약처 약품 DB, 한국어 OCR, 카카오·네이버 인증. 한국에서 만들어 한국에서 씁니다.</li>
          <li><strong>의료 보조</strong> — Bodacare는 의료 진단·치료를 대체하지 않습니다. 일상의 자가 관리를 돕는 보조 도구입니다.</li>
        </ul>

        <h2>지금까지의 여정</h2>
        <ul>
          <li><strong>2025년</strong> — 초기 프로토타입. 복약 알림과 가족 공유 핵심 기능.</li>
          <li><strong>2026년 상반기</strong> — Bodacare로 리브랜딩. iOS·안드로이드 정식 출시 준비.</li>
          <li><strong>앞으로</strong> — 더 많은 만성질환 관리 모듈, 의료기관 연동, 글로벌 확장.</li>
        </ul>

        <h2>운영자 정보</h2>
        <ul>
          <li>개인정보 보호책임자: Won Seok Chang</li>
          <li>이메일: <a href="mailto:admin@bodacare.com">admin@bodacare.com</a></li>
          <li>웹사이트: <a href="https://bodacare.com">https://bodacare.com</a></li>
        </ul>

        <h2>함께 일하고 싶으신가요</h2>
        <p>
          Bodacare는 작지만 단단한 팀입니다. 디자이너, 엔지니어, 의료 전문가 — 한국 가족 건강의 미래를 같이
          만들어갈 분을 찾고 있어요. 지원·제안·파트너십 문의는 <a href="mailto:admin@bodacare.com">admin@bodacare.com</a> 으로
          연락 주세요.
        </p>

        <h2>언론·미디어 문의</h2>
        <p>
          취재 및 인터뷰 요청, 보도자료 요청은 <a href="mailto:admin@bodacare.com">admin@bodacare.com</a> 으로 부탁드립니다.
          서비스 스크린샷, 로고, 한 줄 소개는 메일 회신으로 보내드려요.
        </p>
      </div>
    </AboutLayout>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AboutDoc />);
