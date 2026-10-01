# Security

TITech Mental Health Platform treats mental-health information as highly sensitive.

## Required controls

- HttpOnly secure refresh cookies in production
- Short-lived access tokens held in memory in the web application
- Password hashing with bcrypt
- Refresh-session rotation and revocation
- Permission-based authorization
- Tenant-scoped repository access
- Request validation and safe error handling
- Audit logging for sensitive access
- Rate limiting
- Secure headers/CORS configuration
- Private file storage with signed URLs
- Secret scanning and dependency scanning in CI

## Sensitive logging prohibition

Do not log passwords, access/refresh tokens, session secrets, clinical notes, assessment responses, or unnecessary personal data.

## Security review gate

Before production approval, run SAST, dependency scanning, secret scanning, API authorization/IDOR tests, tenant-isolation tests, container scanning and an independent penetration test.
