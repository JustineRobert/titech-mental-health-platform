# Architecture

The platform uses a modular monolith until scale or ownership boundaries justify separate services.

```text
React/Vite Web
      ↓
Express API /api/v1
      ↓
Auth → Tenant → Authorization → Validation → Controller
      ↓
Domain Service / Policy
      ↓
Repository / Mongoose
      ↓
MongoDB

Async side effects → Outbox/Notification boundary → Provider adapter
Transient workloads → Redis
Audit → Append-only hash chained records
```

Every sensitive route establishes authentication, tenant context and permission checks before business logic.
