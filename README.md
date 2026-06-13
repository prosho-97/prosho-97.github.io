# Lorenzo Proietti · Personal Website

This repository contains the source code for my personal academic website.

🌐 **Website:** https://prosho-97.github.io

## Structure

```text
.
├── _quarto.yml          # Quarto website configuration
├── index.qmd            # Home page
├── publications.qmd     # Publications page
├── talks.qmd            # Talks page
├── cv.qmd               # CV landing page
├── assets/              # Custom CSS, JavaScript, and layout components
├── images/              # Website images and profile picture
├── files/               # Static downloadable files, including the CV
└── docs/                # Rendered website served by GitHub Pages
```

## Local preview

To preview the website locally:

```bash
quarto preview
```

This starts a local development server and automatically updates the preview when source files are changed.

## Rendering

To generate the static website files:

```bash
quarto render
```

The rendered output is written to the `docs/` directory.

## Publishing

The website is published with **GitHub Pages** from the `docs/` directory on the `main` branch.

GitHub Pages settings:

```text
Source: Deploy from a branch
Branch: main
Folder: /docs
```

After making changes:

```bash
quarto render
git add -A
git commit -m "Update website"
git push origin main
```

## Built with

* [Quarto](https://quarto.org/)
* [GitHub Pages](https://pages.github.com/)
