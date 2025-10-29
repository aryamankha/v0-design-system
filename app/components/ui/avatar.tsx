'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '#/app/lib/utils'
import { useUser } from '#/app/components/contexts/user'

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  {
    size?: 'xs' | 'sm' | 'md'
    rounded?: boolean
  } & React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(
  (
    { className, size = 'md', rounded: roundedFromProps, children, ...props },
    ref,
  ) => {
    // Auto-convert rounded-full className to rounded prop to prevent border radius conflicts
    let isRounded = roundedFromProps

    if (className?.includes('rounded-full')) {
      isRounded = true
    }

    return (
      <AvatarPrimitive.Root
        className={cn(
          'bg-v0-alpha-400 relative flex shrink-0 select-none items-center justify-center overflow-hidden after:absolute after:inset-0 after:border after:mix-blend-darken dark:after:mix-blend-lighten',
          size === 'xs' &&
            'size-4 rounded-sm text-[0.5rem] after:rounded-sm [&_svg]:size-3',
          size === 'sm' &&
            'size-6 rounded-lg text-xs after:rounded-lg [&_svg]:size-4',
          size === 'md' &&
            'size-8 rounded-lg text-sm after:rounded-lg [&_svg]:size-6',
          isRounded && 'rounded-full after:rounded-full',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </AvatarPrimitive.Root>
    )
  },
)
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    className={cn('aspect-square h-full w-full object-cover', className)}
    ref={ref}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    className={cn(
      'flex size-full items-center justify-center rounded-lg',
      className,
    )}
    ref={ref}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

const AvatarUser = React.memo(
  React.forwardRef<
    React.ElementRef<typeof Avatar>,
    {
      userId?: string
      teamId?: string
      username?: string
      avatarSha?: string
      alt?: string
      title?: string
      s?: number | 'original'
    } & React.ComponentPropsWithoutRef<typeof Avatar>
  >(
    (
      {
        size = 'md',
        userId,
        teamId,
        username,
        avatarSha,
        alt = 'Avatar',
        title = '',
        s = 64,
        ...props
      },
      ref,
    ) => {
      const { user } = useUser()

      // Use user hash for latest avatar, avoids cache issues
      const userAvatarSha = React.useMemo(() => {
        if (!user) {
          return null
        }
        if (user.id === userId || user.username === username) {
          return user.avatarSha
        }
        return null
      }, [user, userId, username])

      if (!userId && !teamId && !username) {
        console.error(
          'AvatarUser: One of userId, username, or teamId must be provided',
        )
        return null
      }

      const src = getAvatarUrl({
        teamId,
        username,
        userId,
        s,
        userHash: avatarSha ?? userAvatarSha,
      })

      return (
        <Avatar
          // Force re-render when user/team changes to update avatar
          key={`avatar-${userId ?? username ?? teamId}`}
          ref={ref}
          size={size}
          {...props}
        >
          <AvatarImage
            alt={alt}
            className="aspect-auto"
            src={src}
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
            }}
            title={title}
          />
        </Avatar>
      )
    },
  ),
)

AvatarUser.displayName = 'AvatarUser'

export { Avatar, AvatarImage, AvatarFallback, AvatarUser }

function getAvatarUrl({
  teamId,
  username,
  userId,
  s,
  userHash,
}: {
  userId?: string
  teamId?: string
  username?: string
  s?: number | 'original'
  userHash?: string | null
}) {
  const baseUrl = new URL('https://vercel.com/api/www/avatar')
  const hasValidSHA = userHash && /^[0-9a-f]{40}$/.test(userHash)
  if (teamId) baseUrl.searchParams.set('teamId', teamId)
  else if (hasValidSHA) {
    baseUrl.pathname = baseUrl.pathname + `/${userHash}`
    return baseUrl.toString()
  } else if (username) baseUrl.searchParams.set('u', username)
  else baseUrl.pathname = `${baseUrl.pathname}/${userId}`

  if (s === 'original') baseUrl.searchParams.set('s', s)

  return baseUrl.toString()
}
