import * as React from 'react'

import { Stop } from '@vercel/geist/icons'
import { cn } from '#/app/lib/utils'

const errorBaseStyles = '!text-v0-red-900 flex items-center text-label-13'

const ErrorMessage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className }, ref) => {
  return (
    <div className={cn(errorBaseStyles, className)} ref={ref}>
      <div aria-hidden className={'flex items-center mr-2'}>
        <Stop className="!size-4" />
      </div>
      {children}
    </div>
  )
})

ErrorMessage.displayName = 'ErrorMessage'
export { ErrorMessage }
