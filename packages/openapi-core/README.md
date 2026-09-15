# @selfsignal/openapi-core

OpenAPI source of truth for Selfsignal.

## Domains

| Domain | Spec |
|--------|------|
| identity | `src/identity.yaml` |
| vault-profiles | `src/vault-profiles.yaml` |
| purposes | `src/purposes.yaml` |
| consent-grants | `src/consent-grants.yaml` |
| signal-activations | `src/signal-activations.yaml` |
| campaigns | `src/campaigns.yaml` |
| rights-requests | `src/rights-requests.yaml` |
| integrations | `src/integrations.yaml` |
| complaint-cases | `src/complaint-cases.yaml` |
| coverage-reports | `src/coverage-reports.yaml` |
| audit-exports | `src/audit-exports.yaml` |

Shared fragments live in `src/common/`.

```bash
pnpm lint:domains
pnpm bundle:domains
```
