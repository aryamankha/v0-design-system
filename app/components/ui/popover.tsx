'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn } from '#/app/lib/utils'

const Popover = PopoverPrimitive.Root

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverClose = PopoverPrimitive.Close

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> &
    Pick<
      React.ComponentPropsWithRef<typeof PopoverPrimitive.Portal>,
      'container'
    > & {
      withOverlay?: boolean
    }
>(
  (
    {
      className,
      align = 'center',
      sideOffset = 4,
      withOverlay,
      container,
      ...props
    },
    ref,
  ) => {
    const content = (
      <PopoverPrimitive.Content
        align={align}
        className={cn(
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-v0-background-100 z-50 w-84 overflow-hidden rounded-xl shadow-md outline-hidden',
          className,
        )}
        ref={ref}
        sideOffset={sideOffset}
        {...props}
      />
    )

    return (
      <PopoverPrimitive.Portal container={container}>
        {withOverlay ? (
          <div className="fixed inset-0 z-20">{content}</div>
        ) : (
          content
        )}
      </PopoverPrimitive.Portal>
    )
  },
)

PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverAnchor, PopoverTrigger, PopoverContent, PopoverClose }
