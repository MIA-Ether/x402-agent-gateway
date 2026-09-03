import {
  AgentAuthority,
  Job,
  JobStatus
} from "@x402/core";

import { PolicyEngine } from "@x402/policy-engine";

import {
  MockArcEscrowAdapter,
  MockGraphService,
  MockHederaAuditAdapter
} from "@x402/adapters";

import { OrchestratorAgent } from "@x402/agents";

async function main(): Promise<void> {
  const authority: AgentAuthority = {
    isRevoked: false,
    policy: {
      maxPerJobLimit: 1,
      dailyBudget: 5,
      dailySpend: 0,
      allowedServices: [
        "data-analysis",
        "web-research"
      ]
    }
  };

  const job: Job = {
    id: "job-001",
    serviceType: "data-analysis",
    description: "Analyze a market dataset",
    budget: 0.25,
    status: JobStatus.CREATED
  };

  console.log(`
========================================
        x402 AGENTOS LOCAL DEMO
========================================
`);

  const orchestrator = new OrchestratorAgent(
    new PolicyEngine(),
    new MockGraphService(),
    new MockArcEscrowAdapter(),
    new MockHederaAuditAdapter(),
    authority
  );

  const result = await orchestrator.execute(job);

  console.log("\nFINAL RESULT");
  console.dir(result, {
    depth: null
  });
}

main().catch((error: unknown) => {
  console.error("\nDEMO FAILED\n");

  if (error instanceof Error) {
    console.error(error.message);
    console.error(error.stack);
  } else {
    console.error(error);
  }

  process.exitCode = 1;
});
