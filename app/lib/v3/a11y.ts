import React from 'react'

export function a11yHideIf(condition: boolean) {
  return condition ? { inert: true } : {}
}

export function visibleStylesIf(condition: boolean): React.CSSProperties {
  return {
    opacity: condition ? 1 : 0,
    pointerEvents: condition ? 'auto' : 'none',
  }
}

export function pointerEventsIf(condition: boolean): React.CSSProperties {
  return {
    pointerEvents: condition ? 'all' : 'none',
  }
}
