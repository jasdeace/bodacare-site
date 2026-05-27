/* global React, ReactDOM, CLMark */
// bodacare — Legal pages (Privacy, Terms, Sensitive Info Consent)
// Each HTML wrapper sets `data-doc` on <html> to pick which doc to render.

const LEGAL_DOCS = {
  privacy: { title: '개인정보처리방침', filename: 'privacy.html' },
  terms:   { title: '이용약관',          filename: 'terms.html' },
  consent: { title: '민감정보 수집·이용 동의', filename: 'consent.html' },
};

// ─────────────────────────────────────────────────────────────
// Layout (nav + tabs + footer)
// ─────────────────────────────────────────────────────────────
function LegalLayout({ docKey, children }) {
  React.useEffect(() => {
    document.title = `${LEGAL_DOCS[docKey].title} · bodacare`;
  }, [docKey]);
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

      <div className="bd-legal-tabs">
        {Object.entries(LEGAL_DOCS).map(([key, doc]) => (
          <a key={key}
             href={doc.filename}
             className={`bd-legal-tab${docKey === key ? ' is-active' : ''}`}>
            {doc.title}
          </a>
        ))}
      </div>

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
          <a href="privacy.html">개인정보처리방침</a>
          <a href="terms.html">이용약관</a>
          <a href="consent.html">민감정보 동의</a>
          <a href="mailto:admin@bodacare.com">admin@bodacare.com</a>
        </div>
        <div className="bd-legal-footer-copy">© 2026 bodacare. All rights reserved.</div>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Reusable bits
// ─────────────────────────────────────────────────────────────
function LegalHeader({ kicker, title, updated, scope }) {
  return (
    <>
      <div className="bd-legal-kicker">{kicker}</div>
      <h1 className="bd-legal-title">{title}</h1>
      <div className="bd-legal-meta">
        <span><strong>최종 업데이트</strong> · {updated}</span>
        <span><strong>적용 대상</strong> · {scope}</span>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// PRIVACY POLICY
// ─────────────────────────────────────────────────────────────
function PrivacyDoc() {
  return (
    <LegalLayout docKey="privacy">
      <LegalHeader
        kicker="LEGAL"
        title="개인정보처리방침"
        updated="2026년 5월 27일"
        scope="Bodacare 모바일 앱 및 bodacare.com"
      />
      <div className="bd-legal-body">
        <h2>한눈에 보기</h2>
        <ul>
          <li>회원님의 데이터는 회원님 본인의 기능 이용을 위해서만 사용됩니다.</li>
          <li><strong>운영자는 회원님의 건강 데이터를 직접 열람하거나 분석하지 않습니다.</strong></li>
          <li>외부에 판매·공유하지 않으며, 마케팅·광고 등 다른 목적으로 사용하지 않습니다.</li>
          <li>처방전·검사지·식단 등 사진 원본은 저장하지 않고, AI 분석 결과(텍스트)만 보관합니다.</li>
          <li>회원 탈퇴 시 모든 데이터가 즉시 삭제됩니다.</li>
        </ul>
        <p>아래는 위 내용을 법적 요건에 맞춰 상세히 풀어 쓴 처리방침입니다.</p>

        <h2>운영자 및 개인정보 보호책임자</h2>
        <p>'Bodacare'(이하 "서비스")는 Bodacare 운영자(이하 "운영자")가 운영합니다.</p>
        <ul>
          <li>개인정보 보호책임자: Won Seok Chang</li>
          <li>개인정보 관련 문의: <a href="mailto:admin@bodacare.com">admin@bodacare.com</a></li>
        </ul>

        <h2>제1조 (수집하는 개인정보 항목 및 수집 방법)</h2>
        <p>서비스는 다음의 개인정보를 수집합니다.</p>
        <ul>
          <li><strong>필수 항목</strong>: 휴대전화번호 또는 이메일, 비밀번호, 출생연도, 성별, 접속 로그</li>
          <li><strong>민감정보(건강 관련 정보)</strong>: 복약 일정 및 기록, 혈압·혈당·체중, 체성분(골격근량·체지방량·체지방률), 검사결과 수치, 식단·운동·영양 기록, AI 채팅 내용, 그리고 사용자가 촬영·업로드한 처방전·약 봉투·검사지·식단·InBody 결과지 이미지</li>
          <li><strong>알림 정보</strong>: 푸시 알림 발송을 위한 기기 푸시 토큰</li>
          <li><strong>선택 항목</strong>: 광고성 정보(이벤트·프로모션) 수신 동의 일시</li>
          <li><strong>수집 방법</strong>: 회원가입 및 서비스 이용 과정에서의 사용자 직접 입력, 카메라·사진 보관함을 통한 이미지 업로드, 휴대전화 본인확인(SMS 인증)</li>
        </ul>
        <em>※ 이미지 원본은 운영자 서버에 저장(보관)하지 않습니다. 이미지는 AI 분석(텍스트 추출)을 위해 제4조의 위탁사(Google Gemini)로 전송되며, 분석 결과(텍스트·구조화된 데이터)만 운영자의 데이터베이스에 저장됩니다.</em>

        <h2>제2조 (개인정보의 수집 및 이용 목적)</h2>
        <p>수집된 개인정보는 다음 목적으로만 이용됩니다.</p>
        <ul>
          <li><strong>회원 인증</strong>: 휴대전화 본인확인(SMS 인증) 및 계정 보안</li>
          <li><strong>핵심 기능 제공</strong>: 복약 알림 생성, 건강 지표 기록·시각화·모니터링</li>
          <li><strong>AI 기능 제공</strong>: 식단 사진 분석, 처방전·검사지 등의 이미지 텍스트 추출(OCR), AI 영양·검사결과 상담</li>
          <li><strong>데이터 공유</strong>: 사용자가 명시적으로 연결한 보호자(케어 서클)에게 건강 데이터 전송, 보호자가 사용자를 위해 등록한 복약 정보를 사용자에게 전달(사용자의 '수락' 후 알림이 활성화됨)</li>
          <li><strong>케어 서클 알림</strong>: 보호자 연결 요청·수락·해제, 보호자가 사용자를 위해 추가한 복약 정보 등 케어 서클 내 활동 발생 시 상대방에게 푸시 알림 전송. 수신자 단말의 알림 폭주를 방지하기 위해 분당 발송량을 제한합니다.</li>
          <li><strong>프로모션 운영</strong>: 추천인(친구 초대) 보너스 및 초대 코드 등록을 통한 AI 토큰·프리미엄 혜택 부여</li>
          <li><strong>고객 지원</strong>: 서비스 공지 전달 및 문의 처리</li>
          <li><strong>광고성 정보 발송</strong>: 별도 동의를 한 회원에 한해 이벤트·프로모션 안내(언제든 철회 가능)</li>
        </ul>
        <p>운영자는 위 목적 외에 회원님의 건강 데이터를 직접 열람·분석하지 않으며, 동의하지 않은 마케팅·광고·통계 등 다른 용도로 사용하지 않습니다.</p>

        <h2>제3조 (민감정보 처리에 대한 별도 동의)</h2>
        <p>사용자의 건강 정보는 개인정보보호법상 '민감정보'에 해당하며, 운영자는 서비스 이용 시작 시 일반 개인정보와 분리하여 명시적인 별도 동의를 받습니다. 동의하지 않을 경우 건강 관리 기능을 이용할 수 없습니다.</p>

        <h2>제4조 (개인정보의 처리위탁 및 제3자 제공)</h2>
        <p>서비스 운영을 위해 다음과 같이 개인정보 처리를 위탁하며, 위탁받는 자는 위탁 목적 범위 내에서만 정보를 처리합니다.</p>
        <ul>
          <li><strong>Supabase, Inc. (미국)</strong>: 서비스 데이터의 클라우드 저장·운영, 사용자 인증, 외부 인증 토큰(Apple·Google) 검증. 위탁 항목: 회원 식별자, 이메일, 휴대전화번호, 본 처리방침 제1조의 모든 항목.</li>
          <li><strong>Google LLC (미국)</strong>: (1) 식단 사진 분석, 이미지 텍스트 추출(OCR), AI 상담을 위해 Google Gemini API로 사용자가 입력·업로드한 이미지 및 건강 관련 텍스트 전송·처리. 이미지 원본은 운영자 서버에 저장되지 않으며, 분석 결과(텍스트·수치)만 보관됩니다. (2) 'Google로 로그인' 이용 시 Google 계정의 식별자·이메일·이름 수신 및 ID 토큰 검증.</li>
          <li><strong>Apple Inc. (미국)</strong>: 'Apple로 로그인' 이용 시 Apple 식별자(sub) 및 사용자가 공유에 동의한 이메일·이름 수신 및 ID 토큰 검증.</li>
          <li><strong>Kakao Corp. (대한민국)</strong>: '카카오로 로그인' 이용 시 카카오 계정 식별자·닉네임·이메일(사용자 동의 항목) 수신 및 토큰 검증.</li>
          <li><strong>네이버클라우드 주식회사 (대한민국)</strong>: 휴대전화 본인확인(SMS 인증) 메시지 발송 (Naver Cloud Platform SENS). 위탁 항목: 휴대전화번호, 인증번호.</li>
          <li><strong>Expo (미국)</strong>: 복약 알림 등 푸시 알림 발송. 위탁 항목: 기기 푸시 토큰, 알림 본문(약 이름·시각 등).</li>
          <li><strong>RevenueCat, Inc. (미국)</strong>: 인앱 구매(AI 토큰·프리미엄 구독) 영수증 검증 및 구독 상태 관리. 위탁 항목: 서비스 내 회원 식별자, 구매 영수증, 구독 상태.</li>
          <li><strong>Apple Inc. (App Store, 미국)</strong>: iOS 인앱 결제 처리. 결제 수단·청구 정보는 Apple이 직접 수집·보관하며 운영자는 영수증 및 거래 식별자만 전달받습니다.</li>
          <li><strong>Google LLC (Google Play, 미국)</strong>: Android 인앱 결제 처리. 결제 수단·청구 정보는 Google이 직접 수집·보관하며 운영자는 영수증 및 거래 식별자만 전달받습니다.</li>
        </ul>
        <p><em>※ Apple·Google·Kakao는 사용자가 해당 소셜 로그인 버튼을 직접 사용한 경우에만 호출되며, 각 사의 자체 개인정보 처리 정책이 함께 적용됩니다.</em></p>
        <p>위 위탁 외에, 사용자가 앱 내 기능으로 직접 연결한 보호자에게만 건강 데이터가 공유됩니다. 운영자는 그 밖의 목적으로 개인정보를 제3자에게 제공하거나 마케팅 목적으로 외부에 공유하지 않습니다. 단, 법령에 따르거나 법령에 정해진 절차에 따른 수사기관의 요구가 있는 경우는 예외로 합니다.</p>

        <h2>제5조 (개인정보의 보유 및 파기)</h2>
        <ol>
          <li>회원의 개인정보는 회원 탈퇴 시 또는 수집·이용 동의 철회 시 지체 없이 파기합니다.</li>
          <li>단, 관련 법령(통신비밀보호법 등)에 따라 보존이 필요한 접속 로그 등의 정보는 해당 법령에서 정한 기간 경과 후 파기됩니다.</li>
        </ol>

        <h2>제6조 (사용자의 권리 및 행사 방법)</h2>
        <p>사용자는 언제든지 앱 내 '프로필' 화면에서 자신의 정보를 조회·수정할 수 있으며, '계정 삭제' 기능을 통해 직접 회원 탈퇴 및 데이터 삭제를 요청할 수 있습니다. 추가 문의는 <a href="mailto:admin@bodacare.com">admin@bodacare.com</a> 으로 연락해 주시기 바랍니다.</p>

        <h2>제7조 (개인정보의 안전성 확보 조치)</h2>
        <p>운영자는 사용자 정보를 보호하기 위해 다음 조치를 취합니다.</p>
        <ul>
          <li>비밀번호 등 주요 데이터의 암호화 저장</li>
          <li>개인정보 전송 시 암호화 통신(SSL/TLS) 적용</li>
          <li>데이터 접근 권한의 제한 및 관리</li>
        </ul>

        <h2>제8조 (만 14세 미만 아동)</h2>
        <p>서비스는 만 14세 이상을 대상으로 하며, 만 14세 미만 아동의 개인정보를 수집하지 않습니다.</p>

        <h2>제9조 (처리방침의 변경)</h2>
        <p>본 처리방침이 변경되는 경우 앱 내 공지 및 bodacare.com을 통해 고지합니다.</p>
      </div>
    </LegalLayout>
  );
}

// ─────────────────────────────────────────────────────────────
// TERMS OF SERVICE
// ─────────────────────────────────────────────────────────────
function TermsDoc() {
  return (
    <LegalLayout docKey="terms">
      <LegalHeader
        kicker="LEGAL"
        title="이용약관"
        updated="2026년 5월 27일"
        scope="Bodacare 모바일 앱 및 bodacare.com"
      />
      <div className="bd-legal-body">
        <h2>제1조 (목적)</h2>
        <p>본 약관은 'Bodacare'(이하 "서비스")가 제공하는 복약 관리, 건강 지표 기록 및 AI 상담 서비스의 이용 조건과 절차, 운영자와 회원 간의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.</p>

        <h2>제2조 (운영자 정보)</h2>
        <p>서비스는 Bodacare 운영자(이하 "운영자")가 운영합니다.</p>
        <ul>
          <li>문의: <a href="mailto:admin@bodacare.com">admin@bodacare.com</a></li>
          <li>웹사이트: <a href="https://bodacare.com">https://bodacare.com</a></li>
        </ul>

        <h2>제3조 (의료 정보에 관한 고지 및 면책)</h2>
        <ol>
          <li>서비스는 사용자의 자가 건강 관리를 돕는 보조 도구이며, 전문적인 의료 진단·조언·치료를 대체하지 않습니다.</li>
          <li>AI 기능이 제공하는 분석 및 상담 결과를 포함하여 서비스의 모든 정보는 참고용입니다. 회원은 의학적 결정이나 복약 변경 전 반드시 전문 의료진과 상의해야 합니다.</li>
          <li>서비스는 응급 의료 상황을 위한 기능이 아니며, 위급 상황 발생 시 회원은 즉시 응급 서비스(119 등)를 이용해야 합니다.</li>
        </ol>

        <h2>제4조 (이용 자격 및 연령 제한)</h2>
        <ol>
          <li>서비스는 만 14세 이상의 사용자를 대상으로 합니다.</li>
          <li>만 14세 미만 아동은 서비스를 이용할 수 없습니다.</li>
        </ol>

        <h2>제5조 (AI 기능 및 토큰)</h2>
        <ol>
          <li>식단 사진 분석, 검사결과 상담, AI 영양사 등 일부 AI 기능은 'AI 토큰' 또는 '프리미엄' 자격을 소모·요구합니다.</li>
          <li>토큰 및 프리미엄 자격은 가입 보너스, 추천인(친구 초대) 보너스, 초대 코드 등록, 인앱 구매(제6조)의 형태로 제공되며, 서비스 정책 및 시스템 보호를 위한 사용량 제한과 함께 변경될 수 있습니다.</li>
          <li>비정상적인 자동화·다중 계정·악용 행위가 확인되는 경우 운영자는 사전 통지 없이 해당 토큰·프리미엄을 회수할 수 있습니다.</li>
        </ol>

        <h2>제6조 (인앱 구매 및 정기결제)</h2>
        <ol>
          <li>회원은 Apple App Store(iOS) 또는 Google Play(Android)의 인앱 결제를 통해 AI 토큰 묶음 또는 프리미엄 구독을 구매할 수 있습니다.</li>
          <li>결제 처리·환불·청구 분쟁은 각 플랫폼(Apple·Google)의 정책 및 절차에 따라 처리됩니다. 운영자는 회원의 결제 수단·청구 정보를 직접 수집·보관하지 않습니다.</li>
          <li>정기결제(프리미엄 구독)는 회원이 해당 플랫폼의 구독 관리 화면에서 해지하지 않는 한 자동으로 갱신됩니다. 해지 후에도 결제된 기간이 끝날 때까지 프리미엄 혜택은 유지됩니다.</li>
          <li>구매·환불·갱신 상태는 RevenueCat을 통해 운영자 서버와 동기화됩니다. 자세한 처리 위탁 내용은 개인정보처리방침 제4조를 참고하십시오.</li>
          <li>「전자상거래 등에서의 소비자보호에 관한 법률」에 따른 청약 철회 권리는 디지털 콘텐츠 특성상 사용·소비된 토큰이나 이미 제공된 프리미엄 기간에 대해서는 제한될 수 있으며, 미사용 토큰·미개시 구독에 한하여 관련 법령에 따라 청약 철회가 가능합니다.</li>
        </ol>

        <h2>제7조 (보호자 연결 및 케어 서클)</h2>
        <ol>
          <li>회원은 다른 회원을 보호자(케어기버) 또는 피보호자(본인의 데이터를 공유받을 대상)로 연결할 수 있으며, 연결은 양쪽 당사자의 명시적 수락이 있을 때에만 성립합니다.</li>
          <li>연결이 성립된 보호자는 피보호자가 공유 범위로 허용한 항목(복약, 영양 등)에 한하여 해당 데이터를 열람할 수 있습니다.</li>
          <li>보호자는 피보호자를 위해 복약 정보를 등록(제안)할 수 있으며, 해당 복약 알림은 피보호자가 앱 내에서 직접 '수락'한 이후에만 활성화됩니다. 수락 전에는 알림이 발생하지 않습니다.</li>
          <li>연결 요청, 수락·거절, 보호자가 추가한 복약 정보 등 케어 서클 내 주요 활동은 상대방에게 푸시 알림으로 전달됩니다. 알림 폭주를 방지하기 위해 수신자당 분당 발송량은 제한됩니다.</li>
          <li>회원은 언제든지 앱 내에서 연결을 해제하거나 공유 범위를 변경할 수 있습니다. 해제 시 보호자의 접근 권한은 즉시 종료됩니다.</li>
        </ol>

        <h2>제8조 (사용자의 의무)</h2>
        <ol>
          <li>사용자는 본인의 정확한 건강 정보를 입력해야 하며, 허위 정보 입력으로 발생하는 결과의 책임은 사용자에게 있습니다.</li>
          <li>사용자는 계정 정보를 안전하게 관리해야 하며, 타인에게 공유하거나 도용해서는 안 됩니다.</li>
          <li>타인 명의 도용, 서비스 부정 이용, 시스템 침해 시도 등 운영을 방해하는 행위는 금지됩니다.</li>
        </ol>

        <h2>제9조 (서비스의 변경 및 중단)</h2>
        <ol>
          <li>운영자는 기술적 필요 또는 운영상 개선을 위해 서비스의 일부 또는 전부를 변경하거나 중단할 수 있습니다.</li>
          <li>중대한 변경이 있을 경우 앱 내 공지 및 bodacare.com을 통해 사전에 고지합니다.</li>
        </ol>

        <h2>제10조 (이용 제한 및 계약 해지)</h2>
        <ol>
          <li>회원이 본 약관을 위반하거나 서비스의 정상적인 운영을 방해하는 경우, 운영자는 이용을 제한하거나 계정을 삭제할 수 있습니다.</li>
          <li>회원은 언제든지 앱 내 '프로필'의 '계정 삭제' 기능으로 이용 계약을 해지할 수 있습니다.</li>
        </ol>

        <h2>제11조 (책임의 한계)</h2>
        <ol>
          <li>운영자는 천재지변, 네트워크 장애 등 통제할 수 없는 사유로 서비스를 제공할 수 없는 경우 책임을 지지 않습니다.</li>
          <li>운영자는 사용자가 입력한 데이터의 오류나 사용자의 부주의로 발생하는 문제에 대해 고의 또는 중과실이 없는 한 책임을 지지 않습니다.</li>
        </ol>

        <h2>제12조 (준거법)</h2>
        <p>본 약관은 대한민국 법률에 따라 해석되고 적용됩니다.</p>
      </div>
    </LegalLayout>
  );
}

// ─────────────────────────────────────────────────────────────
// SENSITIVE INFO CONSENT
// ─────────────────────────────────────────────────────────────
function ConsentDoc() {
  return (
    <LegalLayout docKey="consent">
      <LegalHeader
        kicker="LEGAL"
        title="민감정보 수집 및 이용 동의"
        updated="2026년 5월 27일"
        scope="Bodacare 모바일 앱"
      />
      <div className="bd-legal-body">
        <p className="lead">Bodacare는 복약 관리, 건강 지표 모니터링 및 AI 건강·영양 상담 서비스를 제공하기 위해 민감정보(건강정보)를 수집·이용합니다.</p>

        <h2>한눈에 보기</h2>
        <p>회원님의 건강 데이터는 회원님 본인의 기능 이용을 위해서만 사용됩니다.</p>
        <ul>
          <li><strong>운영자가 회원님 데이터를 직접 열람·분석하지 않습니다.</strong> 데이터는 회원님 계정 안에서 앱 화면 표시와 AI 기능 동작을 위해서만 자동으로 처리됩니다.</li>
          <li><strong>누구에게도 판매·공유하지 않습니다.</strong> 마케팅·광고·통계 등 다른 목적으로 사용되지 않습니다.</li>
          <li><strong>사진은 저장하지 않습니다.</strong> 처방전·검사지·식단·InBody 결과지 사진은 AI 분석 직후 폐기되고, 추출된 텍스트·수치만 보관됩니다.</li>
          <li><strong>회원 탈퇴 시 즉시 삭제됩니다.</strong> 언제든 앱 내 '계정 삭제'로 모든 데이터를 지울 수 있습니다.</li>
        </ul>
        <p>아래는 개인정보보호법 요건에 맞춰 위 내용을 상세히 풀어 쓴 동의서입니다.</p>

        <h2>1. 수집 및 이용 목적</h2>
        <ul>
          <li>복약 알림 생성 및 일정 관리</li>
          <li>혈압·혈당·체중·체성분 등 건강 지표의 기록·모니터링·시각화</li>
          <li>검사결과 및 식단·영양 데이터 기반 AI 상담 제공</li>
          <li>사용자가 지정한 보호자와의 건강 데이터 공유</li>
        </ul>

        <h2>2. 수집하는 민감정보 항목</h2>
        <ul>
          <li><strong>건강 지표</strong>: 복약 정보(처방 내역·약품명 등), 혈압, 혈당, 체중, 체성분(골격근량·체지방량·체지방률), 검사결과 수치</li>
          <li><strong>생활 기록</strong>: 식단·운동·영양 기록, AI 채팅 내용</li>
          <li><strong>이미지 정보(해당 기능 이용 시)</strong>: 텍스트 추출 및 분석을 위해 사용자가 촬영·업로드한 처방전·약 봉투·검사지·식단·InBody 결과지 이미지. 이미지 원본은 운영자 서버에 저장하지 않으며, 분석 결과(텍스트·수치)만 저장됩니다.</li>
        </ul>

        <h2>3. 제3자(AI) 처리에 관한 안내</h2>
        <p>식단 분석, 이미지 텍스트 추출(OCR), AI 상담 기능 제공을 위해 위 이미지 및 건강 관련 텍스트의 일부가 AI 처리 목적으로 Google LLC의 Gemini API로 전송·처리됩니다. 사진 원본은 운영자 서버에 저장하지 않으며, Google에서 추출한 분석 결과(텍스트·구조화된 데이터)만 보관됩니다. 본 동의에는 이러한 처리에 대한 동의가 포함됩니다.</p>

        <h2>4. 민감정보의 보유 및 이용 기간</h2>
        <p>회원 탈퇴 시 또는 민감정보 수집·이용 동의 철회 시 지체 없이 파기합니다. 단, 관계 법령에 따라 보존이 필요한 경우 해당 법령에서 정한 기간 동안 보관합니다.</p>

        <h2>5. 동의를 거부할 권리 및 불이익</h2>
        <p>사용자는 민감정보 수집·이용 동의를 거부할 권리가 있습니다. 다만 해당 정보는 Bodacare의 핵심 서비스 제공에 반드시 필요하므로, 동의를 거부하실 경우 서비스 가입 및 이용이 제한됩니다.</p>

        <h2>문의</h2>
        <p>민감정보 처리 관련 문의: <a href="mailto:admin@bodacare.com">admin@bodacare.com</a></p>
      </div>
    </LegalLayout>
  );
}

// ─────────────────────────────────────────────────────────────
// Router
// ─────────────────────────────────────────────────────────────
const DOC_COMPONENTS = { privacy: PrivacyDoc, terms: TermsDoc, consent: ConsentDoc };
const docKey = document.documentElement.dataset.doc || 'privacy';
const DocComponent = DOC_COMPONENTS[docKey] || PrivacyDoc;
ReactDOM.createRoot(document.getElementById('root')).render(<DocComponent />);
