// Hand-maintained map of prospect id -> photo filename, per design.md's
// Phase 3 note: dropping a file into public/prospects/<id>/ is a manual,
// occasional action, never something the importer automates or guesses.
// This manifest is that manual step's second half — add one line here after
// saving the file so the app knows to look for it.
//
// To add a photo for a prospect:
//   1. mkdir -p public/prospects/<id>
//   2. Save the image as public/prospects/<id>/<any-filename>.<ext>
//      (jpg/png/webp all fine — keep the original extension)
//   3. Add a line below: "<id>": "<any-filename>.<ext>"
//
// <id> must match the `id` field for that prospect in
// data/blind_leads_list.json exactly (it's also the /prospect/<id> route).
export const PHOTO_MANIFEST: Record<string, string> = {
  "amar-latif-obe": "photo.jpg",
};
