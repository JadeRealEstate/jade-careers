// careers.jaderealestate.com — public recruiting site for Jade Real Estate (SSR Worker).
// Fast, fully crawlable HTML for Google + AI. Blog posts come from Supabase
// (careers_posts), managed later in the Jade app admin. Colors: Jade palette only.
import { team as IMG_TEAM, tote as IMG_TOTE } from './img.js';

const SITE = 'https://careers.jaderealestate.com';
const BOOK = 'https://client.jaderealestate.com/book/emilie';
const DEMO = 'https://agentapp.jaderealestate.com/jade-demo';
const CLIENT_DEMO = 'https://agentapp.jaderealestate.com/demo';
const NET = 'https://www.jaderealestate.com/netvaluation';
const COMPARE = 'https://www.jaderealestate.com/brokerage-tools';
const MAIN = 'https://www.jaderealestate.com';
const SB = 'https://fcgarmtbmdsgkcrvmwjv.supabase.co';
const ANON = 'sb_publishable_k5AzjS458cQ5CRzgZP_jbg_zTe3tQyx';
const OFFICE = '2570 Lawrence St Unit 104, Denver, CO 80205';
const OG = SITE + '/img/team.jpg';

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// External link: always a new tab with a clear visual exit cue.
const ext = (url, label, cls) => `<a ${cls ? `class="${cls}" ` : ''}href="${url}" target="_blank" rel="noopener">${esc(label)} <span class="xt" aria-hidden="true">↗</span></a>`;
const IMG = { 'team.jpg': IMG_TEAM, 'tote.jpg': IMG_TOTE };
function b64bytes(b64){const bin=atob(b64);const n=bin.length;const u=new Uint8Array(n);for(let i=0;i<n;i++){u[i]=bin.charCodeAt(i);}return u;}
function serveImg(name){const b=IMG[name];if(!b)return notFound();return new Response(b64bytes(b),{headers:{'content-type':'image/jpeg','cache-control':'public, max-age=31536000, immutable'}});}
const NAV = [['/', 'Why Jade'], ['/technology', 'Technology'], ['/culture', 'Culture'], ['/studio', 'See yourself'], ['/calculator', 'Calculator'], ['/blog', 'Blog'], ['/faq', 'FAQ']];
const fmtDate = (s) => { try { return new Date(s).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }); } catch (e) { return ''; } };

async function getPosts(limit) {
  try {
    const u = `${SB}/rest/v1/careers_posts?status=eq.published&select=slug,title,excerpt,published_at&order=published_at.desc` + (limit ? ('&limit=' + limit) : '');
    const r = await fetch(u, { headers: { apikey: ANON, Authorization: 'Bearer ' + ANON } });
    const rows = await r.json(); return Array.isArray(rows) ? rows : [];
  } catch (e) { return []; }
}
async function getPost(slug) {
  try {
    const u = `${SB}/rest/v1/careers_posts?status=eq.published&slug=eq.${encodeURIComponent(slug)}&select=*&limit=1`;
    const r = await fetch(u, { headers: { apikey: ANON, Authorization: 'Bearer ' + ANON } });
    const rows = await r.json(); return Array.isArray(rows) ? rows[0] : null;
  } catch (e) { return null; }
}

function layout({ title, desc, path, body, jsonld }) {
  const canonical = SITE + (path === '/' ? '' : path);
  const nav = NAV.map(([h, l]) => `<a href="${h}"${h === path ? ' class="on"' : ''}>${esc(l)}</a>`).join('');
  const ld = (jsonld || []).map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('');
  return `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="website"><meta property="og:site_name" content="Jade Real Estate — Careers">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${OG}"><meta name="twitter:card" content="summary_large_image">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23335143'/%3E%3Ctext x='16' y='22' font-family='Georgia,serif' font-style='italic' font-size='18' fill='white' text-anchor='middle'%3EJ%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--ink:#15201a;--forest:#1b2f25;--jade:#335143;--jade2:#546751;--olive:#3e5725;--sage:#a6b6a4;--cream:#f2efeb;--paper:#fff;--line:rgba(21,32,26,.12);--serif:'DM Serif Display',Georgia,serif;--sans:'Montserrat',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
*{box-sizing:border-box}html,body{margin:0}
body{background:var(--cream);color:var(--ink);font-family:var(--sans);line-height:1.65;-webkit-font-smoothing:antialiased}
a{color:inherit}
.xt{font-size:.82em;opacity:.75;vertical-align:super;line-height:0}
h1,h2,h3{font-family:var(--serif);font-weight:400;line-height:1.1;margin:0;text-wrap:balance}
.wrap{max-width:1080px;margin:0 auto;padding:0 22px}
.narrow{max-width:760px}
.nav{position:sticky;top:0;z-index:20;background:rgba(242,239,235,.92);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.nav .wrap{display:flex;align-items:center;gap:22px;height:62px}
.brand{font-family:var(--serif);font-style:italic;font-size:22px;color:var(--jade);text-decoration:none;line-height:1}
.brand small{display:block;font-family:var(--sans);font-style:normal;font-size:8.5px;letter-spacing:.32em;font-weight:600;color:var(--jade2);margin-top:2px}
.nav .links{display:flex;gap:20px;margin-left:8px}
.nav .links a{font-size:14px;font-weight:600;color:var(--jade2);text-decoration:none}
.nav .links a.on,.nav .links a:hover{color:var(--jade)}
.nav .cta{margin-left:auto;background:var(--jade);color:#fff;text-decoration:none;font-size:13.5px;font-weight:700;padding:9px 16px;border-radius:999px}
.band{padding:clamp(52px,7vw,96px) 0}
.tight{padding:clamp(40px,5vw,66px) 0}
.forest{background:var(--forest);color:#eef1ec}.cream{background:var(--cream)}.paper{background:var(--paper)}.jadebg{background:var(--jade);color:#eef1ec}
.eyebrow{font-size:12px;letter-spacing:.22em;text-transform:uppercase;font-weight:600;color:var(--jade2)}
.forest .eyebrow,.jadebg .eyebrow{color:var(--sage)}
.hero{position:relative;overflow:hidden;background:var(--forest);color:#eef1ec;padding:clamp(66px,10vw,120px) 0}
.hero .m1{position:absolute;right:-6%;top:-20%;width:min(54%,500px);aspect-ratio:1;background:linear-gradient(150deg,rgba(84,103,81,.45),rgba(62,87,37,.12));border-radius:44% 44% 44% 62%}
.hero h1{font-size:clamp(34px,6vw,62px);font-style:italic;position:relative;max-width:16ch}
.hero p{font-size:clamp(16px,1.9vw,21px);color:#d3dbd0;margin-top:22px;max-width:52ch;position:relative}
.hero .btns{margin-top:32px;display:flex;gap:13px;flex-wrap:wrap;position:relative}
.btn{display:inline-block;text-decoration:none;font-weight:700;font-size:15px;padding:13px 24px;border-radius:999px;cursor:pointer}
.btn .xt{color:inherit}
.btn.p{background:var(--cream);color:var(--forest)}.btn.s{background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.28)}
.btn.j{background:var(--jade);color:#fff}
.strip{position:relative;height:clamp(260px,40vw,440px);overflow:hidden;background:var(--forest)}
.strip img{width:100%;height:100%;object-fit:cover;display:block}
.strip .cap{position:absolute;left:0;right:0;bottom:0;padding:30px 22px 22px;background:linear-gradient(transparent,rgba(21,32,26,.78));color:#eef1ec}
.strip .cap div{max-width:1080px;margin:0 auto;font-size:14.5px;color:#d7ded3}
.strip .cap b{font-family:var(--serif);font-style:italic;font-weight:400;color:#fff;font-size:19px;display:block;margin-bottom:4px}
.h-sec{font-size:clamp(28px,4.2vw,42px);margin-top:10px}
.lead{font-size:clamp(16px,1.6vw,18.5px);color:var(--jade2);margin-top:16px;max-width:66ch}.forest .lead,.jadebg .lead{color:#c9d2c6}
.prose p{font-size:17px;color:var(--ink);margin:18px 0 0;line-height:1.78;max-width:62ch}.prose p:first-child{margin-top:0}
.ed{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,5vw,66px);align-items:center;margin-top:8px}
.ed .big{font-family:var(--serif);font-size:clamp(25px,3.3vw,36px);color:var(--jade);line-height:1.16;font-style:italic;margin:0 0 18px}
.ed .big.light{color:#fff}
.figure{margin:0}
.figure img{width:100%;height:auto;border-radius:18px;display:block;box-shadow:0 24px 54px rgba(21,32,26,.16)}
.figure figcaption{font-size:12.5px;color:var(--jade2);margin-top:12px;letter-spacing:.01em}
.forest .figure figcaption,.jadebg .figure figcaption{color:#aab6a7}
.rows{margin-top:30px;border-top:1px solid var(--line)}
.rows .r{display:grid;grid-template-columns:220px 1fr;gap:30px;padding:26px 0;border-bottom:1px solid var(--line)}
.rows .r .lbl{font-family:var(--serif);font-size:23px;color:var(--jade);font-style:italic;line-height:1.1}
.rows .r .lbl small{display:block;font-family:var(--sans);font-style:normal;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--jade2);font-weight:600;margin-bottom:7px}
.rows .r p{margin:0;color:var(--jade2);font-size:15.5px;line-height:1.7}
.rows .r a{color:var(--jade);font-weight:600}
.markets{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px}
.chip{background:var(--paper);border:1px solid var(--line);border-radius:999px;padding:8px 16px;font-size:13.5px;font-weight:600;color:var(--jade)}
.pull{background:var(--jade);color:#eef1ec}
.pull p{font-family:var(--serif);font-style:italic;font-size:clamp(23px,3.4vw,37px);line-height:1.24;max-width:28ch;margin:0}
.pull .by{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--sage);font-weight:600;margin-top:20px}
.two{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:34px;align-items:start}
.feat{background:var(--paper);border:1px solid var(--line);border-radius:16px;padding:26px}
.feat h3{font-family:var(--serif);font-size:21px;color:var(--jade)}.feat p{font-size:14.5px;color:var(--jade2);margin-top:10px}.feat a{color:var(--jade);font-weight:600}
.quotes{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:32px}
.q{background:var(--paper);border-left:3px solid var(--olive);border-radius:0 14px 14px 0;padding:24px;box-shadow:0 10px 30px rgba(21,32,26,.05)}
.q p{font-family:var(--serif);font-size:18.5px;font-style:italic;color:var(--jade);margin:0;line-height:1.34}
.q .by{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--jade2);font-weight:600;margin-top:14px}
.posts{display:grid;gap:16px;margin-top:30px}
.pcard{background:var(--paper);border:1px solid var(--line);border-radius:16px;padding:24px;text-decoration:none;display:block;transition:border-color .15s}
.pcard:hover{border-color:var(--jade)}
.pcard .d{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--jade2);font-weight:600}
.pcard h3{font-family:var(--serif);font-size:22px;color:var(--jade);margin-top:7px}
.pcard p{color:var(--jade2);font-size:15px;margin-top:9px}
.post{max-width:720px;margin:0 auto}
.post .meta{color:var(--jade2);font-size:13.5px;margin-top:12px}
.post .lede{font-size:19px;color:var(--jade2);margin-top:20px;line-height:1.6}
.post h2{font-family:var(--serif);font-size:27px;color:var(--jade);margin-top:40px}
.post p{font-size:17px;color:var(--ink);margin-top:16px;line-height:1.75}
.post a{color:var(--jade);text-decoration:underline;font-weight:600}
.post ul{margin-top:14px;padding-left:22px}.post li{font-size:17px;margin-top:9px;line-height:1.7}
.inc{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:28px}
.inc .grp{background:var(--paper);border:1px solid var(--line);border-radius:16px;padding:24px 26px}
.inc .grp.span{grid-column:1/-1}
.inc h4{font-family:var(--serif);font-size:20px;color:var(--jade);margin:0 0 6px;font-style:italic}
.inc .sub{font-size:12.5px;color:var(--jade2);margin:0 0 12px}
.inc ul{list-style:none;margin:0;padding:0}
.inc li{font-size:14px;color:var(--ink);padding:8px 0 8px 26px;position:relative;border-top:1px solid var(--line);line-height:1.5}
.inc li:first-child{border-top:0}
.inc li::before{content:"✓";position:absolute;left:0;top:8px;color:var(--olive);font-weight:800}
.inc .not li::before{content:"—";color:var(--jade2);font-weight:700}
.faqs{margin-top:4px;border:1px solid var(--line);border-radius:16px;overflow:hidden;background:var(--line);display:grid;gap:1px}
.faqs .it{background:var(--paper);padding:24px 26px}
.faqs h3{font-family:var(--sans);font-size:17px;font-weight:700;color:var(--jade);margin:0}
.faqs p{font-size:15px;color:var(--jade2);margin:10px 0 0}
.faqs a{color:var(--jade);font-weight:600}
.cta-band h2{font-size:clamp(28px,4.4vw,44px);font-style:italic}.cta-band p{color:#c9d2c6;max-width:50ch;margin:16px 0 0}
.exits{font-size:12.5px;color:var(--jade2);margin-top:14px}.forest .exits,.jadebg .exits{color:#aab6a7}
.foot{background:var(--ink);color:#aeb9b2;font-size:13px;padding:40px 0}
.foot a{color:#d3dbd0;text-decoration:none}.foot .row{display:flex;gap:26px;flex-wrap:wrap;align-items:center}
.foot .disc{margin-top:18px;font-size:11.5px;color:#7f8c84;max-width:84ch}
.center{text-align:center;max-width:66ch;margin-inline:auto}
.mini-card{background:var(--jade);color:#fff;border-radius:18px;padding:28px;box-shadow:0 24px 54px rgba(0,0,0,.28);max-width:340px}
.mini-logo{font-family:var(--serif);font-style:italic;font-size:26px;line-height:1}.mini-logo span{display:block;font-family:var(--sans);font-style:normal;font-size:8px;letter-spacing:.34em;font-weight:600;color:var(--sage);margin-top:3px}
.mini-photo{width:62px;height:62px;border-radius:50%;background:rgba(255,255,255,.16);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;letter-spacing:.1em;color:#eef1ec;margin:22px 0 14px}
.mini-name{font-family:var(--serif);font-style:italic;font-size:26px}
.mini-meta{font-size:12.5px;color:#cdd6c9;letter-spacing:.04em;margin-top:4px}
@media(max-width:860px){.ed,.two,.quotes,.inc,.rows .r{grid-template-columns:1fr}.ed .figure{order:-1}.nav .links{display:none}}
</style>
${ld}
</head><body>
<header class="nav"><div class="wrap">
  <a class="brand" href="/">Jade<small>REAL ESTATE</small></a>
  <nav class="links">${nav}</nav>
  <a class="cta" href="${BOOK}" target="_blank" rel="noopener">Talk with Emilie</a>
</div></header>
${body}
<footer class="foot"><div class="wrap">
  <div class="row">
    <a class="brand" style="color:#eef1ec" href="/">Jade<small>REAL ESTATE</small></a>
    <a href="/">Why Jade</a><a href="/technology">Technology</a><a href="/culture">Culture</a><a href="/studio">See yourself</a><a href="/calculator">Calculator</a><a href="/compare">Compare</a><a href="/blog">Blog</a><a href="/faq">FAQ</a>
    <a href="${BOOK}" target="_blank" rel="noopener" style="margin-left:auto;font-weight:700;color:#fff">Book a conversation →</a>
  </div>
  <p class="disc">Jade Real Estate · ${OFFICE} · Emilie Smith, emilie@jaderealestate.com · <a href="${MAIN}" target="_blank" rel="noopener">jaderealestate.com</a></p>
  <p class="disc">Jade Real Estate is an independent brokerage serving Colorado's Front Range and mountains. This site is for licensed real estate agents exploring a move; it is not a solicitation of agents under an existing exclusive agreement. Equal Housing Opportunity. Nothing here is a guarantee of income or results.</p>
  <p class="disc">© ${new Date().getFullYear()} Jade Real Estate</p>
</div></footer>
</body></html>`;
}

function ctaBand() {
  return `<section class="band forest cta-band"><div class="wrap">
    <div class="eyebrow">The next step</div>
    <h2>Explore Jade with Emilie</h2>
    <p>A relaxed 20-minute conversation about your business, the tools, and the support you'd have here. No pressure, no script.</p>
    <div style="margin-top:28px"><a class="btn p" href="${BOOK}" target="_blank" rel="noopener">Book a conversation</a></div>
    <p class="exits">Opens our scheduler in a new tab — close it anytime to come back here.</p>
  </div></section>`;
}

const MARKETS = ['Denver Metro', 'Colorado Springs', 'Winter Park', 'Northern Colorado'];
const TESTIMONIALS = [
  ['Good people, a great office environment, and support whenever I need it.', 'Trevor Moylan'],
  ['What stands out most is how available and ready to help everyone is — it’s a flexible team you can actually count on.', 'Charles Phanumphai'],
  ['Friendly agents, real marketing and social media support, and a kind broker who wants to see you succeed — a genuine opportunity to grow your business alongside Jade’s.', 'Stephanie Avozani'],
  ['The team is very involved without being micromanaging — a great balance of support and freedom to run my business my way. As a boutique brokerage, they’re genuinely invested in helping me grow.', 'Yvette Ortiz'],
];

async function homePage() {
  const posts = await getPosts(3);
  const jsonld = [
    { '@context': 'https://schema.org', '@type': 'Organization', name: 'Jade Real Estate', url: SITE, logo: OG, image: OG, sameAs: [MAIN], areaServed: MARKETS, description: 'Independent Colorado real estate brokerage built around the agent — the Jade agent app, marketing done for you, and real support, across the Front Range and mountains.' },
    { '@context': 'https://schema.org', '@type': 'RealEstateAgent', name: 'Jade Real Estate', url: SITE, areaServed: MARKETS, address: { '@type': 'PostalAddress', streetAddress: '2570 Lawrence St Unit 104', addressLocality: 'Denver', addressRegion: 'CO', postalCode: '80205' }, knowsAbout: ['real estate agent technology', 'agent marketing', 'brokerage support', 'real estate careers Colorado'] },
  ];
  const quotes = TESTIMONIALS.map(([q, by]) => `<div class="q"><p>&ldquo;${esc(q)}&rdquo;</p><div class="by">${esc(by)}</div></div>`).join('');
  const latest = posts.length ? `
<section class="band paper"><div class="wrap">
  <div class="eyebrow">From the blog</div>
  <h2 class="h-sec">Reading for agents thinking about a move.</h2>
  <div class="posts">${posts.map(p => `<a class="pcard" href="/blog/${esc(p.slug)}"><div class="d">${esc(fmtDate(p.published_at))}</div><h3>${esc(p.title)}</h3>${p.excerpt ? `<p>${esc(p.excerpt)}</p>` : ''}</a>`).join('')}</div>
  <div style="margin-top:18px"><a href="/blog" style="color:var(--jade);font-weight:700;text-decoration:none">All posts →</a></div>
</div></section>` : '';
  const body = `
<section class="hero"><div class="m1"></div><div class="wrap">
  <div class="eyebrow">Careers at Jade Real Estate</div>
  <h1>You built the business. We make it lighter to run.</h1>
  <p>Jade is an independent Colorado brokerage with its own agent app, marketing done for you, and a broker who actually picks up. No mandatory meetings. No production minimums. No prescribed path.</p>
  <div class="btns"><a class="btn p" href="${BOOK}" target="_blank" rel="noopener">Talk with Emilie</a><a class="btn s" href="/studio">See yourself at Jade →</a></div>
</div></section>

<section class="band cream"><div class="wrap narrow">
  <div class="eyebrow">Why Jade exists</div>
  <h2 class="h-sec" style="margin-bottom:22px">Most brokerages are built for the brokerage. We built ours for the agent.</h2>
  <div class="prose">
    <p>Jade is independent and owner-operated, right here in Colorado — and that isn’t a line for the footer. It’s the reason the place runs the way it does. Decisions get made down the hall, by people who know this market, instead of coming down from a franchise playbook written in another state.</p>
    <p>So we put our energy into the handful of things that actually move an agent’s business: tools that do real work, marketing that gets done without you becoming a full-time designer, and support you can reach the moment a deal gets complicated. The rest — the mandatory meetings, the production minimums, the one-right-way — we left out on purpose.</p>
    <p>And we stay small by choice. Boutique enough to know your name and what you’re working toward; serious enough to grow your business right alongside ours.</p>
  </div>
</div></section>

<section class="band paper"><div class="wrap">
  <div class="eyebrow">What you actually get</div>
  <h2 class="h-sec">Three things, done properly.</h2>
  <div class="rows">
    <div class="r"><div class="lbl"><small>01 — Tools</small>Software that pulls its weight</div><p>The Jade agent app is built in-house and included in your fee: client hubs, a booking scheduler, listing presentations, forms with QR codes, and a marketing studio — wired into Follow Up Boss and HouseCanary data so your pipeline stays current without double entry. <a href="/technology">See the tools →</a></p></div>
    <div class="r"><div class="lbl"><small>02 — Marketing</small>You’re not your own designer</div><p>In-house listing support, personal branding, social content, and custom graphics. The posts go out, the listing looks sharp, and the newsletter ships — without you opening a design app at 11pm.</p></div>
    <div class="r"><div class="lbl"><small>03 — Support</small>Help, not homework</div><p>One-on-one coaching tied to your goals, optional accountability (momentum, not guilt), and transaction help when a deal goes sideways — pricing, inspection, appraisal, compliance. A broker whose door is open, who measures you by your success, not your attendance.</p></div>
  </div>
</div></section>

<section class="band pull"><div class="wrap">
  <p>“A flexible team you can actually count on, and a broker who wants to see you win.”</p>
  <div class="by">— what Jade agents say most</div>
</div></section>

<section class="band forest"><div class="wrap">
  <div class="ed">
    <div>
      <div class="eyebrow">Picture it</div>
      <div class="big light" style="margin-top:12px">See yourself as a Jade agent.</div>
      <div class="prose" style="color:#d3dbd0">
        <p style="color:#d3dbd0">Type your name and watch your business card, your <em>Just Listed</em> posts, your booking page, and your listing presentation turn Jade — in real time. Drop in your headshot if you like; it never leaves your browser. No sign-up, no catch.</p>
      </div>
      <div style="margin-top:24px"><a class="btn p" href="/studio">Open the studio →</a></div>
    </div>
    <figure class="figure" aria-hidden="true">
      <div class="mini-card">
        <div class="mini-logo">Jade<span>REAL ESTATE</span></div>
        <div class="mini-photo">YOU</div>
        <div class="mini-name">Your Name</div>
        <div class="mini-meta">REALTOR® · Denver Metro</div>
      </div>
      <figcaption style="color:#aab6a7">A 30-second preview of your Jade brand.</figcaption>
    </figure>
  </div>
</div></section>

<section class="band cream"><div class="wrap">
  <div class="ed">
    <div>
      <div class="eyebrow">Local &amp; independent</div>
      <div class="big" style="margin-top:12px">Rooted in Colorado, and honest about the money.</div>
      <div class="prose">
        <p>We work the Front Range and the mountains — Denver Metro, Colorado Springs, Winter Park, and Northern Colorado — and we don’t lead with a split headline. A split isn’t what you take home.</p>
        <p>Run your real production through our take-home calculator and put it next to where you are now. The fee is a flat <strong>$200/month that includes the Jade agent app</strong>. No surprises buried in the fine print.</p>
      </div>
      <div class="markets">${MARKETS.map(m => `<span class="chip">${esc(m)}</span>`).join('')}</div>
      <p class="exits" style="margin-top:20px"><a href="/calculator" style="color:var(--jade);font-weight:600">Calculate your take-home</a> &nbsp;·&nbsp; <a href="/compare" style="color:var(--jade);font-weight:600">Compare brokerages</a></p>
    </div>
    <figure class="figure">
      <img src="/img/tote.jpg" width="860" height="1528" alt="A Jade Real Estate canvas tote bag and branded stickers, including a Jade at the Market sticker, on a market table." loading="lazy">
      <figcaption>The details we sweat — down to the tote agents actually carry.</figcaption>
    </figure>
  </div>
</div></section>

<section class="band paper"><div class="wrap">
  <div class="eyebrow">See for yourself</div>
  <h2 class="h-sec">Compare Jade to where you are — honestly.</h2>
  <p class="lead">Tour the actual agent app, run your real numbers, and put your current setup side by side with Jade. No pitch required.</p>
  <div class="btns" style="margin-top:26px;display:flex;gap:13px;flex-wrap:wrap"><a class="btn j" href="${DEMO}" target="_blank" rel="noopener">Tour the agent app <span class="xt" aria-hidden="true">↗</span></a><a class="btn j" href="/calculator" style="background:var(--jade2)">Calculate your take-home</a><a class="btn j" href="/compare" style="background:var(--olive)">Compare brokerages</a></div>
  <p class="exits">The calculator and comparison open right here; the app tour opens in a new tab.</p>
</div></section>

<section class="band cream"><div class="wrap">
  <div class="eyebrow">In their words</div>
  <h2 class="h-sec">From Jade agents.</h2>
  <div class="quotes">${quotes}</div>
</div></section>
${latest}
${ctaBand()}`;
  return layout({ title: 'Jade Real Estate — Careers for Colorado Agents', desc: 'Join Jade Real Estate, an independent Colorado brokerage built around the agent: the Jade agent app, marketing done for you, and real support. No mandatory meetings or production minimums. Explore it with Emilie.', path: '/', body, jsonld });
}

function techPage() {
  const css = `
<style>
.tx-hero{background:var(--forest);color:#eef1ec;padding:clamp(54px,7vw,96px) 0}
.tx-hero h1{font-size:clamp(32px,5.2vw,54px);font-style:italic;max-width:17ch}
.tx-hero p{color:#d3dbd0;font-size:clamp(16px,1.7vw,19px);margin-top:18px;max-width:62ch}
.tx-tabs{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:36px}
.tx-tab{font-family:var(--sans);font-size:14.5px;font-weight:700;padding:12px 20px;border:1px solid var(--line);border-radius:999px;background:var(--paper);color:var(--jade2);cursor:pointer}
.tx-tab.on{background:var(--jade);color:#fff;border-color:var(--jade)}
.tx-panel{display:none}
.tx-panel.on{display:block}
.tx-split{display:grid;grid-template-columns:0.92fr 1.08fr;gap:clamp(28px,4vw,58px);align-items:start}
.tx-l h2{font-family:var(--serif);font-style:italic;font-size:clamp(26px,3.4vw,38px);color:var(--jade);margin:10px 0 14px;line-height:1.12}
.tx-l .intro{font-size:16px;color:var(--jade2);line-height:1.7;max-width:46ch}
.tx-tools{margin-top:22px;border-top:1px solid var(--line)}
.tx-tool{padding:15px 0;border-bottom:1px solid var(--line)}
.tx-tool b{font-family:var(--serif);font-style:italic;font-size:18px;color:var(--jade);display:block}
.tx-tool span{font-size:14px;color:var(--jade2);display:block;margin-top:3px;line-height:1.55}
.tx-arts{display:grid;gap:20px}
.tx-art{background:var(--paper);border:1px solid var(--line);border-radius:16px;padding:18px;box-shadow:0 16px 40px rgba(21,32,26,.07)}
.tx-art .tag{font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--jade2);font-weight:700;margin-bottom:12px}
.tx-art .cap{font-size:12.5px;color:var(--jade2);margin-top:12px;line-height:1.5}
.mbk{border:1px solid var(--line);border-radius:12px;overflow:hidden;text-align:center;padding-bottom:16px;max-width:290px}
.mbk-top{height:52px;background:var(--jade)}
.mbk-av{width:60px;height:60px;border-radius:50%;background:var(--jade2);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;margin:-30px auto 0;border:4px solid var(--paper)}
.mbk-nm{font-family:var(--serif);font-style:italic;font-size:20px;color:var(--jade);margin-top:8px}
.mbk-mt{font-size:12px;color:var(--jade2);margin-top:2px}
.mbk-slots{display:flex;gap:6px;justify-content:center;margin:12px 0}
.mbk-slots span{font-size:11px;border:1px solid var(--line);border-radius:999px;padding:5px 10px;color:var(--jade2)}
.mbk-btn{display:inline-block;background:var(--jade);color:#fff;font-size:12.5px;font-weight:700;padding:8px 18px;border-radius:999px}
.mhub{border:1px solid var(--line);border-radius:12px;padding:16px}
.mhub-h{font-weight:700;font-size:14px;color:var(--ink);display:flex;justify-content:space-between;align-items:center}
.mhub-h span{font-size:10px;letter-spacing:.08em;text-transform:uppercase;background:rgba(62,87,37,.14);color:var(--olive);padding:3px 8px;border-radius:999px;font-weight:700}
.mhub-steps{display:flex;gap:6px;margin-top:16px}
.mhub-steps .st{flex:1;font-size:10.5px;color:var(--jade2);text-align:center;padding-top:18px;position:relative}
.mhub-steps .st::after{content:"";position:absolute;top:9px;left:calc(50% + 7px);right:calc(-50% + 7px);height:2px;background:var(--line)}
.mhub-steps .st:last-child::after{display:none}
.mhub-steps .st::before{content:"";position:absolute;top:3px;left:50%;transform:translateX(-50%);width:13px;height:13px;border-radius:50%;background:var(--line);z-index:1}
.mhub-steps .st.done::before{background:var(--olive)}
.mhub-steps .st.now::before{background:var(--jade);box-shadow:0 0 0 3px rgba(51,81,67,.22)}
.mhub-steps .st.done,.mhub-steps .st.now{color:var(--jade);font-weight:600}
.mpost{border:1px solid var(--line);border-radius:12px;overflow:hidden;max-width:260px}
.mpost-img{aspect-ratio:4/3;background:linear-gradient(135deg,var(--jade),var(--forest));display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.55);font-size:10.5px;letter-spacing:.2em;font-weight:700}
.mpost-band{background:var(--cream);padding:14px}
.mpost-jl{font-family:var(--serif);font-style:italic;font-size:22px;color:var(--jade)}
.mpost-ag{display:flex;gap:10px;align-items:center;margin-top:10px}
.mpost-ag .av{width:36px;height:36px;border-radius:50%;background:var(--jade);color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700}
.mpost-ag .nm{font-family:var(--serif);font-style:italic;font-size:15px;color:var(--ink)}
.mpost-ag .sb{font-size:11px;color:var(--jade2)}
.mcov{aspect-ratio:1.5/1;border-radius:12px;background:linear-gradient(160deg,var(--forest),var(--jade));color:#eef1ec;padding:20px;display:flex;flex-direction:column;max-width:330px}
.mcov-top{display:flex;justify-content:space-between;gap:10px;font-size:8.5px;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.72);font-weight:600}
.mcov-top span{white-space:nowrap}
.mcov-k{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--sage);font-weight:700;margin-top:18px}
.mcov-h{font-family:var(--serif);font-style:italic;font-size:26px;line-height:1.08;margin-top:6px}
.mcov-by{font-size:11px;color:rgba(255,255,255,.82);margin-top:auto;border-top:1px solid rgba(255,255,255,.2);padding-top:10px}
.mlead{border:1px solid var(--line);border-radius:12px;padding:16px}
.mlead-h{display:flex;align-items:center;gap:10px}
.mlead-h .av{width:38px;height:38px;border-radius:50%;background:var(--jade2);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex:none}
.mlead-h .nm{font-weight:700;font-size:14px;color:var(--ink)}
.mlead-h .src{font-size:11.5px;color:var(--jade2)}
.mlead-h .stg{margin-left:auto;font-size:10px;letter-spacing:.06em;text-transform:uppercase;background:var(--jade);color:#fff;padding:4px 9px;border-radius:999px;font-weight:700}
.mlead-row{font-size:12.5px;color:var(--jade2);margin-top:12px;border-top:1px solid var(--line);padding-top:10px}
.mlead-acts{display:flex;gap:6px;margin-top:10px}
.mlead-acts span{font-size:11px;border:1px solid var(--line);border-radius:999px;padding:5px 12px;color:var(--jade)}
.mlead-sync{font-size:11px;color:var(--olive);margin-top:10px;font-weight:600}
.mpipe{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.mpipe .col{background:var(--cream);border:1px solid var(--line);border-radius:10px;padding:10px}
.mpipe .ch{font-size:11px;font-weight:700;color:var(--jade2);display:flex;justify-content:space-between;margin-bottom:6px}
.mpipe .ch b{color:var(--jade)}
.mpipe .cc{height:22px;background:var(--paper);border:1px solid var(--line);border-radius:6px;margin-top:5px}
@media(max-width:860px){.tx-split{grid-template-columns:1fr}.tx-arts{order:-1}}
</style>`;
  const body = `${css}
<section class="tx-hero"><div class="wrap">
  <div class="eyebrow" style="color:var(--sage)">The technology</div>
  <h1>Technology that works like a teammate.</h1>
  <p>Jade builds its own agent platform and includes it in your monthly fee. Here's what it does — grouped by what you're actually trying to get done. Pick a theme.</p>
</div></section>

<section class="band cream"><div class="wrap">
  <div class="tx-tabs">
    <button type="button" class="tx-tab on" data-t="biz">Your business</button>
    <button type="button" class="tx-tab" data-t="mkt">Your marketing</button>
    <button type="button" class="tx-tab" data-t="leads">Working your leads</button>
  </div>

  <div class="tx-panel on" data-p="biz">
    <div class="tx-split">
      <div class="tx-l">
        <div class="eyebrow">Your business</div>
        <h2>Run the day-to-day without the busywork.</h2>
        <p class="intro">The operating system for your business — so the admin runs itself and you stay in front of clients.</p>
        <div class="tx-tools">
          <div class="tx-tool"><b>Client hubs</b><span>A private hub for every buyer and seller: homes, documents, timeline, and live status.</span></div>
          <div class="tx-tool"><b>Booking scheduler</b><span>A personal booking page and QR code; times land on your calendar and in your CRM.</span></div>
          <div class="tx-tool"><b>Forms &amp; intake</b><span>Build any form, share a link or QR, and route responses into Follow Up Boss.</span></div>
          <div class="tx-tool"><b>A Jade AI assistant</b><span>Drafts, pricing thinking, and client content — with Colorado rules and Fair Housing in mind.</span></div>
        </div>
      </div>
      <div class="tx-arts">
        <div class="tx-art"><div class="tag">Your booking page</div>
          <div class="mbk"><div class="mbk-top"></div><div class="mbk-av">AJ</div><div class="mbk-nm">Avery Jordan</div><div class="mbk-mt">REALTOR® · Denver Metro</div>
            <div class="mbk-slots"><span>Tue 9:00</span><span>Tue 2:30</span><span>Wed 11:00</span></div><div class="mbk-btn">Book with Avery</div></div>
          <div class="cap">Clients pick a time; it lands on your calendar and in your CRM.</div>
        </div>
        <div class="tx-art"><div class="tag">A client's hub</div>
          <div class="mhub"><div class="mhub-h">412 Lupine Ln <span>Under contract</span></div>
            <div class="mhub-steps"><div class="st done">Offer</div><div class="st done">Inspection</div><div class="st now">Appraisal</div><div class="st">Closing</div></div></div>
          <div class="cap">Buyers and sellers see live status — without you re-typing updates.</div>
        </div>
      </div>
    </div>
  </div>

  <div class="tx-panel" data-p="mkt">
    <div class="tx-split">
      <div class="tx-l">
        <div class="eyebrow">Your marketing</div>
        <h2>Look like the top agent in the room.</h2>
        <p class="intro">You're not your own designer. The studio and our in-house team make your listings and brand look like you already won.</p>
        <div class="tx-tools">
          <div class="tx-tool"><b>Marketing studio</b><span>Branded social posts, newsletters, landing pages, and a weekly content pack — on brand, in minutes.</span></div>
          <div class="tx-tool"><b>Listing presentations &amp; CMAs</b><span>Build a sharp presentation and market analysis with pricing adjustments; export a clean PDF.</span></div>
          <div class="tx-tool"><b>Custom branding &amp; design</b><span>In-house design shapes your brand and market — not a forced house template.</span></div>
          <div class="tx-tool"><b>Done for you</b><span>The posts go out and the listing looks sharp without you opening a design app at 11pm.</span></div>
        </div>
      </div>
      <div class="tx-arts">
        <div class="tx-art"><div class="tag">Just Listed · social</div>
          <div class="mpost"><div class="mpost-img">412 LUPINE LN</div>
            <div class="mpost-band"><div class="mpost-jl">Just Listed</div>
              <div class="mpost-ag"><div class="av">AJ</div><div><div class="nm">Avery Jordan</div><div class="sb">REALTOR® · Jade Real Estate</div></div></div></div></div>
          <div class="cap">A branded set for every listing — made in your voice by our team.</div>
        </div>
        <div class="tx-art"><div class="tag">Listing presentation · cover</div>
          <div class="mcov"><div class="mcov-top"><span>Jade Real Estate</span><span>Issue Nº 01</span></div>
            <div class="mcov-k">Seller Presentation</div><div class="mcov-h">Prepared for<br>the Riveras.</div>
            <div class="mcov-by">Avery Jordan · REALTOR®</div></div>
          <div class="cap">Export a clean PDF to present or send.</div>
        </div>
      </div>
    </div>
  </div>

  <div class="tx-panel" data-p="leads">
    <div class="tx-split">
      <div class="tx-l">
        <div class="eyebrow">Working your leads</div>
        <h2>Turn a lead into a closing.</h2>
        <p class="intro">Capture, follow up, and close — with the leads, the CRM, and the data connected in one place, so nothing falls through.</p>
        <div class="tx-tools">
          <div class="tx-tool"><b>Follow Up Boss CRM</b><span>A real CRM with follow-up workflows, set up and ready on day one.</span></div>
          <div class="tx-tool"><b>HouseCanary data</b><span>Property and market data wired in, so your numbers stay current without double entry.</span></div>
          <div class="tx-tool"><b>Company leads</b><span>Digital and third-party lead opportunities for agents who want to work them.</span></div>
          <div class="tx-tool"><b>Capture → close</b><span>QR forms and scans become contacts automatically; nothing slips through the cracks.</span></div>
        </div>
      </div>
      <div class="tx-arts">
        <div class="tx-art"><div class="tag">A new lead, captured</div>
          <div class="mlead"><div class="mlead-h"><div class="av">SM</div><div><div class="nm">Sarah M.</div><div class="src">From your open-house QR form</div></div><span class="stg">New</span></div>
            <div class="mlead-row">Looking in Wash Park · pre-approved · ~$650k</div>
            <div class="mlead-acts"><span>Call</span><span>Text</span><span>Email</span></div>
            <div class="mlead-sync">↳ synced to Follow Up Boss</div></div>
          <div class="cap">Form responses and QR scans flow straight into your CRM.</div>
        </div>
        <div class="tx-art"><div class="tag">Your pipeline</div>
          <div class="mpipe"><div class="col"><div class="ch">New <b>4</b></div><div class="cc"></div><div class="cc"></div></div>
            <div class="col"><div class="ch">Nurturing <b>7</b></div><div class="cc"></div><div class="cc"></div></div>
            <div class="col"><div class="ch">Under contract <b>2</b></div><div class="cc"></div></div></div>
          <div class="cap">Follow Up Boss keeps every opportunity moving — with HouseCanary data behind it.</div>
        </div>
      </div>
    </div>
  </div>

  <div style="margin-top:44px;display:flex;gap:13px;flex-wrap:wrap"><a class="btn j" href="${DEMO}" target="_blank" rel="noopener">Take the self-guided tour <span class="xt" aria-hidden="true">↗</span></a><a class="btn j" href="${CLIENT_DEMO}" target="_blank" rel="noopener" style="background:var(--jade2)">See the client experience <span class="xt" aria-hidden="true">↗</span></a> <a class="btn j" href="/studio" style="background:var(--olive)">See yourself in it →</a></div>
</div></section>
${ctaBand()}
<script>
(function(){
  var tabs=document.querySelectorAll(".tx-tab");
  var panels=document.querySelectorAll(".tx-panel");
  function show(id){
    for(var i=0;i<tabs.length;i++){tabs[i].classList.toggle("on",tabs[i].getAttribute("data-t")===id);}
    for(var j=0;j<panels.length;j++){panels[j].classList.toggle("on",panels[j].getAttribute("data-p")===id);}
  }
  for(var i=0;i<tabs.length;i++){(function(b){b.addEventListener("click",function(){show(b.getAttribute("data-t"));});})(tabs[i]);}
})();
</script>`;
  return layout({ title: 'The Technology — Jade Real Estate Careers', desc: "Jade Real Estate's in-house agent platform, included in your fee: client hubs, a booking scheduler, a marketing studio, listing presentations, forms, Follow Up Boss + HouseCanary, and a Jade AI assistant — grouped by your business, your marketing, and working your leads.", path: '/technology', body });
}

function culturePage() {
  const body = `
<section class="band forest"><div class="wrap narrow">
  <div class="eyebrow">Culture</div>
  <h1 class="h-sec" style="font-style:italic;font-size:clamp(32px,5vw,52px)">A team that shows up for each other.</h1>
  <p class="lead">Jade is a boutique brokerage — small enough to know your name, serious enough to grow your business. Here’s what that feels like day to day.</p>
</div></section>

<section class="band cream"><div class="wrap">
  <div class="ed">
    <figure class="figure">
      <img src="/img/team.jpg" width="1040" height="1386" alt="Two members of the Jade Real Estate team playing shuffleboard on a team night at a Denver brewery, with a wall of whiskey barrels behind them." loading="lazy">
      <figcaption>A team night in Denver — shuffleboard, barrels, and no agenda.</figcaption>
    </figure>
    <div>
      <div class="eyebrow">Off the clock, too</div>
      <div class="big" style="margin-top:12px">We actually like working together.</div>
      <div class="prose">
        <p>Some of it is work — classes, workshops, marketing days, a booth at the farmers market. Some of it is just a team night out: a brewery, a shuffleboard table, and people who are glad to see each other.</p>
        <p>Either way, the thread is the same. Jade is a place where you’re known, not processed — and where the people around you are genuinely rooting for your deals to close.</p>
      </div>
    </div>
  </div>
</div></section>

<section class="band paper"><div class="wrap">
  <div class="two">
    <div class="feat"><h3>Freedom to run your business</h3><p>No mandatory meetings, no production minimums, no prescribed path. The team is involved without micromanaging — a balance of support and freedom to work your way.</p></div>
    <div class="feat"><h3>Available when you need it</h3><p>What agents mention most is how available and ready to help everyone is — a flexible team you can actually count on, and a broker who wants to see you win.</p></div>
    <div class="feat"><h3>Out in the community</h3><p>Jade at the Market, local events, and real neighborhood presence. We’d rather meet people on a Saturday morning than buy another billboard.</p></div>
    <div class="feat"><h3>Boutique &amp; invested</h3><p>As an independent, owner-operated brokerage, Jade is genuinely invested in helping each agent grow — not running you through a national playbook.</p></div>
  </div>
</div></section>
${ctaBand()}`;
  return layout({ title: 'Culture — Jade Real Estate Careers', desc: 'Life at Jade Real Estate: freedom to run your business, a team that shows up for each other, real marketing support, community presence like Jade at the Market, and an independent, boutique, Colorado-local culture built around agents.', path: '/culture', body });
}

// Grouped, verifiable "what's included in $200/month" block, reused on FAQ.
function includedBlock() {
  const app = ['Client hubs — a private portal for every buyer and seller', 'Personal booking scheduler with QR code, synced to your CRM', 'Listing presentations &amp; CMAs with pricing adjustments and PDF export', 'Marketing studio — social posts, newsletters, landing pages, custom graphics', 'Forms &amp; lead-capture builder with QR codes, synced to Follow Up Boss', 'A Jade AI assistant (Colorado rules &amp; Fair Housing aware)'];
  const brokerage = ['Follow Up Boss CRM — set up and ready to go', 'HouseCanary property &amp; market data', 'In-house listing &amp; marketing support and design work', 'Transaction support — pricing, inspection, appraisal, compliance', 'One-on-one coaching tied to your goals', 'Optional accountability groups &amp; check-ins', 'Direct access to the broker', 'Lead sources (referral, relocation, digital) for agents who want them'];
  const kit = ['Branded Jade tote, signage, and a marketing consultation', 'Business cards and office supplies', 'Follow Up Boss access, already set up for you'];
  const not = ['Your MLS / REALTOR® association dues', 'Your transaction-platform subscription (e.g. CTMe)', 'Physical printing &amp; production costs'];
  const ul = (arr, cls) => `<ul${cls ? ` class="${cls}"` : ''}>${arr.map(i => `<li>${i}</li>`).join('')}</ul>`;
  return `<div class="inc">
    <div class="grp"><h4>The Jade agent app</h4><p class="sub">Built in-house. Yours the day you start.</p>${ul(app)}</div>
    <div class="grp"><h4>Brokerage &amp; support</h4><p class="sub">The people and systems behind your deals.</p>${ul(brokerage)}</div>
    <div class="grp"><h4>Your day-one starter kit</h4><p class="sub">Ready before your first appointment.</p>${ul(kit)}</div>
    <div class="grp"><h4>Billed separately</h4><p class="sub">Standard agent costs, not part of the $200.</p>${ul(not, 'not')}</div>
  </div>`;
}

function faqPage() {
  const faqs = [
    ['What makes Jade different from a big franchise?', 'Jade is independent, Colorado-local, and built around the agent: no mandatory meetings, no production minimums, no prescribed path. The brokerage fits how you work, not the other way around.'],
    ['What is included in the $200/month?', 'A lot — the full Jade agent app (client hubs, booking scheduler, listing presentations and CMAs, the marketing studio, forms and lead capture, and the Jade AI assistant), plus Follow Up Boss CRM set up and ready, HouseCanary data, in-house marketing and design, transaction support, coaching, lead sources for those who want them, and a day-one starter kit. The full list is above. Standard agent costs like your MLS dues and transaction-platform subscription are billed separately.'],
    ['How do splits and take-home work?', 'We don’t lead with a split number, because a split isn’t your take-home. The take-home calculator reads your real production and shows where you’d land, and compares it to your current brokerage. Emilie will walk you through the specifics in a conversation.'],
    ['Do you provide leads?', 'Yes, for agents who want them — referral, relocation, and digital lead sources. No one is forced to work them; it’s there if it fits how you want to grow.'],
    ['What marketing help do I get?', 'In-house listing support, personal branding, social content, and custom graphics. You’re never expected to be your own designer — the marketing gets done.'],
    ['Will I have support, or am I on my own?', 'One-on-one coaching tied to your goals, optional accountability, transaction help when a deal gets complicated, and a broker whose door is open. You’re measured by your success, not your attendance.'],
    ['Where does Jade work?', 'Across Colorado’s Front Range and mountains: Denver Metro, Colorado Springs, Winter Park, and Northern Colorado. The office is at ' + OFFICE + '.'],
    ['How hard is it to make the move?', 'More straightforward than most agents expect. Book a conversation with Emilie and she’ll walk you through the steps and timing for a clean transition.'],
  ];
  const jsonld = [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }];
  const body = `
<section class="band forest"><div class="wrap narrow">
  <div class="eyebrow">Questions agents ask</div>
  <h1 class="h-sec" style="font-style:italic;font-size:clamp(32px,5vw,52px)">Straight answers.</h1>
</div></section>

<section class="band cream"><div class="wrap">
  <div class="eyebrow">What the $200/month includes</div>
  <h2 class="h-sec">One flat fee. Here’s everything in it.</h2>
  <p class="lead">No desk fees, no per-tool add-ons for the Jade platform. The app and the support below are part of the $200 — the only things billed separately are standard agent costs.</p>
  ${includedBlock()}
</div></section>

<section class="band paper"><div class="wrap">
  <div class="eyebrow">More questions</div>
  <h2 class="h-sec" style="margin-bottom:22px">Everything else.</h2>
  <div class="faqs">${faqs.map(([q, a]) => `<div class="it"><h3>${esc(q)}</h3><p>${a.replace(/</g, '&lt;').replace(/&lt;a /g, '<a ').replace(/&lt;\/a>/g, '</a>')}</p></div>`).join('')}</div>
  <p class="lead" style="margin-top:22px">Serving ${MARKETS.join(', ')}. Want the numbers? Try the <a href="/calculator" style="color:var(--jade);font-weight:600">take-home calculator</a> or <a href="/compare" style="color:var(--jade);font-weight:600">compare brokerages</a>.</p>
</div></section>
${ctaBand()}`;
  return layout({ title: 'FAQ — Jade Real Estate Careers', desc: 'Answers for agents considering Jade Real Estate: what makes Jade different, exactly what the $200/month includes (the full agent app, CRM, marketing, support, and starter kit), how take-home works, leads, and making the move.', path: '/faq', body, jsonld });
}

async function blogIndex() {
  const posts = await getPosts(50);
  const list = posts.length
    ? `<div class="posts">${posts.map(p => `<a class="pcard" href="/blog/${esc(p.slug)}"><div class="d">${esc(fmtDate(p.published_at))}</div><h3>${esc(p.title)}</h3>${p.excerpt ? `<p>${esc(p.excerpt)}</p>` : ''}</a>`).join('')}</div>`
    : `<p class="lead">New posts are on the way.</p>`;
  const body = `
<section class="band forest"><div class="wrap narrow">
  <div class="eyebrow">The Jade blog</div>
  <h1 class="h-sec" style="font-style:italic;font-size:clamp(32px,5vw,52px)">For agents thinking about what's next.</h1>
  <p class="lead">Honest, useful reading on the business of being an agent in Colorado — and what to look for in a brokerage.</p>
</div></section>
<section class="band cream"><div class="wrap">${list}</div></section>
${ctaBand()}`;
  const jsonld = [{ '@context': 'https://schema.org', '@type': 'Blog', name: 'Jade Real Estate Blog', url: SITE + '/blog', publisher: { '@type': 'Organization', name: 'Jade Real Estate' } }];
  return layout({ title: 'Blog — Jade Real Estate Careers', desc: 'Honest, useful reading for Colorado real estate agents: choosing a brokerage, take-home vs. splits, marketing, tools, and growing your business.', path: '/blog', body, jsonld });
}

function postPage(p) {
  const jsonld = [{ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, description: p.seo_description || p.excerpt || '', datePublished: p.published_at, dateModified: p.updated_at || p.published_at, author: { '@type': 'Organization', name: p.author || 'Jade Real Estate' }, publisher: { '@type': 'Organization', name: 'Jade Real Estate', url: SITE }, mainEntityOfPage: SITE + '/blog/' + p.slug }];
  const body = `
<section class="band cream" style="padding-bottom:0"><div class="wrap"><article class="post">
  <a href="/blog" style="color:var(--jade2);font-weight:600;font-size:13px;text-decoration:none">← All posts</a>
  <h1 style="font-size:clamp(30px,5vw,46px);color:var(--jade);margin-top:16px">${esc(p.title)}</h1>
  <div class="meta">${esc(fmtDate(p.published_at))} · ${esc(p.author || 'Jade Real Estate')}</div>
  ${p.excerpt ? `<p class="lede">${esc(p.excerpt)}</p>` : ''}
</article></div></section>
<section class="band paper" style="padding-top:34px"><div class="wrap"><article class="post">${p.body_html || ''}
  <p style="margin-top:36px"><a class="btn j" href="${BOOK}" target="_blank" rel="noopener">Explore Jade with Emilie →</a></p>
</article></div></section>`;
  return layout({ title: (p.seo_title || p.title) + ' — Jade Real Estate', desc: p.seo_description || p.excerpt || '', path: '/blog/' + p.slug, body, jsonld });
}

function studioPage() {
  const opts = MARKETS.map(m => `<option value="${esc(m)}">${esc(m)}</option>`).join('');
  const css = `
<style>
.st-hero{background:var(--forest);color:#eef1ec;padding:clamp(58px,8vw,104px) 0;position:relative;overflow:hidden}
.st-hero .m1{position:absolute;right:-8%;top:-24%;width:min(50%,460px);aspect-ratio:1;background:linear-gradient(150deg,rgba(84,103,81,.42),rgba(62,87,37,.1));border-radius:44% 44% 44% 62%}
.st-hero h1{font-size:clamp(34px,6vw,60px);font-style:italic;max-width:15ch;position:relative}
.st-hero .k{position:relative}
.st-hero p{color:#d3dbd0;font-size:clamp(16px,1.9vw,20px);margin-top:20px;max-width:56ch;position:relative}
.mani{max-width:780px}
.mani .big{font-family:var(--serif);font-style:italic;font-size:clamp(27px,4vw,44px);color:var(--jade);line-height:1.12}
.mani p{font-size:clamp(16px,1.6vw,18.5px);color:var(--jade2);margin-top:20px;line-height:1.7;max-width:64ch}
.mani .row{display:flex;gap:30px;flex-wrap:wrap;margin-top:30px}
.mani .row div{flex:1;min-width:150px}
.mani .row b{font-family:var(--serif);font-style:italic;font-size:21px;color:var(--jade);display:block}
.mani .row span{font-size:13.5px;color:var(--jade2);display:block;margin-top:5px;line-height:1.5}
/* control bar */
.st-bar{background:var(--paper);border:1px solid var(--line);border-radius:22px;padding:clamp(22px,3vw,34px);box-shadow:0 22px 54px rgba(21,32,26,.09);max-width:960px;margin:34px auto 0}
.st-bigname{display:block;width:100%;font-family:var(--serif);font-style:italic;font-size:clamp(28px,5vw,46px);text-align:center;border:0;border-bottom:2px solid var(--line);background:transparent;color:var(--jade);padding:4px 0 12px}
.st-bigname:focus{outline:none;border-bottom-color:var(--jade)}
.st-bigname::placeholder{color:var(--sage)}
.st-tools{display:flex;flex-wrap:wrap;gap:16px 20px;align-items:flex-end;justify-content:center;margin-top:22px}
.ctrl{display:flex;flex-direction:column;gap:6px}
.ctrl>span{font-size:10px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:var(--jade2)}
.ctrl input,.ctrl select{font-family:var(--sans);font-size:13.5px;padding:9px 12px;border:1px solid var(--line);border-radius:10px;background:var(--cream);color:var(--ink)}
.ctrl input:focus,.ctrl select:focus{outline:2px solid var(--jade);outline-offset:1px}
.ctrl.wide{flex:1;min-width:230px}.ctrl.wide input{width:100%}
.st-seg{display:flex;gap:6px}
.st-seg button{font-family:var(--sans);font-size:12.5px;font-weight:600;padding:9px 14px;border:1px solid var(--line);border-radius:999px;background:var(--cream);color:var(--jade2);cursor:pointer}
.st-seg button.sel{background:var(--jade);color:#fff;border-color:var(--jade)}
.st-dots{display:flex;gap:9px}
.st-dots button{width:28px;height:28px;border-radius:50%;border:2px solid transparent;cursor:pointer;padding:0}
.st-dots button.sel{border-color:var(--ink);box-shadow:0 0 0 2px #fff inset}
.st-filebtn{display:inline-block;font-size:12.5px;font-weight:600;color:var(--jade);border:1px solid var(--line);border-radius:999px;padding:9px 14px;cursor:pointer;background:var(--cream)}
.st-reset{background:transparent;border:1px solid var(--line);border-radius:999px;padding:9px 16px;font-weight:600;font-size:12.5px;color:var(--jade2);cursor:pointer;align-self:flex-end}
.st-note{text-align:center;font-size:11.5px;color:var(--jade2);margin-top:18px;letter-spacing:.02em}
/* showcase gallery */
.st-stage{--acc:#335143;margin-top:46px}
.shots{display:grid;grid-template-columns:1fr 1fr;gap:clamp(22px,3.4vw,40px);align-items:start}
.shot .n{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--jade2);font-weight:700;margin-bottom:14px}
.shot figcaption{font-size:13px;color:var(--jade2);margin-top:16px;line-height:1.62;max-width:42ch}
.serif{font-family:var(--serif);font-style:italic}
.st-stage[data-sty=modern] .serif{font-family:var(--sans);font-style:normal;font-weight:700;letter-spacing:-.01em}
.ph{background-size:cover;background-position:center;background-color:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-weight:700;letter-spacing:.06em;color:#fff}
.ph.on .pv-init{display:none}
/* business card + flip */
.bcard{perspective:1200px;cursor:pointer}
.bc-in{position:relative;width:100%;aspect-ratio:1.72/1;transition:transform .7s;transform-style:preserve-3d}
.bcard.flip .bc-in{transform:rotateY(180deg)}
.bc-face{position:absolute;inset:0;backface-visibility:hidden;border-radius:16px;padding:24px;color:#fff;background:var(--acc);display:flex;flex-direction:column;box-shadow:0 26px 56px rgba(21,32,26,.22)}
.bc-back{transform:rotateY(180deg);align-items:center;justify-content:center;text-align:center}
.bc-logo{font-family:var(--serif);font-style:italic;font-size:22px;line-height:1}
.bc-logo span{display:block;font-family:var(--sans);font-style:normal;font-size:7.5px;letter-spacing:.32em;font-weight:600;color:rgba(255,255,255,.72);margin-top:3px}
.bc-photo{width:52px;height:52px;border-radius:50%;font-size:14px;position:absolute;top:22px;right:22px;border:2px solid rgba(255,255,255,.5)}
.bc-name{font-family:var(--serif);font-style:italic;font-size:28px;margin-top:auto}
.bc-meta{font-size:12px;color:rgba(255,255,255,.85);margin-top:4px;letter-spacing:.02em}
.bc-mark{font-family:var(--serif);font-style:italic;font-size:52px}
.bc-tag{font-size:13px;color:rgba(255,255,255,.9);max-width:24ch;margin-top:12px;line-height:1.5}
/* phone-framed social */
.phone{max-width:272px;margin:0 auto;border:9px solid #15201a;border-radius:34px;overflow:hidden;box-shadow:0 26px 58px rgba(21,32,26,.26);background:#15201a}
.post{overflow:hidden;background:#fff}
.post-img{aspect-ratio:4/5;background:linear-gradient(135deg,var(--acc),var(--forest));display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.5);font-size:11px;letter-spacing:.26em;font-weight:700}
.post-band{background:var(--cream);padding:16px 16px 20px}
.jl{font-family:var(--serif);font-style:italic;font-size:27px;color:var(--jade)}
.post-agent{display:flex;align-items:center;gap:11px;margin-top:12px}
.post-photo{width:42px;height:42px;border-radius:50%;background-color:var(--jade);font-size:12px;color:#fff;flex:none}
.post-agent .nm{font-family:var(--serif);font-style:italic;font-size:17px;color:var(--ink)}
.post-sub{font-size:11.5px;color:var(--jade2);margin-top:1px}
/* feature: presentation */
.feature{margin-top:clamp(26px,4vw,48px);display:grid;grid-template-columns:1.5fr 1fr;gap:clamp(26px,4vw,50px);align-items:center}
.cover{aspect-ratio:1.5/1;border-radius:16px;background:linear-gradient(160deg,var(--forest),var(--acc));color:#eef1ec;padding:30px;display:flex;flex-direction:column;position:relative;overflow:hidden;box-shadow:0 30px 64px rgba(21,32,26,.26)}
.cv-top{display:flex;justify-content:space-between;gap:12px;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.72);font-weight:600}
.cv-top span{white-space:nowrap}
.cv-kick{font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--sage);font-weight:700;margin-top:28px}
.cv-h{font-family:var(--serif);font-style:italic;font-size:clamp(28px,3.6vw,42px);line-height:1.08;margin-top:10px}
.cv-stats{display:flex;gap:30px;margin-top:auto}
.cv-stats div{display:flex;flex-direction:column}
.cv-stats b{font-family:var(--serif);font-style:italic;font-size:22px}
.cv-stats span{font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.7);margin-top:3px}
.cv-by{font-size:12px;color:rgba(255,255,255,.82);margin-top:18px;border-top:1px solid rgba(255,255,255,.2);padding-top:13px}
.feat-cap .n{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--jade2);font-weight:700}
.feat-cap h3{font-family:var(--serif);font-style:italic;font-size:clamp(23px,2.8vw,30px);color:var(--jade);margin-top:10px}
.feat-cap p{font-size:15px;color:var(--jade2);margin-top:12px;line-height:1.7}
/* booking */
.book-row{margin-top:clamp(26px,4vw,48px);display:grid;grid-template-columns:1fr 1.3fr;gap:clamp(26px,4vw,50px);align-items:center}
.bk{border:1px solid var(--line);border-radius:16px;overflow:hidden;text-align:center;padding-bottom:22px;background:var(--paper);box-shadow:0 18px 44px rgba(21,32,26,.08)}
.bk-top{height:72px;background:var(--acc)}
.bk-photo{width:84px;height:84px;border-radius:50%;margin:-42px auto 0;border:4px solid var(--paper);background-color:var(--jade);font-size:20px;color:#fff}
.bk-name{font-family:var(--serif);font-style:italic;font-size:25px;color:var(--jade);margin-top:12px}
.bk-meta{font-size:12.5px;color:var(--jade2);margin-top:3px}
.bk-btn{display:inline-block;margin-top:16px;background:var(--acc);color:#fff;font-weight:700;font-size:13.5px;padding:10px 22px;border-radius:999px}
.real{background:var(--forest);color:#eef1ec;border-radius:20px;padding:clamp(28px,4vw,46px);max-width:900px;margin:0 auto}
.real h2{font-family:var(--serif);font-style:italic;font-size:clamp(25px,3.6vw,38px)}
.real p{color:#c9d2c6;font-size:clamp(15px,1.5vw,17.5px);margin:16px 0 0;max-width:58ch;line-height:1.7}
 
.st-cta .big2{font-family:var(--serif);font-style:italic;font-size:clamp(26px,3.8vw,40px);color:#fff;max-width:20ch;margin:14px 0 0}
@media(max-width:860px){.shots,.feature,.book-row{grid-template-columns:1fr}.feature .cover,.book-row .bk{order:-1}.st-reset{align-self:stretch}}
</style>`;
  const body = `${css}
<section class="st-hero"><div class="m1"></div><div class="wrap">
  <div class="eyebrow k">The studio</div>
  <h1>See yourself <em>in Jade green.</em></h1>
  <p>At Jade, your marketing is built around you — your brand, your market, your face on the sign. Type your name below and watch a taste of it come together, live.</p>
</div></section>

<section class="band paper"><div class="wrap">
  <div class="mani">
    <div class="eyebrow">Marketing, personalized</div>
    <div class="big" style="margin-top:14px">We don't hand you a template. We build your brand.</div>
    <p>At a lot of brokerages, "marketing support" means a logo swap and a canned flyer. At Jade, an in-house designer builds your listing presentations, your social, and your brand around your business — your voice, your market, your name. It's one of the things we take most seriously, because your brand is how clients remember you.</p>
    <div class="row">
      <div><b>Done for you</b><span>A real person designs it — you're never your own designer at 11pm.</span></div>
      <div><b>Built around you</b><span>Your brand, your market, your audience — not a forced house template.</span></div>
      <div><b>Ready day one</b><span>Cards, signage, and your first listing kit, waiting before your first appointment.</span></div>
    </div>
  </div>
</div></section>

<section class="band cream"><div class="wrap">
  <div class="eyebrow">Make it yours</div>
  <h2 class="h-sec" style="max-width:20ch;margin:8px 0 0">Type your name. Watch it turn Jade.</h2>

  <form class="st-bar" onsubmit="return false">
    <input type="text" id="f-name" class="st-bigname" placeholder="Your name" autocomplete="off" aria-label="Your name">
    <div class="st-tools">
      <label class="ctrl"><span>Title</span><input type="text" id="f-title" value="REALTOR®" autocomplete="off"></label>
      <label class="ctrl"><span>Your market</span><select id="f-market">${opts}</select></label>
      <label class="ctrl"><span>Phone</span><input type="text" id="f-phone" placeholder="(720) 555-0134" autocomplete="off"></label>
      <label class="ctrl wide"><span>Card tagline</span><input type="text" id="f-tag" value="Your name on the sign. Our team behind it." autocomplete="off"></label>
      <div class="ctrl"><span>Style</span><div class="st-seg"><button type="button" data-sty="editorial" class="sel">Editorial</button><button type="button" data-sty="modern">Modern</button></div></div>
      <div class="ctrl"><span>Accent</span><div class="st-dots"><button type="button" data-acc="jade" class="sel" style="background:#335143" aria-label="Jade"></button><button type="button" data-acc="olive" style="background:#3e5725" aria-label="Olive"></button><button type="button" data-acc="forest" style="background:#1b2f25" aria-label="Forest"></button></div></div>
      <div class="ctrl"><span>Headshot</span><label class="st-filebtn" for="f-photo">Add a photo</label><input type="file" id="f-photo" accept="image/*" style="display:none"></div>
      <button type="button" class="st-reset" id="st-reset">Reset</button>
    </div>
    <p class="st-note">Everything updates live · your photo stays on your device — nothing is uploaded.</p>
  </form>

  <div class="st-stage" id="st-stage">
    <div class="shots">
      <figure class="shot">
        <div class="n">Nº 01 · Your card</div>
        <div class="bcard" id="flipcard"><div class="bc-in">
          <div class="bc-face bc-front">
            <div class="bc-logo">Jade<span>REAL ESTATE</span></div>
            <div class="bc-photo ph"><span class="pv-init">JA</span></div>
            <div class="bc-name pv-name">Your Name</div>
            <div class="bc-meta"><span class="pv-title">REALTOR®</span> · <span class="pv-market">Denver Metro</span></div>
            <div class="bc-meta pv-phone">(720) 555-0134</div>
          </div>
          <div class="bc-face bc-back">
            <div class="bc-mark">J</div>
            <div class="bc-tag pv-tag">Your name on the sign. Our team behind it.</div>
          </div>
        </div></div>
        <figcaption>Designed and printed for you — in your hand your first week. A real card, not a template with your name dropped in. (Tap to flip.)</figcaption>
      </figure>

      <figure class="shot">
        <div class="n">Nº 02 · Your social</div>
        <div class="phone"><div class="post">
          <div class="post-img">YOUR LISTING</div>
          <div class="post-band">
            <div class="jl serif">Just Listed</div>
            <div class="post-agent">
              <div class="post-photo ph"><span class="pv-init">JA</span></div>
              <div><div class="nm pv-name">Your Name</div><div class="post-sub"><span class="pv-title">REALTOR®</span> · Jade Real Estate</div></div>
            </div>
          </div>
        </div></div>
        <figcaption>Every listing gets a branded Just Listed set, made in your voice. You post it; our team built it.</figcaption>
      </figure>
    </div>

    <div class="feature">
      <div class="cover">
        <div class="cv-top"><span>Jade Real Estate</span><span>Issue Nº 01</span></div>
        <div class="cv-kick">Seller Presentation</div>
        <div class="cv-h">Prepared for<br>your seller.</div>
        <div class="cv-stats"><div><b>Jade</b><span>Marketing</span></div><div><b class="pv-market">Denver Metro</b><span>Market</span></div></div>
        <div class="cv-by">Prepared by <span class="serif pv-name">Your Name</span>, <span class="pv-title">REALTOR®</span></div>
      </div>
      <div class="feat-cap">
        <div class="n">Nº 03 · Your seller presentation</div>
        <h3>A listing presentation that looks like a design studio spent a week on it.</h3>
        <p>Our team makes it yours — your comps, your market, your name on the cover. You walk into the listing appointment with something that already looks like you won.</p>
      </div>
    </div>

    <div class="book-row">
      <div class="bk">
        <div class="bk-top"></div>
        <div class="bk-photo ph"><span class="pv-init">JA</span></div>
        <div class="bk-name pv-name">Your Name</div>
        <div class="bk-meta"><span class="pv-title">REALTOR®</span> · <span class="pv-market">Denver Metro</span></div>
        <div class="bk-btn">Book with <span class="pv-first">you</span></div>
      </div>
      <div class="feat-cap">
        <div class="n">Nº 04 · Your booking page</div>
        <h3>Your own booking page and QR code.</h3>
        <p>Clients and leads pick a time that lands on your calendar and in your CRM — tagged with where they came from. Part of the Jade agent app, included.</p>
      </div>
    </div>
  </div>
</div></section>

<section class="band paper"><div class="wrap">
  <div class="real">
    <div class="eyebrow" style="color:var(--sage)">Why this matters</div>
    <h2 style="margin-top:12px">The preview is automatic. The real thing is personal.</h2>
    <p>What you just played with was generated in your browser in a few seconds. The marketing you'd actually get at Jade is designed by a real person on our team — built around your real listings, your real headshot, and the way you actually talk. That's the part we take seriously.</p>
    <div style="margin-top:26px"><a class="btn p" href="${BOOK}" target="_blank" rel="noopener">See what we'd build for you</a></div>
  </div>
</div></section>

<section class="band pull st-cta"><div class="wrap">
  <div class="eyebrow">The possibility</div>
  <p class="big2">This could be you — green and ready to go on day one.</p>
  <p class="exits" style="color:var(--sage)">Bring your questions — the move, the tools, the numbers. Opens our scheduler in a new tab.</p>
</div></section>
<script>
(function(){
  var g=function(id){return document.getElementById(id);};
  var stage=g("st-stage");
  function initials(n){n=(n||"").trim();if(!n){return "JA";}var p=n.split(" ").filter(Boolean);var a=p[0]?p[0].charAt(0):"";var b=p.length>1?p[p.length-1].charAt(0):"";var r=(a+b).toUpperCase();return r||"JA";}
  function firstName(n){n=(n||"").trim();if(!n){return "you";}return n.split(" ").filter(Boolean)[0]||"you";}
  function setAll(sel,val){var e=document.querySelectorAll(sel);for(var i=0;i<e.length;i++){e[i].textContent=val;}}
  function render(){
    var name=g("f-name").value.trim();
    setAll(".pv-name",name||"Your Name");
    setAll(".pv-title",g("f-title").value.trim()||"REALTOR®");
    setAll(".pv-market",g("f-market").value);
    setAll(".pv-phone",g("f-phone").value.trim()||"(720) 555-0134");
    setAll(".pv-tag",g("f-tag").value.trim()||"Your name on the sign. Our team behind it.");
    setAll(".pv-init",initials(name));
    setAll(".pv-first",firstName(name));
  }
  var ids=["f-name","f-title","f-market","f-phone","f-tag"];
  for(var i=0;i<ids.length;i++){var el=g(ids[i]);el.addEventListener("input",render);el.addEventListener("change",render);}
  g("f-photo").addEventListener("change",function(e){
    var f=e.target.files&&e.target.files[0];if(!f){return;}
    var r=new FileReader();
    r.onload=function(){var u=r.result;var ph=document.querySelectorAll(".ph");for(var i=0;i<ph.length;i++){ph[i].style.backgroundImage="url("+u+")";ph[i].classList.add("on");}};
    r.readAsDataURL(f);
  });
  var accMap={jade:"#335143",olive:"#3e5725",forest:"#1b2f25"};
  function wire(attr,fn){var b=document.querySelectorAll("[data-"+attr+"]");for(var i=0;i<b.length;i++){(function(x){x.addEventListener("click",function(){for(var j=0;j<b.length;j++){b[j].classList.remove("sel");}x.classList.add("sel");fn(x.getAttribute("data-"+attr));});})(b[i]);}}
  wire("acc",function(v){stage.style.setProperty("--acc",accMap[v]||"#335143");});
  wire("sty",function(v){stage.setAttribute("data-sty",v);});
  var fc=g("flipcard");if(fc){fc.addEventListener("click",function(){fc.classList.toggle("flip");});}
  g("st-reset").addEventListener("click",function(){
    g("f-name").value="";g("f-title").value="REALTOR®";g("f-market").selectedIndex=0;g("f-phone").value="";g("f-tag").value="Your name on the sign. Our team behind it.";
    var ph=document.querySelectorAll(".ph");for(var i=0;i<ph.length;i++){ph[i].style.backgroundImage="";ph[i].classList.remove("on");}
    render();
  });
  render();
})();
</script>`;
  const jsonld = [{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'See Yourself at Jade — Agent Brand Studio', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, url: SITE + '/studio', description: 'An interactive studio that previews your name on a Jade Real Estate business card, Just Listed social post, booking page, and listing presentation.' }];
  return layout({ title: 'See Yourself at Jade — Agent Brand Studio', desc: 'Type your name and instantly see yourself as a Jade Real Estate agent: a live Jade business card, Just Listed social post, booking page, and listing presentation. Jade personalizes your marketing — this is a taste.', path: '/studio', body, jsonld });
}

function calculatorPage() {
  const marketOpts = [['Denver Metro', 571000], ['Colorado Springs', 500000], ['Northern CO', 540000], ['Custom', 571000]]
    .map(function (m) { return '<option value="' + m[1] + '">' + esc(m[0]) + '</option>'; }).join('');
  const css = `
<style>
.cx-hero{background:var(--forest);color:#eef1ec;padding:clamp(54px,7vw,92px) 0}
.cx-hero h1{font-size:clamp(32px,5.2vw,54px);font-style:italic;max-width:17ch}
.cx-hero p{color:#d3dbd0;font-size:clamp(16px,1.7vw,19px);margin-top:18px;max-width:60ch}
.cx-wrap{display:grid;grid-template-columns:1fr 400px;gap:clamp(22px,3vw,38px);align-items:start}
.cx-card{background:var(--paper);border:1px solid var(--line);border-radius:18px;padding:clamp(20px,2.4vw,28px)}
.cx-card h3{font-family:var(--serif);font-style:italic;font-size:22px;color:var(--jade);margin:0 0 4px}
.cx-card .sub{font-size:12.5px;color:var(--jade2);margin:0 0 16px}
.cx-sec{margin-top:24px;border-top:1px solid var(--line);padding-top:20px}
.cx-sec:first-of-type{margin-top:0;border-top:0;padding-top:0}
.cx-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px 16px}
.cx-f{display:flex;flex-direction:column;gap:5px}
.cx-f.full{grid-column:1/-1}
.cx-f label{font-size:11px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;color:var(--jade2)}
.cx-f .hint{font-size:11px;color:var(--jade2);font-weight:400;letter-spacing:0;text-transform:none;margin-top:2px}
.cx-in{display:flex;align-items:center;border:1px solid var(--line);border-radius:10px;background:var(--cream);overflow:hidden}
.cx-in span{padding:0 0 0 12px;color:var(--jade2);font-size:14px}
.cx-in input,.cx-in select{width:100%;border:0;background:transparent;font-family:var(--sans);font-size:15px;padding:10px 12px;color:var(--ink)}
.cx-in input:focus,.cx-in select:focus,.cx-in:focus-within{outline:none}
.cx-in:focus-within{outline:2px solid var(--jade);outline-offset:1px}
.cx-tog{display:flex;align-items:flex-start;gap:10px;margin-top:12px;font-size:13.5px;color:var(--ink)}
.cx-tog input{margin-top:3px}
.cx-tog .t2{font-size:11.5px;color:var(--jade2);display:block;margin-top:2px}
.cx-res{position:sticky;top:78px;background:var(--forest);color:#eef1ec;border-radius:18px;padding:clamp(22px,2.6vw,30px)}
.cx-res .lab{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--sage);font-weight:700}
.cx-big{font-family:var(--serif);font-style:italic;font-size:clamp(40px,6vw,56px);line-height:1;margin:8px 0 4px}
.cx-sub{font-size:12.5px;color:#c9d2c6}
.cx-stats{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(255,255,255,.14);border-radius:12px;overflow:hidden;margin-top:20px}
.cx-stat{background:var(--forest);padding:14px 15px}
.cx-stat b{font-family:var(--serif);font-style:italic;font-size:20px;display:block}
.cx-stat span{font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:#aab6a7;margin-top:3px;display:block}
.cx-story{margin-top:18px;background:rgba(255,255,255,.07);border-radius:12px;padding:16px}
.cx-story .h{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--sage);font-weight:700}
.cx-story p{margin:9px 0 0;font-size:13.5px;color:#dbe2d7;line-height:1.5}
.cx-cur{margin-top:18px;border-top:1px solid rgba(255,255,255,.18);padding-top:16px;display:none}
.cx-cur.on{display:block}
.cx-cur .row{display:flex;justify-content:space-between;align-items:baseline;margin-top:8px;font-size:14px}
.cx-cur .row b{font-family:var(--serif);font-style:italic;font-size:18px}
.cx-delta{font-family:var(--serif);font-style:italic;font-size:22px;margin-top:4px}
.cx-print{margin-top:18px}
.cx-print button{width:100%;background:var(--cream);color:var(--forest);border:0;border-radius:999px;padding:11px;font-weight:700;font-size:14px;cursor:pointer;font-family:var(--sans)}
.cx-get{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:30px}
.cx-get .g{background:var(--paper);border:1px solid var(--line);border-radius:14px;padding:18px 20px;font-size:14px;color:var(--jade2);position:relative;padding-left:44px}
.cx-get .g::before{content:"✓";position:absolute;left:18px;top:18px;color:var(--olive);font-weight:800}
.cx-get .g b{color:var(--jade);font-weight:700}
.cx-disc{font-size:11.5px;color:var(--jade2);margin-top:24px;line-height:1.6;max-width:90ch}
@media(max-width:900px){.cx-wrap{grid-template-columns:1fr}.cx-res{position:static}}
@media(max-width:520px){.cx-grid,.cx-get{grid-template-columns:1fr}}
@media print{.nav,.cx-hero .btns,.cx-print,.foot{display:none}}
</style>`;
  const body = `${css}
<section class="cx-hero"><div class="wrap">
  <div class="eyebrow" style="color:var(--sage)">The numbers</div>
  <h1>What would you actually take home at Jade?</h1>
  <p>Enter your real production. The calculator is preloaded with Jade's actual terms — adjust anything, add your current brokerage, and see where you'd land. Nothing is sent anywhere; the math runs in your browser.</p>
</div></section>

<section class="band cream"><div class="wrap">
  <div class="cx-wrap">
    <form class="cx-card" onsubmit="return false">
      <div class="cx-sec">
        <h3>Your production</h3>
        <p class="sub">The real numbers from your last 12 months.</p>
        <div class="cx-grid">
          <div class="cx-f"><label>Market</label><div class="cx-in"><select id="c-market">${marketOpts}</select></div></div>
          <div class="cx-f"><label>Avg sale price / deal</label><div class="cx-in"><span>$</span><input type="number" id="c-price" value="571000"></div></div>
          <div class="cx-f"><label>Personal deals / year</label><div class="cx-in"><input type="number" id="c-deals" value="12"></div></div>
          <div class="cx-f"><label>Avg commission rate</label><div class="cx-in"><input type="number" id="c-rate" value="2.8" step="0.1"><span style="padding:0 12px 0 0">%</span></div></div>
          <div class="cx-f full"><label>Monthly ad / lead spend you cover now</label><div class="cx-in"><span>$</span><input type="number" id="c-ad" value="500"></div><span class="hint">What you pay out of pocket for ads, portals, or lead gen today.</span></div>
        </div>
      </div>

      <div class="cx-sec">
        <h3>Jade terms</h3>
        <p class="sub">Preloaded with Jade's real terms — adjust only if your offer differs.</p>
        <div class="cx-grid">
          <div class="cx-f"><label>Starting split (agent %) — pre-cap</label><div class="cx-in"><input type="number" id="c-split" value="80"><span style="padding:0 12px 0 0">%</span></div></div>
          <div class="cx-f"><label>Company dollar cap</label><div class="cx-in"><span>$</span><input type="number" id="c-cap" value="17500"></div></div>
          <div class="cx-f"><label>Split after cap (agent %)</label><div class="cx-in"><input type="number" id="c-aftercap" value="100"><span style="padding:0 12px 0 0">%</span></div></div>
          <div class="cx-f"><label>Company-lead split (agent %)</label><div class="cx-in"><input type="number" id="c-cosplit" value="60"><span style="padding:0 12px 0 0">%</span></div></div>
          <div class="cx-f"><label>Company-lead deals / year</label><div class="cx-in"><input type="number" id="c-codeals" value="3"></div><span class="hint">Jade agents who work the leads typically close 3–5 extra deals a year.</span></div>
          <div class="cx-f"><label>Monthly fee</label><div class="cx-in"><span>$</span><input type="number" id="c-fee" value="200"></div><span class="hint">Includes the Jade agent app.</span></div>
          <div class="cx-f full"><label>Other annual fees (E&amp;O, tech, onboarding)</label><div class="cx-in"><span>$</span><input type="number" id="c-extra" value="250"></div></div>
        </div>
        <label class="cx-tog"><input type="checkbox" id="c-leadsreplace" checked><span>Jade's leads replace your ad spend<span class="t2">On: your ad spend at Jade is $0 because company leads do the work.</span></span></label>
        <label class="cx-tog"><input type="checkbox" id="c-cocap" checked><span>Company-lead deals count toward cap progress</span></label>
      </div>

      <div class="cx-sec">
        <h3>Compare your current brokerage</h3>
        <p class="sub">Optional — personalizes the side-by-side.</p>
        <label class="cx-tog"><input type="checkbox" id="cur-on"><span>Add my current brokerage</span></label>
        <div class="cx-grid" style="margin-top:14px">
          <div class="cx-f"><label>Your current split (agent %)</label><div class="cx-in"><input type="number" id="cur-split" value="70"><span style="padding:0 12px 0 0">%</span></div></div>
          <div class="cx-f"><label>Current monthly fee</label><div class="cx-in"><span>$</span><input type="number" id="cur-fee" value="0"></div></div>
          <div class="cx-f full"><label>Current monthly ad / lead spend</label><div class="cx-in"><span>$</span><input type="number" id="cur-ad" value="500"></div><span class="hint">At your current brokerage you work your personal deals only — Jade's company leads are additional.</span></div>
        </div>
      </div>
    </form>

    <div class="cx-res" id="cx-res">
      <div class="lab">Your estimated take-home at Jade</div>
      <div class="cx-big" id="o-take">$0</div>
      <div class="cx-sub"><span id="o-agentsub">Agent take $0 • costs $0</span> • before taxes</div>
      <div class="cx-stats">
        <div class="cx-stat"><b id="o-gci">$0</b><span>Estimated GCI / yr</span></div>
        <div class="cx-stat"><b id="o-eff">0%</b><span>Effective take-home</span></div>
        <div class="cx-stat"><b id="o-tocap">0</b><span>Deals to cap</span></div>
        <div class="cx-stat"><b id="o-paid">$0</b><span>Paid to brokerage</span></div>
      </div>
      <div class="cx-story">
        <div class="h">The real story</div>
        <p id="o-story">—</p>
      </div>
      <div class="cx-cur" id="o-cur">
        <div class="lab" style="color:var(--sage)">Vs. your current brokerage</div>
        <div class="row"><span>Current take-home</span><b id="o-curtake">$0</b></div>
        <div class="cx-delta" id="o-delta">—</div>
      </div>
      <div class="cx-print"><button type="button" onclick="window.print()">Print this estimate</button></div>
    </div>
  </div>

  <div class="cx-get">
    <div class="g"><b>Company-generated leads</b> — typically 3–5 extra closings a year for agents who work them.</div>
    <div class="g"><b>Done-for-you marketing</b> — in-house design, branding, and listing support.</div>
    <div class="g"><b>A hands-on broker</b> — real mentorship and transaction support on every deal.</div>
    <div class="g"><b>The Jade agent app</b> — client hubs, booking, forms, and presentations, included.</div>
    <div class="g"><b>In-house lending</b> — through Versatile Lending.</div>
    <div class="g"><b>A competitive split</b> — with a low company cap, then you keep 100%.</div>
  </div>

  <p class="cx-disc">Estimates only, for illustration. Your real net depends on your actual commission rates, referral fees, concessions, tax strategy, and brokerage-specific rules, and the "3–5 extra deals" figure reflects agents who actively work company leads — it is not a guarantee of income or results. Final terms are confirmed in writing. Equal Housing Opportunity.</p>
  <div style="margin-top:22px"><a class="btn j" href="/compare">Compare the support &amp; tools →</a> &nbsp; <a class="btn j" href="${BOOK}" target="_blank" rel="noopener" style="background:var(--jade2)">Talk it through with Emilie ↗</a></div>
</div></section>
<script>
(function(){
  function g(id){return document.getElementById(id);}
  function num(id){var v=parseFloat(g(id).value);return isNaN(v)?0:v;}
  function money(n){var s=Math.round(n).toLocaleString("en-US");return "$"+s;}
  function compute(){
    var price=num("c-price"),deals=num("c-deals"),rate=num("c-rate"),ad=num("c-ad");
    var split=num("c-split"),cap=num("c-cap"),cosplit=num("c-cosplit"),codeals=num("c-codeals"),fee=num("c-fee"),extra=num("c-extra");
    var leadsReplace=g("c-leadsreplace").checked,coCap=g("c-cocap").checked;
    var gpd=price*rate/100;
    var gci=(deals+codeals)*gpd;
    var personalBroker=deals*(1-split/100)*gpd;
    var capped=Math.min(cap,personalBroker);
    var coShare=codeals*(1-cosplit/100)*gpd;
    var paid=capped+coShare;
    var agentTake=gci-paid;
    var adAtJade=leadsReplace?0:ad*12;
    var fees=fee*12+extra;
    var costs=fees+adAtJade;
    var take=agentTake-costs;
    var eff=gci>0?(take/gci*100):0;
    var perDeal=(coCap&&(deals+codeals)>0)?((deals*(1-split/100)+codeals*(1-cosplit/100))*gpd)/(deals+codeals):(1-split/100)*gpd;
    var toCap=perDeal>0?Math.ceil(cap/perDeal):0;
    var coContribution=codeals*(cosplit/100)*gpd;
    var adSave=leadsReplace?ad*12:0;
    g("o-take").textContent=money(take);
    g("o-agentsub").textContent="Agent take "+money(agentTake)+" • costs "+money(costs);
    g("o-gci").textContent=money(gci);
    g("o-eff").textContent=(Math.round(eff*10)/10)+"%";
    g("o-tocap").textContent=toCap;
    g("o-paid").textContent=money(paid);
    var story=[];
    if(codeals>0){story.push("+"+money(coContribution)+" from "+codeals+" company-provided deal"+(codeals===1?"":"s"));}
    if(adSave>0){story.push("+"+money(adSave)+"/yr you no longer spend on ads");}
    g("o-story").textContent=story.length?("What's padding your take-home: "+story.join("  •  ")):"Adjust the inputs to see your estimate.";
    var curOn=g("cur-on").checked;
    g("o-cur").className=curOn?"cx-cur on":"cx-cur";
    if(curOn){
      var cs=num("cur-split"),cf=num("cur-fee"),ca=num("cur-ad");
      var curGci=deals*gpd;
      var curAgent=curGci*cs/100;
      var curCosts=cf*12+ca*12;
      var curTake=curAgent-curCosts;
      g("o-curtake").textContent=money(curTake);
      var d=take-curTake;
      g("o-delta").textContent=(d>=0?"+"+money(d)+" more at Jade":money(d)+" — your current setup wins");
    }
  }
  var mk=g("c-market");
  if(mk){mk.addEventListener("change",function(){var v=parseFloat(mk.value);if(!isNaN(v)){g("c-price").value=v;}compute();});}
  var ids=["c-price","c-deals","c-rate","c-ad","c-split","c-cap","c-aftercap","c-cosplit","c-codeals","c-fee","c-extra","cur-split","cur-fee","cur-ad"];
  for(var i=0;i<ids.length;i++){var e=g(ids[i]);if(e){e.addEventListener("input",compute);}}
  var toggles=["c-leadsreplace","c-cocap","cur-on"];
  for(var j=0;j<toggles.length;j++){g(toggles[j]).addEventListener("change",compute);}
  compute();
})();
</script>`;
  const jsonld = [{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Jade Real Estate Take-Home Calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, url: SITE + '/calculator', description: 'Estimate your real annual take-home as a Jade Real Estate agent and compare it to your current brokerage.' }];
  return layout({ title: 'Take-Home Calculator — Jade Real Estate Careers', desc: "Estimate what you'd actually take home at Jade Real Estate using your real production, and compare it to your current brokerage. Preloaded with Jade's real terms; runs entirely in your browser.", path: '/calculator', body, jsonld });
}

function comparePage() {
  const CATS = [
    ['01', 'Brokerage support', 'The people, structure and day-to-day support behind the agent.', [
      ['Direct 1:1 managing broker access', 'A second opinion or help with a live issue, when you want it.', 'Included', 'Direct access to experienced brokerage leadership when you need it.'],
      ['Contract &amp; compliance support', 'Help interpreting forms, deadlines, documentation and compliance.', 'Included', 'Broker support for contracts, documentation, compliance and transaction questions.'],
      ['E&amp;O insurance', 'Errors &amp; omissions coverage through the brokerage model.', 'Included', 'Standard affiliated-agent E&amp;O coverage through Jade’s group policy.'],
      ['Bi-weekly training', 'Ongoing skill, market, system and business-development education.', 'Included', 'Bi-weekly sessions on practical agent and business-development topics.'],
    ]],
    ['02', 'Marketing materials', 'Not just templates — real design help and brand support, shaped around your business.', [
      ['Custom agent branding support', 'Building your own brand, not a forced house identity.', 'Included', 'Jade helps agents build around their own brand, market and audience.'],
      ['Custom in-house design support', 'A person who can actually build the piece when you need it.', 'Included', 'Custom design support for agent and client-facing marketing.'],
      ['Listing marketing strategy &amp; support', 'Help deciding what to build and how to position a property.', 'Included', 'Direct help planning and executing listing marketing.'],
      ['Social scheduling &amp; content platform', 'A system for planning and scheduling social content.', 'Included', 'OnlySocial is included for scheduling, publishing and supplemental content. You connect your own accounts.'],
    ]],
    ['03', 'Lead systems &amp; transaction tools', 'The infrastructure for managing contacts and moving business from lead to close.', [
      ['CRM &amp; lead management platform', 'A brokerage-provided CRM for follow-up and lead organization.', 'Included', 'Follow Up Boss CRM access is included.'],
      ['Digital lead opportunities', 'Internet/digital opportunities distributed through the brokerage.', 'Included', 'Digital company lead opportunities, for agents who want them.'],
      ['Third-party lead platform opportunities', 'Consumer leads sourced through outside lead/referral platforms.', 'Included', 'Jade participates in third-party lead/referral platforms for agents who want them.'],
      ['Transaction-management workflow', 'A consistent, supported platform/process for transaction docs.', 'Agent-paid', 'Jade supports CTMe as its transaction workflow, but the agent’s CTMe subscription is not paid by Jade.'],
    ]],
  ];
  let k = 0;
  const cats = CATS.map(function (c) {
    const rows = c[3].map(function (r) {
      k++;
      const badge = r[2] === 'Included'
        ? '<span class="cp-badge inc">Included</span>'
        : '<span class="cp-badge sup">Supported · agent-paid</span>';
      return '<div class="cp-row"><div class="cp-r"><div class="cp-name">' + r[0] + '</div><div class="cp-desc">' + r[1] + '</div></div>'
        + '<div class="cp-you"><button type="button" class="cp-have" data-k="' + k + '">I have this</button></div>'
        + '<div class="cp-jade">' + badge + '<div class="cp-note">' + r[3] + '</div></div></div>';
    }).join('');
    return '<section class="cp-cat"><div class="cp-cathd"><span class="cp-num">' + c[0] + '</span><div><h3>' + c[1] + '</h3><p>' + c[2] + '</p></div></div>'
      + '<div class="cp-head"><span>Resource</span><span>Your brokerage</span><span>Jade Real Estate</span></div>' + rows + '</section>';
  }).join('');
  const css = `
<style>
.cp-hero{background:var(--forest);color:#eef1ec;padding:clamp(54px,7vw,92px) 0}
.cp-hero h1{font-size:clamp(32px,5.2vw,54px);font-style:italic;max-width:17ch}
.cp-hero p{color:#d3dbd0;font-size:clamp(16px,1.7vw,19px);margin-top:18px;max-width:60ch}
.cp-note0{background:var(--paper);border:1px solid var(--line);border-radius:14px;padding:16px 20px;font-size:13.5px;color:var(--jade2);margin-bottom:24px}
.cp-note0 b{color:var(--jade)}
.cp-cat{margin-top:34px}
.cp-cathd{display:flex;gap:16px;align-items:flex-start}
.cp-num{font-family:var(--serif);font-style:italic;font-size:30px;color:var(--sage)}
.cp-cathd h3{font-family:var(--serif);font-style:italic;font-size:24px;color:var(--jade);margin:0}
.cp-cathd p{font-size:14px;color:var(--jade2);margin:4px 0 0;max-width:70ch}
.cp-head{display:grid;grid-template-columns:1fr 150px 1.1fr;gap:16px;margin-top:18px;padding:0 4px 8px;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--jade2);font-weight:700;border-bottom:1px solid var(--line)}
.cp-row{display:grid;grid-template-columns:1fr 150px 1.1fr;gap:16px;padding:18px 4px;border-bottom:1px solid var(--line);align-items:start}
.cp-name{font-weight:600;font-size:15px;color:var(--ink)}
.cp-desc{font-size:12.5px;color:var(--jade2);margin-top:4px;line-height:1.5}
.cp-have{font-family:var(--sans);font-size:12.5px;font-weight:600;color:var(--jade2);border:1px solid var(--line);background:var(--cream);border-radius:999px;padding:8px 14px;cursor:pointer;white-space:nowrap}
.cp-have.on{background:var(--jade);color:#fff;border-color:var(--jade)}
.cp-have.on::before{content:"✓ "}
.cp-badge{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:4px 10px;border-radius:999px}
.cp-badge.inc{background:rgba(62,87,37,.14);color:var(--olive)}
.cp-badge.sup{background:rgba(84,103,81,.16);color:var(--jade2)}
.cp-note{font-size:12.5px;color:var(--jade2);margin-top:7px;line-height:1.5}
.cp-sum{background:var(--forest);color:#eef1ec;border-radius:18px;padding:clamp(24px,3vw,34px);margin-top:40px}
.cp-sum h3{font-family:var(--serif);font-style:italic;font-size:26px;margin:0}
.cp-sum p{color:#c9d2c6;font-size:14.5px;margin-top:10px;line-height:1.6;max-width:72ch}
.cp-tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,.14);border-radius:12px;overflow:hidden;margin-top:22px}
.cp-tile{background:var(--forest);padding:18px}
.cp-tile b{font-family:var(--serif);font-style:italic;font-size:30px;display:block}
.cp-tile span{font-size:11.5px;color:#aab6a7;margin-top:5px;display:block;line-height:1.4}
.cp-foot{font-size:12.5px;color:var(--jade2);margin-top:24px;line-height:1.6;max-width:90ch}
@media(max-width:720px){.cp-head{display:none}.cp-row{grid-template-columns:1fr;gap:10px}.cp-you{order:3}.cp-tiles{grid-template-columns:1fr}}
</style>`;
  const body = `${css}
<section class="cp-hero"><div class="wrap">
  <div class="eyebrow" style="color:var(--sage)">Agent comparison</div>
  <h1>Compare what your brokerage gives you.</h1>
  <p>No score, no manufactured winner — just a side-by-side look at the support, marketing and lead systems you actually use, next to what Jade provides. Mark what you have; it saves on this device.</p>
</div></section>

<section class="band cream"><div class="wrap">
  <div class="cp-note0">Everything marked <b>Included</b> is part of Jade's <b>$200/month</b> fee (which also includes the Jade agent app) unless a row says otherwise. Mark <b>I have this</b> for what you get today to personalize the summary.</div>
  ${cats}

  <div class="cp-sum">
    <h3>Here's your setup, next to Jade.</h3>
    <p id="cp-summary">Mark the resources you have above to see how your current setup compares.</p>
    <div class="cp-tiles">
      <div class="cp-tile"><b id="cp-c1">0</b><span>resources you marked at your brokerage</span></div>
      <div class="cp-tile"><b id="cp-c2">0</b><span>Jade-included resources you didn't mark having</span></div>
      <div class="cp-tile"><b>11</b><span>of these 12 resources included in Jade's $200/mo fee</span></div>
    </div>
  </div>

  <p class="cp-foot">What Jade intentionally does <b>not</b> count as included: Jade does not pay agent MLS / association dues, does not pay the agent's CTMe subscription, and does not cover physical printing/production costs. Jade does provide the design work and supports CTMe as a transaction workflow. The number of tools isn't the whole story — the next useful step is usually comparing the economics.</p>
  <div style="margin-top:20px"><a class="btn j" href="/calculator">See what the model means for your take-home →</a> &nbsp; <a class="btn j" href="${BOOK}" target="_blank" rel="noopener" style="background:var(--jade2)">Ask Emilie a specific question ↗</a></div>
</div></section>
<script>
(function(){
  var KEY="jade_compare_v1";
  var TOTAL=12, JADEINC=11;
  function state(){try{return JSON.parse(localStorage.getItem(KEY))||{};}catch(e){return {};}}
  function save(s){try{localStorage.setItem(KEY,JSON.stringify(s));}catch(e){}}
  var s=state();
  var btns=document.querySelectorAll(".cp-have");
  function summarize(){
    var have=0;
    for(var i=0;i<btns.length;i++){if(btns[i].classList.contains("on")){have++;}}
    var missing=JADEINC-have;if(missing<0){missing=0;}
    document.getElementById("cp-c1").textContent=have;
    document.getElementById("cp-c2").textContent=missing;
    var msg;
    if(have===0){msg="Mark the resources you have above to see how your current setup compares.";}
    else{msg="You marked "+have+" resource"+(have===1?"":"s")+" at your current brokerage. Jade includes "+JADEINC+" of the 12 shown in its $200/month fee — "+missing+" of them you didn't mark having today.";}
    document.getElementById("cp-summary").textContent=msg;
  }
  for(var i=0;i<btns.length;i++){
    (function(b){
      var key=b.getAttribute("data-k");
      if(s[key]){b.classList.add("on");}
      b.addEventListener("click",function(){
        b.classList.toggle("on");
        var cur=state();
        if(b.classList.contains("on")){cur[key]=1;}else{delete cur[key];}
        save(cur);summarize();
      });
    })(btns[i]);
  }
  summarize();
})();
</script>`;
  const jsonld = [{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Jade Real Estate Brokerage Comparison', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, url: SITE + '/compare', description: 'Compare the support, marketing and lead systems at your current brokerage with what Jade Real Estate includes.' }];
  return layout({ title: 'Compare Brokerages — Jade Real Estate Careers', desc: "A side-by-side look at the support, marketing, and lead systems you use today versus what Jade Real Estate includes in its $200/month fee. Mark what you have; it saves on your device.", path: '/compare', body, jsonld });
}

function robots() {
  const lines = [
    'User-agent: *', 'Allow: /',
    '', '# AI assistants are welcome — this is public recruiting content.',
    'User-agent: GPTBot', 'Allow: /',
    'User-agent: OAI-SearchBot', 'Allow: /',
    'User-agent: ChatGPT-User', 'Allow: /',
    'User-agent: PerplexityBot', 'Allow: /',
    'User-agent: Google-Extended', 'Allow: /',
    'User-agent: Applebot-Extended', 'Allow: /',
    'User-agent: ClaudeBot', 'Allow: /',
    'User-agent: Claude-Web', 'Allow: /',
    'User-agent: Bytespider', 'Allow: /',
    '', 'Sitemap: ' + SITE + '/sitemap.xml',
  ];
  return new Response(lines.join('\n'), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}

async function sitemap() {
  const posts = await getPosts(200);
  const base = ['/', '/technology', '/culture', '/studio', '/calculator', '/compare', '/blog', '/faq'];
  const today = new Date().toISOString().slice(0, 10);
  const rows = base.map(u => `  <url><loc>${SITE}${u === '/' ? '' : u}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${u === '/' ? '1.0' : '0.7'}</priority></url>`)
    .concat(posts.map(p => `  <url><loc>${SITE}/blog/${p.slug}</loc><lastmod>${(p.published_at || today).slice(0, 10)}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`));
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + rows.join('\n') + '\n</urlset>';
  return new Response(xml, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
}

function llms() {
  const t = `# Jade Real Estate — Careers

Jade Real Estate is an independent real estate brokerage serving Colorado's Front Range and mountains: Denver Metro, Colorado Springs, Winter Park, and Northern Colorado. This site is for licensed real estate agents considering a move to Jade. Owner-operated; office at ${OFFICE}.

## What Jade is
A boutique, independent, owner-operated Colorado brokerage built around the agent — not the franchise. No mandatory meetings, no production minimums, no prescribed path. Known for being available and supportive, with real community presence (for example "Jade at the Market," a booth at a Denver farmers market).

## What the flat $200/month includes
The Jade agent app, built in-house and included:
- Client hubs (a private portal for every buyer and seller)
- A personal booking scheduler with QR code, synced to the CRM
- Listing presentations and CMAs with pricing adjustments and PDF export
- A marketing studio: branded social posts, newsletters, landing pages, custom graphics
- A forms and lead-capture builder with QR codes, synced to Follow Up Boss
- A Jade AI assistant (Colorado rules and Fair Housing aware)

Brokerage and support, included:
- Follow Up Boss CRM, set up and ready
- HouseCanary property and market data
- In-house listing and marketing support and design work
- Transaction support: pricing, inspection, appraisal, compliance
- One-on-one coaching tied to your goals, optional accountability groups
- Direct access to the broker
- Lead sources (referral, relocation, digital) for agents who want them
- A day-one starter kit: branded tote, signage, business cards, office supplies, marketing consultation

Billed separately (standard agent costs, not part of the $200): MLS / REALTOR association dues, the agent's transaction-platform subscription (e.g. CTMe), and physical printing/production costs.

## Compensation
Jade does not lead with a commission-split number, because a split is not take-home. Agents run their real production through a take-home calculator and compare it to their current brokerage. Specifics are discussed one-on-one.

## Key pages
- Why Jade: ${SITE}/
- Technology: ${SITE}/technology
- Culture: ${SITE}/culture
- See yourself at Jade (interactive brand studio): ${SITE}/studio
- Blog: ${SITE}/blog
- FAQ (includes the full $200 inclusions list): ${SITE}/faq
- Take-home calculator: ${SITE}/calculator
- Compare brokerages: ${SITE}/compare
- Book a conversation with Emilie: ${BOOK}

## Contact
Emilie Smith (recruiting) · emilie@jaderealestate.com · ${MAIN}
`;
  return new Response(t, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}

function html(body, status) { return new Response(body, { status: status || 200, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=300' } }); }

function notFound() {
  return html(layout({ title: 'Not found — Jade Real Estate Careers', desc: 'Page not found.', path: '', body: `<section class="band cream"><div class="wrap center" style="padding:40px 0"><h1 class="h-sec">Page not found</h1><p class="lead">That page moved or never existed. <a href="/" style="color:var(--jade);font-weight:600">Back to Why Jade →</a></p></div></section>` }), 404);
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const p = url.pathname.replace(/\/+$/, '') || '/';
    if (p.startsWith('/img/')) return serveImg(p.slice(5));
    if (p === '/robots.txt') return robots();
    if (p === '/sitemap.xml') return await sitemap();
    if (p === '/llms.txt') return llms();
    if (p === '/') return html(await homePage());
    if (p === '/technology') return html(techPage());
    if (p === '/culture') return html(culturePage());
    if (p === '/faq') return html(faqPage());
    if (p === '/studio') return html(studioPage());
    if (p === '/calculator') return html(calculatorPage());
    if (p === '/compare') return html(comparePage());
    if (p === '/blog') return html(await blogIndex());
    if (p.startsWith('/blog/')) { const slug = decodeURIComponent(p.slice(6)); const post = await getPost(slug); return post ? html(postPage(post)) : notFound(); }
    return notFound();
  },
};
