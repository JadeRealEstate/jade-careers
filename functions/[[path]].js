// Cloudflare Pages entry point. Reuses the same handler as the Worker
// (../src/index.js) so there is one source of truth for the site.
// Pages supports connecting careers.jaderealestate.com via a CNAME at the
// existing (external) DNS — which a Worker custom domain cannot do unless the
// whole zone is moved into this Cloudflare account.
import worker from '../src/index.js';

export async function onRequest(context) {
  return worker.fetch(context.request);
}
