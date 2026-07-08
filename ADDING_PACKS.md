# Adding New Content Packs (How the Game Grows)

Star Command is built so new exam domains drop in as small, self-contained
"pack" files. This guide explains exactly how to add packs so everything keeps
working. It covers both the packs you already have and any future ones.

There are only **two things** to do for each new pack:

1. Put the pack file in the `packs/` folder.
2. Add one `<script>` line for it in `index.html`.

That's it. The game reads the pack automatically.

---

## The golden rules (do not skip these)

- **Upload the real files.** Drag-and-drop the files into GitHub or use
  `git push`. Do **not** copy-paste file contents into GitHub's web editor -- that
  can convert characters like `<`, `>`, `&`, and `"` into "HTML entities"
  (`&lt;`, `&gt;`) and break the pack.
- **Match filenames exactly.** GitHub Pages is case-sensitive. `packs/sc2-env.js`
  is not the same as `packs/SC2-Env.js`. Keep names exactly as listed.
- **`core-battles.js` loads first.** It creates the shared `window.PACKS.__core`
  that holds the Cert Trials and the Zurg finale. Its `<script>` line must come
  before the domain packs. The provided `index.html` already does this.
- **`app.jsx` loads last.** It reads `window.PACKS` after every pack has
  registered, so its `<script>` line stays at the very bottom.

---

## The exact load order in index.html

Your `index.html` should list the scripts in this order (React, Babel, and
Firebase first; then packs; then the app). The full current set looks like this:

```html
<!-- libraries -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.5/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore-compat.js"></script>
<script src="firebase-config.js"></script>

<!-- core FIRST: creates window.PACKS.__core (Cert Trials + Zurg) -->
<script src="packs/core-battles.js"></script>

<!-- CySA+ domains -->
<script src="packs/cysa-ops.js"></script>
<script src="packs/cysa-vuln.js"></script>
<script src="packs/cysa-ir.js"></script>
<script src="packs/cysa-rep.js"></script>

<!-- SC-300 domains -->
<script src="packs/sc3-users.js"></script>
<script src="packs/sc3-auth.js"></script>
<script src="packs/sc3-workload.js"></script>
<script src="packs/sc3-gov.js"></script>

<!-- SC-200 domains -->
<script src="packs/sc2-env.js"></script>
<script src="packs/sc2-resp.js"></script>

<!-- app LAST: reads window.PACKS after all packs registered -->
<script type="text/babel" data-presets="react" src="app.jsx"></script>
```

When a new pack arrives (for example `sc2-hunt.js`), you add its line in the
SC-200 group, right after `sc2-resp.js`:

```html
<script src="packs/sc2-hunt.js"></script>
```

Then keep going the same way for every remaining domain.

---

## The full pack roadmap (what maps to which cert)

As each pack is delivered, drop it in `packs/` and add its `<script>` line in the
matching group. The certifications and their domain pack IDs:

**CySA+** (done): `cysa-ops`, `cysa-vuln`, `cysa-ir`, `cysa-rep`

**SC-300** (done): `sc3-users`, `sc3-auth`, `sc3-workload`, `sc3-gov`

**SC-200** (in progress): `sc2-env`, `sc2-resp`, then `sc2-hunt`

**AZ-500** (upcoming): `az5-id`, `az5-net`, `az5-compute`, `az5-ops`

**SC-100** (upcoming): `sc1-bp`, `sc1-ops`, `sc1-infra`, `sc1-app`

**SecAI+** (upcoming): `ai-con`, `ai-sec`, `ai-asst`, `ai-grc`

Cert Trials for each certification live inside `core-battles.js` (already handled
when each pack set is delivered), so you never add a separate file for those --
just replace `core-battles.js` when a new one is included.

---

## Step-by-step: adding a pack via the GitHub website

1. Open your repo on GitHub.
2. Click into the `packs` folder.
3. Click **Add file > Upload files**.
4. Drag the new pack file (e.g. `sc2-hunt.js`) into the page. Do not open or paste
   it -- just drop the file.
5. If a new `core-battles.js`, `app.jsx`, or `index.html` came with it, upload
   those too (into the repo root, replacing the old ones).
6. Scroll down, add a short commit message, and click **Commit changes**.
7. Now edit `index.html`: open it, click the pencil (Edit), add the new
   `<script src="packs/....js"></script>` line in the right group, and commit.
8. Wait ~30-60 seconds for GitHub Pages to redeploy, then refresh the game.

## Step-by-step: adding a pack via git (command line)

```
# copy the new file(s) into your local repo folder, then:
git add packs/sc2-hunt.js index.html
git commit -m "Add SC-200 Threat Hunting domain"
git push
```

GitHub Pages redeploys automatically.

---

## How to know it worked

- Open the game and go to the certification's page. The new domain should appear
  and be playable (no "Content pack not yet installed" message).
- If a domain shows "not installed," its `<script>` line is missing or the
  filename/path does not match exactly.
- If the whole page is blank, open the browser console (press F12 > Console). A
  red error naming a file usually means a 404 (wrong name/path) or a corrupted
  file (entities from pasting instead of uploading).

---

## Progress is safe across updates

Adding packs never erases progress. Progress lives in your browser's local
storage (and in your Google account if Firebase sync is set up), not in the pack
files. You can add every remaining domain over time and your ranks, mastery, and
XP carry forward.
