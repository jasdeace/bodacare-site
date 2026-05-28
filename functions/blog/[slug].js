// Cloudflare Pages Function — server-rendered blog post at /blog/<slug>.
//
// Why this exists: posts live in Supabase (editable from admin) but a
// client-only React page gives crawlers a generic <title>/og: and makes
// KakaoTalk/Naver previews useless. This function fetches the post at the
// edge and returns a complete HTML document with per-post title, meta
// description, Open Graph tags, canonical URL, and JSON-LD — so Google,
// Naver, and social unfurlers all see real content without running JS.
//
// Rendering is a self-contained Markdown subset renderer (headings, bold,
// italic, links, ordered/unordered lists, blockquotes, paragraphs) — the
// exact subset the admin editor produces. No npm/build step, matching this
// site's no-build design.

const SUPABASE_URL = 'https://wmzochdgnujalmgnvmku.supabase.co';
const SUPABASE_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indtem9jaGRnbnVqYWxtZ252bWt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2OTc1ODksImV4cCI6MjA5MzI3MzU4OX0.D4T9jlofOM7wqWZ0sf15jvFWom5L3jbACSDUn7MxkT0';

const SITE = 'https://bodacare.com';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
// For values inside HTML attributes (title/og/json).
function escapeAttr(s) {
  return escapeHtml(s).replace(/"/g, '&quot;');
}

// Inline markdown: links → bold → italic. Text is HTML-escaped first; the
// tags we insert are not re-escaped.
function inline(s) {
  let t = escapeHtml(s);
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text, url) => {
    const safe = String(url).replace(/"/g, '%22');
    return `<a href="${safe}">${text}</a>`;
  });
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
  return t;
}

function renderMarkdown(md) {
  const lines = String(md).replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let i = 0;
  const isBlockStart = (l) => /^(#{1,3}\s|>\s?|[-*]\s|\d+\.\s)/.test(l);
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === '') { i++; continue; }

    if (/^###\s+/.test(line)) { out.push(`<h3>${inline(line.replace(/^###\s+/, ''))}</h3>`); i++; continue; }
    if (/^##\s+/.test(line)) { out.push(`<h2>${inline(line.replace(/^##\s+/, ''))}</h2>`); i++; continue; }
    if (/^#\s+/.test(line)) { out.push(`<h2>${inline(line.replace(/^#\s+/, ''))}</h2>`); i++; continue; }

    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^>\s?/, '')); i++; }
      const inner = buf.filter((l) => l.trim() !== '').map((l) => `<p>${inline(l)}</p>`).join('');
      out.push(`<blockquote>${inner}</blockquote>`);
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      const buf = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) { buf.push(`<li>${inline(lines[i].replace(/^[-*]\s+/, ''))}</li>`); i++; }
      out.push(`<ul>${buf.join('')}</ul>`);
      continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      const buf = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) { buf.push(`<li>${inline(lines[i].replace(/^\d+\.\s+/, ''))}</li>`); i++; }
      out.push(`<ol>${buf.join('')}</ol>`);
      continue;
    }
    const buf = [];
    while (i < lines.length && lines[i].trim() !== '' && !isBlockStart(lines[i])) { buf.push(lines[i]); i++; }
    out.push(`<p>${inline(buf.join(' '))}</p>`);
  }
  return out.join('\n');
}

function koDate(iso) {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'Asia/Seoul', year: 'numeric', month: 'long', day: 'numeric',
    }).format(new Date(iso));
  } catch {
    return '';
  }
}

// Inlined brand mark (CLMark) — literal hex since SVG attributes can't read
// CSS custom properties.
const MARK = `<svg width="26" height="26" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" style="display:block">
<rect width="64" height="64" rx="18" fill="#0F766E"/>
<g transform="translate(32 32) rotate(-32) translate(-22 -9)">
<rect x="0" y="0" width="44" height="18" rx="9" fill="#FAF7F1"/>
<path d="M22 0 H44 a9 9 0 0 1 9 9 v0 a9 9 0 0 1 -9 9 H22 Z" fill="#E8927C" transform="translate(-9 0)"/>
<rect x="21" y="0" width="2" height="18" fill="rgba(15,44,46,0.10)"/>
<path d="M5 9 L13 9 L16 4 L20 14 L24 7 L28 9 L40 9" fill="none" stroke="rgba(15,44,46,0.85)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</g></svg>`;

function shell({ title, description, canonical, bodyHtml, jsonLd, status }) {
  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#FAF7F1" />
<title>${escapeAttr(title)}</title>
<meta name="description" content="${escapeAttr(description)}" />
<link rel="canonical" href="${escapeAttr(canonical)}" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<meta property="og:type" content="article" />
<meta property="og:title" content="${escapeAttr(title)}" />
<meta property="og:description" content="${escapeAttr(description)}" />
<meta property="og:url" content="${escapeAttr(canonical)}" />
<meta property="og:image" content="${SITE}/og.png" />
<meta property="og:site_name" content="bodacare" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
<link rel="stylesheet" href="/styles.css?v=7" />
<link rel="stylesheet" href="/legal.css?v=8" />
${jsonLd ? `<script type="application/ld+json">${jsonLd}</script>` : ''}
</head>
<body>
<div class="bd-legal">
  <nav class="bd-legal-nav">
    <div class="bd-legal-nav-inner">
      <a href="/" class="bd-logo">${MARK}<span>bodacare</span></a>
      <a href="/blog" class="bd-legal-back">← 블로그 홈</a>
    </div>
  </nav>
  <main class="bd-legal-main">
    <div class="bd-legal-doc">
      <div class="bd-legal-card">
${bodyHtml}
      </div>
    </div>
  </main>
  <footer class="bd-legal-footer">
    <div class="bd-legal-footer-row">
      <a href="/">메인</a>
      <a href="/about">회사 소개</a>
      <a href="/privacy.html">개인정보처리방침</a>
      <a href="/terms.html">이용약관</a>
      <a href="mailto:admin@bodacare.com">admin@bodacare.com</a>
    </div>
    <div class="bd-legal-footer-copy">© 2026 bodacare. All rights reserved.</div>
  </footer>
</div>
</body>
</html>`;
  return new Response(html, {
    status: status || 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      // Edge-cache 1h, allow stale revalidation; browser 5m. Admin edits
      // surface within the hour without a manual purge.
      'cache-control': 'public, max-age=300, s-maxage=3600',
    },
  });
}

function notFound() {
  return shell({
    title: '글을 찾을 수 없습니다 · bodacare 블로그',
    description: '요청하신 글이 비공개이거나 삭제되었을 수 있습니다.',
    canonical: `${SITE}/blog`,
    status: 404,
    bodyHtml: `<div class="bd-legal-kicker">BLOG</div>
<h1 class="bd-legal-title">글을 찾을 수 없습니다</h1>
<div class="bd-legal-body"><p>요청하신 글이 비공개이거나 삭제되었을 수 있습니다.</p>
<p><a href="/blog">← 블로그 홈으로</a></p></div>`,
  });
}

export async function onRequestGet(context) {
  const slug = context.params.slug;
  if (!slug || Array.isArray(slug)) return notFound();

  let rows = [];
  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${encodeURIComponent(slug)}&published=eq.true&select=slug,title,excerpt,category,body_md,read_min,published_at&limit=1`,
      { headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` } },
    );
    if (r.ok) rows = await r.json();
  } catch {
    // fall through to notFound below
  }
  const post = Array.isArray(rows) ? rows[0] : null;
  if (!post) return notFound();

  const canonical = `${SITE}/blog/${post.slug}`;
  const description = post.excerpt || post.title;
  const bodyMd = renderMarkdown(post.body_md || '');

  const metaBits = [
    post.published_at ? `<span><strong>발행</strong> · ${escapeHtml(koDate(post.published_at))}</span>` : '',
    post.read_min ? `<span><strong>읽는 시간</strong> · 약 ${post.read_min}분</span>` : '',
  ].filter(Boolean).join('');

  const bodyHtml = `${post.category ? `<div class="bd-legal-kicker">${escapeHtml(post.category)}</div>` : ''}
<h1 class="bd-legal-title">${escapeHtml(post.title)}</h1>
<div class="bd-legal-meta">${metaBits}</div>
<div class="bd-legal-body">
${bodyMd}
<div style="margin-top:40px;padding-top:28px;border-top:1px solid var(--line-soft);text-align:center">
<a href="/blog" style="color:var(--teal-700);font-weight:600;font-size:14px">블로그 전체 보기 →</a>
</div>
</div>`;

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    datePublished: post.published_at,
    mainEntityOfPage: canonical,
    author: { '@type': 'Organization', name: 'bodacare' },
    publisher: { '@type': 'Organization', name: 'bodacare' },
  });

  return shell({
    title: `${post.title} · bodacare 블로그`,
    description,
    canonical,
    bodyHtml,
    jsonLd,
  });
}
