'use client'

import * as React from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'

import { cn } from '@/lib/utils'

const HoverCard = ({
  openDelay = 100,
  closeDelay = 150,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) => (
  <HoverCardPrimitive.Root
    openDelay={openDelay}
    closeDelay={closeDelay}
    {...props}
  />
)
HoverCard.displayName = HoverCardPrimitive.Root.displayName

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardPortal = HoverCardPrimitive.Portal

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <HoverCardPortal>
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      style={{
        transformOrigin: 'var(--radix-hover-card-content-transform-origin)',
      }}
      className={cn(
        'bg-v0-background-100 z-50 w-84 overflow-hidden rounded-xl shadow-md outline-hidden',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
        'data-[side=bottom]:slide-out-to-top-1 data-[side=left]:slide-out-to-left-1 data-[side=right]:slide-out-to-right-1 data-[side=top]:slide-out-to-bottom-1',
        className,
      )}
      {...props}
    />
  </HoverCardPortal>
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardPortal }
