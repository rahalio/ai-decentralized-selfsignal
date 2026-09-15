---
name: no-codegen-commit
description: >-
  Reminds agents that .codegen must never be committed or pushed. Use when
  staging files, creating commits, documenting setup, or copying the scaffold.
---

# Never commit `.codegen`

`.codegen/` holds the local `zero-codegen` tool and merged configs. It is **gitignored** and must stay out of GitHub.

- Do not stage, commit, or push `.codegen/`.
- After cloning, obtain `.codegen` by copying from `zero-apps-codegen-scaffold`, set `package_scope` to `@selfsignal`, run `pnpm codegen:paths`.
- Bundled OpenAPI under `packages/openapi-core/src/.bundled/` is also generated and gitignored — do not commit it.
