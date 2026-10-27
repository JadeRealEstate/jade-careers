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
const NAV = [['/', 'Why Jade'], ['/technology', 'Technology'], ['/culture', 'Culture'], ['/marketing', 'Marketing'], ['/calculator', 'Calculator'], ['/blog', 'Blog'], ['/faq', 'FAQ']];
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
.q.feat{grid-column:1/-1;background:var(--jade);border-left:0;border-radius:16px;padding:clamp(28px,4vw,40px)}
.q.feat p{font-size:clamp(22px,2.9vw,32px);color:#fff;line-height:1.3}
.q.feat .by{color:var(--sage);margin-top:18px}
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
.inc-toggle{margin-top:26px}
.inc-toggle>summary{list-style:none;cursor:pointer;display:inline-flex;align-items:center;gap:10px;background:var(--jade);color:#fff;font-weight:700;font-size:14.5px;padding:12px 22px;border-radius:999px;font-family:var(--sans);user-select:none}
.inc-toggle>summary::-webkit-details-marker{display:none}
.inc-toggle>summary::marker{content:""}
.inc-toggle>summary:hover{background:var(--forest)}
.inc-toggle .chev{transition:transform .2s;font-size:11px}
.inc-toggle[open]>summary .chev{transform:rotate(180deg)}
.inc-toggle[open] .inc-open{display:none}
.inc-toggle:not([open]) .inc-close{display:none}
.inc-toggle .inc{margin-top:22px}
.inc li.x{display:none}
.inc.open li.x{display:list-item}
.inc-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px}
.inc-morebtn,.inc-tierbtn{cursor:pointer;font-family:var(--sans);font-weight:700;font-size:14px;padding:11px 20px;border-radius:999px;border:1px solid var(--jade)}
.inc-morebtn{background:var(--jade);color:#fff}
.inc-morebtn:hover{background:var(--forest);border-color:var(--forest)}
.inc-tierbtn{background:transparent;color:var(--jade)}
.inc-tierbtn:hover{background:var(--jade);color:#fff}
.tiers{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:22px}
.tiers .tier{background:var(--paper);border:1px solid var(--line);border-radius:16px;padding:22px}
.tiers .tp{font-family:var(--serif);font-size:34px;color:var(--jade);line-height:1}
.tiers .tp span{font-size:.4em;color:var(--jade2);font-style:italic;margin-left:3px}
.tiers .tier h4{font-family:var(--serif);font-style:italic;font-size:18px;color:var(--jade);margin:10px 0 6px}
.tiers .tier p{font-size:13px;color:var(--jade2);line-height:1.55;margin:0}
#tiersPanel{display:none;margin-top:22px}
#tiersPanel.show{display:block}
.tierlead{font-size:15px;color:var(--jade2);max-width:62ch}
.tiertable{overflow-x:auto;margin-top:16px;border:1px solid var(--line);border-radius:16px;background:var(--paper)}
.tiertable table{border-collapse:collapse;width:100%;min-width:580px}
.tiertable th,.tiertable td{text-align:left;padding:12px 15px;border-bottom:1px solid var(--line);font-size:13.5px}
.tiertable thead th{background:var(--cream);font-family:var(--serif);color:var(--jade);font-size:21px;font-style:italic;vertical-align:top;line-height:1.05}
.tiertable thead th span{font-size:12px;color:var(--jade2);font-style:italic}
.tiertable thead th em{display:block;font-family:var(--sans);font-style:normal;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--jade2);font-weight:700;margin-top:5px}
.tiertable tbody td:first-child{font-weight:600;color:var(--ink)}
.tiertable td.y{color:var(--olive);font-weight:800;text-align:center}
.tiertable td.n{color:var(--jade2);text-align:center}
.tiertable td.r{color:var(--jade2);text-align:center;font-size:11.5px;font-style:italic}
.tiertable tbody tr:last-child td{border-bottom:0}
.tiertable tr.grp td{background:var(--cream);font-family:var(--serif);font-style:italic;color:var(--jade);font-size:14px;padding-top:15px;letter-spacing:.01em}
.tiernote{font-size:12.5px;color:var(--jade2);margin-top:14px;line-height:1.55;max-width:72ch}
.aimk{color:var(--olive);font-size:10px;margin-right:8px;vertical-align:1.5px}
.tierkey{font-size:12.5px;color:var(--jade2);margin-top:14px;font-weight:600}
@media(max-width:760px){.tiers{grid-template-columns:1fr}}
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
    <a href="/">Why Jade</a><a href="/technology">Technology</a><a href="/culture">Culture</a><a href="/marketing">Marketing</a><a href="/calculator">Calculator</a><a href="/compare">Compare</a><a href="/blog">Blog</a><a href="/faq">FAQ</a>
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
  ['Joining Jade is the best thing I’ve done in my career. I’ve doubled my transactions in the past year — largely thanks to the marketing support, the managing broker, and the lead systems they provide.', 'Ben Good'],
  ['Good people, a great office environment, and support whenever I need it.', 'Trevor Moylan'],
  ['What stands out most is how available and ready to help everyone is — it’s a flexible team you can actually count on.', 'Charles Phanumphai'],
  ['Friendly agents, real marketing and social media support, and a kind broker who wants to see you succeed — a genuine opportunity to grow your business alongside Jade’s.', 'Stephanie Avozani'],
  ['The team is very involved without being micromanaging — a great balance of support and freedom to run my business my way. As a boutique brokerage, they’re genuinely invested in helping me grow.', 'Yvette Ortiz'],
];

async function homePage() {
  const posts = await getPosts(3);
  const jsonld = [
    { '@context': 'https://schema.org', '@type': 'Organization', name: 'Jade Real Estate', url: SITE, logo: OG, image: OG, sameAs: [MAIN], areaServed: MARKETS, description: 'Independent Colorado real estate brokerage built around the agent — the Jade agent app, marketing support when you need it, and real support, across the Front Range and mountains.' },
    { '@context': 'https://schema.org', '@type': 'RealEstateAgent', name: 'Jade Real Estate', url: SITE, areaServed: MARKETS, address: { '@type': 'PostalAddress', streetAddress: '2570 Lawrence St Unit 104', addressLocality: 'Denver', addressRegion: 'CO', postalCode: '80205' }, knowsAbout: ['real estate agent technology', 'agent marketing', 'brokerage support', 'real estate careers Colorado'] },
  ];
  const quotes = TESTIMONIALS.map(([q, by], i) => `<div class="q${i === 0 ? ' feat' : ''}"><p>&ldquo;${esc(q)}&rdquo;</p><div class="by">${esc(by)}</div></div>`).join('');
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
  <p>Jade is an independent Colorado brokerage with its own agent app, marketing support when you need it, and a broker who actually picks up. No mandatory meetings or production minimums — just real people who love a one-on-one, teach the classes, and answer your questions, because person-to-person is what makes us better.</p>
  <div class="btns"><a class="btn p" href="${BOOK}" target="_blank" rel="noopener">Talk with Emilie</a><a class="btn s" href="/marketing">See our marketing →</a></div>
</div></section>

<section class="band cream"><div class="wrap">
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
    <div class="r"><div class="lbl"><small>02 — Marketing</small>You’re not your own designer</div><p>In-house listing support, personal branding, and custom, on-brand content made for you — ready to post, with a marketing team to call on whenever you need it. You never start from a blank page.</p></div>
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
      <div class="eyebrow">Marketing, built around you</div>
      <div class="big light" style="margin-top:12px">We build your brand around you.</div>
      <div class="prose" style="color:#d3dbd0">
        <p style="color:#d3dbd0">No two Jade agents look alike. See the range of personalized marketing our in-house team creates — magazine-style listing presentations, social in your voice, branded print, and a brand that’s genuinely yours.</p>
      </div>
      <div style="margin-top:24px"><a class="btn p" href="/marketing">See our marketing →</a></div>
    </div>
    <figure class="figure" aria-hidden="true">
      <div class="mini-card">
        <div class="mini-logo">Jade<span>REAL ESTATE</span></div>
        <div class="mini-photo">YOU</div>
        <div class="mini-name">Your Name</div>
        <div class="mini-meta">REALTOR® · Colorado Springs</div>
      </div>
      <figcaption style="color:#aab6a7">A look at the range we build for agents.</figcaption>
    </figure>
  </div>
</div></section>

<section class="band paper"><div class="wrap">
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

${latest}
${ctaBand()}`;
  return layout({ title: 'Jade Real Estate — Careers for Colorado Agents', desc: 'Join Jade Real Estate, an independent Colorado brokerage built around the agent: the Jade agent app, marketing support when you need it, and real support. No mandatory meetings or production minimums. Explore it with Emilie.', path: '/', body, jsonld });
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
          <div class="mbk"><div class="mbk-top"></div><div class="mbk-av">AJ</div><div class="mbk-nm">Avery Jordan</div><div class="mbk-mt">REALTOR® · Northern Colorado</div>
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
          <div class="tx-tool"><b>Made for you</b><span>Custom, on-brand pieces built for you to post, with the marketing team a message away when you need more.</span></div>
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

  <div style="margin-top:44px;display:flex;gap:13px;flex-wrap:wrap"><a class="btn j" href="${DEMO}" target="_blank" rel="noopener">Take the self-guided tour <span class="xt" aria-hidden="true">↗</span></a><a class="btn j" href="${CLIENT_DEMO}" target="_blank" rel="noopener" style="background:var(--jade2)">See the client experience <span class="xt" aria-hidden="true">↗</span></a> <a class="btn j" href="/marketing" style="background:var(--olive)">See the marketing →</a></div>
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
  const quotes = TESTIMONIALS.map(([q, by], i) => `<div class="q${i === 0 ? ' feat' : ''}"><p>&ldquo;${esc(q)}&rdquo;</p><div class="by">${esc(by)}</div></div>`).join('');
  const body = `
<section class="band forest"><div class="wrap">
  <div class="eyebrow">Culture</div>
  <h1 class="h-sec" style="font-style:italic;font-size:clamp(32px,5vw,52px)">A team that shows up for each other.</h1>
  <p class="lead">Jade is a boutique brokerage — small enough to know your name, serious enough to grow your business. Here’s what that feels like day to day.</p>
</div></section>
<section class="band cream"><div class="wrap">
  <div class="eyebrow">In their words</div>
  <h2 class="h-sec">From Jade agents.</h2>
  <div class="quotes">${quotes}</div>
</div></section>

<section class="band paper"><div class="wrap">
  <div class="ed">
    <figure class="figure">
      <img src="/img/team.jpg" width="1040" height="1386" alt="Two members of the Jade Real Estate team playing shuffleboard on a team night at a Colorado brewery, with a wall of whiskey barrels behind them." loading="lazy">
      <figcaption>A team night — shuffleboard, barrels, and no agenda.</figcaption>
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

<section class="band cream"><div class="wrap">
  <div class="two">
    <div class="feat"><h3>Freedom to run your business</h3><p>No mandatory meetings, no production minimums. The team is involved without micromanaging — we show up for one-on-ones, run classes when they help, and answer questions fast, then leave you free to work your way.</p></div>
    <div class="feat"><h3>Available when you need it</h3><p>What agents mention most is how available and ready to help everyone is — a flexible team you can actually count on, and a broker who wants to see you win.</p></div>
    <div class="feat"><h3>Out in the community</h3><p>Jade at the Market, local events, and real neighborhood presence. We’d rather meet people on a Saturday morning than buy another billboard.</p></div>
    <div class="feat"><h3>Boutique &amp; invested</h3><p>As an independent, owner-operated brokerage, Jade is genuinely invested in helping each agent grow — not running you through a national playbook.</p></div>
  </div>
</div></section>

<section class="band pull"><div class="wrap">
  <p>A brokerage should be a brokerage, not a tech company. Our focus is your business, your relationships, and you as a person — the technology is simply there, working quietly in the background, to support all of it.</p>
  <div class="by">Will Lawrence · Owner &amp; Managing Broker</div>
</div></section>

<section class="band cream"><div class="wrap">
  <div class="eyebrow">In their words</div>
  <h2 class="h-sec" style="margin-bottom:8px">What agents say.</h2>
  <div class="quotes">${quotes}</div>
</div></section>
${ctaBand()}`;
  return layout({ title: 'Culture — Jade Real Estate Careers', desc: 'Life at Jade Real Estate: freedom to run your business, a team that shows up for each other, real marketing support, community presence like Jade at the Market, and an independent, boutique, Colorado-local culture built around agents.', path: '/culture', body });
}

// Grouped, verifiable "what's included in $200/month" block, reused on FAQ.
function includedBlock() {
  const groups = [
    ['The Jade app &amp; AI', 'Included at $200 — the $150 plan keeps everything else, just without the AI.',
      ['Client hubs — a private, branded portal for every buyer and seller',
       'Personal booking scheduler with its own QR code, synced to your CRM',
       'Listing presentations with live pricing adjustments, and CMAs with PDF export',
       'The personalized marketing studio, built in',
       'The Jade AI assistant — Colorado rules &amp; Fair Housing aware'],
      ['A shared document vault inside each hub',
       'Personalized Just-Listed, Coming-Soon, Open-House, Under-Contract &amp; Sold graphic sets',
       'Personalized social posts and reels, sized for feed and story',
       'Newsletter templates in your branding',
       'Landing pages for listings and lead capture',
       'Forms &amp; lead-capture builder with QR codes, routed into Follow Up Boss',
       'AI help drafting listings, emails and captions']],
    ['Personalized marketing, made for you', 'An in-house team, built around you — never a template.',
      ['Personalized listing &amp; marketing design, made for you',
       'Personal branding — your logo, color, type and voice',
       'Custom, personalized graphics on request'],
      ['Print design — cards, signage, open-house kits',
       'A matched, personalized campaign set for every launch']],
    ['CRM, data &amp; transactions', 'The systems behind every deal.',
      ['Follow Up Boss CRM — set up and ready to go',
       'HouseCanary property &amp; market data',
       'Transaction support — pricing and strategy'],
      ['Inspection &amp; appraisal support',
       'Compliance review on every deal']],
    ['Coaching &amp; people', 'The part that makes the real difference.',
      ['One-on-one coaching tied to your goals',
       'A broker who actually picks up',
       'Lead sources — referral, relocation &amp; digital, for those who want them',
       'In-house lending through Versatile Lending'],
      ['Classes &amp; workshops',
       'Optional accountability groups &amp; check-ins',
       'Jade at the Market and neighborhood events']],
    ['Your day-one starter kit', 'Ready before your first appointment.',
      ['A branded Jade tote',
       'Business cards',
       'A kickoff marketing consultation'],
      ['Yard signage',
       'Office supplies']],
    ['Billed separately', 'Standard agent costs, at any brokerage.',
      ['Your MLS / REALTOR® association dues',
       'Your transaction-platform subscription (e.g. CTMe)',
       'Physical printing &amp; production costs'], []],
  ];
  const li = (arr, extra) => arr.map(i => `<li${extra ? ' class="x"' : ''}>${i}</li>`).join('');
  return `<div class="inc">` + groups.map((g, i) => {
    const notcls = (g[0] === 'Billed separately') ? 'not' : '';
    const span = (i === 0) ? ' span' : '';
    return `<div class="grp${span}"><h4>${g[0]}</h4><p class="sub">${g[1]}</p><ul class="${notcls}">${li(g[2], false)}${li(g[3], true)}</ul></div>`;
  }).join('') + `</div>`;
}

function faqPage() {
  const faqs = [
    ['What makes Jade different from a big franchise?', 'Jade is independent, Colorado-local, and built around the agent: no mandatory meetings, no production minimums. What you get instead is people — a broker who picks up, one-on-ones whenever you want them, classes we actually enjoy teaching, and quick answers to your questions. The brokerage fits how you work, not the other way around.'],
    ['What is included in the $200/month?', 'A lot — the full Jade agent app (client hubs, booking scheduler, listing presentations and CMAs, the marketing studio, forms and lead capture, and the Jade AI assistant), plus Follow Up Boss CRM set up and ready, HouseCanary data, in-house marketing and design, transaction support, coaching, lead sources for those who want them, and a day-one starter kit. The full list is above. Standard agent costs like your MLS dues and transaction-platform subscription are billed separately. There are other tiers too: $150/month keeps the full platform without the AI features, and $50/month lets you hang your license — E&amp;O, your Jade email and office access, with transaction and marketing help whenever you ask.'],
    ['How do splits and take-home work?', 'We don’t lead with a split number, because a split isn’t your take-home. The take-home calculator reads your real production and shows where you’d land, and compares it to your current brokerage. Emilie will walk you through the specifics in a conversation.'],
    ['Do you provide leads?', 'Yes, for agents who want them — referral, relocation, and digital lead sources. No one is forced to work them; it’s there if it fits how you want to grow.'],
    ['What marketing help do I get?', 'Custom, on-brand content made for you — listing pieces, branding, social and graphics — plus a marketing team to call on when you need it. You’re never expected to be your own designer, and you never start from a blank page.'],
    ['Will I have support, or am I on my own?', 'One-on-one coaching tied to your goals, optional accountability, transaction help when a deal gets complicated, and a broker whose door is open. You’re measured by your success, not your attendance.'],
    ['Where does Jade work?', 'Across Colorado’s Front Range and mountains: Denver Metro, Colorado Springs, Winter Park, and Northern Colorado. The office is at ' + OFFICE + '.'],
    ['How hard is it to make the move?', 'More straightforward than most agents expect. Book a conversation with Emilie and she’ll walk you through the steps and timing for a clean transition.'],
  ];
  const jsonld = [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }];
  const body = `
<section class="band forest"><div class="wrap">
  <div class="eyebrow">Questions agents ask</div>
  <h1 class="h-sec" style="font-style:italic;font-size:clamp(32px,5vw,52px)">Straight answers.</h1>
</div></section>

<section class="band cream"><div class="wrap">
  <div class="eyebrow">What the $200/month includes</div>
  <h2 class="h-sec">One flat fee. Here’s everything in it.</h2>
  <p class="lead">$200/month gets you the full Jade platform — the agent app, the AI, and all the personalized marketing, data and support behind it.</p>
  ${includedBlock()}
  <div class="inc-actions">
    <button type="button" class="inc-morebtn" id="incMore">See more</button>
    <button type="button" class="inc-tierbtn" id="tierBtn">See the other tiers</button>
  </div>
  <div class="tierwrap" id="tiersPanel">
    <p class="tierlead">Same brokerage, same people on every tier — you choose how much platform you want.</p>
    <div class="tiertable"><table>
      <thead><tr><th></th><th>$200<span>/mo</span><em>Full platform</em></th><th>$150<span>/mo</span><em>Without the AI</em></th><th>$50<span>/mo</span><em>Hang your license</em></th></tr></thead>
      <tbody><tr><td>The agent app — client hubs, scheduler, CMAs &amp; forms</td><td class="y">✓</td><td class="y">✓</td><td class="n">—</td></tr><tr><td><span class="aimk" aria-hidden="true">✦</span>Build your full brand, in-app</td><td class="y">✓</td><td class="n">—</td><td class="n">—</td></tr><tr><td><span class="aimk" aria-hidden="true">✦</span>Custom, AI-built client hubs</td><td class="y">✓</td><td class="n">—</td><td class="n">—</td></tr><tr><td><span class="aimk" aria-hidden="true">✦</span>Your own branded client sites</td><td class="y">✓</td><td class="n">—</td><td class="n">—</td></tr><tr><td><span class="aimk" aria-hidden="true">✦</span>One-click listing consults</td><td class="y">✓</td><td class="n">—</td><td class="n">—</td></tr><tr><td><span class="aimk" aria-hidden="true">✦</span>One-click buyer consults</td><td class="y">✓</td><td class="n">—</td><td class="n">—</td></tr><tr><td><span class="aimk" aria-hidden="true">✦</span>Pipeline auditing &amp; next-step nudges</td><td class="y">✓</td><td class="n">—</td><td class="n">—</td></tr><tr><td><span class="aimk" aria-hidden="true">✦</span>AI listing copy &amp; descriptions</td><td class="y">✓</td><td class="n">—</td><td class="n">—</td></tr><tr><td><span class="aimk" aria-hidden="true">✦</span>AI emails, captions &amp; client replies</td><td class="y">✓</td><td class="n">—</td><td class="n">—</td></tr><tr><td><span class="aimk" aria-hidden="true">✦</span>Colorado-rules &amp; Fair-Housing checks</td><td class="y">✓</td><td class="n">—</td><td class="n">—</td></tr><tr><td>Personalized marketing, made for you</td><td class="y">✓</td><td class="y">✓</td><td class="r">On request</td></tr><tr><td>CRM &amp; HouseCanary data</td><td class="y">✓</td><td class="y">✓</td><td class="n">—</td></tr><tr><td>Transaction support</td><td class="y">✓</td><td class="y">✓</td><td class="r">On request</td></tr><tr><td>Coaching, classes &amp; broker access</td><td class="y">✓</td><td class="y">✓</td><td class="r">On request</td></tr><tr><td>Company lead sources</td><td class="y">✓</td><td class="y">✓</td><td class="n">—</td></tr><tr><td>E&amp;O coverage</td><td class="y">✓</td><td class="y">✓</td><td class="y">✓</td></tr><tr><td>Jade email &amp; office access</td><td class="y">✓</td><td class="y">✓</td><td class="y">✓</td></tr></tbody>
    </table></div>
    <p class="tierkey"><span class="aimk" aria-hidden="true">✦</span> Powered by the Jade AI — included only at the $200 tier.</p>
    <p class="tiernote">That $50 between $150 and $200 is the entire AI layer — and it does a lot. At $150 you get the toolkit; at $200 the app actively builds your brand, spins up custom client hubs and your own client sites, runs listing and buyer consults in one click, audits your pipeline and tells you what to do next, and drafts and compliance-checks everything you send. Less a tool, more a teammate. No one checks up on you on any tier; the support is simply there when you want it, and the $50 tier is for agents who mainly want a professional home for their license.</p>
  </div>
  <script>
  (function(){
    var m=document.getElementById("incMore"),inc=document.querySelector(".inc"),tb=document.getElementById("tierBtn"),tp=document.getElementById("tiersPanel");
    if(m&&inc){m.addEventListener("click",function(){var open=inc.classList.toggle("open");m.textContent=open?"See less":"See more";});}
    if(tb&&tp){tb.addEventListener("click",function(){var sh=tp.classList.toggle("show");tb.textContent=sh?"Hide tiers":"See the other tiers";});}
  })();
  </script>
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
<section class="band forest"><div class="wrap">
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

function marketingPage() {
  function TOCROW(n, t) { return '<div class="row"><span class="n">' + n + '</span><span class="t">' + t + '</span></div>'; }
  function FOLIO(l, num, light) { return '<div class="jlb-folio' + (light ? ' light' : '') + '"><span>' + l + '</span><span>' + num + '</span></div>'; }
  function LI(b, s) { return '<div class="it"><b>' + b + '</b><span>' + s + '</span></div>'; }
  function CELL(b, s) { return '<div class="c"><b>' + b + '</b><span>' + s + '</span></div>'; }
  function PERSON(n, r, s) { return '<div class="pp"><b>' + n + '</b><em>' + r + '</em><span>' + s + '</span></div>'; }
  const PAGES = [
    // [class, innerHTML]
    ['jlb-page jlb-cover', 'hard',
      '<div class="jlb-cv">'
      + '<div class="jlb-cv-k">The Agent’s Lookbook</div>'
      + '<div class="jlb-cv-word">Jade</div>'
      + '<div class="jlb-cv-sub">An independent Colorado brokerage,<br>in a few pages you can flip through.</div>'
      + '<div class="jlb-cv-foot"><span>Issue 01</span><span>Colorado</span></div>'
      + '</div>'],
    ['jlb-page', 'soft',
      '<div class="jlb-k">Before you flip</div>'
      + '<h2 class="jlb-h">A quick hello.</h2>'
      + '<p class="jlb-p">Jade end to end — who we are, what you get, and how we work with the people who hang their license here. Read it like a magazine, and when something lands, come have a coffee.</p>'
      + '<div class="jlb-toc">'
      + TOCROW('01','Why we’re called Jade') + TOCROW('02','Built for the agent')
      + TOCROW('03','The app, included') + TOCROW('04','Marketing, made for you')
      + TOCROW('05','What it costs') + TOCROW('06','People, not portals')
      + TOCROW('07','Off the clock') + TOCROW('08','Who you’d be working with')
      + '</div>'
      + FOLIO('Jade · The Agent’s Lookbook','02')],
    ['jlb-page', 'soft',
      '<div class="jlb-k">01 · The name</div>'
      + '<h2 class="jlb-h">Why we’re called <i>Jade</i>.</h2>'
      + '<p class="jlb-p">Jade is a stone people have trusted for a very long time — a byword for clarity, steadiness and quiet value. That’s the feeling we want your business to carry: composed, considered, built to last.</p>'
      + '<p class="jlb-p">But we picked it for a plainer reason too. One syllable. Easy to spell, easy to say, hard to mangle. When you’re reading your email to a seller across an open-house kitchen — <b>yourname@jaderealestate.com</b> — it lands the first time.</p>'
      + '<div class="jlb-pull">Beautiful should also be practical. That’s the whole idea.</div>'
      + FOLIO('Why we’re called Jade','03')],
    ['jlb-page jlb-dark', 'soft',
      '<div class="jlb-k light">02 · Independent</div>'
      + '<h2 class="jlb-h light">Built for the agent, <i>not the brokerage.</i></h2>'
      + '<p class="jlb-p light">Jade is independent and owner-operated, right here in Colorado. Decisions get made down the hall by people who know this market — not handed down from a franchise playbook written in another state.</p>'
      + '<p class="jlb-p light">No mandatory meetings. No production minimums. We stay small on purpose: boutique enough to know your name and what you’re working toward, serious enough to grow your business alongside ours.</p>'
      + '<div class="jlb-sig light">Will Lawrence — Owner &amp; Managing Broker</div>'
      + FOLIO('Built for the agent','04', true)],
    ['jlb-page', 'soft',
      '<div class="jlb-k">03 · The tools</div>'
      + '<h2 class="jlb-h">The app, <i>built in-house and included.</i></h2>'
      + '<p class="jlb-p">One login that actually does the work, wired into Follow Up Boss and HouseCanary so your pipeline stays current without double entry.</p>'
      + '<div class="jlb-list">'
      + LI('Client hubs','A private portal for every buyer and seller.')
      + LI('Booking scheduler','Your own QR-coded calendar, synced to your CRM.')
      + LI('Presentations &amp; CMAs','Pricing adjustments and polished PDF export.')
      + LI('Forms &amp; lead capture','QR codes in, straight to Follow Up Boss.')
      + LI('Jade AI assistant','Colorado-rules and Fair-Housing aware.')
      + '</div>'
      + FOLIO('The app, included','05')],
    ['jlb-page', 'soft',
      '<div class="jlb-k">04 · Marketing</div>'
      + '<h2 class="jlb-h">Marketing, <i>made for you.</i></h2>'
      + '<p class="jlb-p">You’re not your own designer. An in-house team and the marketing studio give you custom, on-brand pieces — and they’re a message away whenever you need more.</p>'
      + '<div class="jlb-grid2">'
      + CELL('Personal branding','A real identity shaped around you — logo, color, type, voice. Not a house template.')
      + CELL('Listings','Presentations, social sets and print pieces, on your brand, launch day ready.')
      + CELL('Social &amp; email','Posts, newsletters and nurture, written for you and ready when you are.')
      + CELL('Print &amp; signage','Cards, yard signs, open-house kits and closing gifts, in your hands day one.')
      + '</div>'
      + FOLIO('Marketing, made for you','06')],
    ['jlb-page jlb-dark', 'soft',
      '<div class="jlb-k light">05 · The money</div>'
      + '<h2 class="jlb-h light">Simple, and <i>honest about it.</i></h2>'
      + '<div class="jlb-big">$200<span>/mo</span></div>'
      + '<p class="jlb-p light">A flat monthly fee that includes the full agent app. No surprise line items.</p>'
      + '<p class="jlb-p light">We don’t lead with a commission split, because a split isn’t take-home. Run your real numbers through our calculator and compare it to where you are now — it’s usually the honest surprise of the conversation.</p>'
      + '<a class="jlb-cta" href="/calculator">Open the take-home calculator →</a>'
      + FOLIO('What it costs','07', true)],
    ['jlb-page', 'soft',
      '<div class="jlb-k">06 · Support</div>'
      + '<h2 class="jlb-h">People, <i>not portals.</i></h2>'
      + '<p class="jlb-p">The part that actually makes us better is the human part. Person to person is how real estate gets done, and it’s how we’d rather work with you.</p>'
      + '<div class="jlb-list">'
      + LI('We love a one-on-one','Sit down with the broker whenever you want to — goals, a live deal, a second opinion.')
      + LI('We put on classes','Workshops and marketing days, taught by people who enjoy teaching them.')
      + LI('We answer the questions','A broker who actually picks up, and fast answers when a deal gets complicated.')
      + '</div>'
      + FOLIO('People, not portals','08')],
    ['jlb-page', 'soft',
      '<div class="jlb-k">07 · Culture</div>'
      + '<h2 class="jlb-h">Off the clock, <i>too.</i></h2>'
      + '<p class="jlb-p">Some of it is work — classes, marketing days, a booth at the farmers market. Some of it is just a team night out: a brewery, a shuffleboard table, people who are glad to see each other.</p>'
      + '<p class="jlb-p">Either way the thread is the same. At Jade you’re known, not processed — and the people around you are genuinely rooting for your deals to close.</p>'
      + '<div class="jlb-pull">“Jade at the Market” isn’t a campaign. It’s a Saturday we actually like.</div>'
      + FOLIO('Off the clock','09')],
    ['jlb-page', 'soft',
      '<div class="jlb-k">08 · The people</div>'
      + '<h2 class="jlb-h">Who you’d be <i>working with.</i></h2>'
      + '<div class="jlb-people">'
      + PERSON('Will Lawrence','Owner &amp; Managing Broker','Runs the brokerage and has your back on every deal.')
      + PERSON('Kelvin Caiati','Co-owner','Also runs Versatile Lending, our in-house mortgage partner.')
      + PERSON('Emilie Smith','Marketing &amp; Recruiting','The one who’ll get you set up and your brand looking sharp.')
      + '</div>'
      + FOLIO('Who you’d be working with','10')],
    ['jlb-page jlb-dark jlb-last', 'soft',
      '<div class="jlb-k light">Come say hi</div>'
      + '<h2 class="jlb-h light">Let’s talk it <i>through.</i></h2>'
      + '<p class="jlb-p light">No pitch, no pressure — just a conversation about your business and whether Jade fits how you want to work.</p>'
      + '<a class="jlb-cta solid" href="' + BOOK + '" target="_blank" rel="noopener">Grab a time with Emilie →</a>'
      + '<div class="jlb-contact">emilie@jaderealestate.com</div>'
      + FOLIO('Jade Real Estate · Colorado','11', true)],
    ['jlb-page jlb-back', 'hard',
      '<div class="jlb-cv">'
      + '<div class="jlb-cv-mark">Jade</div>'
      + '<div class="jlb-cv-sub">Independent. Colorado. Built for the agent.</div>'
      + '<div class="jlb-cv-fine">Jade Real Estate (KCWL Holdings LLC). Equal Housing Opportunity.</div>'
      + '</div>'],
  ];
  const pagesHTML = PAGES.map(function (p) {
    return '<div class="' + p[0] + '" data-density="' + p[1] + '">' + p[2] + '</div>';
  }).join('');

  const css = `
<style>
.jlb-sec{background:var(--cream);padding:clamp(34px,5vw,56px) 0 clamp(48px,7vw,86px)}
.jlb-intro{text-align:center;max-width:640px;margin:0 auto clamp(26px,4vw,44px)}
.jlb-intro .eyebrow{justify-content:center}
.jlb-intro h2{font-family:var(--serif);font-style:italic;font-size:clamp(28px,4.4vw,44px);color:var(--jade);line-height:1.08;margin:12px 0 0;font-weight:400}
.jlb-intro p{color:var(--jade2);font-size:clamp(15px,1.7vw,18px);margin:16px auto 0;max-width:52ch;line-height:1.6}
.jlb-shell{display:flex;flex-direction:column;align-items:center}
.jlb-book-wrap{width:100%;max-width:1120px;display:flex;justify-content:center;touch-action:pan-y}
#jlb-book{margin:0 auto}
#jlb-book .jlb-page{background:#f6f3ef;color:var(--ink);padding:clamp(26px,3.4vw,42px);display:flex;flex-direction:column;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(21,32,26,.06)}
#jlb-book .jlb-page.--left{box-shadow:inset -22px 0 38px -30px rgba(21,32,26,.5),inset 0 0 0 1px rgba(21,32,26,.06)}
#jlb-book .jlb-page.--right{box-shadow:inset 22px 0 38px -30px rgba(21,32,26,.5),inset 0 0 0 1px rgba(21,32,26,.06)}
.jlb-dark{background:var(--forest)!important;color:#eef1ec!important}
.jlb-k{font-family:var(--sans);font-size:11px;letter-spacing:.26em;text-transform:uppercase;font-weight:600;color:var(--jade2)}
.jlb-k.light{color:var(--sage)}
.jlb-h{font-family:var(--serif);font-weight:400;font-size:clamp(23px,2.4vw,32px);line-height:1.1;color:var(--jade);margin:12px 0 0;text-wrap:balance}
.jlb-h.light{color:#fff}
.jlb-h i{font-style:italic;color:var(--olive)}
.jlb-h.light i{color:var(--sage)}
.jlb-p{font-size:clamp(13px,1.15vw,15px);line-height:1.62;color:#3b4a40;margin:14px 0 0;max-width:42ch}
.jlb-p.light{color:#cdd6ca}
.jlb-p b{color:var(--jade);font-weight:600}.jlb-p.light b{color:#fff}
.jlb-pull{font-family:var(--serif);font-style:italic;font-size:clamp(17px,1.9vw,22px);line-height:1.3;color:var(--jade);border-top:1px solid rgba(21,32,26,.14);border-bottom:1px solid rgba(21,32,26,.14);padding:16px 0;margin:22px 0 0}
.jlb-toc{margin-top:16px}
.jlb-toc .row{display:flex;gap:12px;align-items:baseline;padding:6px 0;border-bottom:1px solid rgba(21,32,26,.1)}
.jlb-toc .n{font-family:var(--serif);font-style:italic;color:var(--olive);font-size:14px;width:24px;flex:none}
.jlb-toc .t{font-family:var(--serif);font-size:15px;color:var(--jade);line-height:1.2}
.jlb-list{margin-top:18px}
.jlb-list .it{padding:11px 0;border-top:1px solid rgba(21,32,26,.12)}
.jlb-dark .jlb-list .it{border-color:rgba(255,255,255,.16)}
.jlb-list .it b{font-family:var(--serif);font-weight:400;font-size:16px;color:var(--jade);display:block}
.jlb-dark .jlb-list .it b{color:#fff}
.jlb-list .it span{font-size:12.5px;color:#55655a;line-height:1.5}
.jlb-dark .jlb-list .it span{color:#c0cabd}
.jlb-grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px 18px;margin-top:20px}
.jlb-grid2 .c b{font-family:var(--serif);font-weight:400;font-size:15.5px;color:var(--jade);display:block}
.jlb-grid2 .c span{font-size:12px;color:#55655a;line-height:1.5;display:block;margin-top:3px}
.jlb-big{font-family:var(--serif);font-size:clamp(52px,8vw,78px);color:#fff;line-height:1;margin:20px 0 0}
.jlb-big span{font-size:.32em;color:var(--sage);font-style:italic;margin-left:6px}
.jlb-sig,.jlb-contact{margin-top:auto}
.jlb-sig{font-family:var(--serif);font-style:italic;font-size:16px;color:var(--jade)}
.jlb-sig.light{color:#fff}
.jlb-contact{font-family:var(--sans);font-weight:600;letter-spacing:.04em;color:var(--sage);font-size:13.5px;padding-top:14px}
.jlb-people .pp{padding:12px 0;border-top:1px solid rgba(21,32,26,.12)}
.jlb-people .pp b{font-family:var(--serif);font-weight:400;font-size:18px;color:var(--jade);display:block}
.jlb-people .pp em{font-style:normal;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--olive);font-weight:600}
.jlb-people .pp span{display:block;font-size:12.5px;color:#55655a;margin-top:4px;line-height:1.5}
.jlb-cta{display:inline-block;margin-top:22px;font-family:var(--sans);font-weight:700;font-size:13px;letter-spacing:.02em;color:var(--jade);text-decoration:none;border-bottom:2px solid var(--sage);padding-bottom:3px}
.jlb-dark .jlb-cta{color:#fff;border-color:var(--sage)}
.jlb-cta.solid{background:var(--sage);color:var(--forest);border:0;border-radius:999px;padding:12px 22px}
.jlb-folio{margin-top:auto;display:flex;justify-content:space-between;align-items:center;padding-top:16px;font-family:var(--sans);font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--jade2)}
.jlb-folio.light{color:var(--sage)}
.jlb-cover,.jlb-back{background:var(--forest)!important;color:#eef1ec!important;justify-content:center;align-items:center;text-align:center}
.jlb-cv{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;flex:1}
.jlb-cv-k{font-family:var(--sans);font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:var(--sage);font-weight:600;margin-bottom:22px}
.jlb-cv-word{font-family:var(--serif);font-style:italic;font-size:clamp(58px,9vw,96px);line-height:.9;color:#fff}
.jlb-cv-mark{font-family:var(--serif);font-style:italic;font-size:clamp(40px,7vw,64px);color:#fff;margin-top:6px}
.jlb-cv-sub{font-family:var(--serif);font-style:italic;font-size:clamp(15px,1.7vw,19px);color:#cdd6ca;margin-top:20px;line-height:1.4}
.jlb-cv-foot{display:flex;gap:30px;margin-top:30px;font-family:var(--sans);font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:var(--sage)}
.jlb-cv-fine{font-size:10px;color:#8fa08c;margin-top:26px;letter-spacing:.02em;max-width:30ch;line-height:1.5}
.jlb-ctrls{display:flex;align-items:center;gap:22px;margin-top:26px}
.jlb-nav{width:52px;height:52px;border-radius:999px;border:1px solid var(--line);background:var(--paper);color:var(--jade);font-size:22px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s,color .2s}
.jlb-nav:hover{background:var(--jade);color:#fff;border-color:var(--jade)}
.jlb-nav:disabled{opacity:.32;cursor:default;background:var(--paper);color:var(--jade);border-color:var(--line)}
.jlb-count{font-family:var(--sans);font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--jade2);min-width:120px;text-align:center}
.jlb-hint{margin-top:14px;font-size:12.5px;color:var(--jade2)}
@media(max-width:560px){.jlb-grid2{grid-template-columns:1fr}}
</style>`;

  const body = `${css}
<section class="hero"><div class="m1"></div><div class="wrap">
  <div class="eyebrow">Marketing</div>
  <h1>You built the business. We make it lighter to run.</h1>
  <p>Jade is an independent Colorado brokerage with its own agent app, marketing support when you need it, and a broker who actually picks up. No mandatory meetings or production minimums &mdash; just real people who love a one-on-one, teach the classes, and answer your questions, because person-to-person is what makes us better.</p>
  <div class="btns"><a class="btn p" href="${BOOK}" target="_blank" rel="noopener">Talk with Emilie</a><a class="btn s" href="#jlb">Flip the lookbook &#8595;</a></div>
</div></section>

<section class="band pull"><div class="wrap">
  <p>A brokerage should be a brokerage, not a tech company. Our focus is your business, your relationships, and you as a person &mdash; the technology is simply there, working quietly in the background, to support all of it.</p>
  <div class="by">Will Lawrence &middot; Owner &amp; Managing Broker</div>
</div></section>

<section class="band cream"><div class="wrap">
  <div class="eyebrow">What we can do for you</div>
  <h2 class="h-sec">Marketing that looks like you, made for you.</h2>
  <p class="lead">You stay in front of clients; we make sure everything with your name on it looks like you already won. No design apps at 11pm, no blank canvas.</p>
  <div class="rows">
    <div class="r"><div class="lbl"><small>Brand</small>An identity that's actually yours</div><p>Logo, color, type and voice, shaped around who you are and who you serve &mdash; a real brand, not a house template with your headshot dropped in.</p></div>
    <div class="r"><div class="lbl"><small>Listings</small>Launched like they matter</div><p>Presentations, Just-Listed sets, print and signage &mdash; on brand and out the door day one, so every listing reads like a feature, not a flyer.</p></div>
    <div class="r"><div class="lbl"><small>Social &amp; content</small>On your brand, ready to post</div><p>Custom posts, reels and newsletters built on your brand and ready to publish &mdash; with the marketing team a message away when you want more.</p></div>
    <div class="r"><div class="lbl"><small>Presence</small>Out where your clients are</div><p>Jade at the Market, events and neighborhood campaigns &mdash; real local presence people remember, not just another feed to post into.</p></div>
  </div>
</div></section>

<section class="band paper"><div class="wrap">
  <div class="ed">
    <div>
      <div class="eyebrow">The flexibility</div>
      <div class="big">Your brand, <span style="color:var(--olive)">your way.</span></div>
      <div class="prose">
        <p>Some agents hand us the whole thing &mdash; brand, listings, social, print &mdash; and never think about it again. Others want a hand on the wheel, down to the last caption. Both are right.</p>
        <p>We build around how you actually want to show up, and we flex as you grow. You're never squeezed into a house look, and never left alone with a blank page either.</p>
      </div>
    </div>
    <div><div class="markets" style="margin-top:4px">
      <span class="chip">Hands-off or hands-on</span><span class="chip">Your logo &amp; colors</span><span class="chip">Your voice</span><span class="chip">On your timeline</span><span class="chip">No house template</span><span class="chip">Grows with you</span>
    </div></div>
  </div>
</div></section>

<section class="band forest"><div class="wrap narrow">
  <div class="eyebrow">A note from Emilie</div>
  <h2 class="h-sec" style="color:#fff;margin-top:10px">What sets you apart is the whole point.</h2>
  <div style="margin-top:20px">
    <p style="color:#d6ded2;font-size:clamp(16px,1.9vw,19px);line-height:1.75;max-width:60ch">I've spent five years doing this &mdash; building agent brands and running the social &mdash; and the one constant is that it never holds still. So I treat social as a tool, not a vanity project, and I watch how the platforms change so you don't have to.</p>
    <p style="color:#d6ded2;font-size:clamp(16px,1.9vw,19px);line-height:1.75;max-width:60ch;margin-top:16px">I've also watched AI reshape this business up close, which is exactly why I know what it can't replace: a real person, marketed well. My job is to put that front and center &mdash; to make the brand behind your name as sharp as you are, and keep it there as everything keeps moving.</p>
  </div>
  <div style="margin-top:24px;font-family:var(--serif);font-style:italic;font-size:21px;color:#fff">Emilie Smith</div>
  <div style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--sage);font-weight:600;margin-top:5px">Marketing &amp; Recruiting &middot; Jade Real Estate</div>
</div></section>

<section class="jlb-sec" id="jlb"><div class="wrap jlb-shell">
  <div class="jlb-intro">
    <div class="eyebrow">The Jade Lookbook</div>
    <h2>And here's the whole picture.</h2>
    <p>Flip through Jade end to end &mdash; the name, the tools, the money, the people. Then let's talk it through.</p>
  </div>
  <div class="jlb-book-wrap"><div id="jlb-book">${pagesHTML}</div></div>
  <div class="jlb-ctrls">
    <button class="jlb-nav" id="jlb-prev" aria-label="Previous page">&#8249;</button>
    <div class="jlb-count" id="jlb-count">Cover</div>
    <button class="jlb-nav" id="jlb-next" aria-label="Next page">&#8250;</button>
  </div>
  <div class="jlb-hint">Drag a corner, or use the arrows.</div>
</div></section>
<script src="https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.js"></script>
<script>
(function(){
  function boot(){
    if(!(window.St && window.St.PageFlip)){ return setTimeout(boot,60); }
    var el=document.getElementById('jlb-book');
    if(!el) return;
    var pages=el.querySelectorAll('.jlb-page');
    var total=pages.length;
    var pf=new window.St.PageFlip(el,{
      width:540,height:710,size:'stretch',
      minWidth:300,maxWidth:560,minHeight:420,maxHeight:740,
      maxShadowOpacity:0.5,showCover:true,usePortrait:true,
      mobileScrollSupport:true,drawShadow:true,flippingTime:700
    });
    pf.loadFromHTML(pages);
    var prev=document.getElementById('jlb-prev');
    var next=document.getElementById('jlb-next');
    var cnt=document.getElementById('jlb-count');
    function label(i){
      if(i<=0) return 'Cover';
      if(i>=total-1) return 'Back';
      return 'Page '+i+' of '+(total-2);
    }
    function sync(){
      var i=pf.getCurrentPageIndex();
      cnt.textContent=label(i);
      prev.disabled=(i<=0);
      next.disabled=(i>=total-1);
    }
    pf.on('flip',sync);
    pf.on('changeState',sync);
    prev.addEventListener('click',function(){ pf.flipPrev(); });
    next.addEventListener('click',function(){ pf.flipNext(); });
    setTimeout(sync,120);
  }
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded',boot); } else { boot(); }
})();
</script>`;

  return layout({
    title: 'The Jade Lookbook — Jade Real Estate Careers',
    desc: "Flip through Jade Real Estate: why we're called Jade, the in-house agent app included in your $200/month, marketing support when you need it, honest numbers, and the one-on-one, person-to-person support behind an independent Colorado brokerage built for the agent.",
    path: '/marketing',
    body: body
  });
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
.cx-print{margin-top:18px}
.cx-print button{width:100%;background:var(--cream);color:var(--forest);border:0;border-radius:999px;padding:11px;font-weight:700;font-size:14px;cursor:pointer;font-family:var(--sans)}
.cx-get{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:30px}
.cx-get .g{background:var(--paper);border:1px solid var(--line);border-radius:14px;padding:18px 20px;font-size:14px;color:var(--jade2);position:relative;padding-left:44px}
.cx-get .g::before{content:"✓";position:absolute;left:18px;top:18px;color:var(--olive);font-weight:800}
.cx-get .g b{color:var(--jade);font-weight:700}
.cx-disc{font-size:11.5px;color:var(--jade2);margin-top:24px;line-height:1.6;max-width:90ch}
.cx-incl{margin-top:34px;border-top:1px solid var(--line);padding-top:30px}
.cx-sep{font-size:12.5px;color:var(--jade2);margin-top:18px;line-height:1.6;max-width:92ch}
@media(max-width:900px){.cx-wrap{grid-template-columns:1fr}.cx-res{position:static}}
@media(max-width:520px){.cx-grid,.cx-get{grid-template-columns:1fr}}
.cx-addbtn{margin-top:14px;background:var(--cream);color:var(--jade);border:1px dashed var(--jade2);border-radius:999px;padding:10px 18px;font-weight:700;font-size:13.5px;cursor:pointer;font-family:var(--sans)}
.cx-addbtn:hover{background:var(--jade);color:#fff;border-style:solid}
.cx-brok{border:1px solid var(--line);border-radius:14px;padding:16px;margin-top:14px;background:var(--cream)}
.cx-brokhead{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.cx-brokhead span{font-family:var(--serif);font-style:italic;color:var(--jade);font-size:16px}
.cx-rm{background:transparent;border:0;color:var(--jade2);font-size:12px;font-weight:700;cursor:pointer;text-decoration:underline;font-family:var(--sans)}
.cx-comp{margin-top:18px}
.cx-crow{border-top:1px solid rgba(255,255,255,.18);padding-top:12px;margin-top:12px}
.cx-cn{font-size:12.5px;color:#c9d2c6}
.cx-ct{font-family:var(--serif);font-style:italic;font-size:22px;margin-top:2px}
.cx-up{font-size:12.5px;color:var(--sage);font-weight:700;margin-top:3px}
.cx-down{font-size:12.5px;color:#e6b9a6;font-weight:700;margin-top:3px}
@media print{.nav,.cx-hero .btns,.cx-print,.foot{display:none}}
</style>`;
  const body = `${css}
<section class="cx-hero"><div class="wrap">
  <div class="eyebrow" style="color:var(--sage)">The numbers</div>
  <h1>What would you actually take home at Jade?</h1>
  <p>Enter your real production once, then add any brokerage with its full terms — split, company-lead split, cap, fees — and we run your exact book through each. Nothing is sent anywhere; the math runs in your browser.</p>
</div></section>

<section class="band cream"><div class="wrap">
  <div class="cx-wrap">
    <form class="cx-card" onsubmit="return false">
      <div class="cx-sec">
        <h3>Your production</h3>
        <p class="sub">Your real book — this stays the same across every brokerage you compare.</p>
        <div class="cx-grid">
          <div class="cx-f"><label>Market</label><div class="cx-in"><select id="c-market">${marketOpts}</select></div></div>
          <div class="cx-f"><label>Avg sale price / deal</label><div class="cx-in"><span>$</span><input type="number" id="c-price" value="571000"></div></div>
          <div class="cx-f"><label>Personal deals / year</label><div class="cx-in"><input type="number" id="c-deals" value="8"></div></div>
          <div class="cx-f"><label>Avg commission rate</label><div class="cx-in"><input type="number" id="c-rate" value="2.8" step="0.1"><span style="padding:0 12px 0 0">%</span></div></div>
        </div>
      </div>

      <div class="cx-sec">
        <h3>Jade terms</h3>
        <p class="sub">Preloaded with where most conversations start. Your split and terms are a conversation, not one-size-fits-all — adjust these to model your own offer.</p>
        <div class="cx-grid">
          <div class="cx-f"><label>Starting split (agent %) — pre-cap</label><div class="cx-in"><input type="number" id="c-split" value="80"><span style="padding:0 12px 0 0">%</span></div><span class="hint">Most conversations start near 80/20 — it’s negotiable, not one-size-fits-all.</span></div>
          <div class="cx-f"><label>Company-lead split (agent %)</label><div class="cx-in"><input type="number" id="c-cosplit" value="60"><span style="padding:0 12px 0 0">%</span></div><span class="hint">Generally around 60% to the agent on company-provided leads.</span></div>
          <div class="cx-f"><label>Company-lead deals / year</label><div class="cx-in"><input type="number" id="c-codeals" value="4"></div><span class="hint">Agents who work the leads typically close 3–5 extra a year.</span></div>
          <div class="cx-f"><label>Company dollar cap</label><div class="cx-in"><span>$</span><input type="number" id="c-cap" value="17500"></div><span class="hint">Company-lead splits are always owed, but they count toward your cap. Once you reach it, your personal deals are 100%.</span></div>
          <div class="cx-f"><label>Split after cap (agent %)</label><div class="cx-in"><input type="number" id="c-aftercap" value="100"><span style="padding:0 12px 0 0">%</span></div></div>
          <div class="cx-f"><label>Monthly fee</label><div class="cx-in"><span>$</span><input type="number" id="c-fee" value="200"></div><span class="hint">Month-to-month. Covers the app, marketing and support — full list below.</span></div>
          <div class="cx-f"><label>Transaction / desk fee per deal</label><div class="cx-in"><span>$</span><input type="number" id="c-txn" value="0"></div><span class="hint">Jade charges none.</span></div>
          <div class="cx-f"><label>Your marketing spend / mo</label><div class="cx-in"><span>$</span><input type="number" id="c-ad" value="0"></div><span class="hint">Starts at $0 — content is made for you.</span></div>
          <div class="cx-f full"><label>Other annual fees (E&amp;O, onboarding)</label><div class="cx-in"><span>$</span><input type="number" id="c-extra" value="250"></div></div>
        </div>
      </div>

      <div class="cx-sec">
        <h3>Compare a brokerage</h3>
        <p class="sub">Add your current brokerage — or any you're weighing — with all its terms. We run your exact book (personal + company deals) through each one, so the comparison is apples to apples.</p>
        <div id="cx-broks"></div>
        <button type="button" id="cx-addbrok" class="cx-addbtn">+ Add a brokerage</button>
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
      <div class="cx-comp" id="o-comp"></div>
      <div class="cx-print"><button type="button" onclick="window.print()">Print this estimate</button></div>
    </div>
  </div>

  <div class="cx-incl">
    <div class="eyebrow">What your monthly fee covers</div>
    <h2 class="h-sec" style="margin:8px 0 0">Your $200/month, itemized.</h2>
    <p class="lead" style="margin-top:10px">Month-to-month, this is everything included — the tools, the marketing, and the people. Nothing basic is locked behind an add-on.</p>
    <div class="cx-get" style="margin-top:22px">
      <div class="g"><b>The Jade agent app</b> — client hubs, booking scheduler, listing presentations &amp; CMAs, forms and lead capture, and the Jade AI assistant.</div>
      <div class="g"><b>The marketing studio</b> — custom, on-brand social posts, newsletters, landing pages and graphics, made for you.</div>
      <div class="g"><b>In-house marketing &amp; design</b> — custom listing and brand work from a real team, there when you need it.</div>
      <div class="g"><b>Follow Up Boss CRM</b> — set up and ready to go.</div>
      <div class="g"><b>HouseCanary data</b> — property and market data built in.</div>
      <div class="g"><b>Transaction support</b> — pricing, inspection, appraisal and compliance help on every deal.</div>
      <div class="g"><b>One-on-one coaching</b> — tied to your goals, plus classes and workshops.</div>
      <div class="g"><b>Company-generated leads</b> — referral, relocation and digital, for agents who want them.</div>
      <div class="g"><b>A hands-on broker</b> — real mentorship, and a door that's actually open.</div>
      <div class="g"><b>In-house lending</b> — through Versatile Lending, our mortgage partner.</div>
      <div class="g"><b>A day-one starter kit</b> — so you're live and looking sharp from the start.</div>
      <div class="g"><b>A competitive split</b> — with a low company cap, then you keep 100%.</div>
    </div>
    <p class="cx-sep">Billed separately — the standard agent costs at any brokerage: your MLS dues and your transaction-platform subscription. Your one-time onboarding and annual E&amp;O are modeled in the calculator above.</p>
  </div>

  <p class="cx-disc">Estimates only, for illustration. Your real net depends on your actual commission rates, referral fees, concessions, tax strategy, and brokerage-specific rules, and the "3–5 extra deals" figure reflects agents who actively work company leads — it is not a guarantee of income or results. Final terms are confirmed in writing. Equal Housing Opportunity.</p>
  <div style="margin-top:22px"><a class="btn j" href="/compare">Compare the support &amp; tools →</a> &nbsp; <a class="btn j" href="${BOOK}" target="_blank" rel="noopener" style="background:var(--jade2)">Talk it through with Emilie ↗</a></div>
</div></section>
<script>
(function(){
  function g(id){return document.getElementById(id);}
  function num(id){var e=g(id);var v=e?parseFloat(e.value):0;return isNaN(v)?0:v;}
  function money(n){return "$"+Math.round(n).toLocaleString("en-US");}
  function esc2(x){return String(x).replace(/[&<>"]/g,function(c){return({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c];});}
  function capvId(id){var e=g(id);if(!e||e.value.trim()==="")return null;var v=parseFloat(e.value);return isNaN(v)?null:Math.max(0,v);}
  function bval(b,k){var e=b.querySelector('[data-k="'+k+'"]');var v=e?parseFloat(e.value):0;return isNaN(v)?0:Math.max(0,v);}
  function bcap(b){var e=b.querySelector('[data-k="cap"]');if(!e||e.value.trim()==="")return null;var v=parseFloat(e.value);return isNaN(v)?null:Math.max(0,v);}
  function bacs(b){var e=b.querySelector('[data-k="acs"]');if(!e||e.value.trim()==="")return 100;var v=parseFloat(e.value);return isNaN(v)?100:v;}
  function compute(p){
    var gpd=p.price*p.rate/100;
    var tot=p.pd+p.cd;
    var gci=tot*gpd;
    var personalGci=p.pd*gpd;
    var companySplit=p.cd*(1-p.cs/100)*gpd;
    var personalFull=p.pd*(1-p.ps/100)*gpd;
    var personalPaid;
    if(p.cap===null){
      personalPaid=personalFull;
    }else{
      var capRoom=Math.max(0,p.cap-companySplit);
      var preRate=(1-p.ps/100);
      var gciPre=preRate>0?Math.min(personalGci,capRoom/preRate):personalGci;
      var gciPost=Math.max(0,personalGci-gciPre);
      personalPaid=gciPre*preRate+gciPost*(1-p.acs/100);
    }
    var brokTake=companySplit+personalPaid;
    var agentComm=gci-brokTake;
    var txnFees=p.txn*tot;
    var costs=p.monthly*12+p.annual+txnFees+p.mkt*12;
    var take=agentComm-costs;
    var eff=gci>0?take/gci*100:0;
    var avg=tot>0?(companySplit+personalFull)/tot:0;
    var toCap=(p.cap!==null&&avg>0&&p.cap>0)?Math.min(tot,Math.ceil(p.cap/avg)):null;
    return {gpd:gpd,gci:gci,brokTake:brokTake,agentComm:agentComm,costs:costs,take:take,eff:eff,toCap:toCap,txnFees:txnFees};
  }
  function jadeParams(){return {price:num("c-price"),rate:num("c-rate"),pd:num("c-deals"),cd:num("c-codeals"),ps:num("c-split"),cs:num("c-cosplit"),cap:capvId("c-cap"),acs:num("c-aftercap"),monthly:num("c-fee"),txn:num("c-txn"),annual:num("c-extra"),mkt:num("c-ad")};}
  function bhas(b,k){var e=b.querySelector('[data-k="'+k+'"]');return !!(e&&e.value.trim()!=="");}
  function brokParams(b){var ps=bval(b,"ps");var cs=bhas(b,"cs")?bval(b,"cs"):ps;return {price:num("c-price"),rate:num("c-rate"),pd:num("c-deals"),cd:bval(b,"cd"),ps:ps,cs:cs,cap:bcap(b),acs:bacs(b),monthly:bval(b,"monthly"),txn:bval(b,"txn"),annual:0,mkt:bval(b,"mkt")};}
  function renderBroks(jadeTake){
    var wrap=g("o-comp");if(!wrap)return;
    var blocks=document.querySelectorAll("#cx-broks .cx-brok");
    if(!blocks.length){wrap.innerHTML="";return;}
    var rows="";var any=false;
    for(var i=0;i<blocks.length;i++){var b=blocks[i];if(!bhas(b,"ps"))continue;any=true;var ne=b.querySelector('[data-k="name"]');var name=(ne&&ne.value.trim())?ne.value.trim():("Brokerage "+(i+1));var r=compute(brokParams(b));var d=jadeTake-r.take;var cls=d>=0?"cx-up":"cx-down";rows+='<div class="cx-crow"><div class="cx-cn">'+esc2(name)+' · net before taxes</div><div class="cx-ct">'+money(r.take)+'</div><div class="'+cls+'">'+(d>=0?"+"+money(d)+" more at Jade":money(Math.abs(d))+" more there")+'</div></div>';}
    wrap.innerHTML='<div class="lab" style="color:var(--sage)">You at Jade vs. elsewhere</div>'+(any?rows:'<div class="cx-crow" style="color:#aab6a7;font-size:12.5px">Enter a brokerage’s split to see the side-by-side.</div>');
  }
  function recalc(){
    var jp=jadeParams();var jade=compute(jp);
    g("o-take").textContent=money(jade.take);
    g("o-agentsub").textContent="Agent take "+money(jade.agentComm)+" • costs "+money(jade.costs);
    g("o-gci").textContent=money(jade.gci);
    g("o-eff").textContent=(Math.round(jade.eff*10)/10)+"%";
    g("o-tocap").textContent=jade.toCap===null?"—":jade.toCap;
    g("o-paid").textContent=money(jade.brokTake);
    var parts=[];
    var coKeep=jp.cd*(jp.cs/100)*jade.gpd;
    if(jp.cd>0){parts.push(money(coKeep)+" in your pocket from "+jp.cd+" company-lead deal"+(jp.cd===1?"":"s"));}
    if(jade.toCap!==null){parts.push("you reach your cap around deal "+jade.toCap+", then your personal deals are 100%");}
    g("o-story").textContent=parts.length?("Why Jade adds up: "+parts.join("; and ")+"."):"Enter your numbers to see your estimate.";
    renderBroks(jade.take);
  }
  var brokN=0;
  function addBrok(){
    brokN++;var wrap=g("cx-broks");var div=document.createElement("div");div.className="cx-brok";
    div.innerHTML='<div class="cx-brokhead"><span>Brokerage '+brokN+'</span><button type="button" class="cx-rm">Remove</button></div><div class="cx-grid">'+
    '<div class="cx-f full"><label>Name</label><div class="cx-in"><input type="text" data-k="name" placeholder="e.g., my current brokerage"></div></div>'+
    '<div class="cx-f"><label>Personal split (agent %)</label><div class="cx-in"><input type="number" data-k="ps" placeholder="your split"><span style="padding:0 12px 0 0">%</span></div></div>'+
    '<div class="cx-f"><label>Company-lead split (agent %)</label><div class="cx-in"><input type="number" data-k="cs" placeholder="if any"><span style="padding:0 12px 0 0">%</span></div></div>'+
    '<div class="cx-f"><label>Company-lead deals / yr</label><div class="cx-in"><input type="number" data-k="cd" placeholder="0"></div></div>'+
    '<div class="cx-f"><label>Company cap ($, blank = none)</label><div class="cx-in"><span>$</span><input type="number" data-k="cap" placeholder="none"></div></div>'+
    '<div class="cx-f"><label>Split after cap (agent %)</label><div class="cx-in"><input type="number" data-k="acs" placeholder="100"><span style="padding:0 12px 0 0">%</span></div></div>'+
    '<div class="cx-f"><label>Monthly fee ($)</label><div class="cx-in"><span>$</span><input type="number" data-k="monthly" placeholder="0"></div></div>'+
    '<div class="cx-f"><label>Transaction / desk fee / deal ($)</label><div class="cx-in"><span>$</span><input type="number" data-k="txn" placeholder="0"></div></div>'+
    '<div class="cx-f"><label>Marketing spend / mo ($)</label><div class="cx-in"><span>$</span><input type="number" data-k="mkt" placeholder="0"></div></div>'+
    '</div>';
    wrap.appendChild(div);
    div.querySelector(".cx-rm").addEventListener("click",function(){div.parentNode.removeChild(div);recalc();});
    var ins=div.querySelectorAll("input");for(var k=0;k<ins.length;k++){ins[k].addEventListener("input",recalc);}
    recalc();
  }
  var mk=g("c-market");
  if(mk){mk.addEventListener("change",function(){var v=parseFloat(mk.value);if(!isNaN(v)){g("c-price").value=v;}recalc();});}
  var ids=["c-price","c-deals","c-rate","c-split","c-cosplit","c-codeals","c-cap","c-aftercap","c-fee","c-txn","c-ad","c-extra"];
  for(var i=0;i<ids.length;i++){var e=g(ids[i]);if(e){e.addEventListener("input",recalc);}}
  var ab=g("cx-addbrok");if(ab){ab.addEventListener("click",addBrok);}
  addBrok();
  recalc();
})();
</script>`;
  const jsonld = [{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Jade Real Estate Take-Home Calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, url: SITE + '/calculator', description: 'Estimate your real annual take-home as a Jade Real Estate agent and compare it, in full detail, to any other brokerage.' }];
  return layout({ title: 'Take-Home Calculator — Jade Real Estate Careers', desc: "Estimate what you'd actually take home at Jade Real Estate using your real production, and compare it in full detail to any brokerage — split, company-lead split, cap, transaction and desk fees. Runs entirely in your browser.", path: '/calculator', body, jsonld });
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
  const base = ['/', '/technology', '/culture', '/marketing', '/calculator', '/compare', '/blog', '/faq'];
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
A boutique, independent, owner-operated Colorado brokerage built around the agent — not the franchise. No mandatory meetings, no production minimums. Known for person-to-person support — one-on-one coaching, classes and workshops, and a broker who picks up — and real community presence (for example "Jade at the Market," a booth at a Colorado farmers market).

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
- Marketing (what Jade builds for agents): ${SITE}/marketing
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
    if (p === '/studio') return Response.redirect(SITE + '/marketing', 301);
    if (p === '/marketing') return html(marketingPage());
    if (p === '/calculator') return html(calculatorPage());
    if (p === '/compare') return html(comparePage());
    if (p === '/blog') return html(await blogIndex());
    if (p.startsWith('/blog/')) { const slug = decodeURIComponent(p.slice(6)); const post = await getPost(slug); return post ? html(postPage(post)) : notFound(); }
    return notFound();
  },
};
