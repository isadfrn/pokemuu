import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThemeProvider, { useTheme } from './ThemeProvider'

function Probe() {
  const { theme, toggle } = useTheme()

  return <button onClick={toggle}>{theme}</button>
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

describe('ThemeProvider', () => {
  it('starts in light mode when nothing is stored', () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )

    expect(screen.getByRole('button')).toHaveTextContent('light')
    expect(document.documentElement).not.toHaveClass('dark')
  })

  it('restores the stored theme and applies it to the document', () => {
    localStorage.setItem('theme', 'dark')

    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )

    expect(screen.getByRole('button')).toHaveTextContent('dark')
    expect(document.documentElement).toHaveClass('dark')
  })

  it('toggles, persists and updates the document element', async () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )

    await userEvent.click(screen.getByRole('button', { name: 'light' }))
    expect(screen.getByRole('button')).toHaveTextContent('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement).toHaveClass('dark')

    await userEvent.click(screen.getByRole('button', { name: 'dark' }))
    expect(screen.getByRole('button')).toHaveTextContent('light')
    expect(localStorage.getItem('theme')).toBe('light')
    expect(document.documentElement).not.toHaveClass('dark')
  })

  it('renders its children', () => {
    render(
      <ThemeProvider>
        <p>conteúdo</p>
      </ThemeProvider>,
    )

    expect(screen.getByText('conteúdo')).toBeInTheDocument()
  })
})

describe('useTheme outside a provider', () => {
  it('falls back to a safe default', () => {
    render(<Probe />)

    expect(screen.getByRole('button')).toHaveTextContent('light')
  })

  it('exposes a no-op toggle', async () => {
    render(<Probe />)

    await userEvent.click(screen.getByRole('button'))

    expect(screen.getByRole('button')).toHaveTextContent('light')
  })
})
