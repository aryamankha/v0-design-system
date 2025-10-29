import { cn } from '#/app/lib/utils'
import * as NextLink from 'next/link'
import { Tooltip } from './tooltip'

export function Link({
  className,
  children,
  variant = 'default',
  external = false,
  tooltip,
  disabled = false,
  ...props
}: {
  className?: string
  variant?: 'default' | 'marketing'
  children: React.ReactNode
  external?: boolean
  tooltip?: string | React.ComponentProps<typeof Tooltip>
  disabled?: boolean
} & React.ComponentProps<typeof NextLink.default>) {
  const link = (
    <NextLink.default
      className={cn(
        variant === 'marketing' &&
          'font-medium text-v0-teal-700 hover:underline hover:underline-offset-2',
        disabled && 'cursor-not-allowed text-v0-gray-500',
        className,
      )}
      target={external ? '_blank' : undefined}
      {...props}
    >
      {children}
    </NextLink.default>
  )

  if (tooltip) {
    if (typeof tooltip === 'string') {
      tooltip = { content: tooltip }
    }

    return <Tooltip {...tooltip}>{link}</Tooltip>
  }

  return link
}
