// Canonical dates for The Wrong Jesus launch and ARC manuscript access.
// Enforcement of ARC_MANUSCRIPT_UNLOCK/CLOSE happens in
// arc/dashboard/page.tsx's getManuscriptStatus() (server-side SSR) — not in
// the Watson Python backend, which has no manuscript-serving route.
export const TWJ_LAUNCH_DATE = '2026-09-15T00:00:00-04:00'
export const ARC_MANUSCRIPT_UNLOCK = '2026-07-15T08:00:00-04:00'
// Intentionally 2 hours before TWJ_LAUNCH_DATE (2026-09-15T00:00:00-04:00),
// not equal to it — manuscript access closes the night before launch.
export const ARC_MANUSCRIPT_CLOSE = '2026-09-14T22:00:00-04:00'
