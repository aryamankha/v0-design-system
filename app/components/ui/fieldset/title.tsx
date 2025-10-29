import { cn } from '#/app/lib/utils'

export const FieldsetTitle = ({
  id,
  children,
  className,
}: {
  id?: string
  children: React.ReactNode
  className?: string
}) => {
  return (
    <h3
      className={cn('pb-4 text-base font-semibold', className)}
      id={id ?? undefined}
    >
      {children}
    </h3>
  )
}
