'use client'

import {
  ComponentProps,
  createContext,
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import * as Resizable from 'react-resizable-panels'
import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { cn } from '#/app/lib/utils'
import Cookie from 'js-cookie'
import { useDebounceCallback } from 'usehooks-ts'

// Context and corresponding hook for component props
const ResizableContext = createContext<
  | {
      leftId: string
      rightId: string
      groupId: string
      panelGroupRef: RefObject<Resizable.ImperativePanelGroupHandle | null>
    }
  | undefined
>(undefined)
export const useResizableContext = () => {
  const context = useContext(ResizableContext)
  if (context === undefined)
    throw new Error(
      'useResizableContext must be used within a FileTreeProvider',
    )
  return context
}

/**
 * A resize handle styled for proper hover and focus states.
 */
export function PanelResizeHandle({
  className,
  ...props
}: {
  className?: string
} & ComponentProps<typeof Resizable.PanelResizeHandle>) {
  const { leftId, rightId, groupId, panelGroupRef } = useResizableContext()

  return (
    <Resizable.PanelResizeHandle
      onDragging={() => {
        // Handles dragging all the way to 0
        const leftSize = Resizable.getPanelElement(leftId)?.offsetWidth
        const rightSize = Resizable.getPanelElement(rightId)?.offsetWidth
        const groupSize = Resizable.getPanelGroupElement(groupId)?.offsetWidth
        if (!leftSize || !rightSize || !groupSize) return
        const leftPercent = (leftSize / groupSize) * 100
        const rightPercent = (rightSize / groupSize) * 100
        panelGroupRef.current?.setLayout([leftPercent, rightPercent])
      }}
      className={cn(
        'group relative z-20 w-0 overflow-visible! outline-hidden! ring-0!',
        className,
      )}
      {...props}
    >
      {/* Necessary for hover-state handling over iframe */}
      <div className="absolute inset-0 h-full w-3 translate-x-[-50%] outline-0! ring-0!" />
      {/* Inner animated handle */}
      <div className="absolute inset-0 h-full w-0 translate-x-[-50%] outline-0! ring-0! transition-all duration-200 group-data-[resize-handle-active=keyboard]:w-[3px] group-data-[resize-handle-state=drag]:w-[3px] group-data-[resize-handle-state=hover]:w-[3px] group-data-[resize-handle-active=keyboard]:bg-gray-400 group-data-[resize-handle-state=drag]:bg-gray-400 group-data-[resize-handle-state=hover]:bg-gray-300 group-data-[resize-handle-active=keyboard]:outline-hidden" />
    </Resizable.PanelResizeHandle>
  )
}

/**
 * A panel component that attaches its ref to the DOM element of the panel.
 */
const ForwardPanel = forwardRef(
  (
    props: { id: string } & ComponentProps<typeof Resizable.Panel>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    useEffect(() => {
      const element = document.getElementById(props.id) as HTMLDivElement | null
      if (!element || !ref) return
      if (typeof ref === 'function') ref(element)
      else ref.current = element
    }, [props.id, ref])

    return <Resizable.Panel {...props} />
  },
)
ForwardPanel.displayName = 'ForwardPanel'

/**
 * A panel that can be animated by `framer-motion`.
 */
export const MotionPanel = motion.create(ForwardPanel)

function getMinWidth(panelId: string) {
  const panel = Resizable.getPanelElement(panelId)
  if (!panel) return 100
  const style = getComputedStyle(panel)
  const result = parseFloat(style.minWidth)
  return isNaN(result) ? 100 : result
}

/**
 * A panel group for two pixel min-width panels.
 */
export function PanelGroup({
  isFallbackSize,
  collapseSide,
  leftId,
  rightId,
  defaultSizeRef,
  cookie,
  id,
  ...props
}: Omit<ComponentProps<typeof Resizable.PanelGroup>, 'onLayout'> & {
  isFallbackSize: boolean
  collapseSide: 'left' | 'right'
  leftId: string
  rightId: string
  defaultSizeRef: MutableRefObject<number>
  cookie: string
  id: string
}) {
  const panelGroupRef = useRef<Resizable.ImperativePanelGroupHandle>(null)
  const skipNextRef = useRef(false)

  const debouncedSetCookie = useDebounceCallback((value: string) => {
    Cookie.set(cookie, value, { expires: 30 })
  }, 300)

  const contextValue = useMemo(
    () => ({
      leftId,
      rightId,
      panelGroupRef,
      groupId: id,
    }),
    [leftId, rightId, id, panelGroupRef],
  )

  return (
    <ResizableContext.Provider value={contextValue}>
      <Resizable.PanelGroup
        id={id}
        ref={panelGroupRef}
        onLayout={(sizes) => {
          if (sizes.length < 2) return
          const [left, right] = sizes
          if (skipNextRef.current) return (skipNextRef.current = false)

          if (!right || !left) return
          const collapseSize = collapseSide === 'right' ? right : left
          const fixedSize = collapseSide === 'right' ? left : right
          defaultSizeRef.current = collapseSize
          if (!isFallbackSize) {
            debouncedSetCookie(collapseSize.toString())
          }

          const leftEl = Resizable.getPanelElement(leftId)
          const rightEl = Resizable.getPanelElement(rightId)
          const groupEl = Resizable.getPanelGroupElement(id)
          if (!leftEl || !rightEl || !groupEl) return

          const collapseMin = getMinWidth(
            collapseSide === 'right' ? rightId : leftId,
          )
          const fixedMin = getMinWidth(
            collapseSide === 'right' ? leftId : rightId,
          )
          if ((collapseSize / 100) * groupEl.offsetWidth < collapseMin) {
            const minPercent = (collapseMin / groupEl.offsetWidth) * 100
            skipNextRef.current = true
            const newLayout =
              collapseSide === 'right'
                ? [100 - minPercent, minPercent]
                : [minPercent, 100 - minPercent]
            panelGroupRef.current?.setLayout(newLayout)
          } else if ((fixedSize / 100) * groupEl.offsetWidth < fixedMin) {
            const minPercent = (fixedMin / groupEl.offsetWidth) * 100
            skipNextRef.current = true
            const newLayout =
              collapseSide === 'right'
                ? [minPercent, 100 - minPercent]
                : [100 - minPercent, minPercent]
            panelGroupRef.current?.setLayout(newLayout)
          }
        }}
        {...props}
      />
    </ResizableContext.Provider>
  )
}
export function CollapsiblePanel({
  collapseSide,
  isOpen,
  order,
  defaultSize,
  className,
  innerContainerClassname,
  handleTestId,
  handleClassName,
  collapseId,
  children,
}: {
  collapseSide: 'left' | 'right'
  isOpen: boolean
  order: number
  defaultSize: number
  className?: string
  innerContainerClassname?: string
  handleTestId?: string
  handleClassName?: string
  collapseId: string
  children: ReactNode
}) {
  const x = useMotionValue(0)
  const opacity = useMotionValue(1)

  const panel = {
    hidden: {
      flex: '0 1 0px',
      minWidth: 0,
      overflow: 'visible',
      transition: { when: 'beforeChildren', duration: 0 },
    },
  }

  const contents = {
    initial: {
      width: '100%',
      display: 'absolute',
      opacity: 0,
      x: collapseSide === 'right' ? '100%' : '-100%',
    },
    visible: () => ({
      width: ['100%', '100%'],
      opacity: [opacity.get(), 1],
      display: ['absolute', 'block'],
      x: [x.get(), 0],
      transition: { type: 'spring' as const, damping: 60, stiffness: 1100 },
    }),
    hidden: () => ({
      width: Resizable.getPanelElement(collapseId)?.offsetWidth ?? 0,
      display: 'absolute',
      opacity: 0,
      x: collapseSide === 'right' ? '100%' : '-100%',
      transition: { type: 'spring' as const, damping: 60, stiffness: 800 },
    }),
  }

  return (
    <AnimatePresence initial={false} mode="wait">
      {isOpen ? (
        <>
          {collapseSide === 'right' ? (
            <PanelResizeHandle
              key="resize-handle"
              data-testid={handleTestId}
              className={cn('sticky top-0', handleClassName)}
            />
          ) : null}
          <MotionPanel
            key="right-panel"
            transition={{ duration: 0 }}
            variants={panel}
            exit="hidden"
            id={collapseId}
            order={order}
            defaultSize={defaultSize}
            style={{ overflow: 'clip' }}
            className={cn('relative', className)}
          >
            <motion.div
              style={{
                x,
                opacity,
                willChange: 'auto', // Will-change will interfere with full-screen by creating a new stacking context
              }}
              variants={contents}
              initial="initial"
              animate="visible"
              exit="hidden"
              className={cn(
                'border-v0-alpha-400 absolute inset-y-0 right-0 h-full w-full',
                collapseSide === 'right'
                  ? 'right-0 border-l'
                  : 'left-0 border-r',
                innerContainerClassname,
              )}
            >
              {children}
            </motion.div>
          </MotionPanel>
          {collapseSide === 'left' ? (
            <PanelResizeHandle
              key="resize-handle"
              data-testid={handleTestId}
              className="sticky top-0"
            />
          ) : null}
        </>
      ) : (
        <Resizable.Panel key="zero-panel" order={order} defaultSize={0} />
      )}
    </AnimatePresence>
  )
}

/**
 * Handles reading the initial size of a panel and keeping its default size updated.
 */
export function usePanelSize({
  initialSize: _initialSize,
  fallbackSize = 50,
}: {
  initialSize: number | Promise<number>
  fallbackSize?: number
}) {
  // Use either the provided initial block size or read the promise here to get it (to not mess up PPR)
  const [initialSize, setInitialSize] = useState(
    typeof _initialSize === 'number' ? _initialSize : fallbackSize,
  )
  const defaultSizeRef = useRef(initialSize)
  const defaultSizeIsInitialRef = useRef(true)
  const [isFallbackSize, setIsFallbackSize] = useState(
    typeof _initialSize !== 'number',
  )

  useEffect(() => {
    if (typeof _initialSize === 'number') return
    void _initialSize.then((x) => {
      setInitialSize(x)
      setIsFallbackSize(false)
      // If the default size has not been set yet, set it to the initial size
      // If it has been set (by resizing), don't change it
      if (defaultSizeIsInitialRef.current) {
        defaultSizeRef.current = x
        defaultSizeIsInitialRef.current = false
      }
    })
  }, [_initialSize])

  return { initialSize, defaultSizeRef, isFallbackSize }
}
