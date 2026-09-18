import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchInput from './SearchInput'

describe('SearchInput', () => {
  it('renders the value and the default placeholder', () => {
    render(<SearchInput value="bíceps" onChange={() => {}} />)
    const input = screen.getByRole('searchbox')

    expect(input).toHaveValue('bíceps')
    expect(input).toHaveAttribute('placeholder', 'Buscar peça anatômica…')
  })

  it('emits every keystroke', async () => {
    const onChange = vi.fn()
    render(<SearchInput value="" onChange={onChange} />)

    await userEvent.type(screen.getByRole('searchbox'), 'fem')

    expect(onChange).toHaveBeenCalledTimes(3)
    expect(onChange).toHaveBeenLastCalledWith('m')
  })

  it('accepts a custom placeholder and className', () => {
    const { container } = render(
      <SearchInput value="" onChange={() => {}} placeholder="Filtrar" className="w-full" />,
    )

    expect(screen.getByPlaceholderText('Filtrar')).toBeInTheDocument()
    expect(container.firstElementChild).toHaveClass('w-full')
  })

  it('only shows the clear button when there is a value', () => {
    const { rerender } = render(<SearchInput value="" onChange={() => {}} />)
    expect(screen.queryByRole('button')).toBeNull()

    rerender(<SearchInput value="osso" onChange={() => {}} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('clears the value through the clear button', async () => {
    const onChange = vi.fn()
    render(<SearchInput value="osso" onChange={onChange} />)

    await userEvent.click(screen.getByRole('button'))

    expect(onChange).toHaveBeenCalledWith('')
  })
})
