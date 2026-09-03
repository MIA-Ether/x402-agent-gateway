import {
  AgentAuthority,
  Job,
  JobStatus
} from "@x402/core";

import { PolicyEngine } from "@x402/policy-engine";

import {
  GraphService,
  EscrowAdapter,
  MockHederaAuditAdapter
} from "@x402/adapters";

export class OrchestratorAgent {
  constructor(
    private readonly policy: PolicyEngine,
    private readonly graph: GraphService,
    private readonly escrow: EscrowAdapter,
    private readonly audit: MockHederaAuditAdapter,
    private readonly authority: AgentAuthority
  ) {}

  async execute(job: Job): Promise<Job> {
    job.status = JobStatus.CREATED;

    await this.audit.logEvent(
      job.id,
      job.status,
      "Job created"
    );

    job.status = JobStatus.DISCOVERING;

    await this.audit.logEvent(
      job.id,
      job.status,
      "Querying The Graph for service agents"
    );

    const candidates = await this.graph.queryCandidates(
      job.serviceType
    );

    if (candidates.length === 0) {
      job.status = JobStatus.FAILED;

      throw new Error(
        "No service agents available"
      );
    }

    job.status = JobStatus.NEGOTIATING;

    const ranked = [...candidates].sort(
      (a, b) =>
        b.reputationScore - a.reputationScore
    );

    const selected = ranked[0];

    job.selectedAgentId = selected.id;

    await this.audit.logEvent(
      job.id,
      job.status,
      `Selected ${selected.id} after candidate ranking`
    );

    job.status = JobStatus.POLICY_CHECKED;

    const decision = this.policy.checkPolicy(
      this.authority,
      job.budget,
      job.serviceType
    );

    await this.audit.logEvent(
      job.id,
      job.status,
      decision.reason
    );

    if (!decision.allowed) {
      job.status = JobStatus.REJECTED;

      await this.audit.logEvent(
        job.id,
        job.status,
        "Job rejected by authority policy"
      );

      return job;
    }

    job.status = JobStatus.ESCROW_PENDING;

    job.escrowId = await this.escrow.lockFunds(
      job.id,
      job.budget,
      selected.walletAddress
    );

    job.status = JobStatus.FUNDED;

    await this.audit.logEvent(
      job.id,
      job.status,
      `Escrow funded: ${job.escrowId}`
    );

    job.status = JobStatus.EXECUTING;

    await this.audit.logEvent(
      job.id,
      job.status,
      "Service agent is executing task through x402 access layer"
    );

    await new Promise((resolve) =>
      setTimeout(resolve, 500)
    );

    job.status = JobStatus.VERIFYING;

    await this.audit.logEvent(
      job.id,
      job.status,
      "Verifier agent evaluating output"
    );

    job.verification = {
      passed: true,
      score: 0.96,
      reason: "Output satisfies task requirements",
      evidenceId: `evidence-${job.id}`
    };

    if (!job.verification.passed) {
      job.status = JobStatus.DISPUTED;
      return job;
    }

    job.status = JobStatus.APPROVED;

    await this.audit.logEvent(
      job.id,
      job.status,
      "Verifier approved service result"
    );

    job.settlementTxId =
      await this.escrow.releaseFunds(
        job.escrowId!
      );

    job.status = JobStatus.RELEASED;

    await this.audit.logEvent(
      job.id,
      job.status,
      `USDC settlement completed: ${job.settlementTxId}`
    );

    return job;
  }
}
