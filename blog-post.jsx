/* global React, ReactDOM, CLMark, marked */
// bodacare — Dynamic blog post page.
// Reads ?slug=xxx from the URL, fetches the row from Supabase REST, renders
// the markdown body via marked. Posts not yet published (or wrong slug) get
// a friendly "글을 찾을 수 없습니다" view.
//
// Public Supabase anon key + URL — these are not secret; they're the same
// values shipped in the mobile app's bundled JS.
const SUPABASE_URL = 'https://wmzochdgnujalmgnvmku.supabase.co';
const SUPABASE_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indtem9jaGRnbnVqYWxtZ252bWt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2OTc1ODksImV4cCI6MjA5MzI3MzU4OX0.D4T9jlofOM7wqWZ0sf15jvFWom5L3jbACSDUn7MxkT0';

function getSlug() {
  const u = new URL(window.location.href);
  return u.searchParams.get('slug') || '';
}

function PostLayout({ title, children }) {
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

// Korean date formatter. published_at is an ISO timestamp; render as
// "2026년 5월 28일" to match the hardcoded posts' look.
function formatKoDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function DbPostPage() {
  const slug = getSlug();
  const [post, setPost] = React.useState(null);
  const [status, setStatus] = React.useState('loading'); // loading | found | notfound | error

  React.useEffect(() => {
    if (!slug) {
      setStatus('notfound');
      return;
    }
    fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${encodeURIComponent(slug)}&published=eq.true&select=*&limit=1`,
      {
        headers: {
          apikey: SUPABASE_ANON,
          Authorization: `Bearer ${SUPABASE_ANON}`,
        },
      },
    )
      .then((r) => r.json())
      .then((rows) => {
        if (Array.isArray(rows) && rows[0]) {
          setPost(rows[0]);
          setStatus('found');
        } else {
          setStatus('notfound');
        }
      })
      .catch(() => setStatus('error'));
  }, [slug]);

  if (status === 'loading') {
    return (
      <PostLayout>
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-500)' }}>
          불러오는 중…
        </div>
      </PostLayout>
    );
  }
  if (status === 'notfound') {
    return (
      <PostLayout title="글을 찾을 수 없습니다">
        <div className="bd-legal-kicker">BLOG</div>
        <h1 className="bd-legal-title">글을 찾을 수 없습니다</h1>
        <p style={{ marginTop: 16, color: 'var(--ink-500)' }}>
          요청하신 글이 비공개이거나 삭제되었을 수 있습니다.
        </p>
        <a
          href="/blog"
          style={{
            display: 'inline-block',
            marginTop: 20,
            color: 'var(--teal-700)',
            fontWeight: 600,
          }}
        >
          ← 블로그 홈으로
        </a>
      </PostLayout>
    );
  }
  if (status === 'error') {
    return (
      <PostLayout title="문제가 발생했습니다">
        <p style={{ padding: 40, textAlign: 'center', color: 'var(--ink-500)' }}>
          글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
        </p>
      </PostLayout>
    );
  }

  const html = marked.parse(post.body_md || '');

  return (
    <PostLayout title={post.title}>
      {post.category && <div className="bd-legal-kicker">{post.category}</div>}
      <h1 className="bd-legal-title">{post.title}</h1>
      <div className="bd-legal-meta">
        <span><strong>발행</strong> · {formatKoDate(post.published_at)}</span>
        {post.read_min && <span><strong>읽는 시간</strong> · 약 {post.read_min}분</span>}
      </div>
      <div
        className="bd-legal-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div
        style={{
          marginTop: 40,
          paddingTop: 28,
          borderTop: '1px solid var(--line-soft)',
          textAlign: 'center',
        }}
      >
        <a
          href="/blog"
          style={{ color: 'var(--teal-700)', fontWeight: 600, fontSize: 14 }}
        >
          블로그 전체 보기 →
        </a>
      </div>
    </PostLayout>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<DbPostPage />);
