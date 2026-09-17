# Pokémuu

![Languages used](https://img.shields.io/github/languages/count/isadfrn/pokemuu?style=flat-square)
![Repository size](https://img.shields.io/github/repo-size/isadfrn/pokemuu?style=flat-square)
![Last commit](https://img.shields.io/github/last-commit/isadfrn/pokemuu?style=flat-square)

Veterinary Anatomical Atlas in Pokémon-style card format, developed for the Morphophysiology of the Neurolocomotor System and Integument course at Unisociesc Blumenau's Veterinary Medicine program.

## About the Project

**Pokémuu** is a **multi-animal** web application. The user first picks an animal and then explores that animal's anatomical atlas and study roadmaps. It currently ships with **Bovines**, and is architected so new animals (dog, cat, chicken, equines, goats, …) can be added as a data-only change.

Each animal's cards are organized into four categories:

| Category | Description                 |
| -------- | --------------------------- |
| Muscles  | Musculature                 |
| Joints   | Joints and sutures          |
| Bones    | Osteology                   |
| Special  | General and panoramic cards |

### Features

- Pick an animal, then browse its full atlas (upcoming animals shown as "Em breve")
- Filter cards by category (Muscles, Joints, Bones, Special)
- Search cards by name with fuzzy search
- Study roadmaps (roteiros) per animal — a roadmap may span more than one animal
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

## Architecture

The code is organized in layers so that adding an animal never requires touching a component:

```
src/
├── domain/                     # Pure, framework-agnostic types & logic
│   ├── animal.ts               # Animal, AnimalId
│   ├── card.ts                 # RawCard, Card, CardCategory, CATEGORY_META
│   ├── roadmap.ts              # Roadmap, RoadmapCardRef, cardsOf()
│   └── assets.ts               # cardImagePath() + route helpers (single source)
├── data/                       # Raw content (no logic)
│   ├── animals/
│   │   ├── registry.ts         # ← single registration point for animals
│   │   └── cattle/cards.json   # Bovine card metadata
│   └── roadmaps.ts             # Roadmap definitions (via cardsOf)
├── services/                   # Application layer — query functions used by pages
│   ├── animalService.ts        # getAnimals / getAvailableAnimal / …
│   ├── cardService.ts          # getCards(animalId) → resolved cards
│   ├── roadmapService.ts       # resolves refs across animals
│   ├── animalPicker.ts         # builds the picker view-model
│   └── search.ts               # Fuse.js configuration
├── lib/
│   └── download.ts             # Individual and zip download logic
├── components/
│   ├── features/
│   │   ├── animals/            # AnimalPicker / AnimalCard (reused everywhere)
│   │   ├── atlas/              # Filters, cards, modal, download
│   │   ├── roteiros/           # Roadmap list, flash cards
│   │   └── landing/            # Hero, animal section, team
│   ├── layout/                # Header, Footer, PageShell
│   ├── providers/             # ThemeProvider (dark/light mode)
│   └── ui/                    # Badge, Button, SearchInput
└── app/
    ├── page.tsx                # Landing (animal selection)
    ├── atlas/                  # /atlas hub → /atlas/[animal]
    └── roteiros/               # /roteiros hub → /roteiros/[animal]/[slug]
```

Card images live in `public/cards/<animal>/<id>.webp`.

## Adding a new animal

No component or page changes are needed — it is a data-only change:

1. Add the card images to `public/cards/<animal>/` (e.g. `public/cards/cat/1.webp`).
   If you have PNGs, convert them: `node scripts/convert-to-webp.mjs <animal>`.
2. Create `src/data/animals/<animal>/cards.json` — an array of `{ id, name, category }`.
3. Add the animal's id to the `AnimalId` union in `src/domain/animal.ts`.
4. In `src/data/animals/registry.ts`, import the dataset and set the entry's
   `available: true` (upcoming animals stay `available: false` and show as "Em breve").

To add a study roadmap, add an entry to `src/data/roadmaps.ts` using
`cardsOf('<animal>', ...ids)`. Concatenate multiple `cardsOf(...)` calls to make a
roadmap that spans more than one animal — the animals it belongs to are derived
automatically.

## Status

Maintaining

## License

[MIT](./LICENSE)
