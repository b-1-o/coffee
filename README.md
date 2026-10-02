# Brew & Bloom — Coffee & Desserts

A full-viewport hero carousel + recipes website in a **dark emerald / Starbucks-style** aesthetic.

## Live site

After the GitHub Actions deploy finishes: **https://b-1-o.github.io/coffee/**

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- lucide-react
- Fonts: Anton + Inter

## Features

- Hero carousel with 4 coffee images (center/left/right/back roles)
- 650ms cubic-bezier transitions for background, scale, blur, opacity
- Grain overlay, giant ghost text "BREW", nav arrows
- Recipes grid + modal (ingredients + method)
- Uses assets from this repo

## Local development

```bash
npm install
npm run dev
```

## Deploy

Push to `main` triggers GitHub Actions → builds with Vite → deploys to GitHub Pages.

Make sure **Settings → Pages → Source** is set to **GitHub Actions**.
