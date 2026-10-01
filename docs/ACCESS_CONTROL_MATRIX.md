# Access Control Matrix

| Role | Client | Assessment | Clinical record | Safety | Reporting | Administration |
|---|---|---|---|---|---|---|
| TENANT_ADMIN | Manage | Manage | Manage | Escalate | Read | Manage |
| ORGANIZATION_ADMIN | Manage | Manage | Manage | Escalate | Read | Limited |
| CLINICIAN | Read/update | Create/complete | Read/create/update | Create/escalate | — | — |
| COUNSELOR | Read | Create/complete | Read/create/update | Create/escalate | — | — |
| CLIENT | Self | Self | — | — | — | — |

Server-side permissions, not navigation visibility, are authoritative.
