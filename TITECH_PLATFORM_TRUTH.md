# TITech Mental Health Platform Truth

**As of 2026-10-01**

## Repository baseline

The public GitHub repository was empty when inspected. Therefore there was no pre-existing frontend, backend, database schema, CI/CD implementation or application code to preserve. This build establishes one canonical architecture rather than a parallel replacement.

## Evidence boundary

### Implemented in source

- Node.js/Express ESM application bootstrap
- MongoDB/Mongoose persistence boundary
- Redis adapter for rate limits/locks/cache hooks
- JWT access tokens + hashed rotating refresh sessions
- RBAC/permissions and tenant-aware repositories
- Organizations/providers/clients
- Consent
- Assessment templates, sessions and scoring
- Appointments
- Care plans and clinical records
- Referrals and safety events
- Notifications/outbox primitives
- Resources and aggregate reporting
- Audit logging
- Secure-file adapter boundary
- API versioning, validation, error handling and correlation IDs
- React/Vite web application shell and role-aware dashboards
- Docker/Compose and GitHub Actions workflow definitions
- Clinical/privacy/security/operations documentation

### Requires external evidence before production approval

- Live MongoDB/Redis deployment verification
- Real email/SMS/telehealth/provider certifications
- Penetration test and independent security review
- Backup restoration execution in the target environment
- Load/chaos testing against production-like capacity
- Cloud/Kubernetes rollout validation where used
- Clinical governance review and assessment licensing/rights review
- Privacy/legal/regulatory assessment for each deployment jurisdiction
- Operational support, incident drills and staff training

## Status convention

`NOT STARTED → DESIGNED → IMPLEMENTED → UNIT VERIFIED → INTEGRATION VERIFIED → E2E VERIFIED → SECURITY VERIFIED → OPERATIONAL → PILOT READY → PILOT → PRODUCTION APPROVED`

A component is never considered Production Approved from source presence alone.
