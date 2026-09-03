# Architecture

# x402 AgentOS

x402 AgentOS is a permissioned economic runtime for autonomous AI Agents.

The core product abstraction is:

Identity → Authority → Money

Agents do not receive unrestricted payment capability.

Every economic action is evaluated against the Agent's identity, role, authority and spending policy before money can move.

---

## Identity

Identity answers:

Who is this Agent?

The system tracks:

- Agent profile
- role
- wallet
- credentials
- reputation
- historical jobs
- service capabilities

Primary package:

`packages/core`

Trust / audit integrations:

`packages/hedera`

---

## Authority

Authority answers:

What is this Agent allowed to do?

Authority is part of the economic workflow.

The Orchestrator must not be able to spend simply because it owns a wallet.

Each action is evaluated against:

- role
- revocation status
- hard per-job cap
- available budget
- allowed services
- allowed economic actions
- approval requirements

Primary package:

`packages/policy-engine`

---

## Money

Money answers:

Can the Agent actually execute the authorized payment?

Money flows through:

Agent Wallet
→ Payment Intent
→ Escrow / Payment Rail
→ Facilitator
→ Settlement

Primary packages:

- `packages/wallet`
- `packages/facilitator`
- `packages/hedera`
- `packages/arc`

The Gateway never owns Agent private keys.

---

## Agent Hiring Loop

The target autonomous workflow is:

Owner
→ Orchestrator
→ Discover Services
→ Compare Reputation / Price / Success Rate
→ Negotiate
→ Authority Check
→ Payment Authorization
→ Escrow
→ Execute Service
→ Verify Result
→ Release Payment
→ Update Reputation

The Graph is a decision input during service discovery.

It is not merely an analytics dashboard.

---

## x402 Layer

The existing x402 Gateway remains the access/payment protocol layer underneath the AgentOS.

AgentOS decides:

- whether to hire
- which service to hire
- whether payment is authorized

x402 handles:

- HTTP 402
- payment requirements
- payment payload
- facilitator interaction
- protected resource access

Primary packages:

- `packages/x402`
- `packages/facilitator`

Application:

`apps/agent-gateway`

---

## Presentation

`apps/agent-tender`

Visualizes the same workflow events produced by the Agent Runtime.

Frontend must not invent Agent decisions.

---

## Vertical Slice

Primary demo:

Owner
→ Orchestrator
→ Service Discovery
→ Authority Check
→ USDC Payment
→ x402 Resource Access
→ Verification
→ Settlement
→ Reputation Update

Secondary capabilities such as Arc multi-chain routing are extensions after the primary slice works.
