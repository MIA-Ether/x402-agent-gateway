import type { AgentProfile } from "@x402/core";

export interface GraphService {
  queryCandidates(serviceType: string): Promise<AgentProfile[]>;
}

export class MockGraphService implements GraphService {
  async queryCandidates(serviceType: string): Promise<AgentProfile[]> {
    console.log(
      `[THE GRAPH MOCK] Query service agents for "${serviceType}"`
    );

    return [
      {
        id: "service-data-01",
        role: "SERVICE" as AgentProfile["role"],
        walletAddress: "0xServiceAgent01",
        reputationScore: 97,
        successRate: 0.99,
        serviceTypes: [serviceType],
        averagePrice: 0.18,
        averageLatencyMs: 850
      },
      {
        id: "service-data-02",
        role: "SERVICE" as AgentProfile["role"],
        walletAddress: "0xServiceAgent02",
        reputationScore: 91,
        successRate: 0.95,
        serviceTypes: [serviceType],
        averagePrice: 0.12,
        averageLatencyMs: 1200
      }
    ];
  }
}
