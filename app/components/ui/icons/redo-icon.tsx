import { UndoIcon } from './undo-icon'

export function RedoIcon({ className, ...props }: React.ComponentProps<'svg'>) {
  return <UndoIcon className="rotate-y-180" {...props} />
}
