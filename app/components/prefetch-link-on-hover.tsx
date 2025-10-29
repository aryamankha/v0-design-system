'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

/**
 * `PrefetchLinkAndRefreshOnHover` is a component that extends the Next.js `Link` component.
 * It prefetches the linked page when the user hovers over or touches the link, improving navigation speed.
 *
 * @param {string} href - The URL to navigate to. This is passed to the underlying `Link` component.
 * @param {Omit<React.ComponentProps<typeof Link>, 'href'>} props - All other props that are valid for the Next.js `Link` component.
 * @param {boolean | null} [props.prefetch] - Whether to prefetch the page. Defaults to `true` if not explicitly set. If explicitly passed as `null`, a partial prefetching will be enabled.
 *
 * @note Originally, we tried to fix "New Chat" being slow by adding the `prefetch` prop.
 * However, this can expire, so we instead prefetch on hover.
 */
function PrefetchLinkAndRefreshOnHoverImpl({
  href,
  onMouseDownNavigate = false,
  ...props
}: { href: string; onMouseDownNavigate?: boolean } & React.ComponentProps<
  typeof Link
>) {
  const router = useRouter()

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!onMouseDownNavigate) {
      return
    }
    const isLeftClick = e.button === 0
    const isOpeningInNewTab = e.metaKey || e.ctrlKey
    const isOpeningInNewWindow = e.shiftKey

    if (isOpeningInNewTab || isOpeningInNewWindow || !isLeftClick) {
      return
    }
    e.preventDefault()

    router.push(href)
  }

  const { prefetch, ...rest } = props

  return (
    <Link
      {...rest}
      href={href}
      onMouseEnter={() => {
        router.prefetch(href)
      }}
      onTouchStart={() => {
        router.prefetch(href)
      }}
      onMouseDown={handleMouseDown}
    />
  )
}

export const PrefetchLinkAndRefreshOnHover = React.memo(
  PrefetchLinkAndRefreshOnHoverImpl,
)
