import { CSSProperties } from 'react'

export type TransitionProperties =
  | 'width'
  | 'height'
  | 'min-width'
  | 'min-height'
  | 'opacity'
  | 'background'
  | 'translate'
  | 'color'
  | 'border-width'
  | 'border-color'
  | 'border-radius'
  | 'transform'
  | 'box-shadow'
  | 'padding'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top'
  | 'justify-content'
  | 'margin'
  | 'max-height'
  | 'backdrop-filter'
  | 'grid-template-columns'
  | 'grid-template-rows'
  | 'inset'
  | 'font-size'
  | 'clip-path'
  | 'mask-image'
  | 'mask-size'
  | 'mask-position'
  | 'letter-spacing'
  | 'filter'
  | 'fill'
  | 'perspective'
  | 'rotate'
  | 'scale'
  | 'skew'
  | 'font-weight'
  | 'background-size'
  | 'translateX'
  | 'translateY'

const GPU_ACCELERATED_PROPERTIES: Partial<TransitionProperties>[] = [
  'opacity',
  'transform',
  'rotate',
  'scale',
  'skew',
  'perspective',
  'translateX',
  'translateY',
  'translate',
  'box-shadow',
  'backdrop-filter',
  'filter',
  'clip-path',
]

export const DEFAULT_EASE: CubicBezier = [0.31, 0.1, 0.08, 0.96] as const
export const DEFAULT_DURATION = 200
export const DEFAULT_DELAY = 0

export type CubicBezier = [number, number, number, number]

const shouldReduceMotion =
  typeof window === 'undefined'
    ? false
    : window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function transitionStyles(
  properties: TransitionProperties[],
  options?: {
    duration?: number
    timingFunction?: CubicBezier
    delay?: number
  },
): CSSProperties {
  const needsWillChange = properties.filter(
    (property) => !GPU_ACCELERATED_PROPERTIES.includes(property),
  )

  return {
    transitionProperty: properties.join(', '),
    transitionDuration: `${shouldReduceMotion ? 0 : (options?.duration ?? DEFAULT_DURATION)}ms`,
    transitionTimingFunction: `cubic-bezier(${(options?.timingFunction ?? DEFAULT_EASE).join(', ')})`,
    transitionDelay: `${shouldReduceMotion ? 0 : (options?.delay ?? DEFAULT_DELAY)}ms`,
    willChange: needsWillChange.length ? needsWillChange.join(', ') : 'auto',
  } as const
}

export const motionTransition = ({
  duration,
  timingFunction,
  delay,
}: {
  duration?: number
  timingFunction?: CubicBezier
  delay?: number
} = {}) => {
  return {
    transition: {
      duration: (duration ?? DEFAULT_DURATION) / 1000,
      ease: timingFunction ?? DEFAULT_EASE,
      delay: (delay ?? DEFAULT_DELAY) / 1000,
    },
  }
}

export const motionPresence = ({
  initial = {},
  animate = {},
  exit = {},
}: {
  initial?: Record<string, number | string>
  animate?: Record<string, number | string>
  exit?: Record<string, number | string>
} = {}) => {
  return {
    initial: { opacity: 0, ...initial },
    animate: { opacity: 1, ...animate },
    exit: { opacity: 0, ...exit },
  }
}
