feat: modernize legacy setup and disaster-monitoring UI flow

Summary

- Replace default CRA README with 2026-compatible setup guidance for this legacy project.
- Add a dedicated troubleshooting guide for common install/startup blockers in modern environments.
- Pin key dependencies to stable legacy-compatible versions to reduce drift-related breakage.
- Rework map/search UX into a seeded flood and natural-disaster monitoring experience.
- Add richer incident popups with risk stats, action links, and tuned positioning for dense markers.

Problem:
The project was hard to run in 2026 (tooling drift, webpack preflight conflicts, dependency incompatibilities), and the UI still reflected the original generic demo content instead of the disaster-monitoring use case.

Solution:
Document the safe legacy runtime path, pin core dependencies, and redesign map/sidebar content around seeded disaster news with actionable popup metadata and targeted popup placement.

Details (Detailed Breakdown)

Big Picture Solution:

- This enables contributors to boot and work on the repo again using nvm + npm on modern machines without global system changes.
- The approach favors minimal, low-risk stabilization over a full CRA migration to keep scope controlled and preserve existing app behavior.
- Trade-off accepted: legacy warnings remain (deprecated packages, audit noise) while startup and UX usability are prioritized.
- It aligns the product narrative with the app name and domain by switching from generic location cards to disaster monitoring content.

Key Context & Pivotal Moments:

- Initial startup failed with missing scripts and preflight webpack conflicts caused by a parent-level `node_modules` install.
- After install succeeded, compilation still broke because dependency ranges drifted to versions incompatible with `react-scripts@4` expectations.
- A key pivot was pinning `react-leaflet`, `@react-leaflet/core`, and `typescript` to stabilize the legacy stack rather than forcing a large framework upgrade.
- UI direction then shifted from a simple text swap to a fuller seeded disaster-news experience across sidebar and popups.
- Another pivot came from popup UX feedback: reduce overlap and force Metro Cebu popup to the right with a stronger explicit offset.

Specific Changes and Rationale:

1. **README and troubleshooting docs**:

   - How: Replaced default CRA README content and added `docs/troubleshooting.md`.
   - Why: Provide explicit runbook for Node 16, legacy peer installs, preflight handling, and common Windows issues.
   - Details: Added safer long-term path guidance that avoids mutating global/shared Node module folders.

2. **Dependency stabilization for legacy CRA**:

   - How: Updated `package.json` and regenerated lockfile; removed `yarn.lock` and kept npm lock as source of truth.
   - Why: Prevent version drift that was causing compilation/runtime issues in 2026.
   - Details: Pinned `react-leaflet`, `@react-leaflet/core`, and `typescript` to versions compatible with this code path.

3. **Search sidebar redesign into incident feed**:

   - How: Replaced image-based place list with seeded flood/disaster news cards.
   - Why: Match requested product behavior and provide a more realistic operator dashboard context.
   - Details: Added seeded title/location/alert/summary/update metadata and supportive feed styling.

4. **Map popup enhancement and location-specific behavior**:

   - How: Added seeded disaster headline + rain/flood percentages + action links per popup.
   - Why: Increase operational context from passive labels to actionable incident cards.
   - Details: Added highlighted `You are here` presentation and explicit Metro Cebu popup offset to the right (`[200, -6]`).

5. **Minor contextual UI polish**:
   - How: Updated header/location labeling and document title text.
   - Why: Keep surrounding app chrome consistent with Philippines-focused disaster monitoring context.

Testing Notes (Not Executed):

- Full clean verification build was not executed to completion in this session due known CRA preflight constraints in this environment.
- Runtime behavior was iteratively validated through user-reported `npm start` feedback and compile/runtime error traces during debugging.

Future Plans:

- Consider a focused migration plan to remove `SKIP_PREFLIGHT_CHECK` dependency entirely (e.g., CRA5/Vite path).
- Replace seeded incident data with a service-backed feed when API requirements are finalized.

Breaking Changes:

- Sidebar behavior changed from place-selection cards to a read-only seeded incident feed.
- Popup content model changed from simple text to structured incident metadata and actions.
