'use client'

import * as React from 'react'

import { cn } from '#/app/lib/utils'
import { Button } from '#/app/components/ui/button'
import { Separator } from '#/app/components/ui/separator'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const ActionGroup = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        'bg-v0-background-100 flex w-fit items-center gap-1 rounded-[10px] p-1 shadow-sm',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
ActionGroup.displayName = 'ActionGroup'

const Action = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => {
  return (
    <Button
      className={cn(
        'hover:bg-v0-alpha-400 focus:bg-v0-alpha-400 focus-visible:bg-v0-alpha-400 h-6 min-w-6 rounded-md px-1 text-sm text-v0-gray-900 hover:text-v0-gray-1000 focus:text-v0-gray-1000 focus-visible:text-v0-gray-1000 has-[>kbd]:gap-[6px] has-[>svg]:px-1',
        className,
      )}
      ref={ref}
      size="xs"
      variant="ghost"
      {...props}
    />
  )
})
Action.displayName = 'Action'

const ActionSeparator = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      className={cn('bg-v0-alpha-400 h-5 w-px', className)}
      ref={ref}
      {...props}
    />
  )
})
ActionSeparator.displayName = 'ActionSeparator'

export { ActionGroup, Action, ActionSeparator }
