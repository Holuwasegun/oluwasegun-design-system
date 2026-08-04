---
name: r2-storage-handler
description: Use this skill whenever files move or die. Triggers include upload, storing a Layout Lab image or PNG/PDF export, signed URL generation, storage key, Cloudflare R2, deleting a project, or deleting an account. The deletion procedure at the end ensures no orphaned objects remain in R2.
---

# R2 Storage Handler

All binary bytes (uploaded brand graphics, generated Layout Lab PNG banners, exported tokens) live in Cloudflare R2, reached through storage services (`src/lib/storage`). PostgreSQL holds keys (`storageKey`) and metadata, never binary bytes. Laws live in `uploads-and-storage.md`.

## Steps

1. Build keys with ownership encoded, from validated IDs only, never raw client input (uploads-and-storage.md rule 5):

       users/<userId>/projects/<projectId>/layouts/<layoutId>/original.<ext>
       users/<userId>/projects/<projectId>/layouts/<layoutId>/export.png
       users/<userId>/projects/<projectId>/exports/<exportId>.json

2. Verify on every read and write that the requesting user matches the key's `userId` segment.
3. Validate uploads server-side: magic bytes match JPEG, PNG, WEBP, or SVG; size is within limits.
4. Write the object and the `Layout` database row as a pair. Object write fails: no row. Row write fails: delete the object.
5. Make upload retries idempotent per file so network drops do not duplicate keys or storage usage.
6. Hand files to users through short-lived signed URLs scoped to the owner. Buckets stay private (uploads-and-storage.md rule 6).
7. Treat originals as immutable. Every derived asset (e.g. rendered marketing banner) receives its own key.

## The deletion procedure

Deletion parity means rows AND objects together, always (uploads-and-storage.md rule 10).

Delete a Project:
1. List every storage key belonging to the project: uploaded graphics, generated layouts, exported bundles.
2. Delete the database rows in one transaction; cascade takes associated layout entries and exports.
3. Delete the listed storage objects in R2. Log and retry any object deletion that fails.

Delete an Account:
Same procedure across all projects owned by the user, followed by deleting the user row. Verify afterward: key listing under `users/<userId>/` returns empty.

## Traps

- Rows deleted, objects orphaned in R2 bucket.
- Exposing permanent public URLs for user design assets.
- Overwriting an original uploaded brand graphic during layout rendering.
- Skipping cleanup of temporary render files on failure.

## Verify before done

- [ ] Magic-byte validation, size limit checks enforced.
- [ ] DB Row and R2 object written as an atomic pair.
- [ ] Upload retries idempotent per file.
- [ ] No public bucket URLs; short-lived signed URLs used instead.
- [ ] Post-delete key listing for project/user is empty.