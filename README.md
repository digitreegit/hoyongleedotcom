# hoyonglee.com

Personal portfolio site for Hoyong Lee — Creative Director, UI/UX designer.
A pure static site, with content updated from
[hoyonglee.format.com](https://hoyonglee.format.com/) into the existing custom design system.

## Stack

- **Pure HTML / CSS / Vanilla JS** — no build step, no framework, no dependencies
- **Single shared sidebar** rendered by `js/site.js` (data-driven, edit one place)
- **Inter** font from Google Fonts
- Fully responsive — desktop sidebar collapses to a mobile burger menu under 768px

## Project structure

```
.
├── index.html                    # Home (centered name + 4 categories)
├── about.html                    # About / résumé
│
├── mobile-app.html               # Category: Mobile App (gallery)
├── web-platform.html             # Category: Web Platform (gallery)
├── product-design.html           # Category: Product Design (gallery)
├── photography.html              # Category: Photography (gallery)
│
├── smartfren-mysf.html           # Mobile App projects (14)
├── dalligent-kupu.html
├── bakkt-app.html
├── iris-id.html
├── sparemin.html
├── dairy-queen.html
├── dc-bank-canada.html
├── shell-uk.html
├── baskin-robbins.html
├── o2-telefonica.html
├── eplus-base.html
├── mcmobil-germany.html
├── disney.html
├── dunkin-donuts.html
│
├── smartfren-1engage.html        # Web Platform projects (4)
├── glmx.html
├── deutsche-telekom.html
├── att-detect-connect.html
│
├── icam-td100.html               # Product Design projects (2)
├── icam-h100.html
│
├── walk-into-crowd-vol2.html     # Photography projects (2)
├── walk-into-crowd-vol1.html
│
├── css/style.css                 # All styles (tokens + responsive)
├── js/site.js                    # Nav data + sidebar render + behaviour
└── img/mobile-app/...            # Project images (replace placeholders here)
```

## Editing content

### Add or rename a project

Open `js/site.js` and edit the `NAV` array. Every page automatically picks up
the new sidebar layout — no need to touch each HTML file.

```js
const NAV = [
  { id: 'mobile-app', label: 'Mobile App', href: 'mobile-app.html', items: [
    { href: 'smartfren-mysf.html', label: 'Smartfren — mySF' },
    ...
  ]},
  ...
];
```

To add a brand-new project, also:
1. Create the new HTML file (copy any existing project page like `bakkt-app.html`)
2. Add a tile to the matching category gallery (`mobile-app.html` etc.)
3. Add the link to `js/site.js` `NAV`

### Replace placeholder images

The category galleries use coloured tile placeholders (`.gi-ph` divs).
To swap in a real image, replace the placeholder div in the category page:

```html
<a class="gallery-item" href="bakkt-app.html">
  <img class="gi-ph" src="img/mobile-app/bakkt-cover.jpg" alt="Bakkt App"/>
  <div class="gi-cap">…</div>
</a>
```

Project detail pages already support images via `.img-full` and `.img-half-left`
(see `smartfren-mysf.html` for a working example).

## Local preview

No build step needed — just open `index.html`, or run a tiny static server:

```bash
# Python 3
python3 -m http.server 8000
# then open http://localhost:8000

# or Node
npx serve .
```

## Deployment

This is a fully static site. Drop it on any host:

### GitHub Pages

```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin git@github.com:<your-user>/hoyonglee.com.git
git push -u origin main
```

Then in GitHub → Settings → Pages → set Source to `main` / root.
Add a `CNAME` file at the root with `hoyonglee.com` if you point your domain.

### Netlify

```bash
npx netlify deploy --prod --dir .
```

Or drag the project folder onto [app.netlify.com/drop](https://app.netlify.com/drop).

### Vercel

```bash
npx vercel --prod
```

Vercel auto-detects this as a static site (no framework needed).

### Cloudflare Pages

Connect the GitHub repo at [pages.cloudflare.com](https://pages.cloudflare.com)
and set:
- Build command: *(empty)*
- Build output: `/`

## Custom domain

Point your DNS to the chosen host:

| Host             | DNS                                |
|------------------|------------------------------------|
| GitHub Pages     | `A` records to GitHub IPs (185.199.108.153, .109, .110, .111) |
| Netlify          | `CNAME` to `<site>.netlify.app`    |
| Vercel           | `CNAME` to `cname.vercel-dns.com`  |
| Cloudflare Pages | `CNAME` to `<site>.pages.dev`      |

## License

Content © Hoyong Lee. Code is yours to use.
