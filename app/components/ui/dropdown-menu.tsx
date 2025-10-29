'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

import { cn } from '#/app/lib/utils'
import { Circle } from 'lucide-react'
import { Check } from '@vercel/geist/icons'
import { Checkbox } from '#/app/components/ui/checkbox'
import { Tooltip } from '#/app/components/ui/tooltip'

const DropdownMenu = ({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) => (
  <DropdownMenuPrimitive.Root modal={false} {...props} />
)
DropdownMenu.displayName = DropdownMenuPrimitive.Root.displayName

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Group
    className={cn('p-1.5', className)}
    ref={ref}
    {...props}
  />
))
DropdownMenuGroup.displayName = DropdownMenuPrimitive.Group.displayName

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
    variant?: 'default' | 'destructive'
  }
>(({ className, inset, variant = 'default', ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
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
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, sideOffset = 12, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    className={cn(
      'bg-v0-background-300 z-50 min-w-54 max-w-md origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-xl shadow-sm [&_svg]:shrink-0',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className,
    )}
    ref={ref}
    sideOffset={sideOffset}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      className={cn(
        'bg-v0-background-300 shadow-modal z-50 min-w-54 max-w-md overflow-hidden rounded-xl [&_svg]:shrink-0',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)',
        className,
      )}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
    variant?: 'default' | 'destructive' | 'gold' | 'blue' | 'green'
    svgStyling?: boolean
    disabledReason?: React.ReactNode
  }
>(
  (
    {
      className,
      inset,
      variant = 'default',
      svgStyling = true,
      disabledReason,
      ...props
    },
    ref,
  ) => {
    const item = (
      <DropdownMenuPrimitive.Item
        className={cn(
          'relative flex h-8 w-full select-none items-center gap-3 whitespace-nowrap rounded-md px-1.5 text-sm text-v0-gray-1000 outline-hidden transition-colors focus:bg-v0-gray-100 data-disabled:pointer-events-none data-disabled:opacity-50 [&_span]:truncate',
          inset && 'pl-8',
          svgStyling && '[&_svg]:size-4 [&_svg]:transition-colors',
          svgStyling && {
            '[&_svg]:text-gray-500! [&[data-highlighted]_svg]:text-gray-900!':
              variant === 'default',
            '[&_svg]:text-red-700!': variant === 'destructive',
            '[&_svg]:text-blue-700!': variant === 'blue',
            '[&_svg]:text-amber-600!': variant === 'gold',
            '[&_svg]:text-green-700!': variant === 'green',
          },
          {
            'text-v0-red-800 focus:bg-[#FF666618]': variant === 'destructive',
            'text-v0-green-700 focus:bg-[#66FF6618]': variant === 'green',
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    )

    if (props.disabled && disabledReason) {
      return (
        <Tooltip
          content={disabledReason}
          disableHoverableContent={false}
          side="left"
        >
          <div>{item}</div>
        </Tooltip>
      )
    }

    return item
  },
)
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    className={cn(
      'h-8 content-center px-1.5 text-[13px] text-v0-gray-900',
      inset && 'pl-8',
      className,
    )}
    ref={ref}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    className={cn('h-px bg-v0-gray-200', className)}
    ref={ref}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
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
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> & {
    variant?: 'default' | 'checkbox'
    checkboxPosition?: 'left' | 'right'
  }
>(
  (
    {
      className,
      children,
      checked,
      variant = 'default',
      checkboxPosition = 'left',
      ...props
    },
    ref,
  ) => (
    <DropdownMenuPrimitive.CheckboxItem
      checked={checked}
      className={cn(
        'focus:bg-v0-gray-100 hover:bg-v0-gray-100 focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-md py-1.5 text-sm outline-hidden transition-colors data-disabled:pointer-events-none data-disabled:opacity-50',
        checkboxPosition === 'left' ? 'pl-8 pr-2' : 'pl-2 pr-8',
        className,
      )}
      ref={ref}
      {...props}
    >
      <span
        className={cn(
          'absolute flex h-3.5 w-3.5 items-center justify-center',
          checkboxPosition === 'left' ? 'left-2' : 'right-2',
        )}
      >
        {variant === 'default' ? (
          <DropdownMenuPrimitive.ItemIndicator>
            <Check className="h-4 w-4" />
          </DropdownMenuPrimitive.ItemIndicator>
        ) : (
          <Checkbox
            checked={checked}
            className="h-4 w-4 pointer-events-none"
            variant="black"
          />
        )}
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  ),
)
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    className={cn(
      'focus:bg-v0-gray-100 focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden transition-colors data-disabled:pointer-events-none data-disabled:opacity-50',
      className,
    )}
    ref={ref}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center rounded-full border">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
}
