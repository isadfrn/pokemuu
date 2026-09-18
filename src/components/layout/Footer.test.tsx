import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('renders the project name and course', () => {
    render(<Footer />)

    expect(screen.getByText('Pokémuu · Atlas Anatômico Veterinário')).toBeInTheDocument()
    expect(screen.getByText('Medicina Veterinária · Unisociesc Blumenau')).toBeInTheDocument()
  })

  it('credits the students and professors', () => {
    render(<Footer />)

    expect(screen.getByText('Isabella · Ariane · Amanda · Alexandra')).toBeInTheDocument()
    expect(
      screen.getByText('Prof. Alessandra de Moraes Sousa · Prof. Julia Cristina Alves'),
    ).toBeInTheDocument()
  })

  it('links to the author profile in a new tab', () => {
    render(<Footer />)
    const link = screen.getByRole('link', { name: /@isadfrn/ })

    expect(link).toHaveAttribute('href', 'https://github.com/isadfrn')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
