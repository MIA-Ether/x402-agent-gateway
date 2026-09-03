import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    name: "x402 Agent Gateway",
    status: "ok"
  });
});

app.get("/api/v1/resource", (c) => {
  return c.json(
    {
      error: "payment_required",
      serviceId: "demo-market-data",
      amount: "300000",
      currency: "USDC",
      network: "hedera-testnet"
    },
    402,
    {
      "WWW-Authenticate":
        'L402 endpoint="http://localhost:8787", invoice="demo-invoice-300000"'
    }
  );
});

serve({
  fetch: app.fetch,
  port: 8787
});

console.log("x402 Agent Gateway running at http://localhost:8787");
