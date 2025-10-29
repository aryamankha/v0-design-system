'use client'

import * as React from 'react'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'

import { cn } from '#/app/lib/utils'
import { Circle } from 'lucide-react'
import { Check } from '@vercel/geist/icons'

const ContextMenu = ({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) => (
  <ContextMenuPrimitive.Root modal={false} {...props} />
)
ContextMenu.displayName = ContextMenuPrimitive.Root.displayName

const ContextMenuTrigger = ContextMenuPrimitive.Trigger

const ContextMenuGroup = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Group>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Group
    className={cn('p-1.5', className)}
    ref={ref}
    {...props}
  />
))
ContextMenuGroup.displayName = ContextMenuPrimitive.Group.displayName

const ContextMenuPortal = ContextMenuPrimitive.Portal

const ContextMenuSub = ContextMenuPrimitive.Sub

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean
    variant?: 'default' | 'destructive'
  }
>(({ className, inset, variant = 'default', ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    className={cn(
      '[_>svg]:text-v0-gray-900! relative flex h-8 w-full select-none items-center gap-3 rounded-md px-1.5 text-sm text-v0-gray-1000 outline-hidden transition-colors data-disabled:pointer-events-none data-[state=open]:bg-gray-100 data-disabled:opacity-50 [&_svg]:size-4 [&_svg]:transition-colors',
      inset && 'pl-8',
      variant === 'destructive'
        ? 'text-v0-red-800 focus:bg-[#FF666618] [&_svg]:text-v0-red-800!'
        : 'text-v0-gray-1000 focus:bg-v0-gray-100 [&_svg]:text-v0-gray-900!',
      className,
    )}
    ref={ref}
    {...props}
  />
))
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, sideOffset = 12, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    className={cn(
      'bg-v0-background-300 z-50 min-w-54 max-w-md overflow-hidden rounded-xl shadow-sm [&_svg]:shrink-0',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className,
    )}
    ref={ref}
    sideOffset={sideOffset}
    {...props}
  />
))
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      className={cn(
        'bg-v0-background-300 z-50 min-w-54 max-w-md overflow-hidden rounded-xl shadow-sm [&_svg]:shrink-0',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      ref={ref}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean
    variant?: 'default' | 'destructive' | 'gold' | 'blue'
    svgStyling?: boolean
  }
>(
  (
    { className, inset, variant = 'default', svgStyling = true, ...props },
    ref,
  ) => (
    <ContextMenuPrimitive.Item
      className={cn(
        'relative flex h-8 w-full select-none items-center gap-3 whitespace-nowrap rounded-md px-1.5 text-sm text-v0-gray-1000 outline-hidden transition-colors data-disabled:pointer-events-none data-disabled:opacity-50 [&_span]:truncate',
        inset && 'pl-8',
        svgStyling && '[&_svg]:size-4 [&_svg]:transition-colors',
        svgStyling && {
          '[&_svg]:text-gray-500! [&[data-highlighted]_svg]:text-gray-900!':
            variant === 'default',
          '[&_svg]:text-red-700!': variant === 'destructive',
          '[&_svg]:text-blue-700!': variant === 'blue',
          '[&_svg]:text-amber-600!': variant === 'gold',
        },
        variant === 'destructive'
          ? 'text-v0-red-800 focus:bg-[#FF666618]'
          : 'text-v0-gray-1000 focus:bg-v0-gray-100 ',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
)
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    className={cn(
      'h-8 content-center px-1.5 text-[13px] text-v0-gray-900',
      inset && 'pl-8',
      className,
    )}
    ref={ref}
    {...props}
  />
))
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    className={cn('h-px bg-v0-gray-200', className)}
    ref={ref}
    {...props}
  />
))
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'ml-auto text-xs tracking-widest text-v0-gray-900 [&_svg]:size-3.5 [&_svg]:text-v0-gray-900!',
        className,
      )}
      {...props}
    />
  )
}
ContextMenuShortcut.displayName = 'ContextMenuShortcut'

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    checked={checked}
    className={cn(
      'focus:bg-v0-gray-100 focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden transition-colors data-disabled:pointer-events-none data-disabled:opacity-50',
      className,
    )}
    ref={ref}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    className={cn(
      'focus:bg-v0-gray-100 focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden transition-colors data-disabled:pointer-events-none data-disabled:opacity-50',
      className,
    )}
    ref={ref}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center rounded-full border">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
}
