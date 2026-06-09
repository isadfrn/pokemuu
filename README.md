# Pokémuu

![Languages used](https://img.shields.io/github/languages/count/isadfrn/pokemuu?style=flat-square)
![Repository size](https://img.shields.io/github/repo-size/isadfrn/pokemuu?style=flat-square)
![Last commit](https://img.shields.io/github/last-commit/isadfrn/pokemuu?style=flat-square)

Veterinary Anatomical Atlas of Bovines in Pokémon-style card format, developed for the Morphophysiology of the Neurolocomotor System and Integument course at Unisociesc Blumenau's Veterinary Medicine program.

## About the Project

**Pokémuu** is a web application that displays 328 bovine anatomical cards organized into four categories:

| Category | Description                 |
| -------- | --------------------------- |
| Muscles  | Bovine musculature          |
| Joints   | Joints and sutures          |
| Bones    | Bovine osteology            |
| Special  | General and panoramic cards |

### Features

- Browse and view all 328 cards
- Filter by category (Muscles, Joints, Bones, Special)
- Search cards by name with fuzzy search
- Download individual cards
- Download all cards as a `.zip` file
- Light / dark mode
- Responsive layout (mobile and desktop)

## Technologies

- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Fuse.js](https://www.fusejs.io/) — fuzzy search
- [JSZip](https://stuk.github.io/jszip/) — `.zip` file generation
- [Docker](https://www.docker.com/) + [PM2](https://pm2.keymetrics.io/) — deployment

## Requirements

- [Node.js 20+](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation and Setup

**Install dependencies:**

```bash
npm install
```

**Run in development mode:**

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

**Build for production:**

```bash
npm run build
npm start
```

## Deploy with Docker

**Build the image:**

```bash
docker build -t pokemuu .
```

**Run the container:**

```bash
docker run -p 3000:3000 pokemuu
```

**With PM2 (ecosystem.config.js):**

```bash
npm run build
pm2 start ecosystem.config.js
```

## Project Structure

```
src/
├── app/
│   ├── atlas/         # Full atlas page
│   ├── layout.tsx
│   └── page.tsx       # Landing page
├── components/
│   ├── features/
│   │   ├── atlas/     # Filters, cards, modal, download
│   │   └── landing/   # Hero, team, category previews
│   ├── layout/        # Header and Footer
│   ├── providers/     # ThemeProvider (dark/light mode)
│   └── ui/            # Badge, Button, SearchInput
├── data/
│   └── cards.json     # Metadata for all 328 cards
├── lib/
│   ├── download.ts    # Individual and zip download logic
│   └── search.ts      # Fuse.js configuration
└── types/
    └── card.ts        # Types and category metadata
```

## Status

Maintaining

## License

[MIT](./LICENSE)
