'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { motion } from 'framer-motion'

import { cn } from '#/app/lib/utils'
import { usePathname } from 'next/navigation'
import { PrefetchLinkAndRefreshOnHover } from '../prefetch-link-on-hover'

const transition = {
  stiffness: 300,
  damping: 30,
  type: 'spring' as const,
  duration: 0.3,
}

const TabsContext = React.createContext<{
  layoutId: string
  activeTab: string | undefined
  setActiveTab: React.Dispatch<React.SetStateAction<string | undefined>>
  variant: 'pills' | 'underline' | 'secondary' | 'header-underline'
  mode?: 'link'
} | null>(null)

function useTabs() {
  const context = React.useContext(TabsContext)

  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider')
  }
  return context
}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
    variant?: 'pills' | 'underline' | 'secondary' | 'header-underline'
    mode?: 'link'
  }
>(
  (
    {
      children,
      defaultValue,
      value,
      mode,
      onValueChange,
      variant = 'pills',
      ...props
    },
    ref,
  ) => {
    const layoutId = React.useId()
    const [activeTab, setActiveTab] = React.useState(value ?? defaultValue)
    const pathname = usePathname()

    React.useEffect(() => {
      if (mode === 'link' && value === undefined) setActiveTab(pathname)
      else if (value !== undefined) setActiveTab(value)
    }, [value, pathname, mode])

    const contextValue = React.useMemo(
      () => ({
        activeTab,
        setActiveTab,
        layoutId,
        variant,
        mode,
      }),
      [activeTab, layoutId, variant, mode],
    )

    return (
      <TabsContext.Provider value={contextValue}>
        <TabsPrimitive.Root
          defaultValue={defaultValue}
          onValueChange={(value) => {
            if (mode === 'link') return // will be handled by the Link component
            setActiveTab(value)
            onValueChange?.(value)
          }}
          value={value}
          {...props}
          ref={ref}
        >
          {children}
        </TabsPrimitive.Root>
      </TabsContext.Provider>
    )
  },
)
Tabs.displayName = TabsPrimitive.Root.displayName

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const { variant } = useTabs()

  return (
    <TabsPrimitive.List
      className={cn(
        'bg-v0-background-100 flex h-8 gap-0.5',
        variant === 'pills' &&
          'items-center rounded-lg border px-[0.2rem] py-1',
        variant === 'underline' && 'items-end border-b',
        variant === 'secondary' && 'items-center',
        variant === 'header-underline' && 'h-11 items-center',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const { activeTab, layoutId, variant, mode } = useTabs()
  const isActive = activeTab === props.value

  const inner = (
    <TabsPrimitive.Trigger
      className={cn(
        'ring-offset-background relative inline-flex justify-center gap-1.5 whitespace-nowrap rounded-md bg-transparent px-2 text-sm font-medium text-v0-gray-900 ring-v0-caveat-focus-ring-tab transition-all hover:text-v0-gray-1000 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 has-[>svg]:pl-1.5 data-[state=active]:text-gray-900 [&>svg]:pointer-events-none',
        variant === 'underline' || variant === 'header-underline'
          ? 'h-8'
          : 'h-6 items-center',
        variant === 'secondary' && 'h-[28px]',
        variant === 'secondary' ||
          (variant === 'header-underline' && isActive && 'text-v0-gray-1000'),
        className,
        variant === 'header-underline' && 'h-11 items-center font-normal',
      )}
      ref={ref}
      tabIndex={mode === 'link' ? -1 : undefined}
      {...props}
    >
      {isActive ? (
        variant === 'underline' ? (
          <motion.div
            className="absolute inset-x-2 -bottom-px h-[2px] bg-v0-gray-1000"
            layoutId={`${layoutId}-underline`}
            transition={transition}
          />
        ) : variant === 'header-underline' ? (
          <motion.div
            className="absolute inset-x-2 bottom-[-2.5px] h-[2px] bg-v0-gray-1000"
            layoutId={`${layoutId}-underline`}
            transition={transition}
          />
        ) : variant === 'secondary' ? (
          <motion.div
            className="absolute inset-0 rounded-md bg-v0-gray-200"
            layoutId={`${layoutId}-hover`}
            transition={transition}
          />
        ) : (
          <motion.div
            className="absolute inset-0 rounded-md bg-v0-gray-100"
            layoutId={`${layoutId}-hover`}
            transition={transition}
          />
        )
      ) : null}

      <div className="relative z-10 flex items-center gap-1.5">{children}</div>
    </TabsPrimitive.Trigger>
  )

  if (mode === 'link') {
    return (
      <PrefetchLinkAndRefreshOnHover href={props.value}>
        {inner}
      </PrefetchLinkAndRefreshOnHover>
    )
  }

  return inner
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    className={cn(
      'ring-offset-background focus-visible:ring-ring focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2',
      className,
    )}
    ref={ref}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
