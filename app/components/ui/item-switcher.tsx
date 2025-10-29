'use client'

import * as React from 'react'
import { useState } from 'react'
import { Check, MagnifyingGlassSmall, Stop } from '@vercel/geist/icons'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '#/app/components/ui/command'
import { cn } from '#/app/lib/utils'
import { visibleStylesIf } from '#/app/lib/v3/a11y'
import { transitionStyles } from '#/app/lib/v3/motion'
import { Skeleton } from '@/components/ui/skeleton'
import { TransitionNode } from '#/app/components/transition-node'

const COMMAND_ITEM_CLASS = 'flex h-7 items-center gap-2 duration-0 '

interface ItemSwitcherProps<T> {
  // Core data and selection
  items: T[]
  getItemId: (item: T) => string
  getItemValue: (item: T) => string
  selectedItemId?: string

  // Display and rendering
  renderItem: (item: T, isSelected: boolean) => React.ReactNode

  // Actions
  onItemSelect: (item: T) => void

  // Text content
  placeholder?: string
  emptyState?: string
  error?: string

  // State management
  searchTerm?: string
  onSearchChange?: (value: string) => void

  // Styles and behavior
  className?: string
  height?: number
  disabled?: boolean
  children?: React.ReactNode
  childClassName?: string
  loading?: boolean
  hideListWhenEmpty?: boolean
  filterFunction?: (item: T, searchTerm: string) => boolean
}

export function ItemSwitcher<T>({
  items,
  getItemId,
  getItemValue,
  selectedItemId,
  error,
  renderItem,
  onItemSelect,
  placeholder = 'Search...',
  emptyState = 'No items found',
  children,
  loading,
  childClassName,
  height = 128,
  filterFunction,
  hideListWhenEmpty,
  searchTerm: externalSearchTerm,
  onSearchChange,
  className,
  disabled = false,
}: ItemSwitcherProps<T>) {
  // Use internal state if external is not provided
  const [internalSearchTerm, setInternalSearchTerm] = useState('')
  const searchTerm =
    externalSearchTerm !== undefined ? externalSearchTerm : internalSearchTerm

  // Handle search changes with internal or external state
  const handleSearchChange = (value: string) => {
    if (onSearchChange) {
      onSearchChange(value)
    } else {
      setInternalSearchTerm(value)
    }
  }

  // Filter items based on search term
  const filteredItems = searchTerm
    ? items.filter((item) =>
        filterFunction
          ? filterFunction(item, searchTerm)
          : getItemValue(item).toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : items

  const isEmpty = filteredItems.length === 0
  const hideCommandList = Boolean(hideListWhenEmpty && isEmpty && !loading)

  return (
    <Command className={cn('text-label-14 flex flex-col', className)}>
      <CommandInput
        placeholder={placeholder}
        onValueChange={handleSearchChange}
        value={searchTerm}
        className="h-10"
        divClassName="px-3 gap-2"
        disabled={disabled}
        icon={<MagnifyingGlassSmall />}
      />
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          height: hideCommandList ? 0 : height,
          ...visibleStylesIf(!hideCommandList),
          ...transitionStyles(['height']),
        }}
      >
        {loading ? (
          <CommandList tabIndex={-1} className="overflow-y-hidden">
            <CommandGroup>
              <div className="flex h-full flex-col items-center justify-center mask-[linear-gradient(to_bottom,black,transparent)]">
                {Array.from({ length: 6 }).map((_, i) => {
                  const width = [50, 70, 90][i % 3]
                  return (
                    <div className={cn('w-full', COMMAND_ITEM_CLASS)} key={i}>
                      <Skeleton
                        className="h-4"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  )
                })}
              </div>
            </CommandGroup>
          </CommandList>
        ) : (
          <CommandList tabIndex={-1}>
            <div
              className={cn(
                'bg-v0-background-200 border-v0-alpha-400 absolute inset-2 flex items-center justify-center overflow-hidden rounded-md border p-2 text-v0-gray-900',
                error && 'bg-v0-red-200 text-v0-red-800',
              )}
              style={{
                transform: isEmpty ? 'scale(1)' : 'scale(0.95)',
                ...visibleStylesIf(isEmpty),
                ...transitionStyles(['opacity', 'transform'], {
                  delay: isEmpty ? 50 : 0,
                  duration: !isEmpty ? 0 : 200,
                }),
              }}
            >
              {error ? (
                <span className="flex flex-col items-center gap-2 overflow-hidden text-center">
                  <Stop />{' '}
                  <span className="line-clamp-3 text-ellipsis">{error}</span>
                </span>
              ) : (
                emptyState
              )}
            </div>
            <CommandGroup className="overflow-y-scroll">
              {filteredItems.map((item) => {
                const itemId = getItemId(item)
                const isSelected = selectedItemId === itemId

                return (
                  <CommandItem
                    key={itemId}
                    value={getItemValue(item)}
                    onSelect={() => {
                      if (!disabled) {
                        onItemSelect(item)
                      }
                    }}
                    className={cn(
                      COMMAND_ITEM_CLASS,
                      disabled && 'pointer-events-none opacity-50',
                    )}
                  >
                    <span className="truncate">
                      {renderItem(item, isSelected)}
                    </span>
                    {isSelected && (
                      <Check className="ml-auto h-4 w-4 shrink-0" />
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        )}
      </div>
      <TransitionNode
        renderKey={`${Boolean(children)}`}
        childClassName="overflow-hidden"
      >
        {children ? (
          <div
            className={cn(
              'border-t border-v0-gray-200 p-2',
              hideCommandList && 'border-transparent',
              childClassName,
            )}
          >
            {children}
          </div>
        ) : null}
      </TransitionNode>
    </Command>
  )
}
