# Architecture

## apps

- agent-gateway — HTTP 402 Gateway
- agent-tender — AgentTender / AG-UI

## packages

- core — domain types and state machines
- policy-engine — spending policy
- agents — agent runtime
- x402 — HTTP 402 protocol
- facilitator — payment proof integration
- wallet — wallet abstraction
- hedera — Hedera payment
- arc — Arc payment
- graph — The Graph
- storage — PostgreSQL / Redis

## MVP

One Agent
→ One Paid API
→ One Payment
→ Hedera
→ Facilitator Proof
→ Real API Response
