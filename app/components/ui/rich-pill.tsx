import { cn } from '#/app/lib/utils'
import { CrossSmall } from '@vercel/geist/icons'

interface RichPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: string
  icon?: React.ReactNode
  onRemove?: () => void
  selected?: boolean
}

export function RichPill({
  children,
  icon,
  onRemove,
  className,
  onClick,
  ...props
}: RichPillProps) {
  return (
    <span
      {...props}
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 rounded-sm bg-v0-gray-100 border-v0-alpha-400 border h-5 pl-[6px] pr-2 text-v0-gray-900 max-w-min',
        icon ? 'pl-[3px]' : '',
        onRemove ? 'pr-[3px]' : '',
        onClick !== undefined ? 'cursor-pointer hover:underline' : '',
        className,
      )}
    >
      <div className="flex items-center gap-[4px]">
        <div className="flex items-center justify-center">
          <div className="scale-75">{icon}</div>
        </div>
        <span className="text-v0-gray-1000 text-label-12 whitespace-nowrap tracking-normal">
          {children}
        </span>
      </div>
      {onRemove && (
        <button onClick={onRemove}>
          <CrossSmall />
        </button>
      )}
    </span>
  )
}
