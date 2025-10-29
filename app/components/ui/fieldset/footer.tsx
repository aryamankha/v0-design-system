import { cn } from '#/app/lib/utils'
export function FieldsetFooter({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <footer
      className={cn(
        `border-v0-gray-300 bg-v0-background-200 rounded-b-lg border-t px-4 py-3`,
        className,
      )}
    >
      {children}
    </footer>
  )
}
