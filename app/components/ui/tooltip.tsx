'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '#/app/lib/utils'

const TooltipProvider = ({
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) => (
  <TooltipPrimitive.Provider {...props}>{children}</TooltipPrimitive.Provider>
)

// Rather than having the TooltipProvider wrap around the App or in a Layout,
// each Tooltip gets its own Provider to avoid unnecessary Tooltip re-renders.
const TooltipRoot = (
  props: React.ComponentProps<typeof TooltipPrimitive.Root>,
) => (
  <TooltipProvider delayDuration={0} disableHoverableContent>
    <TooltipPrimitive.Root {...props} />
  </TooltipProvider>
)

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      className={cn(
        'shadow-tooltip data-[state=delayed-open]:data-[side=bottom]:animate-slide-up-and-fade data-[state=delayed-open]:data-[side=left]:animate-slide-right-and-fade data-[state=delayed-open]:data-[side=right]:animate-slide-left-and-fade data-[state=delayed-open]:data-[side=top]:animate-slide-down-and-fade data-[state=delayed-open]:animate-in z-50 flex min-h-8 max-w-[250px] items-center gap-1.5 border border-v0-alpha-400 rounded-md bg-v0-gray-100 px-2 py-1.5 text-[13px] text-v0-gray-1000',
        className,
      )}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

const Tooltip = React.memo(
  React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    {
      content?: React.ReactNode
    } & Omit<
      React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
      'content'
    > &
      Pick<
        React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>,
        'open' | 'onOpenChange' | 'delayDuration' | 'disableHoverableContent'
      >
  >(
    (
      {
        open,
        onOpenChange,
        content,
        delayDuration = 0,
        children,
        disableHoverableContent = true,
        ...props
      },
      ref,
    ) => {
      if (!content) return children

      return (
        <TooltipProvider
          delayDuration={delayDuration}
          disableHoverableContent={disableHoverableContent}
        >
          <TooltipPrimitive.Root onOpenChange={onOpenChange} open={open}>
            <TooltipTrigger
              onClick={onOpenChange ? () => onOpenChange(true) : undefined}
              asChild
            >
              {children}
            </TooltipTrigger>
            <TooltipContent collisionPadding={10} {...props} ref={ref}>
              {content}
            </TooltipContent>
          </TooltipPrimitive.Root>
        </TooltipProvider>
      )
    },
  ),
)
Tooltip.displayName = 'Tooltip'

export { TooltipRoot, Tooltip, TooltipTrigger, TooltipContent }
