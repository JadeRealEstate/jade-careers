// careers.jaderealestate.com — public recruiting site for Jade Real Estate.
// SSR from this Worker (fast, fully crawlable HTML for Google + AI). Phase 1 = the
// shell: Home / Why Jade, Technology, Culture, FAQ, sitemap, robots. Blog posts and
// testimonials come next from Supabase (managed in the Jade app admin).
const SITE = 'https://careers.jaderealestate.com';
const BOOK = 'https://client.jaderealestate.com/book/emilie';
const DEMO = 'https://agentapp.jaderealestate.com/jade-demo';
const CLIENT_DEMO = 'https://agentapp.jaderealestate.com/demo';
const MAIN = 'https://www.jaderealestate.com';

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const NAV = [['/', 'Why Jade'], ['/technology', 'Technology'], ['/culture', 'Culture'], ['/faq', 'FAQ']];

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
<meta name="robots" content="index,follow">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23335143'/%3E%3Ctext x='16' y='22' font-family='Georgia,serif' font-style='italic' font-size='18' fill='white' text-anchor='middle'%3EJ%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--ink:#15201a;--forest:#1b2f25;--jade:#335143;--jade2:#546751;--olive:#3e5725;--sage:#a6b6a4;--cream:#f2efeb;--paper:#fff;--gold:#b08d57;--line:rgba(21,32,26,.12);--serif:'DM Serif Display',Georgia,serif;--sans:'Montserrat',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
*{box-sizing:border-box}html,body{margin:0}
body{background:var(--cream);color:var(--ink);font-family:var(--sans);line-height:1.6;-webkit-font-smoothing:antialiased}
a{color:inherit}
h1,h2,h3{font-family:var(--serif);font-weight:400;line-height:1.1;margin:0;text-wrap:balance}
.wrap{max-width:1040px;margin:0 auto;padding:0 22px}
.nav{position:sticky;top:0;z-index:20;background:rgba(242,239,235,.92);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.nav .wrap{display:flex;align-items:center;gap:22px;height:62px}
.brand{font-family:var(--serif);font-style:italic;font-size:22px;color:var(--jade);text-decoration:none;line-height:1}
.brand small{display:block;font-family:var(--sans);font-style:normal;font-size:8.5px;letter-spacing:.32em;font-weight:600;color:var(--jade2);margin-top:2px}
.nav .links{display:flex;gap:20px;margin-left:8px}
.nav .links a{font-size:14px;font-weight:600;color:var(--jade2);text-decoration:none}
.nav .links a.on,.nav .links a:hover{color:var(--jade)}
.nav .cta{margin-left:auto;background:var(--jade);color:#fff;text-decoration:none;font-size:13.5px;font-weight:700;padding:9px 16px;border-radius:999px}
.band{padding:clamp(52px,7vw,92px) 0}
.forest{background:var(--forest);color:#eef1ec}.cream{background:var(--cream)}.paper{background:var(--paper)}.jadebg{background:var(--jade);color:#eef1ec}
.eyebrow{font-size:12px;letter-spacing:.22em;text-transform:uppercase;font-weight:600;color:var(--jade2)}
.forest .eyebrow,.jadebg .eyebrow{color:var(--sage)}
.hero{position:relative;overflow:hidden;background:var(--forest);color:#eef1ec;padding:clamp(70px,11vw,130px) 0}
.hero .m1{position:absolute;right:-6%;top:-18%;width:min(56%,520px);aspect-ratio:1;background:linear-gradient(150deg,rgba(84,103,81,.5),rgba(62,87,37,.12));border-radius:44% 44% 44% 62%}
.hero h1{font-size:clamp(38px,6.4vw,66px);font-style:italic;position:relative;max-width:16ch}
.hero p{font-size:clamp(16px,1.9vw,21px);color:#d3dbd0;margin-top:22px;max-width:52ch;position:relative}
.hero .btns{margin-top:34px;display:flex;gap:13px;flex-wrap:wrap;position:relative}
.btn{display:inline-block;text-decoration:none;font-weight:700;font-size:15px;padding:13px 24px;border-radius:999px}
.btn.p{background:var(--gold);color:#201a10}.btn.s{background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.28)}
.h-sec{font-size:clamp(28px,4.2vw,42px);margin-top:10px}
.lead{font-size:clamp(16px,1.6vw,18.5px);color:var(--jade2);margin-top:16px;max-width:64ch}.forest .lead,.jadebg .lead{color:#c9d2c6}
.pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:38px}
.pill{background:var(--paper);border:1px solid var(--line);border-radius:16px;padding:26px}
.pill .k{font-family:var(--serif);font-size:22px;color:var(--jade);font-style:italic}
.pill h3{font-size:14px;font-family:var(--sans);font-weight:700;text-transform:uppercase;letter-spacing:.04em;margin-top:12px}
.pill p{font-size:14.5px;color:var(--jade2);margin:9px 0 0}
.two{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:36px;align-items:start}
.feat{background:var(--paper);border:1px solid var(--line);border-radius:16px;padding:26px}
.feat h3{font-family:var(--serif);font-size:21px;color:var(--jade)}.feat p{font-size:14.5px;color:var(--jade2);margin-top:10px}
.quotes{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:34px}
.q{background:var(--paper);border-left:3px solid var(--gold);border-radius:0 14px 14px 0;padding:24px;box-shadow:0 10px 30px rgba(21,32,26,.05)}
.q p{font-family:var(--serif);font-size:20px;font-style:italic;color:var(--jade);margin:0;line-height:1.3}
.q .by{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--jade2);font-weight:600;margin-top:14px}
.ph{font-size:11px;color:var(--gold);font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-top:8px}
.faq{margin-top:30px;border:1px solid var(--line);border-radius:16px;overflow:hidden;background:var(--line);display:grid;gap:1px}
.qa{background:var(--paper);padding:24px 26px}.qa h3{font-family:var(--sans);font-size:17px;font-weight:700;color:var(--jade)}.qa p{font-size:15px;color:var(--jade2);margin:10px 0 0}
.cta-band{text-align:center}
.cta-band h2{font-size:clamp(28px,4.4vw,44px);font-style:italic}
.cta-band p{color:#c9d2c6;max-width:46ch;margin:16px auto 0}
.foot{background:var(--ink);color:#aeb9b2;font-size:13px;padding:40px 0}
.foot a{color:#d3dbd0;text-decoration:none}.foot .row{display:flex;gap:26px;flex-wrap:wrap;align-items:center}
.foot .disc{margin-top:18px;font-size:11.5px;color:#7f8c84;max-width:80ch}
.center{text-align:center;max-width:64ch;margin-inline:auto}
@media(max-width:860px){.pillars,.two,.quotes{grid-template-columns:1fr}.nav .links{display:none}}
</style>
${ld}
</head><body>
<header class="nav"><div class="wrap">
  <a class="brand" href="/">Jade<small>REAL ESTATE</small></a>
  <nav class="links">${nav}</nav>
  <a class="cta" href="${BOOK}">Talk with Emilie</a>
</div></header>
${body}
<footer class="foot"><div class="wrap">
  <div class="row">
    <a class="brand" style="color:#eef1ec" href="/">Jade<small>REAL ESTATE</small></a>
    <a href="/">Why Jade</a><a href="/technology">Technology</a><a href="/culture">Culture</a><a href="/faq">FAQ</a>
    <a href="${BOOK}" style="margin-left:auto;font-weight:700;color:#fff">Book a conversation →</a>
  </div>
  <p class="disc">Jade Real Estate is an independent brokerage serving the Denver metro area. This site is for licensed real estate agents exploring a move; it is not a solicitation of agents under an existing exclusive agreement. Equal Housing Opportunity. Nothing here is a guarantee of income or results.</p>
  <p class="disc">© ${new Date().getFullYear()} Jade Real Estate · <a href="${MAIN}">jaderealestate.com</a></p>
</div></footer>
</body></html>`;
}

function ctaBand() {
  return `<section class="band forest cta-band"><div class="wrap">
    <div class="eyebrow">The next step</div>
    <h2>Explore Jade with Emilie</h2>
    <p>A relaxed 20-minute conversation about your business, the tools, and the support you'd have here. No pressure, no script.</p>
    <div style="margin-top:28px"><a class="btn p" href="${BOOK}">Book a conversation</a></div>
  </div></section>`;
}

function homePage() {
  const jsonld = [
    { '@context': 'https://schema.org', '@type': 'Organization', name: 'Jade Real Estate', url: SITE, sameAs: [MAIN], areaServed: 'Denver Metropolitan Area', description: 'Independent Denver-metro real estate brokerage offering modern technology, a collaborative community, and personal support for agents.' },
    { '@context': 'https://schema.org', '@type': 'RealEstateAgent', name: 'Jade Real Estate', url: SITE, areaServed: 'Denver, Colorado', knowsAbout: ['real estate agent technology', 'agent marketing', 'client experience', 'brokerage support'] },
  ];
  const body = `
<section class="hero"><div class="m1"></div><div class="wrap">
  <div class="eyebrow">Careers at Jade Real Estate</div>
  <h1>A Denver brokerage built around the agent.</h1>
  <p>Forward-thinking technology, a real community, and personal support — from an independent brokerage that's local, transparent, and genuinely in your corner.</p>
  <div class="btns"><a class="btn p" href="${BOOK}">Talk with Emilie</a><a class="btn s" href="/technology">See the tools</a></div>
</div></section>

<section class="band cream"><div class="wrap">
  <div class="eyebrow">Why agents come to Jade</div>
  <h2 class="h-sec">Three things, done well.</h2>
  <div class="pillars">
    <div class="pill"><div class="k">Technology</div><h3>Tools that do real work</h3><p>A full agent platform — client hubs, a booking scheduler, marketing tools, and a Jade AI assistant trained on our process. Built in-house, improved every week.</p></div>
    <div class="pill"><div class="k">Community</div><h3>Collaboration, not competition</h3><p>An Agent Board, classes, and events where agents actually help each other. You're part of a team, not a number in a national franchise.</p></div>
    <div class="pill"><div class="k">Support</div><h3>Personal attention</h3><p>Hands-on onboarding, training, and direct access to the managing broker. When you have a question, a real person who knows your business answers it.</p></div>
  </div>
</div></section>

<section class="band paper"><div class="wrap">
  <div class="eyebrow">Local &amp; fair</div>
  <h2 class="h-sec">Rooted in Denver. Honest by default.</h2>
  <div class="two">
    <div class="feat"><h3>Independent &amp; local</h3><p>Jade is Denver-metro, owner-operated — not a national brand running a playbook from out of state. Decisions get made here, by people who know this market.</p></div>
    <div class="feat"><h3>Competitive, transparent splits</h3><p>We keep compensation competitive, clear, and fair — no fine print you have to decode. The specifics depend on your business, so Emilie will walk you through exactly how it works in a quick conversation.</p></div>
  </div>
</div></section>

<section class="band cream"><div class="wrap">
  <div class="eyebrow">The platform</div>
  <h2 class="h-sec">See what you'd be working with.</h2>
  <p class="lead">The same tools your clients experience — buyer and seller hubs, a booking page, and the marketing studio. Take the self-guided tour.</p>
  <div class="btns" style="margin-top:26px"><a class="btn p" href="${DEMO}" style="background:var(--jade);color:#fff">Tour the agent app</a><a class="btn s" href="${CLIENT_DEMO}" style="background:#fff;color:var(--jade);border:1px solid var(--line)">See the client experience</a></div>
</div></section>

<section class="band paper"><div class="wrap">
  <div class="eyebrow">In their words</div>
  <h2 class="h-sec">From Jade agents.</h2>
  <div class="quotes">
    <div class="q"><p>&ldquo;Placeholder — a real quote from a Jade agent about the technology and support goes here.&rdquo;<div class="by">Jade agent</div></p><div class="ph">Sample — replace with a real testimonial</div></div>
    <div class="q"><p>&ldquo;Placeholder — a second agent's story about the community and the move to Jade.&rdquo;<div class="by">Jade agent</div></p><div class="ph">Sample — replace with a real testimonial</div></div>
  </div>
</div></section>

${ctaBand()}`;
  return layout({ title: 'Jade Real Estate — Careers for Denver Agents', desc: 'Join Jade Real Estate, an independent Denver-metro brokerage with forward-thinking technology, a collaborative community, and personal support. Explore it with Emilie.', path: '/', body, jsonld });
}

function techPage() {
  const body = `
<section class="band forest"><div class="wrap">
  <div class="eyebrow">The technology</div>
  <h1 class="h-sec" style="font-style:italic;font-size:clamp(32px,5vw,52px)">Technology that works like a teammate.</h1>
  <p class="lead">Jade builds its own agent platform, so the tools fit how real estate actually works here — and they keep getting better.</p>
</div></section>
<section class="band cream"><div class="wrap">
  <div class="two">
    <div class="feat"><h3>Client hubs</h3><p>Every buyer and seller gets a private hub — homes, tours, documents, timelines, and updates in one place. Clients stay informed without you re-typing everything.</p></div>
    <div class="feat"><h3>Booking scheduler</h3><p>A personal booking page and QR code so clients and leads pick a time that lands on your calendar and in your CRM, tagged with where they came from.</p></div>
    <div class="feat"><h3>Marketing studio</h3><p>Branded social posts, newsletters, listing presentations, landing pages, and a content pack — in your voice, on brand, in minutes.</p></div>
    <div class="feat"><h3>Jade AI assistant</h3><p>An assistant trained on Jade's process and Colorado rules — drafts, pricing thinking, and client content, with compliance and Fair Housing built in.</p></div>
    <div class="feat"><h3>Forms &amp; lead capture</h3><p>Build any form, share a link or QR code, and watch responses flow straight into Follow Up Boss.</p></div>
    <div class="feat"><h3>Follow Up Boss, connected</h3><p>The tools write to your CRM automatically, so your pipeline stays current without double entry.</p></div>
  </div>
  <div class="center" style="margin-top:40px"><a class="btn p" href="${DEMO}" style="background:var(--jade);color:#fff">Take the self-guided tour</a></div>
</div></section>
${ctaBand()}`;
  return layout({ title: 'The Technology — Jade Real Estate Careers', desc: "Jade Real Estate's in-house agent platform: client hubs, a booking scheduler, a marketing studio, a Jade AI assistant, forms, and Follow Up Boss sync. Tour it.", path: '/technology', body });
}

function culturePage() {
  const body = `
<section class="band forest"><div class="wrap">
  <div class="eyebrow">Culture</div>
  <h1 class="h-sec" style="font-style:italic;font-size:clamp(32px,5vw,52px)">A team that shows up for each other.</h1>
  <p class="lead">Jade is small enough to know your name and serious enough to grow your business. Here's what that feels like day to day.</p>
</div></section>
<section class="band cream"><div class="wrap">
  <div class="two">
    <div class="feat"><h3>Real collaboration</h3><p>An Agent Board and regular classes where people share what's working — scripts, strategies, wins and misses. Everyone gets better together.</p></div>
    <div class="feat"><h3>Events &amp; community</h3><p>Trainings, workshops like the Agent Visibility Lab, and vendor gatherings that build relationships, not just attendance.</p></div>
    <div class="feat"><h3>Direct access</h3><p>The managing broker and the marketing lead are a message away. No layers, no ticket queue — just answers from people who know your deals.</p></div>
    <div class="feat"><h3>Local &amp; independent</h3><p>Decisions are made in Denver by owners who are invested in this market and in your success — not dictated by a national franchise.</p></div>
  </div>
</div></section>
${ctaBand()}`;
  return layout({ title: 'Culture — Jade Real Estate Careers', desc: 'Life at Jade Real Estate: real collaboration, community events, direct access to leadership, and an independent, Denver-local culture built around agents.', path: '/culture', body });
}

function faqPage() {
  const faqs = [
    ['What makes Jade different from a big franchise?', "Jade is independent and Denver-local, so you get modern, in-house technology and genuine one-on-one support without a national playbook written out of state. Decisions get made here, by owners invested in this market."],
    ['What technology would I actually get?', 'The full Jade agent platform: private client hubs, a booking scheduler with QR codes, a marketing studio (social, newsletters, listing presentations, landing pages), a Jade AI assistant trained on our process, forms and lead capture, and automatic Follow Up Boss sync. You can tour it from the Technology page.'],
    ['How do splits and compensation work?', 'We keep it competitive, transparent, and fair — no fine print to decode. The right structure depends on your business, so Emilie will walk you through the specifics in a quick, no-pressure conversation.'],
    ['Will I have support, or am I on my own?', 'You get hands-on onboarding, ongoing training and classes, and direct access to the managing broker and marketing lead. When you have a question, a real person who knows your business answers it.'],
    ['Do you provide leads?', 'Jade focuses on giving you the tools, marketing, and brokerage resources to grow your own business and nurture your sphere, rather than promising a lead firehose. Emilie can talk through what that looks like for where you are today.'],
    ['How hard is it to make the move?', "It's more straightforward than most agents expect. Book a conversation with Emilie and she'll walk you through the steps and timing for a clean transition."],
    ['Is Jade a fit for newer or more experienced agents?', "Both. The support scales to where you are — more structure and training if you're building, more leverage and tools if you're established."],
  ];
  const jsonld = [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }];
  const body = `
<section class="band forest"><div class="wrap">
  <div class="eyebrow">Questions agents ask</div>
  <h1 class="h-sec" style="font-style:italic;font-size:clamp(32px,5vw,52px)">Straight answers.</h1>
</div></section>
<section class="band cream"><div class="wrap">
  <div class="faq">${faqs.map(([q, a]) => `<div class="qa"><h3>${esc(q)}</h3><p>${esc(a)}</p></div>`).join('')}</div>
</div></section>
${ctaBand()}`;
  return layout({ title: 'FAQ — Jade Real Estate Careers', desc: 'Answers for agents considering Jade Real Estate: what makes Jade different, the technology, how splits work, support, leads, and making the move.', path: '/faq', body, jsonld });
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
    '', 'Sitemap: ' + SITE + '/sitemap.xml',
  ];
  return new Response(lines.join('\n'), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}

function sitemap() {
  const urls = ['/', '/technology', '/culture', '/faq'];
  const today = new Date().toISOString().slice(0, 10);
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map(u => `  <url><loc>${SITE}${u === '/' ? '' : u}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${u === '/' ? '1.0' : '0.7'}</priority></url>`).join('\n') +
    '\n</urlset>';
  return new Response(xml, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
}

function html(body) { return new Response(body, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=300' } }); }

function notFound() {
  const body = layout({ title: 'Not found — Jade Real Estate Careers', desc: 'Page not found.', path: '', body: `<section class="band cream"><div class="wrap center" style="padding:40px 0"><h1 class="h-sec">Page not found</h1><p class="lead">That page moved or never existed. <a href="/" style="color:var(--jade);font-weight:600">Back to Why Jade →</a></p></div></section>` });
  return new Response(body, { status: 404, headers: { 'content-type': 'text/html; charset=utf-8' } });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const p = url.pathname.replace(/\/+$/, '') || '/';
    if (p === '/robots.txt') return robots();
    if (p === '/sitemap.xml') return sitemap();
    if (p === '/') return html(homePage());
    if (p === '/technology') return html(techPage());
    if (p === '/culture') return html(culturePage());
    if (p === '/faq') return html(faqPage());
    return notFound();
  },
};
