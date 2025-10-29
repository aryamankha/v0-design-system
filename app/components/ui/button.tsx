import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '#/app/lib/utils'
import { Tooltip } from './tooltip'

const buttonVariants = cva(
  'focus:border-v0-alpha-400 focus-visible:border-v0-alpha-400 disabled:border-v0-alpha-400 border-v0-alpha-400 hover:border-v0-alpha-400 focus-visible:ring-offset-background aria-disabled:border-v0-alpha-400 outline-hidden has-focus-visible:ring-2 inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap text-nowrap border font-medium ring-v0-caveat-focus-ring-tab transition focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-v0-gray-100 disabled:text-v0-gray-500 disabled:ring-0 aria-disabled:cursor-not-allowed aria-disabled:bg-v0-gray-100 aria-disabled:text-v0-gray-500 aria-disabled:ring-0 [&>svg]:pointer-events-none [&>svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'disabled:border-v0-alpha-400 text-v0-background-100 aria-disabled:border-v0-alpha-400 border-v0-gray-1000 bg-v0-gray-1000 hover:border-v0-gray-900 hover:bg-v0-gray-900 focus:border-v0-gray-900 focus:bg-v0-gray-900 focus-visible:border-v0-gray-900 focus-visible:bg-v0-gray-900',
        secondary:
          'bg-v0-background-300 text-v0-gray-1000 hover:bg-v0-gray-100 focus:bg-v0-gray-100 focus-visible:bg-v0-gray-100',
        ghost:
          'hover:bg-v0-alpha-400 focus-visible:bg-v0-alpha-400 border-transparent bg-transparent text-v0-gray-1000 hover:border-transparent focus:border-transparent focus-visible:border-transparent disabled:border-transparent disabled:bg-transparent disabled:text-v0-gray-500 aria-disabled:border-transparent aria-disabled:bg-transparent aria-disabled:text-v0-gray-500',
        destructive:
          'text-v0-background-100 dark:text-v0-gray-1000 border-v0-red-700 bg-v0-red-700 hover:border-v0-red-800 hover:bg-v0-red-800 focus:border-v0-red-800 focus:bg-v0-red-800 focus-visible:border-v0-red-700 focus-visible:bg-v0-red-800',
        link: 'h-auto! p-0! select-text border-none bg-transparent text-v0-teal-700 underline-offset-2 hover:border-none hover:bg-transparent hover:underline focus:border-v0-gray-100 focus:bg-transparent focus-visible:border-v0-gray-100 focus-visible:bg-transparent',
        unpadded:
          'hover:transparent focus-visible:transparent px-0! border-transparent bg-transparent text-v0-gray-1000 hover:border-transparent focus:border-transparent focus-visible:border-transparent disabled:border-transparent disabled:bg-transparent disabled:text-v0-gray-500 aria-disabled:border-transparent aria-disabled:bg-transparent aria-disabled:text-v0-gray-500',
        outline:
          'border-input bg-v0-background-100 hover:bg-v0-gray-100 hover:text-accent-foreground border font-medium',
        destructiveOutline:
          'bg-v0-background-100 border border-v0-red-1000 font-medium hover:bg-v0-red-700 hover:text-v0-white',
        teal: 'bg-[#E5FFFA] dark:bg-[#032827] text-v0-teal-700 border-[#E5FFFA] dark:border-[#032827] hover:bg-v0-teal-100 dark:hover:bg-[#053634] hover:border-v0-teal-100 dark:hover:border-[#053634] focus:bg-v0-teal-100 dark:focus:bg-[#053634] focus-visible:bg-v0-teal-100 dark:focus-visible:bg-[#053634]',
        'blue-ghost':
          'bg-v0-blue-300 border-transparent text-v0-blue-900 hover:bg-v0-blue-200 hover:border-transparent focus:bg-v0-blue-200 focus:border-transparent focus-visible:bg-v0-blue-200 focus-visible:border-transparent disabled:border-transparent disabled:bg-transparent disabled:text-v0-gray-500 aria-disabled:border-transparent aria-disabled:bg-transparent aria-disabled:text-v0-gray-500',
        blue: 'border-transparent hover:border-transparent focus:border-transparent focus-visible:border-transparent disabled:border-transparent aria-disabled:border-transparent text-v0-universal-white bg-v0-caveat-button-blue-default hover:bg-v0-caveat-button-blue-hover focus-visible:bg-v0-caveat-button-blue-focus',
      },
      size: {
        tiny: 'size-4 [&>svg]:size-2',
        mini: 'h-7 w-7',
        xs: 'h-6 px-2 text-xs has-[>kbd]:gap-2 has-[>svg]:px-1 has-[>kbd]:pr-1',
        default:
          'h-10 px-4 text-sm has-[>kbd]:gap-3 has-[>svg]:px-3 has-[>kbd]:pr-[6px]',
        sm: 'h-8 rounded-[6px] px-3 text-sm has-[>kbd]:gap-2 has-[>svg]:px-2 has-[>kbd]:pr-[6px]',
        lg: 'h-12 px-5 text-base has-[>kbd]:gap-3.5 has-[>svg]:px-4  has-[>kbd]:pr-3',
      },
      rounded: {
        true: 'rounded-full',
        false: 'rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: false,
    },
  },
)

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  tooltip?: string | React.ComponentProps<typeof Tooltip>
  tooltipDirection?: React.ComponentProps<typeof Tooltip>['side']
}

const BASE_BUTTON_TOOLTIP_DELAY = 130

const Button = React.memo(
  React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        className,
        variant,
        size,
        rounded,
        asChild = false,
        disabled,
        tooltip,
        tooltipDirection,
        ...props
      },
      ref,
    ) => {
      const Comp = asChild ? Slot : 'button'

      // Ensure aria-disabled is set when slot is used.
      if (asChild && disabled) {
        props['aria-disabled'] = 'true'
      }

      const button = (
        <Comp
          className={cn(buttonVariants({ variant, size, rounded, className }))}
          disabled={disabled}
          ref={ref}
          {...props}
        />
      )

      if (tooltip) {
        if (typeof tooltip === 'string') tooltip = { content: tooltip }

        if (tooltip.hidden) return button

        if (disabled)
          return (
            <Tooltip delayDuration={BASE_BUTTON_TOOLTIP_DELAY} {...tooltip}>
              <span className="flex items-center justify-center" tabIndex={-1}>
                {button}
              </span>
            </Tooltip>
          )

        return (
          <Tooltip
            delayDuration={BASE_BUTTON_TOOLTIP_DELAY}
            {...tooltip}
            side={tooltipDirection || tooltip.side}
          >
            {button}
          </Tooltip>
        )
      }

      return button
    },
  ),
)
Button.displayName = 'Button'

export { Button, buttonVariants }
