import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { resetNavigation } from '@/test/stubs/next-navigation'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  resetNavigation()
  vi.clearAllMocks()
})

// jsdom does not implement the browser APIs the UI layer relies on.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

class ObserverStub {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): [] {
    return []
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: ObserverStub,
})

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: ObserverStub,
})

if (typeof URL.createObjectURL !== 'function') {
  URL.createObjectURL = () => 'blob:vitest'
  URL.revokeObjectURL = () => {}
}

// jsdom logs "Not implemented: window.scrollTo" unless it is stubbed.
window.scrollTo = () => {}
