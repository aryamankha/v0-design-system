import { cn } from '#/app/lib/utils'

export type GitPillVariant = 'gray' | 'blue'

export function GitPill({
  children,
  variant = 'gray',
  className,
}: {
  children: React.ReactNode
  variant?: GitPillVariant
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-1 px-1.5 py-0.5 rounded-md font-medium font-mono',
        variant === 'gray' && 'bg-v0-gray-300 text-v0-gray-1000',
        variant === 'blue' && 'bg-v0-blue-300 text-v0-blue-900',
        className,
      )}
    >
      {children}
    </div>
  )
}
