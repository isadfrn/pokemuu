import { describe, it, expect } from 'vitest'
import { toFilename } from './download'

describe('toFilename', () => {
  it('lowercases and slugifies spaces', () => {
    expect(toFilename('Músculo Bíceps')).toBe('musculo-biceps')
  })

  it('strips accents (NFD normalization)', () => {
    expect(toFilename('Coração')).toBe('coracao')
  })

  it('collapses runs of non-alphanumerics into a single dash', () => {
    expect(toFilename('a  --  b')).toBe('a-b')
  })

  it('trims leading and trailing dashes', () => {
    expect(toFilename('  (especial)  ')).toBe('especial')
  })

  it('handles an all-symbol name without leaving stray dashes', () => {
    expect(toFilename('!!!')).toBe('')
  })
})
