# Adding a New Content Pack to Star Command

Starting now, when Claude finishes a new domain pack (like `cysa-vuln.js`), it will
give you **only that one pack file** -- not a full re-upload of `index.html`. This
doc is the one-time reference for the one small edit you make yourself each time.

---

## The one edit you need to make

1. Open your repo on GitHub.
2. Click into `index.html`.
3. Click the **pencil icon** (Edit this file) -- this opens GitHub's plain-text
   code editor.
4. Find the **last** line that looks like this:

   ```html
   <script src="packs/cysa-ops.js?v=20260709e"></script>
   ```

5. Add the new pack's line directly **after** it, in the same format:

   ```html
   <script src="packs/cysa-vuln.js?v=20260710a"></script>
   ```

   Claude will always tell you the exact filename and version string to use --
   just type or paste that one line in.

6. Scroll down, add a short commit message, and click **Commit changes**.
7. Wait about 30-60 seconds for GitHub Pages to redeploy, then refresh your game.
   The new domain should now show as playable instead of "not installed."

That's it -- one line, in the right spot, each time.

---

## Two things that matter

**Always edit directly in GitHub's built-in editor, and type/paste the line as
plain text.** Don't copy the line from a source that might convert it into
"rich text" first (some notes apps, some chat clients, some browser extensions
do this). GitHub's own code editor is plain-text and safe. This matters because
`<` and `>` characters can get silently converted into `&lt;` and `&gt;` by some
rich-text paste paths, which breaks the line. If that ever happens, the page
will go blank or a specific pack will fail to load -- paste the raw text again
from GitHub's editor and it will resolve.

**The `?v=...` version string must be different each time.** It doesn't matter
what the value is (a date, a letter, a random string) -- it only matters that
it's *different from the last time that same file was referenced*. This is
what forces GitHub's CDN and your browser to fetch the newly updated file
instead of quietly serving an old cached copy. Claude will always give you a
fresh version string with each new or updated pack.

---

## Where core-battles.js fits in

`packs/core-battles.js` must always be the **first** pack script tag in
`index.html` -- it sets up shared data (the Zurg finale and all Cert Trials)
that every domain pack depends on. You won't normally need to touch its line;
it only changes if Claude specifically updates `core-battles.js` itself (for
example, adding a new certification's Cert Trial), in which case Claude will
tell you to bump its version string too.

---

## Quick example: adding two packs at once

If Claude delivers two new packs in the same session (say `cysa-ir.js` and
`cysa-rep.js`), just add both lines, one after another, after the last existing
pack line:

```html
<script src="packs/cysa-ops.js?v=20260709e"></script>
<script src="packs/cysa-vuln.js?v=20260710a"></script>
<script src="packs/cysa-ir.js?v=20260710a"></script>
<script src="packs/cysa-rep.js?v=20260710a"></script>
```

Order among domain packs doesn't matter (only `core-battles.js` must stay
first) -- add new lines in whatever order you receive the files.

---

## If something looks wrong after adding a line

- **Blank page:** open the browser console (F12 -> Console) and check for a red
  error. Often this means a stray character got introduced during paste --
  re-paste the line directly from GitHub's editor.
- **Domain still shows "not installed":** double check the filename in the
  script tag *exactly* matches the file's actual name in `packs/` (this is
  case-sensitive on GitHub Pages).
- **Still stuck:** paste Claude the exact lines from your current `index.html`
  script section and it will spot the issue immediately.

Your saved progress (rank, XP, mastery) is stored in your browser, completely
separate from these files -- editing `index.html` or adding pack files never
affects it.
