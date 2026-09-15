# Selfsignal

Consumer-controlled identity and purpose-bound consent rail for GDPR-safe behavioural advertising.

OpenAPI-first DDD monorepo based on the zero-apps codegen scaffold. Package scope: **`@selfsignal/*`**.

## Specs

- [PRODUCT.md](./PRODUCT.md) — product requirements
- [USER_STORIES.md](./USER_STORIES.md) — role stories
- [WEBAPP.md](./WEBAPP.md) — UI IA and screens

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
platform/webapp  →  Next.js console (codegen services + features)
```

## Quick start

```bash
# .codegen is gitignored — bootstrap once from the scaffold:
# rsync -a --delete /path/to/zero-apps-codegen-scaffold/.codegen/ ./.codegen/
# then re-apply @selfsignal package_scope in .codegen/*.json if needed

pnpm install
pnpm codegen:paths
pnpm lint:openapi && pnpm bundle:openapi
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: selfsignal_demo_local_dev_key

pnpm dev:web   # Next.js console (after webapp package is present)
```

Optional Dynamo Local:

```bash
docker compose up -d
TABLE_NAME=selfsignal-core-local AWS_ENDPOINT_URL=http://localhost:8000 node scripts/ensure-dynamo-table.mjs
```

## Codegen rules

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. **Never commit or push `.codegen/`** — local tool only (see `.cursor/rules/no-codegen-commit.mdc`).
4. Keep envelopes (`{ data, meta }`), nested DI, and identity middleware intact.

See `.cursor/skills/` and `docs/CODEGEN.md`.
