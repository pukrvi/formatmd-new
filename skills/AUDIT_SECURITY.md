# FormatMD — Security Audit

> Audited: 2026-03-09

---

## Issues

### SEC-001: Supabase credentials in version control — CRITICAL
- **File:** `.env`
- Supabase project ID, URL, and publishable key committed to repo.
- **Note:** `VITE_` prefixed keys are intentionally client-side (anon key), which is expected for Supabase. However:
  - If this repo is public, the anon key is visible to anyone.
  - RLS policies must be the security boundary, not key secrecy.
- **Fix:** Add `.env` to `.gitignore` (already there, check git history). Create `.env.example` with placeholder values. Rotate key if repo was ever public.

### SEC-002: No XSS sanitization on rendered HTML — MEDIUM
- **File:** `src/components/TerminalPreview.tsx:472`
- `dangerouslySetInnerHTML={{ __html: getStyledHTML() }}` renders generated HTML.
- `getStyledHTML()` processes user markdown but doesn't sanitize output.
- Potential vector: if markdown contains raw HTML like `<img onerror="...">`.
- **Fix:** Use DOMPurify to sanitize output of `getStyledHTML()` before rendering.

### SEC-003: No Content-Security-Policy headers — LOW
- No server-side security headers configured.
- Missing: CSP, X-Frame-Options, X-Content-Type-Options, HSTS.
- **Fix:** Add security headers via deployment platform config (Vercel/Netlify headers file).

### SEC-004: Feedback submission open to abuse — LOW
- **File:** `supabase/migrations/20260309064000_*.sql`
- Anyone can INSERT into `feedback` table without auth.
- No rate limiting on submissions.
- Storage bucket allows public writes.
- **Fix:** Add rate limiting via Supabase Edge Function or RLS with IP-based throttle. Consider requiring email for feedback.

### SEC-005: No environment variable validation — LOW
- **File:** `src/integrations/supabase/client.ts:5-6`
- If env vars are missing, Supabase client is created with undefined values. Fails silently.
- **Fix:** Add build-time validation with Zod schema for env vars. Throw on missing values.

---

## RLS Policy Review

| Table    | INSERT    | SELECT         | UPDATE | DELETE |
| -------- | --------- | -------------- | ------ | ------ |
| feedback | Public    | Blocked (false)| None   | None   |

**Status:** Good for current use case. INSERT is open (intentional), SELECT is blocked. No admin dashboard yet to read feedback.

**Recommendation:** When adding auth, create admin role with SELECT access to feedback table.
