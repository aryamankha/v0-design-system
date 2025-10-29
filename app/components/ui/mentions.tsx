import * as React from 'react'
import { cn } from '#/app/lib/utils'

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandList,
} from '#/app/components/ui/command'
import { Popover, PopoverContent } from '#/app/components/ui/popover'
import { PopoverTrigger } from '@/components/ui/popover'
import { useLatest } from '#/lib/use-latest'

type MentionsContext = {
  values: string[]
  mentions: string[]
  setMentions: React.Dispatch<React.SetStateAction<string[]>>
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  forcedClose: boolean
  setForcedClose: React.Dispatch<React.SetStateAction<boolean>>
  keyword: string
  setKeyword: React.Dispatch<React.SetStateAction<string>>
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const MentionsContext = React.createContext<MentionsContext | null>(null)

function useMentions() {
  const context = React.useContext(MentionsContext)
  if (!context) {
    throw new Error('useMentions must be used within a Mentions component.')
  }
  return context
}

type MentionsRef = { clear: () => void }

const Mentions = React.forwardRef<
  MentionsRef,
  React.ComponentPropsWithoutRef<'div'> & {
    defaultValue?: string
    values: string[]
    textareaRef: MentionsContext['textareaRef']
    onValuesChange?: ({
      value,
      mentions,
    }: {
      value: string
      mentions: string[]
    }) => void
  }
>(
  (
    {
      values,
      textareaRef,
      className,
      children,
      onValuesChange,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const mentionsRef = React.useRef<HTMLDivElement>(null)
    const [open, setOpen] = React.useState(false)
    const [forcedClose, setForcedClose] = React.useState(false)
    const [value, setValue] = React.useState(defaultValue || '')
    const [keyword, setKeyword] = React.useState('')
    const [mentions, setMentions] = React.useState<string[]>([])
    const latestValue = useLatest(value)

    const memoizedValue = React.useMemo(
      () => ({
        values,
        mentions,
        setMentions,
        open,
        setOpen,
        textareaRef,
        forcedClose,
        setForcedClose,
        keyword,
        setKeyword,
        value,
        setValue,
      }),
      [
        values,
        mentions,
        setMentions,
        open,
        setOpen,
        textareaRef,
        forcedClose,
        setForcedClose,
        keyword,
        setKeyword,
        value,
        setValue,
      ],
    )

    const deleteMentions = React.useCallback(
      (value: string) => {
        const mentionsToDelete = new Set<string>()
        for (const mention of mentions) {
          const mentionIndex = value.indexOf(`@${mention}`)
          if (mentionIndex === -1) {
            mentionsToDelete.add(mention)
          }
        }
        if (mentionsToDelete.size > 0) {
          setMentions(mentions.filter((m) => !mentionsToDelete.has(m)))
        }
      },
      [mentions],
    )

    const onKeyUp = React.useCallback(
      (event: KeyboardEvent) => {
        const currentValue = latestValue.current

        deleteMentions(currentValue)

        if (
          event.key === 'Backspace' ||
          event.key === 'Delete' ||
          forcedClose
        ) {
          setForcedClose(false)
          return
        }

        const cursorPosition = textareaRef.current?.selectionStart || 0
        const isAfterAtChar =
          currentValue[cursorPosition - 1] === '@' &&
          (cursorPosition === 1 ||
            currentValue[cursorPosition - 2] === ' ' ||
            currentValue[cursorPosition - 2] === '\n') &&
          (cursorPosition === currentValue.length ||
            currentValue[cursorPosition] === ' ')

        setOpen(isAfterAtChar)
      },
      [forcedClose, textareaRef, deleteMentions],
    )

    const onChange = React.useCallback((event: Event) => {
      const target = event.target as HTMLTextAreaElement
      setValue(target.value)
    }, [])

    React.useImperativeHandle(ref, () => {
      return {
        clear: () => {
          setValue('')
          setMentions([])
          onValuesChange?.({ value: latestValue.current, mentions })
        },
      }
    }, [onValuesChange, mentions])

    React.useEffect(() => {
      onValuesChange?.({ value, mentions })
    }, [value, mentions, onValuesChange])

    React.useEffect(() => {
      const textarea = textareaRef.current
      if (!textarea) {
        return
      }

      textarea.addEventListener('keyup', onKeyUp)
      textarea.addEventListener('input', onChange)

      return () => {
        textarea.removeEventListener('keyup', onKeyUp)
        textarea.removeEventListener('input', onChange)
      }
    }, [onKeyUp, onChange, textareaRef])

    return (
      <MentionsContext.Provider value={memoizedValue}>
        <div
          ref={mentionsRef}
          className={cn(
            'relative flex [&_textarea]:relative [&_textarea]:z-10 [&_textarea]:bg-transparent',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </MentionsContext.Provider>
    )
  },
)
Mentions.displayName = 'Mentions'

const MentionsPicker = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & {
    disabled?: boolean
    placeholder?: string
  }
>(
  (
    {
      className,
      placeholder = 'Type to search...',
      children,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const highlightsRef = React.useRef<HTMLDivElement>(null)
    const {
      open,
      setOpen,
      textareaRef,
      setForcedClose,
      keyword,
      setKeyword,
      value,
      mentions,
    } = useMentions()

    const valueWithHighlights = React.useMemo(() => {
      // only show highlights if there are actual mentions
      if (mentions.length === 0) return ''

      let highlightedValue = value
      mentions.forEach((mention) => {
        const mentionRegex = new RegExp(`@${mention}`, 'g')
        highlightedValue = highlightedValue.replace(
          mentionRegex,
          `<mark data-slot="mention">@${mention}</mark>`,
        )
      })
      return highlightedValue
    }, [value, mentions])

    const onOpenChange = React.useCallback(
      (open: boolean) => {
        if (!open) {
          textareaRef.current?.focus()
          setForcedClose(true)
          setKeyword('')
        }
        setOpen(open)
      },
      [textareaRef, setForcedClose, setOpen, setKeyword],
    )

    // Match scroll position.
    React.useEffect(() => {
      const textarea = textareaRef.current
      if (!textarea) return

      const handleScroll = () => {
        const highlightsDiv = highlightsRef.current
        if (highlightsDiv) {
          highlightsDiv.scrollTop = textarea.scrollTop
          highlightsDiv.scrollLeft = textarea.scrollLeft
        }
      }

      textarea.addEventListener('scroll', handleScroll)
      return () => textarea.removeEventListener('scroll', handleScroll)
    }, [textareaRef])

    // Close the mention menu when the user presses backspace and the keyword is empty
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && keyword === '') {
          // Close the mention menu
          setOpen(false)
          // Reset forced close state
          setForcedClose(true)
          // Refocus the textarea
          textareaRef.current?.focus()
        }
      },
      [keyword, setOpen, setForcedClose, textareaRef],
    )

    if (disabled) {
      return null
    }

    return (
      <div
        className={cn(
          'absolute inset-0 inline overflow-auto whitespace-pre-wrap break-words border border-transparent p-3 text-sm',
          // only show highlights if there are actual mentions
          mentions.length === 0 && 'pointer-events-none',
          className,
        )}
        ref={highlightsRef}
        aria-hidden="true"
        {...props}
      >
        <span
          className="*:data-[slot=mention]:bg-teal-100"
          dangerouslySetInnerHTML={{ __html: valueWithHighlights }}
        />
        <Popover open={open} onOpenChange={onOpenChange}>
          <PopoverTrigger />
          <PopoverContent
            ref={ref}
            side="bottom"
            align="start"
            data-slot="popover"
          >
            <Command>
              <CommandInput
                placeholder={placeholder}
                value={keyword}
                onValueChange={setKeyword}
                onKeyDown={handleKeyDown}
              />
              <CommandList>{children}</CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    )
  },
)
MentionsPicker.displayName = 'MentionsPicker'

const MentionPickerGroup = React.forwardRef<
  React.ElementRef<typeof CommandGroup>,
  React.ComponentPropsWithoutRef<typeof CommandGroup> & {
    description?: string
  }
>(({ className, description, ...props }, ref) => {
  return (
    <CommandGroup ref={ref} className={className} {...props}>
      {description && (
        <p className="text-v0-gray-900 px-2 py-1 text-xs">{description}</p>
      )}
      {props.children}
    </CommandGroup>
  )
})
MentionPickerGroup.displayName = 'MentionPickerGroup'

const MentionPickerItem = React.forwardRef<
  React.ElementRef<typeof CommandItem>,
  React.ComponentPropsWithoutRef<typeof CommandItem> & {
    description?: string
  }
>(
  (
    {
      className,
      onSelect: onSelectProp,
      value: valueProp,
      description,
      ...props
    },
    ref,
  ) => {
    const {
      setOpen,
      textareaRef,
      setKeyword,
      value,
      setValue,
      setMentions,
      mentions,
    } = useMentions()

    const onSelect = React.useCallback(
      (name: string) => {
        // Find the last '@' character followed by a space.
        const lastAtIndex = value.lastIndexOf('@ ')
        if (lastAtIndex !== -1) {
          const beforeMention = value.slice(0, lastAtIndex)
          const afterMention = value.slice(lastAtIndex + 2)
          const newValue = `${beforeMention}@${name} ${afterMention}`
          setValue(newValue)
          if (textareaRef.current) {
            textareaRef.current.value = newValue
            textareaRef.current.focus()
            // Set cursor position after the inserted mention
            const cursorPosition = lastAtIndex + name.length + 1
            textareaRef.current.setSelectionRange(
              cursorPosition,
              cursorPosition,
            )
          }
        } else {
          // If no '@' found, append the mention at the end
          const newValue = `${value}${name} `
          setValue(newValue)
          if (textareaRef.current) {
            textareaRef.current.value = newValue
            textareaRef.current.focus()
          }
        }
        setMentions(Array.from(new Set([...mentions, name])))
        setOpen(false)
        setKeyword('')
      },
      [
        value,
        mentions,
        setValue,
        setMentions,
        setOpen,
        textareaRef,
        setKeyword,
      ],
    )

    return (
      <CommandItem
        ref={ref}
        className={cn('flex items-center space-x-2', className)}
        onSelect={() => {
          onSelect(valueProp || '')
          onSelectProp?.(valueProp || '')
        }}
        {...props}
      >
        <div className="flex flex-col">
          <div>{props.children}</div>
          {description && (
            <p className="text-v0-gray-900 text-sm">{description}</p>
          )}
        </div>
      </CommandItem>
    )
  },
)

MentionPickerItem.displayName = 'MentionPickerItem'

export {
  type MentionsRef,
  Mentions,
  MentionsPicker,
  MentionPickerGroup,
  MentionPickerItem,
  useMentions,
}
