import { cn } from '#/app/lib/utils'

export function HeaderSlash({
  className,
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <span
      aria-hidden
      className={cn(
        'text-v0-alpha-400 w-4 min-w-4 select-none text-center text-lg',
        className,
      )}
      style={style}
    >
      /
    </span>
  )
}
