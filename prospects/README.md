# Prospect photos

Convention (design.md Phase 3 note): one folder per prospect, keyed by the
`id` slug from `data/blind_leads_list.json` (same as the `/prospect/<id>`
route).

To add a photo:

1. `mkdir -p public/prospects/<id>`
2. Save the image there, any filename/extension (jpg/png/webp all work).
3. Add one line to `src/data/photoManifest.ts`:
   `"<id>": "<filename>.<ext>"`

That's it — no rebuild-time scanning, no guessing. The app only shows a
photo for an id that's both present in this folder *and* listed in the
manifest.
