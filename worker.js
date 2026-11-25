const UPSTOX_API = "https://api.upstox.com/v2";

export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    if (url.pathname === "/") {
      return Response.json({
        status: "success",
        message: "Stock Option Pro API Ready",
        market: "NSE Stock Options Only"
      }, { headers: corsHeaders });
    }

    if (!env.UPSTOX_ACCESS_TOKEN) {
      return Response.json({
        status: "error",
        message: "Upstox access token missing"
      }, { status: 500, headers: corsHeaders });
    }

    if (url.pathname === "/profile") {
      const response = await fetch(
        `${UPSTOX_API}/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${env.UPSTOX_ACCESS_TOKEN}`,
            Accept: "application/json"
          }
        }
      );

      const data = await response.json();

      return Response.json(data, {
        status: response.status,
        headers: corsHeaders
      });
    }

    return Response.json({
      status: "error",
      message: "Endpoint not found"
    }, { status: 404, headers: corsHeaders });
  }
};
