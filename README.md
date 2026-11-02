# Naren K S — Portfolio

[Live website](https://naren214.github.io/) · [LinkedIn](https://www.linkedin.com/in/naren-k-s-3bb09137a/) · [GitHub](https://github.com/naren214)

A custom portfolio for a Computer Science student at VIT Chennai, exploring software engineering, AI, and full-stack development.

## What's inside

- Interactive Canvas hero with pause controls and reduced-motion support
- Four filterable project case studies and a TermVision repository feature
- About, skills, education, internship, and research sections
- Eight campus memberships with roles and dates from LinkedIn Experience
- Ten original certificate PDFs, with explicit viewing buttons
- A printable résumé and direct email/phone contact links
- Responsive layouts, keyboard focus indicators, and locally served fonts

Built with HTML, CSS, JavaScript, Canvas 2D, and SVG. No dependencies or build step are required.

## Run locally

From the repository directory:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Open [localhost:4173](http://127.0.0.1:4173/).

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Portfolio content, navigation, and search/social metadata |
| `style.css` | Responsive layout and interaction styles |
| `app.js` | Case studies, filters, certificate archive, menu, and email copy |
| `orbit.js` | Decorative Canvas sculpture and motion controls |
| `resume.html` | Résumé with Print / Save PDF controls |
| `assets/` | Portrait, project artwork, fonts, and original certificate assets |
| `.nojekyll` | Serves the project as static files on GitHub Pages |

Edit the main content in `index.html`, case studies and certificates in `app.js`, and the résumé in `resume.html`. Keep role dates and contact details consistent between pages. Project illustrations are visual summaries rather than screenshots.

## Publishing

GitHub Pages publishes the repository root from `main`. Pushing an update to `main` triggers publication at [naren214.github.io](https://naren214.github.io/).

The previous website is preserved on the [`old` branch](https://github.com/naren214/naren214.github.io/tree/old).

## Content and licenses

Campus memberships were checked against LinkedIn Experience on 2 November 2026. Internship and certificate details use the original credentials; public project descriptions were checked against their repositories. The HaluEval project uses Naren's supplied project background. No awards, publication acceptance, or unverified performance metrics are claimed.

The repository retains its [MIT license](LICENSE). Font license notices are included in `assets/fonts/`.
