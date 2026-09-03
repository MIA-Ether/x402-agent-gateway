import type {
  AgentProfile,
  AgentRole,
  SpendingPolicy
} from "./types.js";

export type UsdcAtomic = string;
export type AgentId = string;
export type JobId = string;
export type ServiceId = string;
export type EscrowId = string;

export enum AuthorityAction {
  DISCOVER_SERVICE = "DISCOVER_SERVICE",
  NEGOTIATE = "NEGOTIATE",
  CREATE_PAYMENT = "CREATE_PAYMENT",
  CREATE_ESCROW = "CREATE_ESCROW",
  RELEASE_ESCROW = "RELEASE_ESCROW",
  VERIFY_RESULT = "VERIFY_RESULT"
}

export enum EconomicStage {
  IDENTITY = "IDENTITY",
  AUTHORITY = "AUTHORITY",
  DISCOVERY = "DISCOVERY",
  NEGOTIATION = "NEGOTIATION",
  PAYMENT_AUTHORIZATION = "PAYMENT_AUTHORIZATION",
  ESCROW = "ESCROW",
  EXECUTION = "EXECUTION",
  VERIFICATION = "VERIFICATION",
  SETTLEMENT = "SETTLEMENT",
  REPUTATION = "REPUTATION"
}

export enum NegotiationStatus {
  OPEN = "OPEN",
  COUNTERED = "COUNTERED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED"
}

export enum EscrowStatus {
  CREATED = "CREATED",
  FUNDED = "FUNDED",
  LOCKED = "LOCKED",
  RELEASED = "RELEASED",
  REFUNDED = "REFUNDED",
  DISPUTED = "DISPUTED"
}

export enum PaymentLifecycle {
  AUTHORIZED = "AUTHORIZED",
  SUBMITTED = "SUBMITTED",
  CONFIRMED = "CONFIRMED",
  SETTLED = "SETTLED",
  FAILED = "FAILED"
}

export interface AuthorityRule {
  action: AuthorityAction;
  allowed: boolean;
  reason: string;
}

export interface AgentEconomicAuthority {
  agentId: AgentId;
  role: AgentRole;
  revoked: boolean;

  policy: SpendingPolicy;

  /**
   * Absolute safety ceiling.
   * This cannot be overridden by normal policy configuration.
   */
  hardCapPerJob: UsdcAtomic;

  /**
   * Maximum amount this agent may spend
   * through a single economic workflow.
   */
  availableBudget: UsdcAtomic;

  allowedActions: AuthorityAction[];
}

export interface ServiceListing {
  serviceId: ServiceId;
  providerAgentId: AgentId;

  name: string;
  endpoint: string;
  serviceType: string;

  price: UsdcAtomic;
  currency: "USDC";

  reputationScore: number;
  successRate: number;
  averageLatencyMs: number;

  active: boolean;
}

export interface ServiceCandidateScore {
  serviceId: ServiceId;
  providerAgentId: AgentId;

  priceScore: number;
  reputationScore: number;
  successRateScore: number;
  latencyScore: number;

  totalScore: number;
  reason: string;
}

export interface HiringDecision {
  jobId: JobId;
  selectedServiceId: ServiceId;
  selectedAgentId: AgentId;

  score: ServiceCandidateScore;

  decision:
    | "APPROVED"
    | "REJECTED"
    | "NO_MATCH";

  reason: string;
}

export interface NegotiationOffer {
  negotiationId: string;
  jobId: JobId;

  fromAgentId: AgentId;
  toAgentId: AgentId;

  price: UsdcAtomic;
  currency: "USDC";

  scope: string;
  deadline: string;

  status: NegotiationStatus;
}

export interface EscrowRecord {
  escrowId: EscrowId;
  jobId: JobId;

  payerAgentId: AgentId;
  payeeAgentId: AgentId;

  amount: UsdcAtomic;
  currency: "USDC";

  status: EscrowStatus;

  network: string;

  createdAt: string;
  releasedAt?: string;

  transactionHash?: string;
}

export interface PaymentRecord {
  jobId: JobId;
  escrowId?: EscrowId;

  payerAgentId: AgentId;
  payeeAgentId: AgentId;

  amount: UsdcAtomic;
  currency: "USDC";

  lifecycle: PaymentLifecycle;

  network: string;

  transactionHash?: string;
  facilitatorProofId?: string;
}

export interface VerificationRecord {
  jobId: JobId;
  verifierAgentId: AgentId;

  passed: boolean;
  score: number;

  reason: string;
  evidenceId?: string;

  verifiedAt: string;
}

export interface ReputationEvent {
  agentId: AgentId;
  jobId: JobId;

  type:
    | "SERVICE_COMPLETED"
    | "SERVICE_FAILED"
    | "VERIFICATION_PASSED"
    | "VERIFICATION_FAILED"
    | "PAYMENT_SETTLED"
    | "DISPUTE_RESOLVED";

  scoreDelta: number;
  reason: string;

  timestamp: string;
}

export interface AgentIdentityRecord {
  profile: AgentProfile;

  credentials: string[];
  registeredAt: string;

  active: boolean;
}

export interface AgentEconomicContext {
  identity: AgentIdentityRecord;
  authority: AgentEconomicAuthority;

  walletAddress: string;

  currentStage: EconomicStage;
  jobId?: JobId;
}

export interface EconomicWorkflowDecision {
  allowed: boolean;

  action: AuthorityAction;
  agentId: AgentId;

  reason: string;

  evaluatedAt: string;
}
