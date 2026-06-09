# Pokémuu

![Languages used](https://img.shields.io/github/languages/count/isadfrn/pokemuu?style=flat-square)
![Repository size](https://img.shields.io/github/repo-size/isadfrn/pokemuu?style=flat-square)
![Last commit](https://img.shields.io/github/last-commit/isadfrn/pokemuu?style=flat-square)

Atlas Anatômico Veterinário de Bovinos no formato de cards estilo Pokémon, desenvolvido para a disciplina de Morfofisiologia do Aparelho Neurolocomotor e Tegumento do curso de Medicina Veterinária da Unisociesc Blumenau.

## Sobre o Projeto

O **Pokémuu** é uma aplicação web que apresenta 328 cards anatômicos de bovinos organizados em quatro categorias:

| Categoria    | Descrição                  |
| ------------ | -------------------------- |
| Músculos     | Musculatura bovina         |
| Articulações | Articulações e suturas     |
| Ossos        | Osteologia bovina          |
| Especiais    | Cards gerais e panorâmicos |

### Funcionalidades

- Navegação e visualização de todos os 328 cards
- Filtro por categoria (Músculos, Articulações, Ossos, Especiais)
- Busca por nome do card com fuzzy search
- Download de card individual
- Download de todos os cards em `.zip`
- Modo claro / escuro
- Layout responsivo (mobile e desktop)

## Tecnologias

- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Fuse.js](https://www.fusejs.io/) — busca fuzzy
- [JSZip](https://stuk.github.io/jszip/) — geração de arquivo `.zip`
- [Docker](https://www.docker.com/) + [PM2](https://pm2.keymetrics.io/) — deploy

## Requisitos

- [Node.js 20+](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Instalação e Execução

**Instalar dependências:**

```bash
npm install
```

**Executar em modo de desenvolvimento:**

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

**Build para produção:**

```bash
npm run build
npm start
```

## Deploy com Docker

**Build da imagem:**

```bash
docker build -t pokemuu .
```

**Executar o container:**

```bash
docker run -p 3000:3000 pokemuu
```

**Com PM2 (ecosystem.config.js):**

```bash
npm run build
pm2 start ecosystem.config.js
```

## Estrutura do Projeto

```
src/
├── app/
│   ├── atlas/         # Página do atlas completo
│   ├── layout.tsx
│   └── page.tsx       # Landing page
├── components/
│   ├── features/
│   │   ├── atlas/     # Filtros, cards, modal, download
│   │   └── landing/   # Hero, equipe, preview de categorias
│   ├── layout/        # Header e Footer
│   ├── providers/     # ThemeProvider (dark/light mode)
│   └── ui/            # Badge, Button, SearchInput
├── data/
│   └── cards.json     # Metadados dos 328 cards
├── lib/
│   ├── download.ts    # Lógica de download individual e em zip
│   └── search.ts      # Configuração do Fuse.js
└── types/
    └── card.ts        # Tipos e metadados de categorias
```

## Status

Em manutenção

## Licença

[MIT](./LICENSE)
