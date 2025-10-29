'use client'

import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'

import { cn } from '#/app/lib/utils'

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    thumbClassName?: string
    asDiv?: boolean
  }
>(({ className, thumbClassName, asDiv, children, ...props }, ref) => {
  const thumb = (
    <SwitchPrimitives.Thumb
      className={cn(
        'bg-v0-background-100 pointer-events-none block size-[calc(--spacing(4)-2px)] rounded-full shadow-sm ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0 dark:bg-v0-black',
        thumbClassName,
      )}
    >
      {children}
    </SwitchPrimitives.Thumb>
  )

  return (
    <SwitchPrimitives.Root
      className={cn(
        'focus-visible:ring-offset-background peer inline-flex h-4 w-8 shrink-0 cursor-pointer items-center rounded-full border outline-hidden ring-v0-caveat-focus-ring-tab transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-100',
        className,
      )}
      {...props}
      asChild={asDiv}
      ref={ref}
    >
      {asDiv ? <div>{thumb}</div> : thumb}
    </SwitchPrimitives.Root>
  )
})
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
