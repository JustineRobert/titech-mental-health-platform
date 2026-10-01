# Module Boundaries

Auth owns identity/session state. Tenancy owns tenant context. Organizations owns organizational membership. Providers and clients own their respective profiles. Assessments own template/version/session/scoring. Appointments own scheduling. Care plans and clinical records own care documentation. Referrals and safety own coordination and risk workflow. Notifications own delivery state. Audit is append-only and cross-cutting. Reporting consumes aggregate-safe projections/queries.
