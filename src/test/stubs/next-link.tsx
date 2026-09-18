import { createElement, forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react'

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children?: ReactNode
  prefetch?: boolean
  replace?: boolean
  scroll?: boolean
  shallow?: boolean
  locale?: string | false
}

const NON_DOM_PROPS = new Set([
  'href',
  'prefetch',
  'replace',
  'scroll',
  'shallow',
  'locale',
  'legacyBehavior',
  'passHref',
])

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const domProps: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(props)) {
    if (!NON_DOM_PROPS.has(key)) domProps[key] = value
  }

  return createElement('a', { ...domProps, href: props.href, ref })
})

Link.displayName = 'NextLink'

export default Link
