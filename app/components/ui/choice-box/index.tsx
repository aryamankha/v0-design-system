'use client'

import * as React from 'react'
import { RadioGroup, RadioGroupItem } from '../radio-group'
import { cn } from '#/app/lib/utils'
import styles from './choice-box.module.css'

interface ChoiceBoxItemProps {
  Icon?: React.ReactNode
  title: React.ReactNode
  disabled?: boolean
  description: React.ReactNode
  value: string
}

function ChoiceBoxItem({
  title,
  description,
  value,
  Icon,
  disabled,
}: ChoiceBoxItemProps) {
  return (
    <label
      htmlFor={value}
      className={cn(
        'flex w-full cursor-pointer items-center justify-between rounded-md border border-v0-gray-200 p-3 text-v0-gray-1000 transition-colors',
        !disabled && 'hover:bg-v0-background-200',
        styles.choiceBoxItem,
        //   'has-data-[state=checked]:border-blue-700 has-data-[state=checked]:bg-blue-50 has-data-[state=checked]:text-blue-700'
        //   ' has-data-[state=checked]:text-blue-700'
      )}
    >
      <div className="flex items-center gap-4">
        {Icon && (
          <div data-icon className="text-v0-gray-900">
            {Icon}
          </div>
        )}
        <div className="text-label-14 flex flex-col gap-1 font-medium">
          <span data-title>{title}</span>
          <span className="font-normal text-v0-gray-900" data-description>
            {description}
          </span>
        </div>
      </div>
      <RadioGroupItem value={value} id={value} disabled={disabled} />
    </label>
  )
}

interface ChoiceBoxGroupProps {
  label?: string
  direction?: 'row' | 'column'
  type?: 'radio' | 'checkbox' // only radio supported for now
  value?: string | null
  onChange: (value: string) => void
  className?: string
  children: React.ReactNode
}

// Create a compound component pattern with explicit type for .Item
type ChoiceBoxGroupComponent = React.FC<ChoiceBoxGroupProps> & {
  Item: typeof ChoiceBoxItem
}

const ChoiceBoxGroup: ChoiceBoxGroupComponent = ({
  label,
  direction = 'column',
  value,
  onChange,
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {label && <div className="text-sm font-medium">{label}</div>}
      <RadioGroup
        value={value ?? undefined}
        onValueChange={onChange}
        className={cn('gap-2', direction === 'row' ? 'flex' : 'flex flex-col')}
        {...props}
      >
        {children}
      </RadioGroup>
    </div>
  )
}

// Attach the Item component
ChoiceBoxGroup.Item = ChoiceBoxItem

export { ChoiceBoxGroup, ChoiceBoxItem }
