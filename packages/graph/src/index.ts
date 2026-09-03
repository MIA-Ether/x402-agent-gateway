import type {
  ServiceListing,
  ServiceCandidateScore
} from "@x402/core";

export interface GraphDiscoveryQuery {
  serviceType: string;

  maxPrice?: string;
  minReputationScore?: number;
  minSuccessRate?: number;

  limit?: number;
}

export interface GraphDecisionResult {
  candidates: ServiceListing[];
  scores: ServiceCandidateScore[];
}

export interface GraphDecisionEngine {
  discover(
    query: GraphDiscoveryQuery
  ): Promise<GraphDecisionResult>;
}
