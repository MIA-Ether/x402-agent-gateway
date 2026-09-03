# Contracts

## Resource

GET /api/v1/resource

## Initial request

HTTP 402 Payment Required

WWW-Authenticate: L402 endpoint="<facilitator-url>", invoice="<invoice>"

## Paid request

Authorization: L402 <proof_token>

## Event stream

GET /api/v1/events/:jobId

Transport: Server-Sent Events
