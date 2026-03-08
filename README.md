# Women's Day Tribute Website

A React + Vite web app to create a personalized Women's Day tribute for your mother.
Users can upload a photo, add a message, auto-decorate the image, download/share it, and view saved tributes in a local gallery.

## Demo Assets

- Screen recording (put your video here): `docs/media/screen-recording.mp4`
- Website screenshots (optional): `docs/screenshots/`
- Code screenshots (put your code shots here): `docs/screenshots/code/`

Recommended code screenshot names:
- `docs/screenshots/code/home-page-code.png`
- `docs/screenshots/code/tribute-page-code.png`
- `docs/screenshots/code/gallery-code.png`
- `docs/screenshots/code/canvas-decorator-code.png`

## Features

- Upload JPG/PNG image (max 5MB)
- Add a personal tribute message
- Auto-decoration with canvas effects
- Download decorated tribute image
- Share via Web Share API (with clipboard fallback)
- Local gallery (stored in browser `localStorage`)

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- Express (production server entry)
- PNPM

## Project Structure

```text
womens_day_tribute/
  client/
    src/pages/
      Home.tsx
      TributePage.tsx
      Gallery.tsx
    src/lib/
      canvasDecorator.ts
  server/
    index.ts
  docs/
    media/
      screen-recording.mp4        # add your recording here
    screenshots/
      code/                       # add code screenshots here
```

## Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Run in development

```bash
pnpm dev
```

App runs on a local Vite URL (usually `http://localhost:5173`).

### 3. Build for production

```bash
pnpm build
```

### 4. Start production server

```bash
pnpm start
```

## Useful Scripts

- `pnpm dev` - start dev server
- `pnpm build` - build client + server bundle
- `pnpm start` - run production build
- `pnpm preview` - preview Vite build
- `pnpm check` - TypeScript type-check
- `pnpm format` - format code with Prettier

## How to Add Your Recording and Code Screenshots

1. Put your recorded website video at: `docs/media/screen-recording.mp4`
2. Put code screenshots inside: `docs/screenshots/code/`
3. Commit and push those files with the project.

Optional markdown snippet to show them in this README:

```md
## Demo Video
[Watch the screen recording](docs/media/screen-recording.mp4)

## Code Screenshots
![Home page code](docs/screenshots/code/home-page-code.png)
![Tribute page code](docs/screenshots/code/tribute-page-code.png)
![Gallery code](docs/screenshots/code/gallery-code.png)
```

## Notes

- Gallery data is browser-local (`localStorage`) and not shared across devices.
- Current UI text says "Mother" in places while the project is themed for Women's Day.
