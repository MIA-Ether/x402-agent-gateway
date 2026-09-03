# AGENTS.md

## Project

x402 AgentOS / AgentTender  
ETHOnline 2026

## Core Principle

The project must be developed as a vertical-slice system.

Primary flow:

Agent → x402 Gateway → HTTP 402 → Graph Decision → Policy Check → Wallet Payment → Hedera Settlement → Facilitator Proof → Gateway Validation → API Result

Do not implement disconnected features without connecting them to the main flow.

## Engineering Rules

1. TypeScript must run in strict mode.
2. Do not use `any` to bypass type errors.
3. Do not commit private keys, API keys, RPC credentials, or `.env` files.
4. Real blockchain integrations and mocks must be clearly separated.
5. Never fabricate a real transaction hash.
6. Never claim a mock result is an on-chain result.
7. All monetary values must use USDC 6-decimal integer representation internally.
8. Gateway code must never directly manage user private keys.
9. Payment verification must be delegated to the Facilitator abstraction.
10. The Graph is a decision dependency, not merely a dashboard data source.
11. Policy Engine is a hard spending-control boundary.
12. Changes to public contracts require updating `CONTRACTS.md`.
13. Architectural changes require updating `DECISIONS.md`.
14. Every feature should have tests or a documented reason why testing is deferred.

## Development Flow

Issue → Spec → Branch → Implementation → Test → Pull Request → Review → Merge

## Branches

MIA:
`feat/mia-orchestration`

Ali:
`feat/ali-x402-gateway`

Pragati:
`feat/pragati-agent-tender`

Elorze:
`feat/elorze-wallet-payment`

## Commit Convention

Use:

`feat:` new functionality  
`fix:` bug fix  
`refactor:` structural change  
`test:` tests  
`docs:` documentation  
`chore:` tooling/configuration

Examples:

`feat: add HTTP 402 challenge middleware`

`feat: add Hedera USDC payment adapter`

`feat: add AgentTender workflow timeline`