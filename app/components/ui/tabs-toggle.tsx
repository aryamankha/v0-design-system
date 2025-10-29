'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import type { Atom, WritableAtom } from 'jotai'
import { useAtom, atom as jotaiAtom } from 'jotai'

import { cn } from '#/app/lib/utils'
import { motion } from 'framer-motion'
import { transitionStyles } from '#/app/lib/v3/motion'

/**
 * tabs toggle – a very thin wrapper around radix`s Tabs.Root + Tabs.List
 * exposes only triggers (no content) so it behaves like a segmented control.
 *
 * usage:
 * ```tsx
 * <TabsToggle defaultValue="a">
 *   <TabsToggleTrigger value="a">a</TabsToggleTrigger>
 *   <TabsToggleTrigger value="b">b</TabsToggleTrigger>
 * </TabsToggle>
 * ```
 */

const TabsToggleContext = React.createContext<{
  activeTab: string | undefined
  setActiveTab: (value: string | undefined) => void
  layoutId: string
  cycleToNext: () => void
  registerTab: (value: string, disabled: boolean) => void
  unregisterTab: (value: string) => void
} | null>(null)

function useTabsToggle() {
  const ctx = React.useContext(TabsToggleContext)
  if (!ctx) throw new Error('useTabsToggle must be used within TabsToggle')
  return ctx
}

interface TabsToggleProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  /**
   * Optional jotai atom controlling the active tab value. If provided, the
   * component becomes a controlled component backed by the atom. The atom
   * should store the current tab value (`string | undefined`).
   */
  atom?:
    | Atom<string | undefined>
    | WritableAtom<string | undefined, [string], void>
}

const TabsToggle = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsToggleProps
>(
  (
    {
      className,
      children,
      defaultValue,
      value: valueProp,
      onValueChange,
      atom,
      ...props
    },
    ref,
  ) => {
    const layoutId = React.useId()

    const fallbackAtom = React.useMemo(
      () => jotaiAtom<string | undefined>(undefined),
      [],
    )

    const [atomValue, setAtomValue] = useAtom(
      (atom ?? fallbackAtom) as WritableAtom<
        string | undefined,
        [string | undefined],
        void
      >,
    )

    const isUsingAtom = atom !== undefined

    // internal state only used when no atom provided and no value prop control
    const [internalActiveTab, setInternalActiveTab] = React.useState<
      string | undefined
    >(valueProp ?? defaultValue)

    // determine active tab priority: atom -> controlled value -> internal state
    const activeTab = isUsingAtom
      ? atomValue
      : valueProp !== undefined
        ? valueProp
        : internalActiveTab

    const setActiveTab: (value: string | undefined) => void = isUsingAtom
      ? setAtomValue
      : (val) => setInternalActiveTab(val)

    // Track registered tabs
    const [tabs, setTabs] = React.useState<
      Array<{ value: string; disabled: boolean }>
    >([])

    const registerTab = React.useCallback(
      (value: string, disabled: boolean) => {
        setTabs((prev) => {
          const existing = prev.find((tab) => tab.value === value)
          if (existing) {
            return prev.map((tab) =>
              tab.value === value ? { value, disabled } : tab,
            )
          }
          return [...prev, { value, disabled }]
        })
      },
      [],
    )

    const unregisterTab = React.useCallback((value: string) => {
      setTabs((prev) => prev.filter((tab) => tab.value !== value))
    }, [])

    const cycleToNext = React.useCallback(() => {
      if (tabs.length === 0) return

      const currentIndex = tabs.findIndex((tab) => tab.value === activeTab)

      // Find next non-disabled tab, cycling from current position
      let nextIndex = (currentIndex + 1) % tabs.length
      let attempts = 0

      while (attempts < tabs.length) {
        const nextTab = tabs[nextIndex]!

        if (!nextTab.disabled) {
          setActiveTab(nextTab.value)
          onValueChange?.(nextTab.value)
          return
        }

        nextIndex = (nextIndex + 1) % tabs.length
        attempts++
      }
    }, [tabs, activeTab, setActiveTab, onValueChange])

    return (
      <TabsToggleContext.Provider
        value={{
          activeTab,
          setActiveTab,
          layoutId,
          cycleToNext,
          registerTab,
          unregisterTab,
        }}
      >
        <TabsPrimitive.Root
          ref={ref}
          defaultValue={isUsingAtom ? undefined : defaultValue}
          value={activeTab}
          onValueChange={(val) => {
            setActiveTab(val)
            onValueChange?.(val)
          }}
          {...props}
        >
          <TabsPrimitive.List
            className={cn(
              'text-label-14 relative inline-flex h-7 font-medium',
              className,
            )}
            data-layout-id={layoutId}
            onClick={cycleToNext}
          >
            <div className="group absolute inset-0 rounded-[6px] border border-v0-alpha-400 bg-v0-gray-100" />
            {children}
          </TabsPrimitive.List>
        </TabsPrimitive.Root>
      </TabsToggleContext.Provider>
    )
  },
)
TabsToggle.displayName = 'TabsToggle'

const TabsToggleTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    square?: boolean
  }
>(({ className, children, square, onClick, ...props }, ref) => {
  const { activeTab, layoutId, cycleToNext, registerTab, unregisterTab } =
    useTabsToggle()
  const isActive = activeTab === props.value

  // Register this tab on mount and update when disabled state changes
  React.useEffect(() => {
    if (props.value) {
      registerTab(props.value, props.disabled ?? false)
    }
    return () => {
      if (props.value) {
        unregisterTab(props.value)
      }
    }
  }, [props.value, props.disabled, registerTab, unregisterTab])

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    const wasActiveAtMouseDown = isActive

    // Only cycle if clicking on a disabled tab OR the currently active tab
    if (props.disabled || wasActiveAtMouseDown) {
      e.preventDefault()
      e.stopPropagation()
      cycleToNext()
      return
    }

    // For non-active, non-disabled tabs: let normal selection happen
    e.stopPropagation()
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Always stop propagation on click to prevent TabsList cycling
    e.stopPropagation()
    onClick?.(e)
  }

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'group relative inline-flex items-center justify-center text-v0-gray-900 focus-visible:outline-none focus-visible:ring-0 data-[state=active]:text-gray-900 cursor-pointer',
        square && 'w-7 max-w-7 px-0',
        className,
      )}
      style={{
        ...transitionStyles(['color'], {
          duration: 300,
        }),
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      {...props}
    >
      {isActive && (
        <motion.div
          className={cn(
            'bg-v0-background-100 absolute inset-[1px] rounded-[5px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.04),0px_8px_8px_-8px_rgba(0,0,0,0.04)]',
            'group-focus-visible:ring-offset-background group-focus-visible:ring-2 group-focus-visible:ring-v0-caveat-focus-ring-tab group-focus-visible:ring-offset-[1.5px]',
          )}
          layoutId={`${layoutId}-indicator`}
          transition={{
            type: 'spring',
            bounce: 0.04,
            duration: 0.3,
          }}
        />
      )}
      <div
        className={cn(
          'z-10 flex items-center justify-center gap-1.5 overflow-hidden px-2',
          square && 'px-0',
        )}
      >
        {children}
      </div>
    </TabsPrimitive.Trigger>
  )
})
TabsToggleTrigger.displayName = 'TabsToggleTrigger'

// optionally allow namespace usage: <TabsToggle.Trigger>
// @ts-expect-error – augmenting function object
TabsToggle.Trigger = TabsToggleTrigger

export { TabsToggle, TabsToggleTrigger }

// backward compat alias
// eslint-disable-next-line import/no-unused-modules
export const TabToggle = TabsToggle
