export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. If visiting /bossa, fetch from Musikhjälpen with open CORS
    if (url.pathname.includes("bossa")) {
      const slug = url.searchParams.get("slug") || "our2ndhome";
      const targetUrl = `https://bossan.musikhjalpen.se/${slug}/`;

      try {
        const response = await fetch(targetUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
          }
        });

        const html = await response.text();

        return new Response(html, {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "text/html; charset=utf-8"
          }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" }
        });
      }
    }

    // 2. If static assets exist, serve them; otherwise return OK status
    if (env && env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Musikhjälpen Relä Aktivt. Använd /bossa?slug=namn", {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }
};
