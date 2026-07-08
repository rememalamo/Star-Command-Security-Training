# Star Command: Security Ranger

A Buzz Lightyear-themed certification training game for cybersecurity exams
(CySA+, SC-300, SC-200, AZ-500, SC-100, SecAI+). It is a fully static web app --
no build step, no server -- so it runs anywhere you can host plain files, and it
plays on both phone and desktop.

Each certification domain follows a mission loop:

- **Briefing** -- a focused lesson on the domain's topics
- **Training Sim** -- multiple-choice questions with teaching on every option
- **LGM PBQ Lab** -- performance-based questions (order / match / select-all) with partial credit
- **Henchman Field Mission** -- a themed boss battle with Damage / Reputation / Evidence meters

Clear every domain in a cert, then beat its **Cert Trial** boss to certify and rank up.
Certify all six and you unlock the final battle against **Emperor Zurg**.

---

## What's included

```
star-command-app/
├── index.html            <- entry point (loads everything)
├── app.jsx               <- the game (React, compiled in-browser by Babel)
├── firebase-config.js    <- optional: Google sign-in + cross-device sync config
├── README.md             <- this file
├── FIREBASE_SETUP.md     <- how to turn on Google sign-in + sync
└── packs/                <- content packs (one file per exam domain)
    ├── core-battles.js       (Zurg finale + all Cert Trials -- loads FIRST)
    ├── cysa-ops.js           (CySA+: Security Operations)
    ├── cysa-vuln.js          (CySA+: Vulnerability Management)
    ├── cysa-ir.js            (CySA+: Incident Response)
    ├── cysa-rep.js           (CySA+: Reporting & Communication)
    ├── sc3-users.js          (SC-300: User Identities)
    ├── sc3-auth.js           (SC-300: Authentication & Access)
    ├── sc3-workload.js       (SC-300: Workload Identities)
    ├── sc3-gov.js            (SC-300: Identity Governance)
    └── sc2-env.js            (SC-200: Manage a Security Operations Environment)
```

---

## Deploy to GitHub Pages

1. Create a **public** repository on GitHub.
2. Upload the **contents** of the `star-command-app` folder to the **root** of the
   repo (so `index.html` sits at the top level, with `app.jsx`, `firebase-config.js`,
   and the `packs/` folder beside it). Use drag-and-drop upload or `git push` --
   do **not** paste file contents into the web editor, which can corrupt the code.
3. In the repo: **Settings > Pages**.
4. Under **Source**, choose **Deploy from a branch**, select **main** and **/(root)**,
   then **Save**.
5. Wait ~30-60 seconds. Your game is live at:
   `https://YOUR-USERNAME.github.io/YOUR-REPO/`

### Updating the game later

Replace the changed files (or add a new pack to `packs/` and add its `<script>`
tag to `index.html`), commit, and push. GitHub Pages redeploys automatically in
under a minute. Refresh your browser to see the update.

---

## Run it locally (optional)

From inside the `star-command-app` folder:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080` in a browser. (Opening `index.html` directly with
`file://` can break script loading, so use the local server.)

---

## Progress saving

- **By default**, progress is saved in your browser's local storage on that one
  device.
- **With Firebase configured** (see `FIREBASE_SETUP.md`), you can sign in with
  Google and your progress follows you across devices -- phone, laptop, anywhere.

You (the owner) set up Firebase once. Everyone who opens your link just signs in
with their own Google account; nobody else needs a Firebase project.

---

## Important notes

- Files must be served as-is. Do not run the `.js` files through an HTML editor or
  any tool that escapes characters (`<`, `>`, `&`, `"`) -- that will corrupt them.
  Upload the real files.
- Filenames are case-sensitive on GitHub Pages. Keep `packs/` and every filename
  exactly as shown.
- `core-battles.js` must load before the other packs (it creates the shared
  `window.PACKS.__core`). The order in `index.html` already handles this.
- The app has no ads, no tracking, and no external data collection beyond the
  optional Firebase sync you configure yourself.

Have fun, Ranger -- to infinity and beyond.
