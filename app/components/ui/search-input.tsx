'use client'

import * as React from 'react'
import { useState, useRef } from 'react'
import { Input } from './input'
import { Popover, PopoverContent, PopoverAnchor } from './popover'
import { cn } from '#/app/lib/utils'

interface SearchInputProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Input>,
    'onSelect' | 'onChange'
  > {
  items: { id: string; label: string }[]
  onSelect?: (item: { id: string; label: string }) => void
  onChange?: (value: string) => void
  itemRender?: (
    item: { id: string; label: string },
    active: boolean,
  ) => React.ReactNode
  initialValue?: string
  emptyState?: React.ReactNode
  popoverClassName?: string
}

export function SearchInput({
  items,
  onSelect,
  onKeyDown,
  placeholder = 'Search...',
  itemRender,
  emptyState = 'No results found',
  initialValue = '',
  popoverClassName,
  ...props
}: SearchInputProps) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState(initialValue)
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isNavigatingList, setIsNavigatingList] = useState(false)

  const filteredItems = inputValue
    ? items.filter((item) =>
        item.label.toLowerCase().includes(inputValue.toLowerCase()),
      )
    : items

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    props.onChange?.(value)
    setOpen(value.length > 0)
    setActiveIndex(-1)
    setIsNavigatingList(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Call the external onKeyDown handler if provided
    onKeyDown?.(e)

    if (!open || filteredItems.length === 0) return

    // Only start navigating the list with arrow keys
    if (!isNavigatingList) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        setIsNavigatingList(true)
        setActiveIndex(e.key === 'ArrowDown' ? 0 : filteredItems.length - 1)
        return
      }
    } else {
      // Already navigating list
      // Arrow down
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : prev,
        )
      }

      // Arrow up
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0))
      }
    }

    // Enter - only select if actively navigating
    if (
      e.key === 'Enter' &&
      isNavigatingList &&
      activeIndex >= 0 &&
      activeIndex < filteredItems.length
    ) {
      e.preventDefault()
      const selectedItem = filteredItems[activeIndex]
      if (selectedItem) {
        handleSelect(selectedItem)
      }
    }

    // Escape
    if (e.key === 'Escape') {
      setOpen(false)
      setIsNavigatingList(false)
      setActiveIndex(-1)
      // Keep focus on input
      inputRef.current?.focus()
    }

    // Tab out of navigation mode
    if (e.key === 'Tab') {
      setIsNavigatingList(false)
      setActiveIndex(-1)
    }
  }

  const handleSelect = (item: { id: string; label: string }) => {
    setInputValue(item.label)
    onSelect?.(item)
    setOpen(false)
    setIsNavigatingList(false)
    setActiveIndex(-1)
    // Maintain focus on input
    inputRef.current?.focus()
  }

  // Handle click on input (should open popover but keep focus)
  const handleInputClick = () => {
    if (inputValue.length > 0 && !open) {
      setOpen(true)
    }
  }

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        // Ensure focus stays on input when popover opens/closes
        if (inputRef.current) {
          setTimeout(() => {
            inputRef.current?.focus()
          }, 0)
        }
      }}
    >
      <PopoverAnchor className="w-full" tabIndex={-1}>
        <Input
          {...props}
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onClick={handleInputClick}
          placeholder={placeholder}
        />
      </PopoverAnchor>
      <PopoverContent
        className={cn(
          'max-h-[300px] w-(--radix-popover-trigger-width) overflow-y-auto p-0',
          popoverClassName,
        )}
        align="start"
        onOpenAutoFocus={(e) => {
          // Prevent popover from stealing focus
          e.preventDefault()
          // Ensure input keeps focus
          inputRef.current?.focus()
        }}
      >
        {filteredItems.length > 0 ? (
          <ul className="py-2">
            {filteredItems.map((item, index) => (
              <li
                key={item.id}
                className={cn(
                  'cursor-pointer px-3 py-2 text-sm',
                  activeIndex === index
                    ? 'bg-v0-gray-100'
                    : 'hover:bg-v0-background-200',
                )}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => isNavigatingList && setActiveIndex(index)}
              >
                {itemRender
                  ? itemRender(item, activeIndex === index)
                  : item.label}
              </li>
            ))}
          </ul>
        ) : (
          emptyState
        )}
      </PopoverContent>
    </Popover>
  )
}
