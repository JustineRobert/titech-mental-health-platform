# Feature Matrix

| Capability | Source implementation | Local static/unit evidence | External evidence |
|---|---|---|---|
| Auth/sessions | Implemented | Partial | Required |
| RBAC/tenant isolation | Implemented | Unit checks | Required |
| Organizations/providers/clients | Implemented | Partial | Required |
| Consent | Implemented | Partial | Required |
| Assessments | Implemented | Unit scoring | Clinical/licensing review |
| Appointments | Implemented | Static | Concurrency test required |
| Care plans/clinical records | Implemented | Static | Clinical/privacy review required |
| Referrals/safety | Implemented | Static | Clinical workflow review required |
| Communications | Outbox boundary | Static | Provider certification/config required |
| Reporting | Aggregate summary | Static | Privacy/export review required |
| Files | Metadata boundary | Static | Object-store/malware scan evidence required |
| AI | Policy boundary only | Static | Security/privacy/clinical review required |
| CI/CD | Workflow definitions | YAML parsed | Networked CI execution required |
| DR | Documentation | Static | Restore execution required |
