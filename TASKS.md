# TASKS.md

# ETHOnline 2026 Vertical Slice Roadmap

## Slice 1 — Core Payment Loop

Target: One real paid API flow.

### MIA

- [ ] Agent runtime interface
- [ ] Orchestrator state machine
- [ ] Policy Engine
- [ ] The Graph client interface
- [ ] Service selection logic
- [ ] CLI demo orchestration

### Ali

- [ ] HTTP 402 middleware
- [ ] Protected API endpoint
- [ ] Invoice generation
- [ ] Facilitator client
- [ ] Proof validation interface
- [ ] PostgreSQL configuration layer
- [ ] Redis runtime state layer

### Pragati

- [ ] AgentTender application scaffold
- [ ] Event timeline
- [ ] Agent execution log
- [ ] Payment status visualization
- [ ] SSE client

### Elorze

- [ ] Wallet abstraction
- [ ] viem integration
- [ ] Hedera USDC transfer
- [ ] Circle wallet abstraction
- [ ] Payment transaction tracking

---

# Slice 2 — AG-UI

- [ ] SSE event streaming
- [ ] Agent decision timeline
- [ ] 402 challenge visualization
- [ ] payment transaction visualization
- [ ] proof acquisition visualization
- [ ] API result visualization

---

# Slice 3 — The Graph

- [ ] Subgraph schema
- [ ] payment entity
- [ ] service metrics
- [ ] reputation query
- [ ] agent ranking
- [ ] Graph-driven selection

---

# Slice 4 — Arc / Circle

- [ ] Circle Agent Stack integration
- [ ] Arc wallet
- [ ] Arc payment adapter
- [ ] secondary settlement route
- [ ] multi-chain abstraction

---

# Demo Acceptance

The final demo must show:

1. Agent requests protected API.
2. Gateway returns HTTP 402.
3. Agent evaluates service.
4. Policy approves payment.
5. Agent pays USDC.
6. Facilitator verifies payment.
7. Facilitator provides proof.
8. Agent retries request.
9. Gateway validates proof.
10. Real API result is returned.

Anything outside this flow is secondary.