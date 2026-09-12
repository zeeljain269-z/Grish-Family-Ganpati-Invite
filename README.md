# Temple Darbar — Ganpati invitation website

A standalone [Vite](https://vitejs.dev) + React site for the invite
**Grish Family — Ganpati Invitation** (originally InviteO invite `invite-5e13b3`).

Everything needed to run and deploy is in this folder. There is no backend,
no database and no API — it builds to plain static files.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:5173
```

Build and preview the production output:

```bash
npm run build    # writes ./dist
npm run preview
```

## Deploy: GitHub → Vercel

**1. Push to GitHub**

```bash
git init
git add .
git commit -m "Temple Darbar invitation website"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

**2. Import on Vercel**

Go to [vercel.com/new](https://vercel.com/new), pick the repo, and press
Deploy. Vercel reads `vercel.json` and needs nothing configured by hand:

| Setting | Value |
|---|---|
| Framework | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Environment variables | none |

You get a public URL like `https://your-repo.vercel.app`. Every later
`git push` to `main` redeploys automatically.

**3. Fix the WhatsApp share preview** ← don't skip this

`index.html` ships with two placeholder URLs, because the real domain isn't
known until Vercel gives you one. Open `index.html`, replace **YOUR-DOMAIN**
in both tags with your actual domain, commit and push:

```html
<meta property="og:image" content="https://YOUR-DOMAIN/assets/hero-scene.webp" />
<meta property="og:url"   content="https://YOUR-DOMAIN/" />
```

Until you do, forwarding the link on WhatsApp shows no preview card.
Scrapers cache aggressively, so change it before you share the link widely.

## Changing the invite's content

All of this invite's text, dates, venue and photos live in one block near the
bottom of `<head>` in **`index.html`**:

```html
<script>
  window.__INVITE__ = { ... };
</script>
```

Edit that JSON and rebuild. Anything you delete from it falls back to the
theme's sample content in `src/data/`, so a partial block still renders a
complete page — see `src/data/inject.js` for how the merge works.

Set `"lang"` to `"mr"`, `"hi"` or `"en"` to switch the whole invite between
Marathi, Hindi and English. Marathi is the base; the other two are override
packs in `src/data/lang/`.

## Layout

```
index.html            page shell, share tags, and this invite's content
src/
  main.jsx            entry point
  App.jsx             section order
  components/         the design, one component per section
  data/               default (sample) content + the injection/merge logic
  data/lang/          Hindi and English override packs
  lib/assets.js       maps asset keys to files under /assets
public/assets/        theme artwork, fonts' fallbacks, background music
public/assets/uploads/  the four photographs uploaded for this invite
vercel.json           build + caching config for Vercel
```

## Notes

- The background music (`public/assets/bgMusic.mp3`) only starts after the
  visitor taps, which every mobile browser requires. That is not a bug.
- The page is a single route. `vercel.json` rewrites everything to `/` so a
  refresh on any path still works.
- Swap the invite's photographs by replacing the files in
  `public/assets/uploads/` — keep the filenames and nothing else needs editing.
