'use client'

import * as React from 'react'
import { type DialogProps } from '@radix-ui/react-dialog'
import { Command as CommandPrimitive } from 'cmdk'

import { cn } from '#/app/lib/utils'
import { MagnifyingGlass } from '@vercel/geist/icons'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './dialog'

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent
        className="overflow-hidden p-0"
        omitPortal
        showClose={false}
      >
        <DialogTitle className="sr-only">Command</DialogTitle>
        <DialogDescription className="sr-only">
          Select the command you want to run.
        </DialogDescription>
        <Command className="[&_[cmdk-group-heading]]:text-v0-gray-900 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    className={cn(
      'bg-v0-background-100 flex size-full flex-col overflow-hidden rounded-xl text-v0-gray-1000',
      className,
    )}
    ref={ref}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> & {
    divClassName?: string
    iconSize?: number
    icon?: React.ReactNode
  }
>(({ className, divClassName, iconSize = 16, icon, ...props }, ref) => (
  <div
    className={cn('flex items-center gap-3 border-b px-4', divClassName)}
    cmdk-input-wrapper=""
  >
    <span className="size-4 shrink-0 text-v0-gray-900!">
      {icon ?? <MagnifyingGlass size={iconSize} />}
    </span>
    <CommandPrimitive.Input
      className={cn(
        'flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-v0-gray-500 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    className={cn(
      'max-h-[300px] scroll-py-1.5 overflow-y-auto overflow-x-hidden',
      className,
    )}
    ref={ref}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    className="py-6 text-center text-sm"
    ref={ref}
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    className={cn(
      'overflow-hidden px-1.5 py-2 text-v0-gray-900 [&_[cmdk-group-heading]]:p-2 [&_[cmdk-group-heading]]:text-[0.8125rem] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-v0-gray-900',
      className,
    )}
    ref={ref}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    className={cn('bg-v0-alpha-400 h-px', className)}
    ref={ref}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center gap-3 rounded-md px-2 py-2.5 text-sm text-v0-gray-1000 outline-hidden transition-colors aria-selected:bg-v0-gray-100 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&>svg]:size-4 [&>svg]:transition-colors [&[data-selected=true]_[cmdk-item-actions]]:visible',
      className,
    )}
    ref={ref}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'ml-auto text-xs tracking-widest text-v0-gray-900',
        className,
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = 'CommandShortcut'

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
  CommandDialog,
}
