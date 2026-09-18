import { Fragment, createElement, forwardRef, type ReactNode, type Ref } from 'react'

/**
 * Props that only exist to drive animations. They are dropped before rendering so
 * React does not warn about unknown DOM attributes.
 */
const MOTION_ONLY_PROPS = new Set([
  'initial',
  'animate',
  'exit',
  'transition',
  'variants',
  'whileHover',
  'whileTap',
  'whileFocus',
  'whileInView',
  'whileDrag',
  'viewport',
  'layout',
  'layoutId',
  'layoutScroll',
  'layoutRoot',
  'drag',
  'dragConstraints',
  'dragElastic',
  'dragMomentum',
  'dragDirectionLock',
  'onAnimationStart',
  'onAnimationComplete',
  'onUpdate',
  'onDragStart',
  'onDragEnd',
  'transformTemplate',
  'custom',
  'inherit',
])

type MotionComponentProps = Record<string, unknown> & { children?: ReactNode }

function createMotionComponent(tag: string) {
  const Component = forwardRef<HTMLElement, MotionComponentProps>((props, ref) => {
    const domProps: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(props)) {
      if (!MOTION_ONLY_PROPS.has(key)) domProps[key] = value
    }

    return createElement(tag, { ...domProps, ref: ref as Ref<HTMLElement> })
  })

  Component.displayName = `motion.${tag}`

  return Component
}

export const motion = new Proxy({} as Record<string, ReturnType<typeof createMotionComponent>>, {
  get: (_target, tag: string) => createMotionComponent(tag),
})

export function AnimatePresence({ children }: { children?: ReactNode }) {
  return createElement(Fragment, null, children)
}

export function useReducedMotion(): boolean {
  return false
}

const framerMotionStub = { motion, AnimatePresence, useReducedMotion }

export default framerMotionStub
