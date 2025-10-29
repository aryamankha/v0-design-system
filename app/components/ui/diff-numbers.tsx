import { cn } from '#/app/lib/utils'

export function DiffNumbers({
  added,
  removed,
  className,
}: {
  added: number | boolean | undefined
  removed: number | boolean | undefined
  className?: string
}) {
  if (!added && !removed) return null

  const addedNumber = added ? (
    <div className="text-v0-green-700">
      {typeof added === 'number' ? `+${added}` : '+'}
    </div>
  ) : null
  const removedNumber = removed ? (
    <div className="text-v0-red-800">
      {typeof removed === 'number' ? `-${removed}` : '-'}
    </div>
  ) : null

  return (
    <div
      className={cn(
        'flex items-center gap-0.5 text-xs text-v0-gray-900',
        className,
      )}
    >
      {addedNumber}
      {addedNumber && removedNumber ? <div>/</div> : null}
      {removedNumber}
    </div>
  )
}
