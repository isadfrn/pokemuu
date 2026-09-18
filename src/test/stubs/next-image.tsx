/* eslint-disable @next/next/no-img-element */
import { createElement, forwardRef } from 'react'

interface ImageProps {
  src: unknown
  alt?: string
  width?: number | string
  height?: number | string
  fill?: boolean
  priority?: boolean
  sizes?: string
  quality?: number | string
  placeholder?: string
  blurDataURL?: string
  loader?: unknown
  unoptimized?: boolean
  className?: string
  style?: Record<string, unknown>
  loading?: 'lazy' | 'eager'
}

const NEXT_IMAGE_ONLY_PROPS = new Set([
  'fill',
  'priority',
  'sizes',
  'quality',
  'placeholder',
  'blurDataURL',
  'loader',
  'unoptimized',
])

function resolveSrc(src: unknown): string {
  if (typeof src === 'string') return src
  if (src && typeof src === 'object' && 'src' in src) return String((src as { src: unknown }).src)
  return ''
}

const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const domProps: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(props)) {
    if (!NEXT_IMAGE_ONLY_PROPS.has(key)) domProps[key] = value
  }

  return createElement('img', { ...domProps, src: resolveSrc(props.src), ref })
})

Image.displayName = 'NextImage'

export default Image
