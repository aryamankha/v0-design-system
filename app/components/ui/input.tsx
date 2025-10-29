import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '#/app/lib/utils'
import { ErrorMessage } from './error-message'

const inputVariants = cva(
  [
    'flex w-full items-center rounded-md border border-v0-alpha-400 bg-v0-background-300 text-sm',
    'focus-within:border-v0-alpha-600',
    'hover:border-v0-alpha-500 focus-within:hover:border-v0-alpha-600',
    'has-[:disabled]:pointer-events-none has-[:disabled]:bg-v0-gray-100 has-[:disabled]:border-v0-alpha-400 has-[:disabled]:text-v0-gray-700',
  ],
  {
    variants: {
      size: {
        sm: 'h-7 px-1.5',
        md: 'h-8 px-2',
        lg: 'h-10 px-3',
        xl: 'h-12 px-4',
      },
      hasError: {
        true: [
          'border-v0-red-900 ring-3 ring-v0-caveat-focus-ring-error',
          'focus-within:ring-v0-caveat-focus-ring-error focus-within:border-v0-red-900',
          'hover:border-v0-red-900 hover:ring-3 hover:ring-v0-red-500 focus-within:hover:border-v0-red-900 focus-within:hover:ring-v0-caveat-focus-ring-error',
        ],
      },
      hasPrefix: {
        true: 'pl-0',
      },
      hasSuffix: {
        true: 'pr-0',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const prefixVariants = cva(
  ['flex shrink-0 items-center text-v0-gray-700 h-full'],
  {
    variants: {
      size: {
        sm: 'px-1.5',
        md: 'px-2',
        lg: 'px-3',
        xl: 'px-4',
      },
      styled: {
        true: [
          'bg-v0-background-200 border-r border-v0-alpha-400 rounded-l-md',
          'has-[:disabled]:bg-v0-gray-100 has-[:disabled]:cursor-not-allowed',
        ],
        false: ['bg-transparent'],
      },
    },
    defaultVariants: {
      size: 'md',
      styled: false,
    },
  },
)

const suffixVariants = cva(
  ['flex shrink-0 items-center text-v0-gray-700 h-full'],
  {
    variants: {
      size: {
        sm: 'px-1.5',
        md: 'px-2',
        lg: 'px-3',
        xl: 'px-4',
      },
      styled: {
        true: [
          'bg-v0-background-200 border-l border-v0-alpha-400 rounded-r-md',
          'has-[:disabled]:bg-v0-gray-100 has-[:disabled]:cursor-not-allowed',
        ],
        false: ['bg-transparent'],
      },
    },
    defaultVariants: {
      size: 'md',
      styled: false,
    },
  },
)

export interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size' | 'prefix'>,
    VariantProps<typeof inputVariants> {
  label?: React.ReactNode
  error?: React.ReactNode
  showErrorMessage?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  prefixStyling?: boolean
  suffixStyling?: boolean
  wrapperClassName?: string
  inputClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      inputClassName,
      size,
      label,
      error,
      showErrorMessage = true,
      prefix,
      suffix,
      prefixStyling = false,
      suffixStyling = false,
      id,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const inputId = React.useId()
    const finalId = id || inputId
    const errorId = `${finalId}-error`

    const describedBy = React.useMemo(() => {
      const ids = []
      if (error && showErrorMessage) ids.push(errorId)
      if (ariaDescribedBy) ids.push(ariaDescribedBy)
      return ids.length > 0 ? ids.join(' ') : undefined
    }, [error, showErrorMessage, ariaDescribedBy, errorId])

    const inputElement = (
      <div
        className={cn(
          inputVariants({
            size,
            hasError: !!error,
            hasPrefix: !!prefix,
            hasSuffix: !!suffix,
          }),
          wrapperClassName,
        )}
      >
        {prefix && (
          <div
            className={cn(prefixVariants({ size, styled: prefixStyling }))}
            data-prefix
          >
            {prefix}
          </div>
        )}
        <input
          className={cn(
            [
              'w-full bg-transparent outline-none placeholder:text-v0-gray-700',
              'disabled:cursor-not-allowed disabled:text-v0-gray-700',
              'file:border-0 file:bg-transparent file:text-sm file:font-medium',
              '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
              '[&[type=number]]:appearance-textfield',
            ],
            prefix &&
              prefixStyling &&
              (size === 'sm' ? 'pl-1.5' : size === 'lg' ? 'pl-3' : 'pl-2'),
            suffix &&
              suffixStyling &&
              (size === 'sm' ? 'pr-1.5' : size === 'lg' ? 'pr-3' : 'pr-2'),
            inputClassName,
          )}
          id={finalId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...props}
        />
        {suffix && (
          <div
            className={cn(suffixVariants({ size, styled: suffixStyling }))}
            data-suffix
          >
            {suffix}
          </div>
        )}
      </div>
    )

    const content = (
      <div className={cn('flex w-full flex-col gap-2', className)}>
        {inputElement}
        {error && showErrorMessage && (
          <ErrorMessage id={errorId}>{error}</ErrorMessage>
        )}
      </div>
    )

    if (label) {
      return (
        <div className="flex w-full flex-col gap-2">
          <label className="text-label-13 text-v0-gray-900" htmlFor={finalId}>
            {label}
          </label>
          {content}
        </div>
      )
    }

    return content
  },
)

Input.displayName = 'Input'

export { Input, inputVariants, prefixVariants, suffixVariants }
