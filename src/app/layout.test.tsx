import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import RootLayout, { metadata, viewport } from '@/app/layout'

describe('RootLayout metadata', () => {
  it('exposes the site metadata', () => {
    expect(metadata.title).toBe('Pokémuu · Atlas Anatômico Veterinário')
    expect(metadata.description).toContain('Pokémuu')
    expect(metadata.manifest).toBe('/site.webmanifest')
    expect(metadata.keywords).toContain('bovinos')
    expect(metadata.openGraph).toMatchObject({ type: 'website' })
    expect(metadata.icons).toMatchObject({ apple: '/favicon.svg' })
  })

  it('exposes the viewport configuration', () => {
    expect(viewport.themeColor).toBe('#D4AF37')
    expect(viewport.width).toBe('device-width')
    expect(viewport.initialScale).toBe(1)
  })
})

describe('RootLayout rendering', () => {
  it('renders the portuguese document shell', () => {
    // Rendered as markup because <html> cannot be nested inside the RTL container.
    const html = renderToStaticMarkup(
      <RootLayout>
        <main>conteúdo</main>
      </RootLayout>,
    )

    expect(html).toContain('lang="pt-BR"')
    expect(html).toContain('antialiased')
    expect(html).toContain('conteúdo')
  })

  it('wraps the page in the theme provider', () => {
    const html = renderToStaticMarkup(
      <RootLayout>
        <p>filho</p>
      </RootLayout>,
    )

    expect(html).toContain('filho')
    expect(html).toContain('<body')
  })
})
