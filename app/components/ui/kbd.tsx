import * as React from 'react'

import { cn } from '#/app/lib/utils'

const kbdBaseStyles =
  'pointer-events-none flex select-none items-center justify-center rounded-sm font-normal tabular-nums bg-v0-background-300 text-v0-gray-1000 border border-v0-alpha-400'

const kbdSizes = {
  small: 'text-label-11 px-1 h-4 font-medium',
  medium: 'text-label-12 px-1 h-5',
  large: 'text-label-14 px-1.5 h-6',
}

const KbdGroup = React.forwardRef<
  React.ElementRef<'kbd'>,
  React.ComponentPropsWithoutRef<'kbd'>
>(({ className, ...props }, ref) => {
  return (
    <kbd
      className={cn('flex items-center gap-0.5', className)}
      ref={ref}
      {...props}
    />
  )
})
KbdGroup.displayName = 'KbdGroup'

interface KbdProps extends React.ComponentPropsWithoutRef<'kbd'> {
  size?: 'small' | 'medium' | 'large'
}

const Kbd = React.forwardRef<React.ElementRef<'kbd'>, KbdProps>(
  ({ className, size = 'small', children, ...props }, ref) => {
    const isSquare = typeof children === 'string' && children.length === 1
    return (
      <kbd
        className={cn(
          kbdBaseStyles,
          kbdSizes[size],
          isSquare && size === 'small' && 'w-4 px-0',
          isSquare && size === 'medium' && 'w-5 px-0',
          isSquare && size === 'large' && 'w-6 px-0',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </kbd>
    )
  },
)
Kbd.displayName = 'Kbd'

export { KbdGroup, Kbd }
