import { useRef, useEffect } from 'react'

export function useLatest<T>(val: T) {
  const ref = useRef(val)

  useEffect(() => {
    ref.current = val
  }, [val])

  return ref
}
