export interface ResourceInfo {
  url: string;
  description: string;
  mimeType: string;
}

export interface PaymentRequirements {
  scheme: string;
  network: string;
  amount: string;
  asset: string;
  payTo: string;
  maxTimeoutSeconds: number;
  extra?: Record<string, unknown>;
}

export interface PaymentRequired {
  x402Version: 2;
  error?: string;
  resource: ResourceInfo;
  accepts: PaymentRequirements[];
  extensions: Record<string, unknown>;
}

export interface PaymentPayload {
  x402Version: 2;
  resource?: ResourceInfo;
  accepted: PaymentRequirements;
  payload: Record<string, unknown>;
  extensions?: Record<string, unknown>;
}

export interface SettlementResponse {
  success: boolean;
  transaction: string;
  network: string;
  payer?: string;
  errorReason?: string;
}

export function encodeHeaderValue(value: unknown): string {
  const json = JSON.stringify(value);
  return Buffer.from(json, "utf8").toString("base64");
}

export function decodeHeaderValue<T>(value: string): T {
  const json = Buffer.from(value, "base64").toString("utf8");
  return JSON.parse(json) as T;
}

export function createPaymentRequired(input: {
  resourceUrl: string;
  description: string;
  mimeType?: string;
  network: string;
  amount: string;
  asset: string;
  payTo: string;
  maxTimeoutSeconds?: number;
}): PaymentRequired {
  return {
    x402Version: 2,
    resource: {
      url: input.resourceUrl,
      description: input.description,
      mimeType: input.mimeType ?? "application/json"
    },
    accepts: [
      {
        scheme: "exact",
        network: input.network,
        amount: input.amount,
        asset: input.asset,
        payTo: input.payTo,
        maxTimeoutSeconds: input.maxTimeoutSeconds ?? 60,
        extra: {
          name: "USDC",
          version: "2"
        }
      }
    ],
    extensions: {}
  };
}
