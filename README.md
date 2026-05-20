# bodacare.com — source

Everything you need to maintain the bodacare landing page from VS Code.
No build step. No `npm install`. Edit a file, refresh the browser. Push to GitHub, Cloudflare auto-deploys.

---

## What's here

| File | What it does | Edit it when… |
|---|---|---|
| **`index.html`** | The page itself (head, meta, script loads) | You change page title, meta description, OG image, or what scripts load |
| **`landing.jsx`** | All landing page sections (Hero, Features, CTA, Footer) — **most edits go here** | You want to change copy, rearrange sections, add a feature card |
| **`landing.css`** | Styling for the landing page only | You want to change spacing, colors, hover effects, layout |
| **`styles.css`** | Global design tokens (colors, type, radii) shared with the app | You're shifting the whole brand color or font |
| **`logo.jsx`** | The bodacare mark + wordmark components | You're tweaking the logo |
| **`ui.jsx`** | Reusable icons + small UI atoms (StatusBar, TabBar, etc.) | Adding new icons |
| **`screens-home.jsx`** | The phone-mock screens shown in Hero & Features (live React, not images) | Updating what the in-page phone mockups show |
| **`screens-other.jsx`** | More phone-mock screens (Metrics, AI, Profile, Medicine edit) | Same as above |
| **`favicon.svg`** | Browser tab icon + social preview source | Logo redesign |

---

## How to run it locally (zero install)

Three options, easiest first.

### 1. Just double-click `index.html`
Works in any browser. Opens directly. **Caveat**: Chrome blocks `file://` `<iframe>` cross-origin and a couple of features, but the landing page itself works fine.

### 2. VS Code Live Server (recommended)
1. Install the **"Live Server"** extension by Ritwick Dey
2. Open the folder in VS Code
3. Right-click `index.html` → **Open with Live Server**
4. Browser opens at `http://127.0.0.1:5500`. Auto-reloads on save.

### 3. Python one-liner (if you have Python)
```bash
cd bodacare-site
python3 -m http.server 8000
```
Open `http://localhost:8000`.

---

## How to edit

The landing page is React + JSX served directly to the browser (Babel transpiles in-browser — no build step). To change anything:

### Change headline copy
1. Open `landing.jsx`
2. Search for `function Hero()` (near the top)
3. Find the `<h1>` — edit the text
4. Save → refresh browser

### Change colors
1. Open `styles.css`
2. Edit the `--teal-700`, `--cream-50`, etc. tokens at the top
3. Save → refresh browser. The whole site updates.

### Add a new feature card
1. Open `landing.jsx`
2. Find `function Features()`
3. Copy an existing `<div className="bd-bento-card">` block
4. Edit the title / description / icon / phone shown
5. Save → refresh

### Common copy locations (quick map)

| What to change | File | Roughly where |
|---|---|---|
| Page title / SEO description | `index.html` | `<title>` and `<meta name="description">` |
| Nav links | `landing.jsx` | `function LandingNav` |
| Hero headline + subhead | `landing.jsx` | `function Hero` |
| App Store / Play Store links | `landing.jsx` | search `href="#"` next to `bd-store` |
| "왜 bodacare?" problem cards | `landing.jsx` | `function Problems` |
| Feature bento copy | `landing.jsx` | `function Features` |
| 3-step "How it works" | `landing.jsx` | `function HowItWorks` |
| Final CTA block | `landing.jsx` | `function FinalCTA` |
| Footer links + email | `landing.jsx` | `function LandingFooter` |

---

## How to deploy (auto-deploy from GitHub)

Once you set this up, every `git push` you make in VS Code → live site updates within ~30 seconds.

### One-time setup

1. **Create a GitHub repo**
   - Go to [github.com/new](https://github.com/new)
   - Name it `bodacare-site` (or whatever) → Create
   - In VS Code: open this folder → Source Control panel → "Publish to GitHub"
   - Pick the new repo

2. **Connect Cloudflare Pages**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
   - Pick your `bodacare-site` repo
   - Build settings:
     - **Framework preset**: `None`
     - **Build command**: *(leave empty)*
     - **Build output directory**: `/` (just a slash)
   - Click **Save and Deploy**
   - In ~30 seconds you get `bodacare-site.pages.dev`

3. **Connect bodacare.com**
   - Cloudflare Pages project → **Custom domains** → **Set up a custom domain**
   - Enter `bodacare.com`
   - Follow the prompts (if domain isn't on Cloudflare DNS, they walk you through moving it — free)
   - SSL provisions in ~1 minute. Done.

### Daily workflow after that

```
1. Open VS Code
2. Edit a .jsx or .css file
3. Save
4. Source Control panel → write a message → commit & push
5. ~30 seconds later, bodacare.com reflects the change
```

That's it.

---

## Limitations of this setup

Because we're running React + Babel in the browser (no build step):
- **First page load is ~1.5 MB** of JavaScript (React + Babel CDN). Cached after first visit.
- **No TypeScript, no fancy bundling.** Pure JSX → fine for a landing page, less ideal for a big app.
- **SEO is OK** — search engines wait for JS to render, but it's slower than server-rendered.

**This is fine for**: a marketing landing page that gets a few hundred to a few thousand visitors a day. Easy to maintain solo.

**Outgrow it when**:
- You start spending money on ads and need lightning-fast loads
- You want to rank #1 on Google for "복약 관리 앱"
- You add a blog / multiple pages / a user dashboard

**Upgrade path**: ask a developer to port this to **Astro** (~1–2 days work). Same JSX components, but rendered to static HTML at build time → 50KB instead of 1.5MB, instant loads, perfect SEO.

---

## Email at bodacare.com

The footer references `hello@bodacare.com`. To actually receive mail there:
- Cheapest: **Cloudflare Email Routing** (free) — forwards `hello@bodacare.com` to your existing Gmail/iCloud. Setup in 5 min in the Cloudflare dashboard.
- Pro: **Google Workspace** ($6/user/month) if you want to send from `@bodacare.com` too.

---

## Need help?

This is a normal HTML + CSS + JSX project. Any developer can pick it up. If you're using Claude Code or another AI assistant, point it at this README and ask it to make the change you want — it will edit the right files.
