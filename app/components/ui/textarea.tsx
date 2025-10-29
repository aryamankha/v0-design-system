import * as React from 'react'

import { cn } from '#/app/lib/utils'
import { Slot } from '@radix-ui/react-slot'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'textarea'
  return (
    <Comp
      className={cn(
        'focus-visible:border-v0-alpha-500 disabled:border-v0-alpha-400 bg-v0-background-100 inline-flex min-h-20 w-full shrink-0 rounded-lg border p-3 text-sm outline-hidden transition-colors file:border-0 placeholder:text-v0-gray-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-v0-gray-100 disabled:text-v0-gray-500 disabled:ring-0',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }
