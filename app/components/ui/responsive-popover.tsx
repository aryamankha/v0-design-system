'use client'

import * as React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '#/app/components/ui/popover'
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '#/app/components/ui/drawer'
import { useIsMobile } from '@/lib/hooks/use-window-size'
import { cn } from '#/app/lib/utils'

interface ResponsivePopoverProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger: React.ReactNode
  children: React.ReactNode
  contentClassName?: string
  drawerClassName?: string
  forceMobile?: boolean
  popoverContentProps?: React.ComponentPropsWithoutRef<typeof PopoverContent>
  drawerContentProps?: React.ComponentPropsWithoutRef<typeof DrawerContent>
}

/**
 * ResponsivePopover automatically switches between a Popover (desktop) and
 * a Drawer (mobile) based on screen size
 */
export function ResponsivePopover({
  open,
  onOpenChange,
  trigger,
  children,
  contentClassName,
  drawerClassName = 'h-fit',
  forceMobile,
  popoverContentProps,
  drawerContentProps,
}: ResponsivePopoverProps) {
  const isMobileDevice = useIsMobile()
  const isMobile = forceMobile !== undefined ? forceMobile : isMobileDevice

  // On desktop: render popover
  if (!isMobile) {
    return (
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent
          className={cn('p-0', contentClassName)}
          align="start"
          sideOffset={4}
          {...popoverContentProps}
        >
          {children}
        </PopoverContent>
      </Popover>
    )
  }

  // On mobile: render drawer
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className={cn(drawerClassName)} {...drawerContentProps}>
        {children}
      </DrawerContent>
    </Drawer>
  )
}
