import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TeamSection from './TeamSection'

const STUDENTS = ['Isabella', 'Ariane', 'Amanda', 'Alexandra']
const PROFESSORS = ['Alessandra de Moraes Sousa', 'Julia Cristina Alves']

describe('TeamSection', () => {
  it('credits every student', () => {
    render(<TeamSection />)

    for (const student of STUDENTS) {
      expect(screen.getByText(student)).toBeInTheDocument()
    }
    expect(screen.getByText('Alunas')).toBeInTheDocument()
  })

  it('credits the supervising professors', () => {
    render(<TeamSection />)

    for (const professor of PROFESSORS) {
      expect(screen.getByText(professor)).toBeInTheDocument()
    }
    expect(screen.getByText('Professoras')).toBeInTheDocument()
  })

  it('renders the discipline heading', () => {
    render(<TeamSection />)

    expect(
      screen.getByRole('heading', { name: /Morfofisiologia do Aparelho Neurolocomotor/ }),
    ).toBeInTheDocument()
  })

  it('renders the institution block', () => {
    render(<TeamSection />)

    expect(screen.getByText('Unisociesc')).toBeInTheDocument()
    expect(screen.getByText(/Centro Universitário Sociesc · Blumenau/)).toBeInTheDocument()
    expect(screen.getByText(/Medicina Veterinária · Unisociesc · Blumenau/)).toBeInTheDocument()
  })

  it('shows the initial letter of each student', () => {
    const { container } = render(<TeamSection />)

    const initials = Array.from(container.querySelectorAll('div.rounded-lg')).map((el) =>
      el.textContent?.trim(),
    )
    expect(initials).toEqual(expect.arrayContaining(['I', 'A']))
  })
})
