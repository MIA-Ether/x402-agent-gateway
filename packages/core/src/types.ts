export enum AgentRole {
  OWNER = "OWNER",
  ORCHESTRATOR = "ORCHESTRATOR",
  SERVICE = "SERVICE",
  VERIFIER = "VERIFIER",
  TREASURY = "TREASURY",
  ADMIN = "ADMIN"
}

export enum JobStatus {
  CREATED = "CREATED",
  DISCOVERING = "DISCOVERING",
  NEGOTIATING = "NEGOTIATING",
  POLICY_CHECKED = "POLICY_CHECKED",
  ESCROW_PENDING = "ESCROW_PENDING",
  FUNDED = "FUNDED",
  EXECUTING = "EXECUTING",
  VERIFYING = "VERIFYING",
  APPROVED = "APPROVED",
  RELEASED = "RELEASED",
  REJECTED = "REJECTED",
  DISPUTED = "DISPUTED",
  FAILED = "FAILED"
}

export interface AgentProfile {
  id: string;
  role: AgentRole;
  walletAddress: string;
  reputationScore: number;
  successRate: number;
  serviceTypes: string[];
  averagePrice: number;
  averageLatencyMs: number;
}

export interface SpendingPolicy {
  maxPerJobLimit: number;
  dailyBudget: number;
  dailySpend: number;
  allowedServices: string[];
}

export interface AgentAuthority {
  isRevoked: boolean;
  policy: SpendingPolicy;
}

export interface VerificationResult {
  passed: boolean;
  score: number;
  reason: string;
  evidenceId: string;
}

export interface NegotiationBid {
  agentId: string;
  offeredPrice: number;
  estimatedLatencyMs: number;
  reputationScore: number;
}

export interface Job {
  id: string;
  serviceType: string;
  description: string;
  budget: number;
  status: JobStatus;
  selectedAgentId?: string;
  escrowId?: string;
  settlementTxId?: string;
  verification?: VerificationResult;
}

export interface AuditEvent {
  id: string;
  jobId: string;
  status: JobStatus;
  message: string;
  timestamp: string;
}
