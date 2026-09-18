import { vi } from 'vitest'

export interface NavigationRouter {
  push: ReturnType<typeof vi.fn>
  replace: ReturnType<typeof vi.fn>
  back: ReturnType<typeof vi.fn>
  forward: ReturnType<typeof vi.fn>
  refresh: ReturnType<typeof vi.fn>
  prefetch: ReturnType<typeof vi.fn>
}

export interface NavigationState {
  pathname: string
  searchParams: URLSearchParams
  router: NavigationRouter
}

function createRouter(): NavigationRouter {
  return {
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }
}

/**
 * Mutable navigation state shared with tests. Read it through `navigationState`
 * (never destructure the router) because `resetNavigation()` swaps the instance.
 */
export const navigationState: NavigationState = {
  pathname: '/',
  searchParams: new URLSearchParams(),
  router: createRouter(),
}

export function resetNavigation(): void {
  navigationState.pathname = '/'
  navigationState.searchParams = new URLSearchParams()
  navigationState.router = createRouter()
}

export function usePathname(): string {
  return navigationState.pathname
}

export function useSearchParams(): URLSearchParams {
  return navigationState.searchParams
}

export function useRouter(): NavigationRouter {
  return navigationState.router
}

export const NEXT_NOT_FOUND = 'NEXT_NOT_FOUND'

export function notFound(): never {
  throw new Error(NEXT_NOT_FOUND)
}
