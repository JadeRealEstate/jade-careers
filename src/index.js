// careers.jaderealestate.com — public recruiting site for Jade Real Estate (SSR Worker).
// Fast, fully crawlable HTML for Google + AI. Blog posts come from Supabase
// (careers_posts), managed later in the Jade app admin. Colors: Jade palette only.
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
const OG = SITE + '/img/market.jpg';

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// External link: always a new tab with a clear visual exit cue.
const ext = (url, label, cls) => `<a ${cls ? `class="${cls}" ` : ''}href="${url}" target="_blank" rel="noopener">${esc(label)} <span class="xt" aria-hidden="true">↗</span></a>`;
const NAV = [['/', 'Why Jade'], ['/technology', 'Technology'], ['/culture', 'Culture'], ['/blog', 'Blog'], ['/faq', 'FAQ']];
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
.pull{background:var(--jade);color:#eef1ec;text-align:center}
.pull p{font-family:var(--serif);font-style:italic;font-size:clamp(23px,3.4vw,37px);line-height:1.24;max-width:22ch;margin:0 auto}
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
.cta-band{text-align:center}.cta-band h2{font-size:clamp(28px,4.4vw,44px);font-style:italic}.cta-band p{color:#c9d2c6;max-width:50ch;margin:16px auto 0}
.exits{font-size:12.5px;color:var(--jade2);margin-top:14px}.forest .exits,.jadebg .exits{color:#aab6a7}
.foot{background:var(--ink);color:#aeb9b2;font-size:13px;padding:40px 0}
.foot a{color:#d3dbd0;text-decoration:none}.foot .row{display:flex;gap:26px;flex-wrap:wrap;align-items:center}
.foot .disc{margin-top:18px;font-size:11.5px;color:#7f8c84;max-width:84ch}
.center{text-align:center;max-width:66ch;margin-inline:auto}
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
    <a href="/">Why Jade</a><a href="/technology">Technology</a><a href="/culture">Culture</a><a href="/blog">Blog</a><a href="/faq">FAQ</a>
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
  <div class="btns"><a class="btn p" href="${BOOK}" target="_blank" rel="noopener">Talk with Emilie</a><a class="btn s" href="/technology">See the tools</a></div>
</div></section>

<section class="strip"><img src="/img/market.jpg" width="1500" height="1000" alt="Two Jade Real Estate agents at the Jade at the Market farmers-market booth in Denver, with a branded green canopy, a prize wheel, sunflowers, and canvas totes." fetchpriority="high">
  <div class="cap"><div><b>Jade at the Market.</b>Saturday mornings, a green canopy, a prize wheel, and a pile of totes. We’d rather be out in the neighborhood than hiding behind a national logo.</div></div>
</section>

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
      <p class="exits" style="margin-top:20px">${ext(NET, 'Calculate your take-home')} &nbsp;·&nbsp; ${ext(COMPARE, 'Compare brokerages')}</p>
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
  <div class="btns" style="margin-top:26px;display:flex;gap:13px;flex-wrap:wrap"><a class="btn j" href="${DEMO}" target="_blank" rel="noopener">Tour the agent app <span class="xt" aria-hidden="true">↗</span></a><a class="btn j" href="${NET}" target="_blank" rel="noopener" style="background:var(--jade2)">Calculate your take-home <span class="xt" aria-hidden="true">↗</span></a><a class="btn j" href="${COMPARE}" target="_blank" rel="noopener" style="background:var(--olive)">Compare brokerages <span class="xt" aria-hidden="true">↗</span></a></div>
  <p class="exits">Each opens in a new tab, so you never lose your place here.</p>
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
  const body = `
<section class="band forest"><div class="wrap narrow">
  <div class="eyebrow">The technology</div>
  <h1 class="h-sec" style="font-style:italic;font-size:clamp(32px,5vw,52px)">Technology that works like a teammate.</h1>
  <p class="lead">Jade builds its own agent platform and includes it in your monthly fee, so the tools fit how real estate actually works here — and they keep getting better while you sleep.</p>
</div></section>
<section class="band cream"><div class="wrap">
  <div class="two">
    <div class="feat"><h3>Client hubs</h3><p>Every buyer and seller gets a private hub — homes, tours, documents, timelines, and updates in one place. Clients stay informed without you re-typing everything.</p></div>
    <div class="feat"><h3>Booking scheduler</h3><p>A personal booking page and QR code so clients and leads pick a time that lands on your calendar and in your CRM, tagged with where they came from.</p></div>
    <div class="feat"><h3>Marketing studio</h3><p>Branded social posts, newsletters, listing presentations, landing pages, and a weekly content pack — in your voice, on brand, in minutes.</p></div>
    <div class="feat"><h3>Listing presentations &amp; CMAs</h3><p>Build a sharp listing presentation and a comparative market analysis — with per-feature pricing adjustments — then export a clean PDF to send or present.</p></div>
    <div class="feat"><h3>Forms &amp; lead capture</h3><p>Build any form, share a link or QR code, and watch responses flow straight into Follow Up Boss as new or updated contacts.</p></div>
    <div class="feat"><h3>Follow Up Boss + HouseCanary</h3><p>A real CRM with follow-up workflows, plus property and market data — connected so your pipeline stays current without double entry.</p></div>
    <div class="feat"><h3>A Jade AI assistant</h3><p>Trained on Jade’s process and Colorado rules — drafts, pricing thinking, and client content, with compliance and Fair Housing kept front of mind.</p></div>
    <div class="feat"><h3>Built in-house, always improving</h3><p>Because we build it ourselves, the roadmap follows what Jade agents actually ask for — not a national vendor’s release calendar.</p></div>
  </div>
  <div class="center" style="margin-top:40px"><a class="btn j" href="${DEMO}" target="_blank" rel="noopener">Take the self-guided tour <span class="xt" aria-hidden="true">↗</span></a> &nbsp; <a class="btn j" href="${CLIENT_DEMO}" target="_blank" rel="noopener" style="background:var(--jade2)">See the client experience <span class="xt" aria-hidden="true">↗</span></a>
    <p class="exits">Both open in a new tab.</p>
  </div>
</div></section>
${ctaBand()}`;
  return layout({ title: 'The Technology — Jade Real Estate Careers', desc: "Jade Real Estate's in-house agent platform, included in your fee: client hubs, a booking scheduler, a marketing studio, listing presentations, forms, Follow Up Boss + HouseCanary, and a Jade AI assistant. Tour it.", path: '/technology', body });
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
  <p class="lead" style="margin-top:22px">Serving ${MARKETS.join(', ')}. Want the numbers? Try the ${ext(NET, 'take-home calculator')} or ${ext(COMPARE, 'compare brokerages')}.</p>
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
  const base = ['/', '/technology', '/culture', '/blog', '/faq'];
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
- Blog: ${SITE}/blog
- FAQ (includes the full $200 inclusions list): ${SITE}/faq
- Take-home calculator: ${NET}
- Compare brokerages: ${COMPARE}
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
    if (p === '/robots.txt') return robots();
    if (p === '/sitemap.xml') return await sitemap();
    if (p === '/llms.txt') return llms();
    if (p === '/') return html(await homePage());
    if (p === '/technology') return html(techPage());
    if (p === '/culture') return html(culturePage());
    if (p === '/faq') return html(faqPage());
    if (p === '/blog') return html(await blogIndex());
    if (p.startsWith('/blog/')) { const slug = decodeURIComponent(p.slice(6)); const post = await getPost(slug); return post ? html(postPage(post)) : notFound(); }
    return notFound();
  },
};
