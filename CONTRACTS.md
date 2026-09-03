# CONTRACTS.md

# API Contracts

## Protected Resource

`GET /api/v1/resource`

### First Request

```http
GET /api/v1/resource
```

### Response

```http
HTTP/1.1 402 Payment Required
WWW-Authenticate: L402 endpoint="<facilitator-url>", invoice="<invoice>"
Content-Type: application/json
```

```json
{
  "error": "payment_required",
  "serviceId": "demo-market-data",
  "amount": "300000",
  "currency": "USDC",
  "network": "hedera-testnet"
}
```

## Paid Request

```http
GET /api/v1/resource
Authorization: L402 <proof_token>
```

### Successful Response

```json
{
  "serviceId": "demo-market-data",
  "data": {},
  "payment": {
    "verified": true
  }
}
```

## Agent Decision Contract

```json
{
  "serviceId": "demo-market-data",
  "price": "300000",
  "reputationScore": 97,
  "successRate": 0.99,
  "decision": "APPROVE",
  "reason": "Service meets policy and reputation requirements"
}
```

## Payment State

```text
PAYMENT_REQUIRED
PAYMENT_SUBMITTED
PAYMENT_CONFIRMED
PROOF_PENDING
PROOF_ISSUED
RESOURCE_UNLOCKED
```

Important:

`PAYMENT_CONFIRMED` is not the same as `PROOF_ISSUED`.

## Agent Workflow Events

```json
{
  "jobId": "job-001",
  "status": "DISCOVERING",
  "timestamp": "2026-09-03T00:00:00.000Z",
  "message": "Querying service reputation"
}
```

## Frontend Event Transport

MVP:

Server-Sent Events

Endpoint:

`GET /api/v1/events/:jobId`

The frontend must consume the same event model as the CLI demo.

## Currency

All internal USDC calculations use integer base units:

`1 USDC = 1,000,000 units`

Never perform financial calculations using floating point values.