import { cn } from '#/app/lib/utils'

export function ContextInlinePill({
  children,
  className,
  onClick,
  mono,
  rounded,
  ...props
}: React.HTMLProps<HTMLSpanElement> & {
  mono?: boolean
  rounded?: boolean
}) {
  return (
    <span
      data-context-mention="true"
      className={cn(
        'inline-flex px-1 relative text-[13px] mr-[1px] group',
        mono ? 'font-mono text-[12px]' : '', // 12px bc mono is optically larger
        onClick ? 'cursor-pointer' : '',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <span
        className={cn(
          'absolute inset-y-[-0.5px] inset-x-0 bg-v0-gray-100 z-0 transition-colors',
          onClick ? 'group-hover:bg-v0-gray-200' : '',
          rounded ? 'rounded-full' : 'rounded-[4px]',
        )}
      />
      <span className="relative z-10">{children}</span>
    </span>
  )
}
