import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '#/app/lib/utils'

const badgeVariants = cva(
  [
    // base
    'inline-flex items-center justify-center rounded-full shrink-0 whitespace-nowrap',
    // font
    'font-medium tabular-nums',
    // color
    'text-white bg-v0-gray-1000',
  ],
  {
    variants: {
      size: {
        small: [
          // base
          'tracking-[0.2px] text-[11px] h-5 px-1.5 gap-0.5',
        ],
        medium: [
          // base
          'text-[12px] h-6 px-2 gap-1',
        ],
      },
      variant: {
        amber: '',
        blue: '',
        gray: '',
        green: '',
        purple: '',
        red: '',
        teal: '',
        black: '',
      },
      contrast: {
        prominent: '',
        subtle: '',
      },
    },
    compoundVariants: [
      {
        variant: 'amber',
        contrast: 'prominent',
        className: ['bg-v0-amber-700', 'text-v0-universal-black'],
      },
      {
        variant: 'amber',
        contrast: 'subtle',
        className: ['bg-v0-amber-300', 'text-v0-amber-900'],
      },
      {
        variant: 'blue',
        contrast: 'prominent',
        className: ['bg-v0-blue-700', 'text-v0-universal-white'],
      },
      {
        variant: 'blue',
        contrast: 'subtle',
        className: ['bg-v0-blue-300', 'text-v0-blue-900'],
      },
      {
        variant: 'green',
        contrast: 'prominent',
        className: ['bg-v0-green-700', 'text-v0-universal-white'],
      },
      {
        variant: 'green',
        contrast: 'subtle',
        className: ['bg-v0-green-300', 'text-v0-green-900'],
      },
      {
        variant: 'purple',
        contrast: 'prominent',
        className: ['bg-v0-purple-700', 'text-v0-universal-white'],
      },
      {
        variant: 'purple',
        contrast: 'subtle',
        className: ['bg-v0-purple-300', 'text-v0-purple-900'],
      },
      {
        variant: 'red',
        contrast: 'prominent',
        className: ['bg-v0-red-700', 'text-v0-universal-white'],
      },
      {
        variant: 'red',
        contrast: 'subtle',
        className: ['bg-v0-red-300', 'text-v0-red-900'],
      },
      {
        variant: 'teal',
        contrast: 'prominent',
        className: ['bg-v0-teal-700', 'text-v0-universal-white'],
      },
      {
        variant: 'teal',
        contrast: 'subtle',
        className: ['bg-v0-teal-300', 'text-v0-teal-900'],
      },
      {
        variant: 'gray',
        contrast: 'prominent',
        className: ['bg-v0-gray-700', 'text-v0-universal-white'],
      },
      {
        variant: 'gray',
        contrast: 'subtle',
        className: ['bg-v0-gray-300', 'text-v0-gray-1000'],
      },
      {
        variant: 'black',
        contrast: 'prominent',
        className: ['bg-v0-gray-1000', 'text-v0-gray-100'],
      },
    ],
    defaultVariants: {
      variant: 'gray',
      size: 'small',
      contrast: 'subtle',
    },
  },
)

interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'prefix'>,
    VariantProps<typeof badgeVariants> {
  prefix?: React.ReactNode
}

function Prefix({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center justify-center size-4 shrink-0 [&>svg]:size-4">
      {children}
    </span>
  )
}

function Badge({
  children,
  className,
  contrast = 'subtle',
  size = 'small',
  variant = 'gray',
  prefix,
  ...props
}: BadgeProps) {
  // adjust padding if a prefix is present
  const paddingClasses = prefix
    ? size === 'small'
      ? 'pl-0.5 pr-1.5'
      : 'pl-1.5 pr-2'
    : ''

  return (
    <div
      className={cn(
        badgeVariants({ contrast, size, variant }),
        paddingClasses,
        className,
      )}
      {...props}
    >
      {prefix && <Prefix>{prefix}</Prefix>}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
export type { BadgeProps }
