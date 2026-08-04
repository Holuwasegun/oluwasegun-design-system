---
trigger: always_on
---

# uploads-and-storage.md

Rules for asset intake, Cloudflare R2 object storage, and batch behavior for **Oluwasegun Design System**. Storage is Cloudflare R2, reached through storage helpers (`src/lib/storage.ts`).

## Intake

1. Accepted intake formats for Layout Lab graphics are JPEG, PNG, WEBP, and SVG. Reject unsupported formats server-side. Validation checks real file content (magic bytes/headers), never just client-declared MIME types.
2. File sizes must adhere to defined limits (e.g., max 10MB per graphic asset). Enforce file size checks before uploading or processing.

## Where bytes live

3. All binary data lives in Cloudflare R2: Layout Lab graphic uploads, rendered marketing PNG banners, and exported PDF/JSON asset bundles.
4. PostgreSQL stores only `storageKey` references and metadata. Storing binary blobs in database columns is strictly forbidden (AGENTS.md section 3).
5. Object keys strictly encode ownership:
   - `users/<userId>/projects/<projectId>/layouts/<layoutId>/original.<ext>`
   - `users/<userId>/projects/<projectId>/layouts/<layoutId>/export.png`
   - `users/<userId>/projects/<projectId>/exports/<exportId>.json`
   Every storage read/write verifies that the requesting user owns the key's `userId` segment.
6. Client access to R2 objects is served via short-lived signed URLs. R2 buckets remain strictly private.
7. Original uploaded brand images are immutable. Derived assets (cropped graphics, rendered layout banners) receive distinct storage keys.

## Batch & Sync behavior

8. Layout Lab batch asset processing is idempotent. Retries on dropped connections must not create duplicate storage keys or orphan objects.
9. When creating a Layout Lab entry, the database row (`Layout`) and the R2 object are written as a transaction pair. If the object write fails, the database row creation aborts; if the database transaction fails, the R2 object is cleaned up immediately.

## Retention and deletion

10. Deletion parity is absolute: deleting a `Project` or `Layout` deletes its R2 objects (`layouts/<layoutId>/...`, `exports/<exportId>...`) along with its database rows. Deleting a user account removes all associated R2 objects and database rows. Leaving orphaned storage objects is unacceptable.
11. Temporary processing files generated during layout rendering are cleaned up immediately upon task completion or failure.