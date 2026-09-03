import type {
  PaymentPayload,
  PaymentRequirements,
  SettlementResponse
} from "@x402/protocol";

export interface VerifyRequest {
  payload: PaymentPayload;
  requirements: PaymentRequirements;
}

export interface VerifyResult {
  isValid: boolean;

  payer?: string;

  reason?: string;
}

export interface SettleRequest {
  payload: PaymentPayload;
  requirements: PaymentRequirements;
}

export interface FacilitatorClient {
  verify(
    request: VerifyRequest
  ): Promise<VerifyResult>;

  settle(
    request: SettleRequest
  ): Promise<SettlementResponse>;
}
