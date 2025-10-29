'use client'

import { Spinner } from '@/components/spinner'
import { Button, ButtonProps } from './button'
import { cn } from '#/app/lib/utils'
import { useFormStatus } from 'react-dom'

interface SpinnerButtonProps extends ButtonProps {
  pending: boolean
  spinnerSide?: 'left' | 'right'
  hideTextWhenPending?: boolean
  innerClassName?: string
}

export function SpinnerButton({
  children,
  pending,
  spinnerSide = 'left',
  hideTextWhenPending = false,
  innerClassName,
  ...props
}: SpinnerButtonProps) {
  const spinner = pending ? <Spinner size={16} /> : null
  const sideSpinner = hideTextWhenPending ? null : spinner
  const centerSpinner = hideTextWhenPending ? (
    <div className="absolute inset-0 flex items-center justify-center">
      {spinner}
    </div>
  ) : null

  return (
    <Button
      size="sm"
      {...props}
      disabled={props.disabled || pending}
      className={cn('relative', props.className)}
    >
      {centerSpinner}
      <div
        className={cn(
          'flex items-center justify-center gap-2 transition-opacity',
          hideTextWhenPending && pending && 'opacity-0',
          innerClassName,
        )}
      >
        {spinnerSide === 'left' ? sideSpinner : null}
        {children}
        {spinnerSide === 'right' ? sideSpinner : null}
      </div>
    </Button>
  )
}

export function FormSpinnerButton({
  children,
  ...props
}: Omit<SpinnerButtonProps, 'pending'>) {
  const { pending } = useFormStatus()
  return (
    <SpinnerButton {...props} pending={pending ?? false}>
      {children}
    </SpinnerButton>
  )
}
