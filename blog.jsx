/* global React, ReactDOM, CLMark */
// bodacare — Blog (index + posts)
// Each post HTML wrapper sets data-post on <html>.

const POSTS = {
  'remote-parent-meds': {
    title: '부모님 약, 멀리서도 챙기는 5가지 방법',
    excerpt: '주말에만 뵙는 부모님의 매일 복약, 어떻게 도울 수 있을까요? 한국 가족이 실제로 쓰는 실용적인 방법 다섯 가지.',
    date: '2026년 5월 28일',
    category: '돌봄',
    readMin: 5,
  },
  'top-3-chronic-disease': {
    title: '고혈압·당뇨·고지혈증 — 한국인 3대 만성질환 함께 관리하기',
    excerpt: '한국 65세 이상의 80% 이상이 보유한 만성질환. 가족이 함께 관리할 때 결과가 달라집니다.',
    date: '2026년 5월 27일',
    category: '건강 지식',
    readMin: 6,
  },
  'reading-lab-results': {
    title: '검사 결과지, 어디까지 알아야 할까?',
    excerpt: '병원에서 받아온 종이 한 장의 숫자들 — 정상 범위, 우려할 수치, 그리고 AI가 도와줄 수 있는 부분.',
    date: '2026년 5월 26일',
    category: '건강 지식',
    readMin: 7,
  },
};

// ─────────────────────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────────────────────
function BlogLayout({ title, children }) {
  React.useEffect(() => {
    document.title = title ? `${title} · bodacare 블로그` : '블로그 · bodacare';
  }, [title]);
  return (
    <div className="bd-legal">
      <nav className="bd-legal-nav">
        <div className="bd-legal-nav-inner">
          <a href="/" className="bd-logo">
            <CLMark size={26} />
            <span>bodacare</span>
          </a>
          <a href="/blog" className="bd-legal-back">← 블로그 홈</a>
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
          <a href="privacy.html">개인정보처리방침</a>
          <a href="terms.html">이용약관</a>
          <a href="mailto:admin@bodacare.com">admin@bodacare.com</a>
        </div>
        <div className="bd-legal-footer-copy">© 2026 bodacare. All rights reserved.</div>
      </footer>
    </div>
  );
}

function PostHeader({ title, date, category, readMin }) {
  return (
    <>
      <div className="bd-legal-kicker">{category}</div>
      <h1 className="bd-legal-title">{title}</h1>
      <div className="bd-legal-meta">
        <span><strong>발행</strong> · {date}</span>
        <span><strong>읽는 시간</strong> · 약 {readMin}분</span>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Index
// ─────────────────────────────────────────────────────────────
function BlogIndex() {
  return (
    <BlogLayout>
      <div className="bd-legal-kicker">BLOG</div>
      <h1 className="bd-legal-title">함께 챙기는<br/>건강 이야기</h1>
      <div className="bd-legal-meta">
        <span>가족 케어 · 만성질환 · AI 건강 활용에 관한 글</span>
      </div>

      <div className="bd-legal-body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {Object.entries(POSTS).map(([slug, p]) => (
            <a key={slug} href={`/blog-${slug}`} style={{
              display: 'block', padding: '22px 24px',
              background: 'var(--cream-50)',
              border: '1px solid var(--line-soft)',
              borderRadius: 18,
              textDecoration: 'none', color: 'inherit',
              transition: 'transform 180ms ease, border-color 180ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--teal-300)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line-soft)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8, fontSize: 12, color: 'var(--ink-500)' }}>
                <span style={{ padding: '3px 10px', background: 'var(--teal-100)', color: 'var(--teal-800)', borderRadius: 999, fontWeight: 700, fontSize: 11 }}>{p.category}</span>
                <span>{p.date}</span>
                <span>·</span>
                <span>{p.readMin}분</span>
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8, lineHeight: 1.3 }}>{p.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--ink-500)', lineHeight: 1.65 }}>{p.excerpt}</p>
            </a>
          ))}
        </div>

        <h2 style={{ marginTop: 36 }}>구독 안내</h2>
        <p>
          새 글이 올라올 때 알림을 받고 싶으시다면 <a href="mailto:admin@bodacare.com?subject=블로그 구독">admin@bodacare.com</a> 으로 "구독 요청"이라고 보내주세요.
          서비스 정식 출시 후 이메일·푸시 알림 구독 기능을 앱 안에 추가할 예정입니다.
        </p>
      </div>
    </BlogLayout>
  );
}

// ─────────────────────────────────────────────────────────────
// Post: Remote parent meds
// ─────────────────────────────────────────────────────────────
function PostRemoteParentMeds() {
  const p = POSTS['remote-parent-meds'];
  return (
    <BlogLayout title={p.title}>
      <PostHeader {...p} />
      <div className="bd-legal-body">
        <p>
          부모님이 약을 잘 챙겨 드시는지, 멀리 사는 자녀 입장에선 늘 마음에 걸립니다. 매일 전화해서
          물어볼 수도 없고, 부모님께서 "다 먹었다"고 하셔도 정말 그런지 확인할 길이 없습니다. 한국
          65세 이상의 만성질환 보유율은 80%가 넘고, 평균 4가지 이상의 약을 복용한다는 통계도
          있습니다. 약 한 번 빠뜨리는 것이 큰 사건은 아니지만, 매일 반복되면 혈압·혈당·콜레스테롤
          조절에 직접 영향을 줍니다.
        </p>
        <p>아래는 실제 한국 가족이 부모님 복약을 멀리서 챙기기 위해 쓰는 방법 다섯 가지입니다.</p>

        <h2>1. 처방전 사진 한 장으로 약 정보 정리</h2>
        <p>
          부모님이 병원에서 받아오신 처방전을 카메라로 찍으면 약 이름·용량·복용 시간을 자동으로
          정리할 수 있는 앱들이 있습니다. 약통 라벨을 일일이 옮겨 적을 필요가 없고, 약 이름의
          한자나 영문 명칭을 헷갈릴 일도 줄어듭니다. Bodacare는 식약처(MFDS) 공식 약품 데이터를
          기반으로 매칭하기 때문에 약품명·효능·주의사항이 자동으로 채워집니다.
        </p>

        <h2>2. 복용 시간 알림은 본인 휴대폰에</h2>
        <p>
          가장 흔한 실패 패턴은 "약을 어디 두었는지 잊으셨다"가 아니라 "약을 챙기실 시간을
          잊으셨다"입니다. 시간이 되면 본인 휴대폰에서 부드러운 알림이 한 번. "지금 복용" 버튼만
          누르면 기록이 끝납니다. 부모님이 디지털에 익숙하지 않으셔도 부담 없이 쓸 수 있어야 합니다.
        </p>

        <h2>3. 가족이 함께 보는 시스템</h2>
        <p>
          제가 부모님과 떨어져 살더라도, 부모님이 오늘 약을 드셨는지 제 화면에서 바로 확인할 수
          있어야 합니다. Bodacare의 "케어 그룹" 기능은 본인이 직접 초대한 가족만 데이터를 볼 수
          있게 해주고, 가족별로 공개 범위(약·혈압·식단)를 따로 정할 수 있습니다. 자녀에게는 약과
          혈압만, 배우자에게는 식단까지 — 식의 세분화가 가능합니다.
        </p>

        <h2>4. 놓친 약은 "재촉하기"로 한 번에</h2>
        <p>
          복용 시간이 지났는데 기록이 없으면, 자녀 측에서 한 번의 탭으로 "약 챙기실 시간이에요"
          알림을 부모님께 보낼 수 있습니다. 잔소리처럼 들리지 않게, 시스템을 통한 부드러운 알림으로요.
          이 작은 안전망이 매일의 복약률을 크게 끌어올립니다.
        </p>

        <h2>5. 검사 결과·혈압도 같이 추적</h2>
        <p>
          약만 챙기는 것으로는 부족합니다. 매주 측정하는 혈압, 분기마다 받는 검사 결과지 — 이
          모든 게 한 곳에 모여 추세를 보여야 합니다. 약을 잘 드시는데 혈압이 올라가고 있다면, 그건
          약 효과가 떨어지거나 다른 원인이 생긴 것일 수 있습니다. 변화를 일찍 알아채는 게 멀리
          사는 가족이 할 수 있는 가장 중요한 일입니다.
        </p>

        <h2>한 가지 더 — 부모님을 주체로</h2>
        <p>
          이 모든 시스템의 핵심 원칙: <strong>부모님이 데이터의 주인</strong>이라는 점입니다. 자녀가
          모든 걸 보고 통제하는 것이 아니라, 부모님이 "이 자료는 보여드려도 된다"고 정해주신 만큼만
          공유됩니다. 존엄을 지키면서 함께 챙기는 것 — 이게 진짜 돌봄입니다.
        </p>

        <p style={{ marginTop: 28, padding: '16px 20px', background: 'var(--teal-50, var(--cream-100))', borderRadius: 14, border: '1px solid var(--line-soft)', fontSize: 14 }}>
          <strong>Bodacare에서 해볼 수 있는 것</strong>: 처방전 자동 입력, 보호자가 약 등록 → 본인이 수락, 가족 실시간 복용 확인, 약 복용 재촉, 검사 결과 OCR + AI 해석.
          <br/><a href="/" style={{ color: 'var(--teal-700)', fontWeight: 600 }}>앱 자세히 보기 →</a>
        </p>
      </div>
    </BlogLayout>
  );
}

// ─────────────────────────────────────────────────────────────
// Post: 3 chronic diseases
// ─────────────────────────────────────────────────────────────
function PostTop3Chronic() {
  const p = POSTS['top-3-chronic-disease'];
  return (
    <BlogLayout title={p.title}>
      <PostHeader {...p} />
      <div className="bd-legal-body">
        <p>
          국민건강보험공단 자료에 따르면, 한국 65세 이상의 약 80%가 한 가지 이상의 만성질환을 가지고
          있고, 절반 가까이는 두 가지 이상을 동시에 앓고 있습니다. 그중 가장 흔한 세 가지는
          <strong> 고혈압·당뇨·고지혈증</strong>입니다. 이 세 질환은 따로 보이지만 서로 깊이 연결돼
          있고, 관리 방식도 비슷합니다.
        </p>

        <h2>고혈압 — 조용한 위험</h2>
        <p>
          정상 혈압은 수축기 120 미만 / 이완기 80 미만 (mmHg). 140/90 이상이면 고혈압으로 진단됩니다.
          증상이 거의 없어서 "조용한 살인자"로 불리지만, 방치하면 뇌졸중·심근경색·신부전의 위험을
          크게 높입니다. 관리의 핵심은 <strong>매일 같은 시간 측정 → 추세 관찰 → 약 꾸준히 복용</strong>
          입니다. 한 번 측정한 수치보다 일주일 평균이 더 의미가 있습니다.
        </p>

        <h2>당뇨 — 식사가 곧 치료</h2>
        <p>
          공복혈당 100 미만이 정상, 126 이상이면 당뇨로 진단됩니다. 당뇨는 약만으로 관리되지 않습니다.
          <strong> 식사·운동·약</strong> 세 가지가 같이 가야 효과가 납니다. 특히 식단은 한 끼만
          잘못 먹어도 혈당이 크게 출렁입니다. AI 식단 분석을 활용하면 "이 음식이 얼마나 혈당을
          올릴지" 미리 알 수 있어요. 가족이 함께 식단을 보는 것이 큰 도움이 됩니다.
        </p>

        <h2>고지혈증 — 검사 수치로 발견</h2>
        <p>
          증상이 거의 없습니다. 보통 건강검진에서 LDL 콜레스테롤(나쁜 콜레스테롤)이 130 이상으로
          나오면 의심합니다. 160 이상이면 약물 치료 대상이 됩니다. 식사 조절(포화지방·트랜스지방
          줄이기)과 유산소 운동이 기본이고, 필요하면 스타틴 계열 약을 평생 복용합니다. 약 복용
          누락이 가장 큰 위험 요인입니다.
        </p>

        <h2>세 질환의 공통점 — 그리고 가족이 할 수 있는 일</h2>
        <p>
          이 세 가지는 모두 (1) 증상이 거의 없고 (2) 매일 관리가 필요하고 (3) 약을 꾸준히 복용해야
          하고 (4) 검사 수치로 결과를 확인합니다. 즉, <strong>본인 혼자 매일 챙기기 힘든
          구조</strong>입니다. 한국에서 부모님이 이 세 가지 중 하나라도 있다면, 자녀가 옆에서 같이
          보는 것만으로도 결과가 달라집니다.
        </p>

        <h2>실제 사례 — 함께 보면 빨리 알아챕니다</h2>
        <p>
          어느 가족의 이야기입니다. 어머니가 평소 혈압이 120/80으로 안정적이셨는데, 어느 날부터
          135/88로 조금씩 올라가기 시작했습니다. 어머니 본인은 "그 정도면 괜찮다"고 하셨지만,
          앱에서 추세를 보던 딸이 "이거 지난 2주 동안 계속 올라가요"라고 발견. 병원에 가서 약 용량
          조절을 받았고 다시 안정화됐습니다. 혼자 보면 그날그날 숫자, 함께 보면 추세가 보입니다.
        </p>

        <h2>핵심 정리</h2>
        <ul>
          <li>이 세 질환의 80%는 약·식단·운동의 일상 관리로 컨트롤 가능합니다</li>
          <li>매일의 작은 데이터가 모이면 추세가 보입니다 — 한 번의 수치보다 일주일 평균</li>
          <li>가족이 함께 보면 변화를 빨리 알아챕니다</li>
          <li>본인의 동의와 통제하에 데이터를 공유하는 것이 핵심입니다</li>
        </ul>

        <p style={{ marginTop: 28, padding: '16px 20px', background: 'var(--cream-100)', borderRadius: 14, border: '1px solid var(--line-soft)', fontSize: 14 }}>
          <strong>⚠ 의료 면책</strong>: 이 글은 일반 정보 제공 목적이며 의료 진단·치료를 대체하지 않습니다. 진단·약 변경 등은 반드시 의료진과 상의하세요.
        </p>
      </div>
    </BlogLayout>
  );
}

// ─────────────────────────────────────────────────────────────
// Post: Reading lab results
// ─────────────────────────────────────────────────────────────
function PostReadingLabResults() {
  const p = POSTS['reading-lab-results'];
  return (
    <BlogLayout title={p.title}>
      <PostHeader {...p} />
      <div className="bd-legal-body">
        <p>
          병원에서 받아온 검사 결과지 한 장. 수십 개의 영어 약자와 숫자들. "정상"이라고 적혀
          있어도 어디가 어떻게 정상인지, 무엇을 조심해야 하는지 막막합니다. 의사 선생님은 한 줄로
          요약해 주시지만, 집에 와서 자료를 다시 보면 또 모릅니다. 검사 결과지의 핵심 수치 몇 가지를
          알면, 이 막막함이 줄어듭니다.
        </p>

        <h2>꼭 알아야 할 핵심 수치</h2>

        <h3>혈압</h3>
        <p>
          <strong>정상</strong> 120/80 mmHg 미만 · <strong>주의</strong> 120-139 / 80-89 ·
          <strong>고혈압</strong> 140/90 이상.
          앞 숫자는 수축기(심장이 짤 때), 뒤는 이완기(쉴 때) 압력입니다. 한 번 높다고 고혈압이
          아니라 여러 번 측정해서 평균을 봅니다.
        </p>

        <h3>공복혈당</h3>
        <p>
          <strong>정상</strong> 100 mg/dL 미만 · <strong>당뇨 전 단계</strong> 100-125 ·
          <strong>당뇨</strong> 126 이상.
          공복 8시간 후 측정한 혈당입니다. 식후 2시간 혈당, 당화혈색소(HbA1c)와 함께 봐야 정확해요.
        </p>

        <h3>당화혈색소 (HbA1c)</h3>
        <p>
          <strong>정상</strong> 5.7% 미만 · <strong>당뇨 전</strong> 5.7-6.4 · <strong>당뇨</strong> 6.5% 이상.
          지난 2-3개월 동안의 평균 혈당 상태를 보여주는 수치입니다. 한 번의 혈당보다 추세를
          잘 반영해서, 당뇨 관리에서 가장 중요한 지표입니다.
        </p>

        <h3>콜레스테롤 (지질 검사)</h3>
        <p>
          <strong>총 콜레스테롤</strong> 200 mg/dL 미만 정상 · <strong>LDL(나쁜)</strong> 130 미만 ·
          <strong>HDL(좋은)</strong> 60 이상 · <strong>중성지방</strong> 150 미만.
          LDL이 높을수록 동맥경화·심근경색 위험이 올라갑니다. 반대로 HDL은 높을수록 좋아요.
        </p>

        <h3>신장 기능 (eGFR · 크레아티닌)</h3>
        <p>
          <strong>eGFR 정상</strong> 90 이상 · <strong>경증 저하</strong> 60-89 · <strong>심각</strong> 60 미만.
          신장이 노폐물을 거르는 능력을 수치화한 것입니다. 60 미만으로 떨어지면 만성 신장병으로
          분류돼 약 용량 조절이 필요할 수 있습니다.
        </p>

        <h3>간 기능 (AST · ALT)</h3>
        <p>
          <strong>정상</strong> 둘 다 40 U/L 미만 (검사실마다 약간 다름).
          간 세포가 손상되면 올라가는 수치입니다. 술·약·간염·지방간 등이 원인이 될 수 있어요.
          한 번 높다고 큰일 난 게 아니라, 재검에서도 계속 높으면 정밀 검사로 넘어갑니다.
        </p>

        <h2>"정상"이 항상 안심은 아닙니다</h2>
        <p>
          모든 수치가 "정상 범위" 안에 있어도, <strong>지난 검사보다 크게 변했다면</strong> 주목해야
          합니다. 예를 들어 작년 LDL이 90이었는데 올해 125라면, 둘 다 "정상" 범위지만 35만큼
          올라간 변화 자체가 의미 있는 신호입니다. 그래서 검사 결과는 한 장으로 보지 않고
          시간 순서대로 모아 보는 게 중요해요.
        </p>

        <h2>AI가 도와줄 수 있는 부분</h2>
        <p>
          Bodacare에서는 검사 결과지를 카메라로 찍으면 자동으로 수치를 정리해주고, AI가 "지난번
          대비 어떻게 변했는지, 이 수치가 무엇을 의미하는지, 무엇을 주의해야 하는지"를 대화로
          설명해 드립니다. 의료 진단을 대신하는 건 아니지만, 막막한 자료지를 푸는 첫걸음으로는
          큰 도움이 됩니다.
        </p>

        <h2>마지막으로 — 의사를 대체할 수 없습니다</h2>
        <p>
          이 글의 모든 수치 범위는 일반적인 기준이며, 사람마다·검사실마다 약간 다를 수 있습니다.
          나이·기저질환·복용 중인 약에 따라 해석도 달라집니다. 본인의 결과는 반드시 진료 의사와
          상의하시고, AI나 인터넷 자료는 어디까지나 보조용임을 잊지 마세요.
        </p>

        <p style={{ marginTop: 28, padding: '16px 20px', background: 'var(--cream-100)', borderRadius: 14, border: '1px solid var(--line-soft)', fontSize: 14 }}>
          <strong>⚠ 의료 면책</strong>: 이 글은 일반 정보 제공 목적이며 의료 진단·치료를 대체하지 않습니다. 진단·약 변경 등은 반드시 의료진과 상의하세요.
        </p>
      </div>
    </BlogLayout>
  );
}

// ─────────────────────────────────────────────────────────────
// Router — reads data-post on <html>, falls back to index
// ─────────────────────────────────────────────────────────────
const POST_COMPONENTS = {
  'remote-parent-meds': PostRemoteParentMeds,
  'top-3-chronic-disease': PostTop3Chronic,
  'reading-lab-results': PostReadingLabResults,
};
const postKey = document.documentElement.dataset.post;
const RootComponent = (postKey && POST_COMPONENTS[postKey]) || BlogIndex;
ReactDOM.createRoot(document.getElementById('root')).render(<RootComponent />);
