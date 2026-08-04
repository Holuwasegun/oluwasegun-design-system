---
name: db-migration-runner
description: Use this skill whenever schema.prisma changes in any way. Triggers include migration, schema, new model, new field, new enum, new index, new relation, or any task that mentions database persistence.
---

# DB Migration Runner

How to change the database safely for **Oluwasegun Design System**. The laws live in `database-schema.md`.

## Steps

1. Write one sentence: what the schema change is and which requirement (Rn) needs it.
2. Classify the change. Additive (new model, new optional field, new enum value, new index): proceed. Rename, repurpose, type change, or delete: stop, flag for human sign-off recorded as a comment in the migration (database-schema.md rule 6), and wait.
3. Confirm nothing locked is modified without justification: core models `User`, `Project`, `Layout`, `ExportHistory`.
4. Edit `prisma/schema.prisma` using the house patterns below.
5. Run: `npx prisma migrate dev --name <short_snake_case_name>`
6. Inspect the generated SQL. Search for `DROP` and `ALTER COLUMN`. Finding either on an additive task indicates unintended destructive edits. Do not apply.
7. Run `npx prisma generate` and verify `npx tsc --noEmit` passes cleanly.
8. Update database access helpers in `src/lib/prisma.ts`.
9. Commit schema and migration together.

## Skeletons

New relation with cascade deletion:

    project   Project   @relation(fields: [projectId], references: [id], onDelete: Cascade)
    @@index([projectId])

New status-like field: an enum, never an unstructured free-text string.

## Traps

- A new relation that breaks the cascade deletion chain (`User` -> `Project` -> `Layout`/`ExportHistory`).
- Storing binary blobs in database columns (database-schema.md rule 5).
- Editing an old migration instead of generating a new one.

## Verify before done

- [ ] Change is additive or carries human sign-off.
- [ ] Generated SQL contains no unapproved destructive statements.
- [ ] Deletion cascade covers new row types.
- [ ] TypeScript compilation passes cleanly (`npx tsc --noEmit`).