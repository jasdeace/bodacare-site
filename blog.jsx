/* global React, ReactDOM, CLMark */
// bodacare — Blog index.
// All posts live in Supabase (managed via admin.bodacare.com → /blog).
// This page fetches published posts and links each to /blog/<slug>, which the
// Worker (worker.js) server-renders. There are no hardcoded posts anymore —
// the six originals were migrated into the blog_posts table.

const SUPABASE_URL = 'https://wmzochdgnujalmgnvmku.supabase.co';
const SUPABASE_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indtem9jaGRnbnVqYWxtZ252bWt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2OTc1ODksImV4cCI6MjA5MzI3MzU4OX0.D4T9jlofOM7wqWZ0sf15jvFWom5L3jbACSDUn7MxkT0';

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
          <div className="bd-legal-card">{children}</div>
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

function formatKoDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function BlogIndex() {
  const [posts, setPosts] = React.useState(null); // null = loading, [] = empty
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?published=eq.true&select=slug,title,excerpt,category,read_min,published_at,cover_image_url&order=published_at.desc`,
      {
        headers: {
          apikey: SUPABASE_ANON,
          Authorization: `Bearer ${SUPABASE_ANON}`,
        },
      },
    )
      .then((r) => r.json())
      .then((rows) => setPosts(Array.isArray(rows) ? rows : []))
      .catch(() => setError(true));
  }, []);

  return (
    <BlogLayout>
      <div className="bd-legal-kicker">BLOG</div>
      <h1 className="bd-legal-title">함께 챙기는<br/>건강 이야기</h1>
      <div className="bd-legal-meta">
        <span>가족 케어 · 만성질환 · AI 건강 활용에 관한 글</span>
      </div>

      <div className="bd-legal-body">
        {error && (
          <p style={{ color: 'var(--ink-500)' }}>
            글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
          </p>
        )}
        {posts === null && !error && (
          <p style={{ color: 'var(--ink-500)' }}>불러오는 중…</p>
        )}
        {posts && posts.length === 0 && (
          <p style={{ color: 'var(--ink-500)' }}>아직 발행된 글이 없습니다.</p>
        )}

        {posts && posts.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {posts.map((p) => (
              <a key={p.slug} href={`/blog/${encodeURIComponent(p.slug)}`} style={{
                display: 'block', overflow: 'hidden',
                background: 'var(--cream-50)',
                border: '1px solid var(--line-soft)',
                borderRadius: 18,
                textDecoration: 'none', color: 'inherit',
                transition: 'transform 180ms ease, border-color 180ms ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--teal-300)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line-soft)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {p.cover_image_url && (
                  <img src={p.cover_image_url} alt={p.title} loading="lazy"
                    style={{ width: '100%', height: 168, objectFit: 'cover', display: 'block' }} />
                )}
                <div style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8, fontSize: 12, color: 'var(--ink-500)' }}>
                    {p.category && <span style={{ padding: '3px 10px', background: 'var(--teal-100)', color: 'var(--teal-800)', borderRadius: 999, fontWeight: 700, fontSize: 11 }}>{p.category}</span>}
                    <span>{formatKoDate(p.published_at)}</span>
                    {p.read_min && <><span>·</span><span>{p.read_min}분</span></>}
                  </div>
                  <h3 style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8, lineHeight: 1.3 }}>{p.title}</h3>
                  {p.excerpt && <p style={{ fontSize: 14, color: 'var(--ink-500)', lineHeight: 1.65 }}>{p.excerpt}</p>}
                </div>
              </a>
            ))}
          </div>
        )}

        <h2 style={{ marginTop: 36 }}>구독 안내</h2>
        <p>
          새 글이 올라올 때 알림을 받고 싶으시다면 <a href="mailto:admin@bodacare.com?subject=블로그 구독">admin@bodacare.com</a> 으로 "구독 요청"이라고 보내주세요.
          서비스 정식 출시 후 이메일·푸시 알림 구독 기능을 앱 안에 추가할 예정입니다.
        </p>
      </div>
    </BlogLayout>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<BlogIndex />);
