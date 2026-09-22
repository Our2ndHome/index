export async function onRequest(context) {
  const url = new URL(context.request.url);
  const slug = url.searchParams.get("slug") || "our2ndhome";
  const targetUrl = `https://bossan.musikhjalpen.se/${slug}/`;

  try {
    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      }
    });

    const html = await res.text();

    return new Response(html, {
      headers: {
        "Access-Control-Allow-Origin": "*",
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
