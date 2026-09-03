# ARCHITECTURE.md

# x402 AgentOS Architecture

## 1. Product

x402 AgentOS is a permissioned economic runtime that allows AI Agents to discover paid services, evaluate them, enforce spending policy, make USDC payments, obtain payment proof, and consume protected APIs.

## 2. Core Flow

```text
Agent
  ↓
Discover Service
  ↓
x402 Gateway
  ↓
HTTP 402
  ↓
The Graph
  ↓
Policy Engine
  ↓
Circle / Smart Wallet
  ↓
Hedera USDC Payment
  ↓
Facilitator
  ↓
Payment Proof
  ↓
Agent retries request
  ↓
Gateway validates proof
  ↓
Protected API
  ↓
Result
```

## 3. System Layers

### Access Layer

Responsible for:

- HTTP 402
- payment challenge
- protected resources
- proof validation
- request forwarding

Owner: Ali

Package:

`packages/x402`

Application:

`apps/agent-gateway`

### Agent Runtime Layer

Responsible for:

- service discovery
- service selection
- policy evaluation
- payment decision
- request retry
- execution workflow

Owner: MIA

Packages:

`packages/core`

`packages/agents`

`packages/policy-engine`

`packages/graph`

### Economic Layer

Responsible for:

- Agent wallets
- USDC transfers
- smart accounts
- Arc
- Hedera

Owner: Elorze

Packages:

`packages/wallet`

`packages/hedera`

`packages/arc`

### Facilitator Layer

Responsible for:

- payment observation
- payment verification
- proof issuance
- proof validation support

Owner: Ali

Package:

`packages/facilitator`

### Data Layer

PostgreSQL:

Configuration and durable state.

Redis:

Runtime locks, rate limits, sessions, short-lived payment state.

Owner: Ali

Package:

`packages/storage`

### Presentation Layer

AgentTender provides:

- execution timeline
- agent decisions
- payment state
- proof acquisition
- API result
- Graph reputation data

Owner: Pragati

Application:

`apps/agent-tender`

## 4. Source of Truth

Blockchain:

Financial settlement and transaction truth.

Facilitator:

Payment proof truth.

The Graph:

Indexed reputation and historical service metrics.

PostgreSQL:

Configuration and application state.

Redis:

Ephemeral runtime state.

## 5. Security Boundary

The Gateway MUST NOT hold user Agent private keys.

The Policy Engine MUST enforce:

- max per request
- daily budget
- service allowlist
- agent revocation

A hard spending cap must exist independently of configurable policy.

## 6. MVP Boundary

The primary demo path is:

One Agent  
+ One paid API  
+ One payment  
+ Hedera USDC  
+ Facilitator proof  
+ Real API response

Everything else is secondary.

## 7. Stretch Goals

- Arc secondary payment route
- multi-agent service selection
- advanced reputation
- multi-chain routing