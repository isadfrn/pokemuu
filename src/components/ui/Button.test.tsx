import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button', () => {
  it('renders its children', () => {
    render(<Button>Baixar</Button>)

    expect(screen.getByRole('button', { name: 'Baixar' })).toBeInTheDocument()
  })

  it('fires onClick when pressed', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Ok</Button>)

    await userEvent.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not fire onClick while disabled', async () => {
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Ok
      </Button>,
    )
    const button = screen.getByRole('button')

    await userEvent.click(button)

    expect(button).toBeDisabled()
    expect(onClick).not.toHaveBeenCalled()
  })

  it('disables itself and shows a spinner while loading', () => {
    const { container } = render(<Button loading>Ok</Button>)

    expect(screen.getByRole('button')).toBeDisabled()
    expect(container.querySelector('.animate-spin')).not.toBeNull()
  })

  it('applies the requested variant and size', () => {
    render(
      <Button variant="gold" size="lg">
        Ok
      </Button>,
    )
    const button = screen.getByRole('button')

    expect(button).toHaveClass('bg-gold-gradient')
    expect(button).toHaveClass('text-base')
  })

  it('defaults to the ghost variant at medium size', () => {
    render(<Button>Ok</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('bg-gray-100')
    expect(button).toHaveClass('text-sm')
  })

  it('supports the danger and outline variants', () => {
    const { unmount } = render(<Button variant="danger">Ok</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-red-100')
    unmount()

    render(<Button variant="outline">Ok</Button>)
    expect(screen.getByRole('button')).toHaveClass('border-gold-500/50')
  })

  it('merges a custom className', () => {
    render(<Button className="w-full">Ok</Button>)

    expect(screen.getByRole('button')).toHaveClass('w-full')
  })

  it('forwards native button attributes', () => {
    render(
      <Button type="submit" aria-label="Enviar">
        Ok
      </Button>,
    )

    expect(screen.getByLabelText('Enviar')).toHaveAttribute('type', 'submit')
  })
})
