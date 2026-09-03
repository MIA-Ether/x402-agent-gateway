import type {
  PaymentLifecycle,
  UsdcAtomic
} from "@x402/core";

export interface PaymentIntent {
  jobId: string;

  payerAgentId: string;
  payeeAgentId: string;

  amount: UsdcAtomic;
  currency: "USDC";

  network: string;

  reason: string;
}

export interface PaymentResult {
  lifecycle: PaymentLifecycle;

  transactionHash?: string;

  network: string;

  errorReason?: string;
}

export interface AgentWallet {
  getAddress(): Promise<string>;

  getBalance(
    asset: string
  ): Promise<UsdcAtomic>;

  authorizePayment(
    intent: PaymentIntent
  ): Promise<PaymentResult>;
}
