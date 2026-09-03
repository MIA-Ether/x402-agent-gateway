import type { AgentAuthority } from "@x402/core";

export interface PolicyDecision {
  allowed: boolean;
  reason: string;
}

export class PolicyEngine {
  checkPolicy(
    authority: AgentAuthority,
    requestedAmount: number,
    serviceType: string
  ): PolicyDecision {
    if (authority.isRevoked) {
      return {
        allowed: false,
        reason: "Authority revoked"
      };
    }

    if (requestedAmount > authority.policy.maxPerJobLimit) {
      return {
        allowed: false,
        reason: `Amount ${requestedAmount} exceeds per-job limit ${authority.policy.maxPerJobLimit}`
      };
    }

    if (
      authority.policy.dailySpend + requestedAmount >
      authority.policy.dailyBudget
    ) {
      return {
        allowed: false,
        reason: "Daily budget exceeded"
      };
    }

    const allowed =
      authority.policy.allowedServices.includes("*") ||
      authority.policy.allowedServices.includes(serviceType);

    if (!allowed) {
      return {
        allowed: false,
        reason: `Service ${serviceType} is not allowed`
      };
    }

    return {
      allowed: true,
      reason: "Policy check passed"
    };
  }
}
