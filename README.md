# NextBridge IT — Website

Static marketing site for **NextBridge IT** (Belgrade, Serbia), designed to be hosted on **GitHub Pages**.

## What’s included

- Modern responsive single-page site: `index.html`
- Simple JS for mobile navigation: `assets/js/main.js`
- Styling: `assets/css/styles.css`
- GitHub Pages deploy workflow: `.github/workflows/pages.yml`

## Deploy to GitHub Pages (recommended)

1. Push this repo to GitHub (default branch: `main`).
2. In GitHub: **Settings → Pages**
   - **Build and deployment**: select **GitHub Actions**
3. The workflow will publish automatically on every push to `main`.

Your site URL will look like:
- `https://<username>.github.io/<repo>/`

## Customize (important)

Update placeholders in:
- `index.html`
  - Email (`contact@nextbridgeit.com`)
  - GitHub + LinkedIn links
  - Form action (Formspree endpoint)
- `robots.txt` and `sitemap.xml`
  - Already set to `https://nextbridgeit.net` (change if you use another domain)

## Local preview

Any static server works. Example using Python:

```bash
python -m http.server 5173
```

Then open `http://localhost:5173/`.
