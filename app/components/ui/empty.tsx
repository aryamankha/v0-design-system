import * as React from 'react'

import { cn } from '#/app/lib/utils'

const Empty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn('flex items-center justify-center', className)}
    ref={ref}
    {...props}
  />
))
Empty.displayName = 'Empty'

const EmptyContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn('flex flex-col items-center gap-4 text-center', className)}
    ref={ref}
    {...props}
  />
))
EmptyContent.displayName = 'EmptyContent'

const EmptyIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      'shadow-base bg-v0-background-100 flex size-8 items-center justify-center rounded-sm text-v0-gray-900 [&>svg]:size-4 [&>svg]:text-v0-gray-900!',
      className,
    )}
    ref={ref}
    {...props}
  />
))
EmptyIcon.displayName = 'EmptyIcon'

const EmptyTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn('text-base font-medium', className)}
    ref={ref}
    {...props}
  />
))
EmptyTitle.displayName = 'EmptyTitle'

const EmptyDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn('-mt-2 text-sm text-v0-gray-900', className)}
    ref={ref}
    {...props}
  />
))
EmptyDescription.displayName = 'EmptyDescription'

export { Empty, EmptyContent, EmptyIcon, EmptyTitle, EmptyDescription }
