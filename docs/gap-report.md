# Gap Report

## P0 Critical

| Issue | Impact | Root cause | Status | Next action |
|---|---|---|---|---|
| No production evidence | Cannot responsibly claim production approval | Build environment has no live target services | BLOCKED | Deploy controlled staging and execute gates |

## P1 High

| Issue | Impact | Status | Next action |
|---|---|---|---|
| No independently executed penetration test | Security assurance incomplete | OPEN | Run third-party security assessment |
| Assessment instrument rights/clinical review pending | Cannot deploy arbitrary instruments safely | OPEN | Obtain rights and qualified clinical review |
| Backup restore not executed | Recoverability unproven | OPEN | Execute controlled restore drill |
| External provider adapters not configured | Notifications/telehealth cannot be verified | OPEN | Configure verified providers and test failure/retry paths |
| Root package lockfile unavailable in offline build environment | Clean CI reproducibility not yet locally verified | OPEN | Generate and commit package-lock.json in networked environment |

## P2 Medium

- Expand OpenAPI coverage to every endpoint.
- Add full integration suites against ephemeral MongoDB/Redis.
- Add accessibility automation and manual review evidence.
- Add load/chaos testing and performance baselines.

## P3 Low

- Expand charting/advanced analytics.
- Expand localization language packs.
- Add mobile client implementation after shared contracts stabilize.
