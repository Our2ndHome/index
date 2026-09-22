export default {
  async fetch(request) {
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug") || "our2ndHome";
    const targetUrl = `https://bossan.musikhjalpen.se/${slug}/`;

    try {
      // Cloudflare hämtar sidan direkt från Musikhjälpen som en server
      const response = await fetch(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });

      const html = await response.text();

      // Skicka tillbaka datan med CORS-tillåtelse så OBS godkänner den
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
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      });
    }
  }
};
