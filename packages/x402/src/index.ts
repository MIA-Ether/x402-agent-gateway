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

function bytesToBinaryString(bytes: Uint8Array): string {
  let result = "";

  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    result += String.fromCharCode(
      ...bytes.subarray(i, i + chunkSize)
    );
  }

  return result;
}

function binaryStringToBytes(value: string): Uint8Array {
  const bytes = new Uint8Array(value.length);

  for (let i = 0; i < value.length; i++) {
    bytes[i] = value.charCodeAt(i);
  }

  return bytes;
}

export function encodeHeaderValue(value: unknown): string {
  const json = JSON.stringify(value);

  const bytes = new TextEncoder().encode(json);

  return globalThis.btoa(
    bytesToBinaryString(bytes)
  );
}

export function decodeHeaderValue<T>(value: string): T {
  const binary = globalThis.atob(value);

  const bytes = binaryStringToBytes(binary);

  const json = new TextDecoder().decode(bytes);

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
        maxTimeoutSeconds:
          input.maxTimeoutSeconds ?? 60,

        extra: {
          name: "USDC",
          version: "2"
        }
      }
    ],

    extensions: {}
  };
}
