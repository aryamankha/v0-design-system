import { cn } from '@/lib/utils'

export function Fieldset({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'border-v0-gray-300 flex flex-col justify-between rounded-lg border',
        className,
      )}
    >
      {children}
    </div>
  )
}
