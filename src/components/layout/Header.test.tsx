import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThemeProvider from '@/components/providers/ThemeProvider'
import { navigationState } from '@/test/stubs/next-navigation'
import Header from './Header'

function renderHeader() {
  return render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>,
  )
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

describe('Header chrome', () => {
  it('renders the brand and its tagline', () => {
    renderHeader()

    expect(screen.getByText('Pokémuu')).toBeInTheDocument()
    expect(screen.getByText('Atlas Veterinário')).toBeInTheDocument()
  })

  it('links the brand back home', () => {
    renderHeader()

    expect(screen.getByRole('link', { name: /Pokémuu Atlas Veterinário/ })).toHaveAttribute(
      'href',
      '/',
    )
  })

  it('renders every navigation entry', () => {
    renderHeader()

    for (const label of ['Início', 'Atlas', 'Roteiros']) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    }
  })
})

describe('Header active route', () => {
  it('marks the current route as active', () => {
    navigationState.pathname = '/atlas'
    renderHeader()

    expect(screen.getByRole('link', { name: 'Atlas' })).toHaveClass('text-gold-400')
    expect(screen.getByRole('link', { name: 'Início' })).not.toHaveClass('text-gold-400')
  })

  it('leaves every link inactive on an unknown route', () => {
    navigationState.pathname = '/desconhecido'
    renderHeader()

    for (const label of ['Início', 'Atlas', 'Roteiros']) {
      expect(screen.getByRole('link', { name: label })).not.toHaveClass('text-gold-400')
    }
  })
})

describe('Header theme toggle', () => {
  it('switches to dark and persists the choice', async () => {
    renderHeader()

    await userEvent.click(screen.getAllByRole('button', { name: 'Alternar tema' })[0])

    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement).toHaveClass('dark')
  })

  it('switches back to light', async () => {
    localStorage.setItem('theme', 'dark')
    renderHeader()

    await userEvent.click(screen.getAllByRole('button', { name: 'Alternar tema' })[0])

    expect(localStorage.getItem('theme')).toBe('light')
    expect(document.documentElement).not.toHaveClass('dark')
  })
})

describe('Header mobile menu', () => {
  it('is closed by default', () => {
    renderHeader()

    expect(screen.getAllByRole('link', { name: 'Roteiros' })).toHaveLength(1)
  })

  it('opens and closes again', async () => {
    renderHeader()

    await userEvent.click(screen.getByRole('button', { name: 'Menu' }))
    expect(screen.getAllByRole('link', { name: 'Roteiros' })).toHaveLength(2)

    await userEvent.click(screen.getByRole('button', { name: 'Menu' }))
    expect(screen.getAllByRole('link', { name: 'Roteiros' })).toHaveLength(1)
  })

  it('closes when a destination is chosen', async () => {
    renderHeader()

    await userEvent.click(screen.getByRole('button', { name: 'Menu' }))
    await userEvent.click(screen.getAllByRole('link', { name: 'Atlas' })[1])

    expect(screen.getAllByRole('link', { name: 'Atlas' })).toHaveLength(1)
  })
})
