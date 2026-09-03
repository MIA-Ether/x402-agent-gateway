import { Hono } from "hono";
import { serve } from "@hono/node-server";

import {
  createPaymentRequired,
  type PaymentPayload,
  decodeHeaderValue,
  encodeHeaderValue
} from "@x402/protocol";

const app = new Hono();

const PORT = 8787;

const PAYMENT_REQUIRED_HEADER = "PAYMENT-REQUIRED";
const PAYMENT_SIGNATURE_HEADER = "PAYMENT-SIGNATURE";
const PAYMENT_RESPONSE_HEADER = "PAYMENT-RESPONSE";

const paymentRequired = createPaymentRequired({
  resourceUrl: `http://localhost:${PORT}/api/v1/resource`,
  description: "Demo market data API",
  mimeType: "application/json",
  network: "hedera:testnet",
  amount: "300000",
  asset: "0.0.429274",
  payTo: "0.0.000000",
  maxTimeoutSeconds: 60
});

app.get("/", (c) => {
  return c.json({
    name: "x402 Agent Gateway",
    version: "0.1.0",
    protocol: "x402-v2",
    status: "ok"
  });
});

app.get("/api/v1/resource", (c) => {
  const paymentSignature =
    c.req.header(PAYMENT_SIGNATURE_HEADER);

  if (!paymentSignature) {
    c.header(
      PAYMENT_REQUIRED_HEADER,
      encodeHeaderValue(paymentRequired)
    );

    return c.json(
      {
        error: "payment_required",
        x402Version: 2,
        serviceId: "demo-market-data",
        amount: "300000",
        currency: "USDC",
        network: "hedera:testnet"
      },
      402
    );
  }

  let payload: PaymentPayload;

  try {
    payload = decodeHeaderValue<PaymentPayload>(
      paymentSignature
    );
  } catch {
    return c.json(
      {
        error: "invalid_payment_signature",
        message: "PAYMENT-SIGNATURE is not valid base64 JSON"
      },
      400
    );
  }

  return c.json(
    {
      error: "payment_verification_not_configured",
      message:
        "Payment payload received. Facilitator verification is not connected yet.",
      x402Version: payload.x402Version,
      next:
        "Implement facilitator verify/settle adapter before unlocking the resource."
    },
    501,
    {
      [PAYMENT_RESPONSE_HEADER]: encodeHeaderValue({
        success: false,
        transaction: "",
        network: payload.accepted?.network ?? "hedera:testnet",
        errorReason: "facilitator_not_configured"
      })
    }
  );
});

serve({
  fetch: app.fetch,
  port: PORT
});

console.log(
  `x402 Agent Gateway running at http://localhost:${PORT}`
);
