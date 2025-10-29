'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

import { cn } from '#/app/lib/utils'
import { Check, Minus } from '@vercel/geist/icons'
import { cva, VariantProps } from 'class-variance-authority'

const checkboxVariants = cva(
  'disabled:bg-v0-gray-200 disabled:hover:bg-v0-gray-200 bg-v0-background-100 focus-visible:ring-offset-background peer size-4 shrink-0 rounded-sm border border-v0-gray-500 text-v0-gray-1000 ring-v0-caveat-focus-ring-tab hover:border-v0-gray-900 hover:bg-v0-gray-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:border-v0-gray-300 disabled:hover:border-v0-gray-300 data-[state=checked]:text-white data-[state=indeterminate]:text-white',
  {
    variants: {
      variant: {
        default:
          'data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=indeterminate]:border-gray-900 data-[state=indeterminate]:bg-gray-900',
        black:
          'data-[state=checked]:border-gray-900 data-[state=checked]:bg-gray-900 data-[state=indeterminate]:border-gray-900 data-[state=indeterminate]:bg-gray-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> &
    VariantProps<typeof checkboxVariants>
>(({ className, variant, checked, ...props }, ref) => (
  <CheckboxPrimitive.Root
    className={cn(checkboxVariants({ variant, className }))}
    ref={ref}
    checked={checked}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      {checked === 'indeterminate' ? (
        <Minus className="size-2.5" />
      ) : (
        <Check className="size-2.5" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
