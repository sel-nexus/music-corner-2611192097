# Music Corner

A single-page, static storefront sample built with Vite, React, and TypeScript. This project is for testing and presentation only. The three CD entries, prices, address, hours, and email are fictional demonstration values. The newsletter field is input-only: it does not submit, save, or send an address. There is no backend or database.

## Requirements

- Node.js 20 or newer
- npm
- Docker (for the nginx image)

## Local development

```bash
cd frontend
npm ci
npm run dev
```

Vite prints the local development URL when it starts.

## Checks

Run the React component tests:

```bash
cd frontend
node node_modules/vitest/vitest.mjs run
```

Build the production bundle and type-check TypeScript:

```bash
cd frontend
node node_modules/typescript/bin/tsc --noEmit
node node_modules/vite/bin/vite.js build
```

Run storefront browser tests against the local production preview:

```bash
cd frontend
node node_modules/@playwright/test/cli.js install chromium
node node_modules/@playwright/test/cli.js test --config playwright.config.ts
```

The browser suite checks page content, the collection anchor, contact details, email entry, mobile layout, and browser errors.

## Static hosting with nginx

Build the multi-stage static image from the repository root:

```bash
docker build -t music-corner-frontend ./frontend
docker run --rm -p 8080:80 music-corner-frontend
```

Open `http://localhost:8080`. The nginx image serves the built Vite bundle, falls back to `index.html` for unknown paths, and provides `GET /healthz` returning `200 ok`.

Build the image first, then run the hosting test. Playwright starts the image and stops its container when the test run ends:

```bash
docker build -t music-corner-frontend ./frontend
cd frontend
node node_modules/@playwright/test/cli.js test --config playwright.hosting.config.ts
```

The app has no environment-dependent frontend settings; `frontend/.env.example` documents that no runtime variables are needed. All site imagery uses descriptive seeded placeholder photography and external fonts, so an internet connection is needed for those assets to load.