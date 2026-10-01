# TITech Mental Health Platform

Privacy-first, multi-tenant mental health management software for organizations, providers, counselors and clients.

**Repository:** `titech-mental-health-platform`  
**Organization:** TITech Africa  
**Architecture:** Node.js/Express ESM modular monolith + MongoDB/Mongoose + Redis + React/Vite

## Current implementation status

This repository is a clean canonical implementation because the upstream GitHub repository was empty at the time of build. The codebase implements the production-oriented engineering foundation and the core mental-health lifecycle, plus security/privacy controls, auditability, documentation, CI/CD, Docker, and the phased implementation tracker.

It is **not marked Production Approved**. External evidence remains required for live infrastructure, penetration testing, backup restoration, clinical governance, privacy/legal review, operational readiness and any regulated deployment.

See `TITECH_PLATFORM_TRUTH.md` for the authoritative implementation/evidence boundary and `docs/roadmap/implementation-roadmap.md` for phase gates.

## Product scope

- Identity, authentication and session management
- RBAC and permission checks
- Strict tenant isolation
- Organizations, providers and clients
- Versioned consent management
- Configurable assessment templates and scoring
- Provider scheduling and double-booking protection
- Care plans, goals, interventions and follow-up
- Highly restricted clinical/counseling records
- Referrals and safety workflows
- Notifications/outbox architecture
- Curated resource library
- Aggregate reporting
- Immutable-style append-only audit trail
- Secure file metadata and signed-URL adapter boundary
- External integration adapters
- Governed, assistive AI feature flag boundary
- Accessibility/localization/mobile readiness
- Health/readiness endpoints, structured logging, metrics hooks
- Backup/restore and incident-response procedures
- CI/CD and containerization

## Local development

1. Copy `.env.example` to `.env`.
2. Start MongoDB and Redis with `docker compose up -d mongodb redis`.
3. Install workspace dependencies with `npm install`.
4. Seed safe synthetic data: `npm run seed --workspace backend`.
5. Start backend: `npm run dev --workspace backend`.
6. Start frontend: `npm run dev --workspace frontend`.

The API listens on `http://localhost:5000` and Vite on `http://localhost:3000` by default.

## Verification

Backend unit tests use Node's built-in test runner for deterministic domain logic, with integration/E2E suites designed to run against a controlled MongoDB/Redis environment. Generate and commit the npm lockfile in a networked development/CI environment before enforcing `npm ci` reproducibility.

Production approval requires the evidence gates in `docs/roadmap/phase-status.json`, not only successful local tests.

## Security and privacy

Read `SECURITY.md`, `PRIVACY.md`, `docs/security/threat-model.md`, `docs/security/incident-response.md`, and `docs/clinical/clinical-governance.md` before deployment.
