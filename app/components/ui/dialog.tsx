'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '#/app/lib/utils'
import { Cross } from '@vercel/geist/icons'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

DialogPortal.displayName = DialogPrimitive.Portal.displayName

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
    omitPortal?: boolean
  }
>(({ className, omitPortal = false, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 bg-v0-background-200/80 inset-0 z-50',
      omitPortal ? 'absolute' : 'fixed',
      className,
    )}
    ref={ref}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    showClose?: boolean
    omitPortal?: boolean
    onClosePressed?: () => void
  }
>(
  (
    {
      className,
      children,
      style,
      onClosePressed,
      showClose = true,
      omitPortal = false,
      ...props
    },
    ref,
  ) => {
    //workaround for radix bug when SSRing dialogs opened by default
    const [_, forceRender] = React.useState(0)
    const containerRef = React.useRef<HTMLElement | null>(null)

    React.useEffect(() => {
      containerRef.current = document.body
      forceRender((prev) => prev + 1)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const dialog = (
      <>
        <DialogOverlay omitPortal={omitPortal} />
        <DialogPrimitive.Content
          className={cn(
            'shadow-modal bg-v0-background-100 left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-[12px] px-6 py-8 outline-hidden duration-200 lg:w-full',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            omitPortal ? 'absolute' : 'fixed',
            className,
          )}
          ref={ref}
          style={{
            ...style,
          }}
          {...props}
        >
          {children}
          {showClose ? (
            <DialogPrimitive.Close
              onClick={onClosePressed}
              className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
            >
              <Cross className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          ) : null}
        </DialogPrimitive.Content>
      </>
    )
    return omitPortal ? (
      dialog
    ) : (
      <DialogPortal container={containerRef.current}>{dialog}</DialogPortal>
    )
  },
)
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col items-center space-y-2 text-center',
      className,
    )}
    {...props}
  />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    className={cn(
      'whitespace-nowrap text-2xl font-semibold tracking-tight',
      className,
    )}
    ref={ref}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    className={cn('text-v0-gray-900', className)}
    ref={ref}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
}
