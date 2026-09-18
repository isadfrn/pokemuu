import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LandingPage from '@/app/page'
import AtlasHubPage from '@/app/atlas/page'
import AtlasAnimalPage, {
  generateMetadata as atlasMetadata,
  generateStaticParams as atlasStaticParams,
} from '@/app/atlas/[animal]/page'
import { NEXT_NOT_FOUND } from '@/test/stubs/next-navigation'
import RoadmapsHubPage from '@/app/roteiros/page'
import RoadmapsAnimalPage, {
  generateMetadata as roadmapsMetadata,
  generateStaticParams as roadmapsStaticParams,
} from '@/app/roteiros/[animal]/page'
import RoadmapDetailPage, {
  generateMetadata as roadmapDetailMetadata,
  generateStaticParams as roadmapDetailStaticParams,
} from '@/app/roteiros/[animal]/[slug]/page'

describe('LandingPage', () => {
  it('renders the full landing chrome', () => {
    render(<LandingPage />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Atlas Anatômico/)
    expect(screen.getByRole('heading', { name: 'Atlas por animal' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Morfofisiologia/ })).toBeInTheDocument()
    expect(screen.getByText(/Desenvolvido por @isadfrn/)).toBeInTheDocument()
  })

  it('reports the real size of the collection', () => {
    render(<LandingPage />)

    expect(screen.getByText('330 cards · Estilo Pokémon')).toBeInTheDocument()
  })

  it('previews five evenly spread cattle cards in the hero', () => {
    const { container } = render(<LandingPage />)
    const hero = container.querySelector('main > section')
    const sources = Array.from(hero?.querySelectorAll('img') ?? []).map((img) =>
      img.getAttribute('src'),
    )

    expect(sources).toEqual([
      '/cards/cattle/1.webp',
      '/cards/cattle/83.webp',
      '/cards/cattle/166.webp',
      '/cards/cattle/248.webp',
      '/cards/cattle/330.webp',
    ])
  })

  it('links the atlas call to action to the hub', () => {
    render(<LandingPage />)

    expect(screen.getByRole('link', { name: /Escolher um animal/ })).toHaveAttribute(
      'href',
      '/atlas',
    )
  })
})

describe('AtlasHubPage', () => {
  it('renders the hub heading and availability count', () => {
    render(<AtlasHubPage />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Atlas Anatômico')
    expect(screen.getByText('Escolha um animal · 1 disponível')).toBeInTheDocument()
  })

  it('links the available animal to its atlas', () => {
    render(<AtlasHubPage />)

    expect(screen.getByRole('link', { name: /Bovinos/ })).toHaveAttribute('href', '/atlas/cattle')
  })
})

describe('AtlasAnimalPage params', () => {
  it('statically renders only the available animals', () => {
    expect(atlasStaticParams()).toEqual([{ animal: 'cattle' }])
  })

  it('builds metadata for an available animal', () => {
    const metadata = atlasMetadata({ params: { animal: 'cattle' } })

    expect(metadata.title).toBe('Atlas · Bovinos · Pokémuu')
    expect(metadata.description).toContain('330 cards')
  })

  it('returns empty metadata for an unknown animal', () => {
    expect(atlasMetadata({ params: { animal: 'unicorn' } })).toEqual({})
    expect(atlasMetadata({ params: { animal: 'dog' } })).toEqual({})
  })
})

describe('AtlasAnimalPage rendering', () => {
  it('renders the atlas for an available animal', () => {
    render(<AtlasAnimalPage params={{ animal: 'cattle' }} />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Atlas · Bovinos')
    expect(screen.getByText(/330 cards · 🐄 Bovinos/)).toBeInTheDocument()
    expect(screen.getByText('330 de 330 cards')).toBeInTheDocument()

    const atlasLinks = screen.getAllByRole('link', { name: 'Atlas' })
    expect(atlasLinks).toHaveLength(2)
    for (const link of atlasLinks) expect(link).toHaveAttribute('href', '/atlas')
  })

  it('renders one card tile per dataset card', () => {
    render(<AtlasAnimalPage params={{ animal: 'cattle' }} />)

    expect(screen.getAllByRole('button', { name: /^Abrir card / })).toHaveLength(330)
  })

  it('404s for an animal that is not available', () => {
    expect(() => render(<AtlasAnimalPage params={{ animal: 'dog' }} />)).toThrow(NEXT_NOT_FOUND)
  })

  it('404s for an unknown animal', () => {
    expect(() => render(<AtlasAnimalPage params={{ animal: 'unicorn' }} />)).toThrow(NEXT_NOT_FOUND)
  })
})

describe('RoadmapsHubPage', () => {
  it('renders the hub heading and availability count', () => {
    render(<RoadmapsHubPage />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Roteiros de Estudo')
    expect(screen.getByText('Escolha um animal · 1 disponível')).toBeInTheDocument()
  })

  it('links the available animal to its roadmaps', () => {
    render(<RoadmapsHubPage />)

    expect(screen.getByRole('link', { name: /Bovinos/ })).toHaveAttribute(
      'href',
      '/roteiros/cattle',
    )
  })
})

describe('RoadmapsAnimalPage', () => {
  it('statically renders only the available animals', () => {
    expect(roadmapsStaticParams()).toEqual([{ animal: 'cattle' }])
  })

  it('builds metadata for an available animal', () => {
    const metadata = roadmapsMetadata({ params: { animal: 'cattle' } })

    expect(metadata.title).toBe('Roteiros · Bovinos · Pokémuu')
    expect(metadata.description).toContain('Roteiros de estudo')
  })

  it('returns empty metadata for an unknown animal', () => {
    expect(roadmapsMetadata({ params: { animal: 'unicorn' } })).toEqual({})
  })

  it('lists the roadmaps of the animal', () => {
    render(<RoadmapsAnimalPage params={{ animal: 'cattle' }} />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Roteiros · Bovinos')
    expect(screen.getByText('1 roteiro · 🐄 Bovinos')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Prova de Miologia/ })).toHaveAttribute(
      'href',
      '/roteiros/cattle/prova-de-miologia',
    )
  })

  it('404s for an animal that is not available', () => {
    expect(() => render(<RoadmapsAnimalPage params={{ animal: 'cat' }} />)).toThrow(NEXT_NOT_FOUND)
  })
})

describe('RoadmapDetailPage', () => {
  it('statically renders every roadmap of every available animal', () => {
    expect(roadmapDetailStaticParams()).toEqual([{ animal: 'cattle', slug: 'prova-de-miologia' }])
  })

  it('builds metadata from the roadmap', () => {
    const metadata = roadmapDetailMetadata({
      params: { animal: 'cattle', slug: 'prova-de-miologia' },
    })

    expect(metadata.title).toBe('Prova de Miologia (15/06/2026) · Roteiro · Pokémuu')
    expect(metadata.description).toBe('Músculos cutâneos, faciais e do pescoço ao tronco.')
  })

  it('returns empty metadata for an unknown slug', () => {
    expect(roadmapDetailMetadata({ params: { animal: 'cattle', slug: 'nope' } })).toEqual({})
  })

  it('renders the roadmap and its study cards', () => {
    render(<RoadmapDetailPage params={{ animal: 'cattle', slug: 'prova-de-miologia' }} />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Prova de Miologia (15/06/2026)',
    )
    expect(screen.getByText(/11 cards/)).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /virado para baixo/ })).toHaveLength(11)
  })

  it('404s when the slug does not belong to the animal', () => {
    expect(() =>
      render(<RoadmapDetailPage params={{ animal: 'dog', slug: 'prova-de-miologia' }} />),
    ).toThrow(NEXT_NOT_FOUND)
  })

  it('404s for an unknown slug', () => {
    expect(() => render(<RoadmapDetailPage params={{ animal: 'cattle', slug: 'nope' }} />)).toThrow(
      NEXT_NOT_FOUND,
    )
  })
})
