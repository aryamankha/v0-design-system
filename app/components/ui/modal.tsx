'use client'

import * as React from 'react'
import { cn } from '#/app/lib/utils'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Drawer as DrawerPrimitive } from 'vaul'
import { useIsMobile } from '@/lib/hooks/use-window-size'

interface ModalPreventDefaultManager {
  count: number
  originalPreventDefault: (this: Event) => void
  customPreventDefault: (this: Event) => void
}

declare global {
  interface Window {
    _modalPreventDefaultManager?: ModalPreventDefaultManager
  }
}

const ModalHeader = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => (
  <div
    className={cn(
      'relative grid gap-3 p-3 md:p-6 [&+_[modal-body]]:pt-0',
      className,
    )}
    modal-header=""
    {...props}
  >
    {children}
  </div>
)
ModalHeader.displayName = 'ModalHeader'

// Forwards the ref to the underlying div element
const ModalContent = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    className={cn('p-3 md:p-6', className)}
    modal-body=""
    {...props}
    ref={ref}
  />
))
ModalContent.displayName = 'ModalContent'

const ModalFooter = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => (
  <div
    className={cn(
      'flex flex-col-reverse gap-2 p-3 sm:flex-row sm:justify-end md:p-4',
      className,
    )}
    modal-footer=""
    {...props}
  />
)
ModalFooter.displayName = 'ModalFooter'

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    className={cn('text-heading-16 sm:text-heading-20', className)}
    ref={ref}
    {...props}
  />
))
ModalTitle.displayName = DialogPrimitive.Title.displayName

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    className={cn('text-label-14 text-v0-gray-900', className)}
    ref={ref}
    {...props}
  />
))
ModalDescription.displayName = DialogPrimitive.Description.displayName

const Modal = React.forwardRef<
  React.ElementRef<
    typeof DialogPrimitive.Content | typeof DrawerPrimitive.Content
  >,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
    trigger?: React.ReactNode
    responsive?: boolean
    showDrawerHandle?: boolean
  } & Pick<
      React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>,
      'open' | 'onOpenChange' | 'defaultOpen'
    > &
    Pick<React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Root>, 'onClose'>
>(
  (
    {
      className,
      children,
      trigger,
      responsive = true,
      showDrawerHandle = true,
      open,
      onOpenChange,
      defaultOpen,
      onClose,
      ...props
    },
    ref,
  ) => {
    const isMobile = useIsMobile()

    // Override Radix's scroll prevention with safe reference counting
    React.useEffect(() => {
      if (!open) return

      const getOrCreateManager = (): ModalPreventDefaultManager => {
        if (!window._modalPreventDefaultManager) {
          window._modalPreventDefaultManager = {
            count: 0,
            originalPreventDefault: Event.prototype.preventDefault,
            customPreventDefault(this: Event) {
              if (this.type === 'wheel') {
                const target = this.target as HTMLElement | null
                if (
                  target?.closest(
                    '[role="listbox"], [role="menu"], [role="combobox"]',
                  )
                ) {
                  return // Allow scrolling in dropdowns
                }
              }
              return window._modalPreventDefaultManager!.originalPreventDefault.call(
                this,
              )
            },
          }
        }
        return window._modalPreventDefaultManager
      }

      const manager = getOrCreateManager()
      manager.count++

      // Only override preventDefault on the first modal
      if (manager.count === 1) {
        Event.prototype.preventDefault = manager.customPreventDefault
      }

      return () => {
        manager.count--
        // Restore original preventDefault when all modals are closed
        if (manager.count === 0) {
          Event.prototype.preventDefault = manager.originalPreventDefault
        }
      }
    }, [open])

    if (isMobile && responsive) {
      return (
        <DrawerPrimitive.Root
          onClose={onClose}
          onOpenChange={onOpenChange}
          open={open}
          shouldScaleBackground
        >
          <DrawerPrimitive.Trigger asChild>{trigger}</DrawerPrimitive.Trigger>
          <DrawerPrimitive.Portal>
            <DrawerPrimitive.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 bg-v0-background-200/80 fixed inset-0 z-50" />
            <DrawerPrimitive.Content
              className={cn(
                'shadow-modal bg-v0-background-100 fixed inset-x-0 bottom-0 z-50 flex h-auto max-h-[80%] flex-col gap-2 rounded-t-xl outline-hidden [&_[modal-header]]:text-center',
                showDrawerHandle ? 'pt-[22px] has-[>_img]:pt-0' : '',
                className,
              )}
              modal-drawer=""
              {...props}
              ref={ref}
            >
              {showDrawerHandle && (
                <div
                  className="absolute inset-x-0 top-0 flex items-center justify-center py-2 after:h-1.5 after:w-14 after:rounded-full after:bg-v0-gray-300 md:hidden"
                  modal-handle=""
                />
              )}
              <div className="overflow-auto">{children}</div>
            </DrawerPrimitive.Content>
          </DrawerPrimitive.Portal>
        </DrawerPrimitive.Root>
      )
    }

    return (
      <DialogPrimitive.Root
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        open={open}
      >
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 bg-v0-background-200/80 fixed inset-0 z-50" />
          <DialogPrimitive.Content
            className={cn(
              'shadow-modal bg-v0-background-100 fixed left-[50%] top-[50%] z-50 w-full max-w-[90%] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-xl text-v0-gray-1000 outline-hidden duration-200 md:w-[540px] [&_[modal-handle]]:hidden',
              'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
              className,
            )}
            modal-dialog=""
            {...props}
            ref={ref}
          >
            {children}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    )
  },
)
Modal.displayName = DialogPrimitive.Content.displayName

const ModalClose = DialogPrimitive.Close
const ModalOpen = DialogPrimitive.Trigger

export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
  ModalClose,
  ModalOpen,
}
