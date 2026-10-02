# Motion Orthopedic – website

Bilingual (English / اردو) landing page for Motion Orthopedic, Wah Cantt.
React + Vite, no backend. Appointment requests are handed off to WhatsApp.

## Run

```bash
npm install
npm run dev            # private preview at http://localhost:5173 (shows pending photos with "Preview only" notes)
npm run build          # PUBLIC build in dist/ – unapproved photos are left out entirely
npm run build:preview  # private preview build in dist/ (noindex)
npm run preview        # serve the last build locally
```

Upload the contents of `dist/` to any static host. Nothing is deployed automatically.

## Where things live

| What | File |
| --- | --- |
| Confirmed business facts (phone, links) | `src/config/business.js` |
| Launch switches (doctor photo, patient photos, "UK certified", review count) | `src/config/publication.js` |
| Photo manifest (source file, alt text, crop focus, gallery order) | `src/config/assets.js` |
| Services and groups | `src/content/services.js` |
| Transcribed reviews | `src/content/reviews.js` |
| English / Urdu text | `src/i18n/en.js`, `src/i18n/ur.js` |

Photos come from `images/`; review screenshots from `Reviews/` (or `images/reviews/`).
`scripts/prepare-images.mjs` runs before every dev/build, creates the web sizes in
`public/media/` and only copies images allowed for that build.

## Before launch

Turn on a switch in `src/config/publication.js` only after the matching item is confirmed:
`doctorPortraitApproved`, `patientImagesApproved`, `ukCertifiedApproved`,
`reviewCount.sourceConfirmed`. Add `reviewDestinationUrl` in `business.js` only for a real review page.

## Privacy

The form is never stored, logged or sent by the site; only the language choice is kept in
`localStorage` (`mo-lang`). No analytics are included.
