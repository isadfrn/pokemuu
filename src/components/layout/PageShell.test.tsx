import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PageShell from './PageShell'

describe('PageShell', () => {
  it('renders the title, subtitle, breadcrumb and children', () => {
    render(
      <PageShell
        title="Atlas Anatômico"
        subtitle="Escolha um animal"
        breadcrumb={<span>Início / Atlas</span>}
      >
        <p>conteúdo da página</p>
      </PageShell>,
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Atlas Anatômico')
    expect(screen.getByText('Escolha um animal')).toBeInTheDocument()
    expect(screen.getByText('Início / Atlas')).toBeInTheDocument()
    expect(screen.getByText('conteúdo da página')).toBeInTheDocument()
  })

  it('omits the subtitle when none is given', () => {
    render(
      <PageShell title="Atlas">
        <p>x</p>
      </PageShell>,
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Atlas')
  })

  it('accepts a node as subtitle', () => {
    render(
      <PageShell title="Atlas" subtitle={<span>subtítulo em nó</span>}>
        <p>x</p>
      </PageShell>,
    )

    expect(screen.getByText('subtítulo em nó')).toBeInTheDocument()
  })

  it('renders the shared header and footer chrome', () => {
    render(
      <PageShell title="Atlas">
        <p>x</p>
      </PageShell>,
    )

    expect(screen.getByText('Pokémuu')).toBeInTheDocument()
    expect(screen.getByText(/Desenvolvido por @isadfrn/)).toBeInTheDocument()
  })
})
