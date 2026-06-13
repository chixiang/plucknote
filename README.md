# PluckNote Legal Pages

Static HTML pages for App Store Connect Privacy Policy URL.

## Files

- `privacy.html` — English Privacy Policy
- `privacy-zh.html` — Simplified Chinese Privacy Policy
- `terms.html` — English Terms of Service
- `terms-zh.html` — Simplified Chinese Terms of Service

## Deployment

These four files are designed to be deployed as static pages. Choose one of:

### Option A: GitHub Pages (recommended, free)

1. Create a new GitHub repository named `plucknote-legal` (public)
2. Copy these 4 HTML files to the repository root
3. Go to repository Settings → Pages
4. Set Source to "Deploy from a branch" → `main` branch → `/` (root)
5. After a few minutes, the pages will be available at:
   - `https://chixiang.github.io/plucknote-legal/privacy.html`
   - `https://chixiang.github.io/plucknote-legal/privacy-zh.html`
   - `https://chixiang.github.io/plucknote-legal/terms.html`
   - `https://chixiang.github.io/plucknote-legal/terms-zh.html`

### Option B: Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Build command: (none)
3. Build output directory: `/`
4. Cloudflare will provide a `*.pages.dev` URL

### Option C: Custom domain

If you own `plucknote.com`, point these paths to the corresponding HTML files via your web server.

## App Store Connect URLs

Use these in App Store Connect → App Information:

- **Privacy Policy URL** (English default): `https://plucknote.com/privacy`
- **Privacy Policy URL** (Simplified Chinese): `https://plucknote.com/privacy-zh`

For EULA, you can use Apple's standard EULA (no URL required).
