import { cn } from '#/app/lib/utils'
import { CrossSmall } from '@vercel/geist/icons'
import { cva } from 'class-variance-authority'
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '#/app/components/ui/hover-card'
import Link from 'next/link'
const contextPillStyles = cva(
  'text-[13px] border-v0-alpha-400 group relative max-w-[200px] inline-flex h-[24px] overflow-hidden items-center rounded-[6px] border transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-v0-gray-100 [--hover-color:theme(colors.gray.200)]',
        refinement:
          'bg-v0-blue-300 text-v0-blue-900 [--hover-color:theme(colors.blue.200)]',
        warning:
          'bg-v0-amber-200 text-v0-amber-700 [--hover-color:theme(colors.amber.200)]',
      },
      hasHover: {
        true: 'hover:bg-[var(--hover-color)] cursor-pointer',
        false: 'cursor-text',
      },
    },
  },
)

interface ContextPillProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'prefix' | 'onClick'> {
  children: React.ReactNode
  prefix?: React.ReactNode
  variant?: 'default' | 'refinement' | 'warning'
  hoverContent?: React.ReactNode
  canRemove?: boolean
  onClick?: () => void
  href?: string
  onRemove?: () => void
}

export function ContextPill({
  prefix,
  children,
  variant = 'default',
  onClick,
  onRemove,
  hoverContent,
  canRemove,
  href,
  className,
  ...props
}: ContextPillProps) {
  const shouldRenderRemoveButton = canRemove && onRemove

  const hasHover = Boolean(hoverContent || onClick || href)
  const Component = href ? Link : 'span'

  return (
    <HoverCard closeDelay={50} openDelay={100}>
      <span
        {...props}
        data-context-pill="true"
        className={cn(
          contextPillStyles({
            variant,
            hasHover,
            className,
          }),
        )}
      >
        <Component
          href={href!}
          className={cn(
            'flex items-center gap-1.5 overflow-hidden h-full pl-1 !no-underline font-normal',
            prefix ? 'pl-1' : 'pl-2',
          )}
          onClick={onClick}
        >
          {prefix ? (
            <div className="relative flex h-4 min-w-4 items-center justify-center [&_svg]:scale-90">
              {prefix}
            </div>
          ) : null}
          <HoverCardTrigger asChild>
            <span
              className={cn(
                'truncate inline overflow-hidden pr-1.5 transition-all',
                shouldRenderRemoveButton &&
                  'group-hover:[mask-image:linear-gradient(to_right,black_calc(100%-32px),transparent_calc(100%-20px),transparent_100%)]',
              )}
            >
              {children}
            </span>
          </HoverCardTrigger>
        </Component>
        {shouldRenderRemoveButton ? (
          <button
            aria-label="Remove context item"
            type="button"
            onClick={onRemove}
            className="absolute right-1 z-10 text-v0-gray-900 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-v0-caveat-focus-ring-tab focus-visible:bg-v0-gray-100 focus-visible:ring-offset-background rounded-sm"
          >
            <CrossSmall />
          </button>
        ) : null}
      </span>

      {hoverContent ? (
        <HoverCardContent
          side="top"
          sideOffset={8}
          className="border-none material-menu min-w-[var(--radix-hover-card-trigger-width)] w-auto"
        >
          {hoverContent}
        </HoverCardContent>
      ) : null}
    </HoverCard>
  )
}

export function PillIcon({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn('text-v0-gray-900', className)}>{children}</div>
}
