import { cn } from '#/app/lib/utils'

export function InputCounter({
  count,
  max,
  className,
  displayThreshold,
  alertThreshold,
  message,
  messageThreshold,
  ...props
}: {
  count: number
  max: number
  message?: string
  displayThreshold?: number
  alertThreshold?: number
  messageThreshold?: number
} & React.ComponentProps<'div'>) {
  displayThreshold = displayThreshold ?? max * 0.75
  messageThreshold = messageThreshold ?? max * 0.9
  alertThreshold = alertThreshold ?? max * 0.95

  return (
    <div
      className={cn(
        'pointer-events-none items-center gap-2 rounded-md px-2 py-1 text-xs',
        count >= displayThreshold ? 'flex' : 'hidden',
        count >= alertThreshold ? 'text-v0-red-700' : 'text-v0-gray-900',
        className,
      )}
      {...props}
    >
      {message && count >= messageThreshold && <span>{message}</span>}
      <span className="ml-auto tabular-nums">
        {count.toLocaleString()}/{max.toLocaleString()}
      </span>
    </div>
  )
}
