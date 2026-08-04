---
trigger: glob
---

# database-schema.md

Rules for the Prisma schema and all migrations. The schema defined in `prisma/schema.prisma` governs the backend persistence for the **Oluwasegun Design System**.

## LAWS

1. The core schema is locked (`User`, `Project`, `Layout`, `ExportHistory`). Never rename, repurpose, or change the meaning of an existing model, enum, or field. Additive changes only.
2. Design System configurations inside `Project` store raw design token specifications (key colors, typography scales, spacing multipliers, motion, borders) as structured JSON metadata or dedicated fields.
3. Layout Lab data inside `Layout` keeps `headline`, `subtitle`, `body`, `templateId`, and Cloudflare R2 object keys (`imageStorageKey`, `exportStorageKey`).
4. Deletion cascades are sacred. Deleting a user removes all their projects, layouts, and export histories. Deleting a project removes its associated layout laboratory graphics and export history entries.
5. Binary data never enters PostgreSQL. No image bytes, no PDF bytes, no base64 blobs in any column. Only storage keys and metadata (AGENTS.md section 3).
6. Migrations are forward-only and non-destructive by default. A migration that drops a table or column, or changes a column type with data loss, requires an explicit human sign-off recorded in the migration file as a comment. Never run a destructive migration without explicit sign-off.
7. Every query path that accesses project or layout data must be scoped by the owning user's ID. No unscoped reads of another user's projects or exported assets.

## GUIDANCE

- Add indexes for foreign keys (e.g. `@@index([userId])`, `@@index([projectId])`) and fields used in hot filters.
- Prefer enums over free-text status strings (e.g. `ExportFormat` enum for JSON/CSS).
- Name new fields cleanly following camelCase standard in Prisma.