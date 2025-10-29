'use client'

import {
  FC,
  FocusEventHandler,
  memo,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react'
import Cookie from 'js-cookie'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useEventListener } from 'usehooks-ts'

type MouseHandler = MouseEventHandler<HTMLDivElement>

function Handle({
  show,
  axis,
  side,
  resizing,
  dotsHandle,
  onMouseDown,
  onFocus,
  onBlur,
  ref,
}: {
  show: boolean
  axis: 'x' | 'y'
  side: 'start' | 'end'
  resizing: boolean
  dotsHandle: boolean
  onMouseDown: MouseHandler
  onFocus: FocusEventHandler<HTMLDivElement>
  onBlur: FocusEventHandler<HTMLDivElement>
  ref: React.Ref<HTMLDivElement>
}) {
  const props = {
    'aria-orientation':
      axis === 'x' ? ('vertical' as const) : ('horizontal' as const),
    onBlur,
    onFocus,
    onMouseDown,
    ref,
    role: 'separator',
    tabIndex: 0,
  }

  if (dotsHandle) {
    return (
      <div
        className={cn(
          'group absolute flex items-center justify-center focus:outline-hidden',
          axis === 'x'
            ? cn(
                'inset-y-0 w-5 cursor-col-resize flex-col',
                side === 'start' ? 'left-[-19px]' : 'right-[-19px]',
              )
            : cn(
                'inset-x-0 h-5 cursor-row-resize flex-row',
                side === 'start' ? 'top-[-19px]' : 'bottom-[-19px]',
              ),
        )}
        {...props}
      >
        <div className="flex gap-0.5">
          <div className="flex flex-col gap-0.5">
            <div className="size-[2.5px] rounded-full bg-v0-gray-500 transition-colors duration-300 group-hover:bg-v0-black group-focus:bg-v0-black" />
            <div className="size-[2.5px] rounded-full bg-v0-gray-500 transition-colors duration-300 group-hover:bg-v0-black group-focus:bg-v0-black" />
            <div className="size-[2.5px] rounded-full bg-v0-gray-500 transition-colors duration-300 group-hover:bg-v0-black group-focus:bg-v0-black" />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="size-[2.5px] rounded-full bg-v0-gray-500 transition-colors duration-300 group-hover:bg-v0-black group-focus:bg-v0-black" />
            <div className="size-[2.5px] rounded-full bg-v0-gray-500 transition-colors duration-300 group-hover:bg-v0-black group-focus:bg-v0-black" />
            <div className="size-[2.5px] rounded-full bg-v0-gray-500 transition-colors duration-300 group-hover:bg-v0-black group-focus:bg-v0-black" />
          </div>
        </div>
      </div>
    )
  }

  if (!show) return null

  return (
    <div
      className={cn(
        'group absolute z-10 focus:outline-hidden',
        axis === 'x' &&
          cn(
            'inset-y-0 w-3 cursor-col-resize',
            side === 'start' ? '-left-1.5' : '-right-1.5',
          ),
        axis === 'y' &&
          cn(
            'inset-x-0 h-3 cursor-row-resize',
            side === 'start' ? '-top-1.5' : '-bottom-1.5',
          ),
      )}
      {...props}
    >
      <div
        className={cn(
          'absolute inset-0 transition-all duration-200 group-hover:bg-v0-gray-300 group-focus:bg-v0-gray-500',
          axis === 'x' &&
            cn(
              'mx-auto group-hover:w-[3px] group-focus:w-[3px]',
              resizing ? 'w-1' : 'w-0',
            ),
          axis === 'y' &&
            cn(
              'my-auto group-hover:h-[3px] group-focus:h-[3px]',
              resizing ? 'h-1' : 'h-0',
            ),
        )}
      />
    </div>
  )
}

type ResizableProps = PropsWithChildren<{
  show: boolean
  dotsHandle?: boolean
  animated?: boolean
  innerClassName?: string
  className?: string
  initialSize: number
  minSizePx: number
  minNegativeSpace?: number
  axis: 'x' | 'y'
  side: 'start' | 'end'
  cookieName: string
  snapTo?: { threshold: number; size: number }
  onTrack?: (oldPercent: number | null, newPercent: number | null) => void
  onResize?: (newPercent: number) => void
  ref?: React.MutableRefObject<{
    setSize: (size: number) => void
    getSize: () => number | null
    getContainer: () => HTMLDivElement | null
  } | null>
  forceInitialSize?: boolean
}>

const Resizable: FC<ResizableProps> = memo(
  ({
    show,
    innerClassName,
    dotsHandle = false,
    onTrack,
    className,
    initialSize,
    animated = true,
    minSizePx,
    minNegativeSpace,
    axis,
    side,
    children,
    cookieName,
    snapTo,
    forceInitialSize,
    onResize,
    ref,
  }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const handleRef = useRef<HTMLDivElement | null>(null)

    const startPercentRef = useRef<number | null>(null)
    const [resizing, setResizing] = useState(false)
    const [mouseResizing, setMouseResizing] = useState(false)

    const [startPos, setStartPos] = useState(0)
    const [startSize, setStartSize] = useState(0)
    const [preventAnimation, setPreventAnimation] = useState(false)

    const percentSizeInitialValue = useState(() => {
      // This is a trick to only execute this once (on initial render)
      // so we don't need to read the cookie on every render.
      if (typeof document === 'undefined') return null
      const value = Cookie.get(cookieName)
      if (value === null) return null
      const numberValue = Number(value)
      if (isNaN(numberValue)) return null
      return numberValue
    })[0]

    const percentSizeRef = useRef<number | null>(
      forceInitialSize ? initialSize : (percentSizeInitialValue ?? initialSize),
    )

    // expose methods via ref
    useEffect(() => {
      if (!ref) return
      ref.current = {
        setSize: (size: number) => {
          percentSizeRef.current = size
          if (containerRef.current) {
            if (axis === 'x') containerRef.current.style.width = `${size}%`
            else containerRef.current.style.height = `${size}%`
          }
          onResize?.(size)
        },
        getSize: () => percentSizeRef.current,
        getContainer: () => containerRef.current,
      }
    }, [ref, axis, onResize])

    const startResizing = useCallback<MouseHandler>(
      (e) => {
        e.stopPropagation()
        e.preventDefault()
        handleRef.current?.focus()
        setMouseResizing(true)
        setResizing(true)
        setStartPos(axis === 'x' ? e.clientX : e.clientY)
        startPercentRef.current = percentSizeRef.current
        setStartSize(
          (axis === 'x'
            ? containerRef.current?.clientWidth
            : containerRef.current?.clientHeight) ?? 0,
        )
        setPreventAnimation(true)
      },
      [axis],
    )
    const resize = useCallback(
      (e: MouseEvent) => {
        if (!resizing || !mouseResizing) return
        const parent = containerRef.current?.parentElement
        const parentSize =
          (axis === 'x' ? parent?.clientWidth : parent?.clientHeight) ?? 0
        const pos = axis === 'x' ? e.clientX : e.clientY
        let newSize = startSize + (startPos - pos) * (side === 'start' ? 1 : -1)

        // Add snapping behavior if snapTo is defined
        if (snapTo && axis === 'y' && newSize < snapTo.threshold) {
          newSize = snapTo.size
        }

        let newSizePercent = (newSize / parentSize) * 100

        // Apply minNegativeSpace constraint if defined
        if (minNegativeSpace !== undefined) {
          const maxSizePx = parentSize - minNegativeSpace
          const maxSizePercent = (maxSizePx / parentSize) * 100
          if (newSizePercent > maxSizePercent) {
            newSizePercent = maxSizePercent
          }
        }

        if (axis === 'x')
          containerRef.current!.style.width = `${newSizePercent}%`
        else containerRef.current!.style.height = `${newSizePercent}%`
        percentSizeRef.current = newSizePercent
        onResize?.(newSizePercent)
      },
      [
        axis,
        mouseResizing,
        resizing,
        side,
        startPos,
        startSize,
        snapTo,
        minNegativeSpace,
        onResize,
      ],
    )
    const stopResizing = useCallback(() => {
      if (!resizing) return
      setResizing(false)
      setMouseResizing(false)
      handleRef.current?.blur()
      Cookie.set(cookieName, String(percentSizeRef.current), { expires: 7 })
      onTrack?.(startPercentRef.current, percentSizeRef.current)
    }, [cookieName, onTrack, resizing])

    useEventListener('mousemove', resize)
    useEventListener('mouseup', stopResizing)

    useEventListener(
      'keydown',
      (e) => {
        if (!resizing) return
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
        const baseDelta = e.shiftKey ? 12 : 4
        const delta =
          baseDelta *
          (e.key === 'ArrowLeft' ? 1 : -1) *
          (side === 'start' ? 1 : -1)

        const parent = containerRef.current?.parentElement
        const parentSizePx =
          (axis === 'x' ? parent?.clientWidth : parent?.clientHeight) ?? 0
        const currentSizePx =
          (axis === 'x'
            ? containerRef.current?.clientWidth
            : containerRef.current?.clientHeight) ?? 0
        const currentSizePercent = (currentSizePx / parentSizePx) * 100
        let newSizePercent = currentSizePercent + delta

        // Add snapping behavior if snapTo is defined
        if (snapTo && axis === 'y') {
          const newSizePx = (newSizePercent / 100) * parentSizePx
          if (newSizePx < snapTo.threshold) {
            newSizePercent = (snapTo.size / parentSizePx) * 100
          }
        }

        // Apply minNegativeSpace constraint if defined
        if (minNegativeSpace !== undefined) {
          const maxSizePx = parentSizePx - minNegativeSpace
          const maxSizePercent = (maxSizePx / parentSizePx) * 100
          if (newSizePercent > maxSizePercent) {
            newSizePercent = maxSizePercent
          }
        }

        if (axis === 'x')
          containerRef.current!.style.width = `${newSizePercent}%`
        else containerRef.current!.style.height = `${newSizePercent}%`
        percentSizeRef.current = newSizePercent
      },
      handleRef as React.RefObject<HTMLDivElement>,
    )

    // Calculate max size based on minNegativeSpace
    const getMaxSize = useCallback(() => {
      if (minNegativeSpace === undefined) return undefined

      const parent = containerRef.current?.parentElement
      const parentSize =
        axis === 'x' ? parent?.clientWidth : parent?.clientHeight

      if (!parentSize) return undefined

      const maxSizePx = parentSize - minNegativeSpace
      return (maxSizePx / parentSize) * 100
    }, [axis, minNegativeSpace])

    return (
      <>
        <div
          className={cn(
            'fixed inset-0 z-50',
            resizing
              ? axis === 'x'
                ? 'cursor-col-resize'
                : 'cursor-row-resize'
              : 'pointer-events-none',
          )}
        />
        <motion.div
          animate={
            axis === 'x'
              ? {
                  width: show
                    ? `${percentSizeRef.current ?? initialSize}%`
                    : '0%',
                  height: '100%',
                  minWidth: show ? `${minSizePx}px` : 0,
                  maxWidth:
                    show && minNegativeSpace ? `${getMaxSize()}%` : undefined,
                  opacity: show ? 1 : 0,
                }
              : {
                  height: show
                    ? `${percentSizeRef.current ?? initialSize}%`
                    : '0%',
                  width: '100%',
                  minHeight: show ? `${minSizePx}px` : 0,
                  maxHeight:
                    show && minNegativeSpace ? `${getMaxSize()}%` : undefined,
                  opacity: show ? 1 : 0,
                }
          }
          aria-hidden={!show}
          className={cn('relative', className)}
          inert={!show}
          initial={false}
          layout="size"
          onAnimationComplete={() => {
            if (preventAnimation) setPreventAnimation(false)
          }}
          ref={containerRef}
          transition={
            preventAnimation || !animated
              ? { type: false }
              : {
                  type: 'spring',
                  damping: 25,
                  stiffness: 180,
                  mass: 1,
                }
          }
        >
          <Handle
            axis={axis}
            dotsHandle={dotsHandle}
            onBlur={stopResizing}
            onFocus={() => {
              setResizing(true)
              setPreventAnimation(true)
            }}
            onMouseDown={startResizing}
            ref={handleRef}
            resizing={resizing}
            show={show}
            side={side}
          />
          <div className={cn('absolute inset-0', innerClassName)}>
            {children}
          </div>
        </motion.div>
      </>
    )
  },
)
Resizable.displayName = 'Resizable'

export { Resizable }
