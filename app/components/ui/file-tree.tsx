import { cn } from '#/app/lib/utils'
import { File as FileBlankIcon, LockClosed } from '@vercel/geist/icons'
import {
  ComponentProps,
  createContext,
  HTMLAttributes,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './collapsible'
import { Button } from './button'
import { Spinner } from '@/components/spinner'
import {
  FileAddedIcon,
  FileRemovedIcon,
} from '#/app/chat/[variants]/(dynamic-root)/internal/(navbar)/design/file-icons'
import { FileTreeContextMenuProps } from './file-tree-context-menu'
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuGroup,
} from './context-menu'
import { toSorted } from '#/app/lib/to-sorted'
import { ChevronRight } from 'lucide-react'
import { DiffNumbers } from './diff-numbers'
import { FileLockingStatus } from '../file/file-lock'

export interface ItemData {
  title: string
  value: string
  addedCount?: number
  removedCount?: number
  items?: ItemData[]
  isLocked?: boolean
  type?: 'binary' | 'text' | 'directory'
}

// sorts items by folders first, then naturally (with numeric sorting)
function toSortedItems(items?: ItemData[]): ItemData[] {
  if (!items) return []

  return toSorted(items, (a, b) => {
    if (a.items && !b.items) return -1
    if (!a.items && b.items) return 1

    return a.title.localeCompare(b.title, undefined, {
      numeric: true,
      sensitivity: 'base',
    })
  })
}

// Context and corresponding hook for component props
const FileTreeContext = createContext<
  | (Pick<
      ComponentProps<typeof FileTree>,
      'onSelect' | 'active' | 'loading' | 'lockingStatus'
    > &
      Required<FileTreeContextMenuProps>)
  | undefined
>(undefined)

const useFileTree = () => {
  const context = useContext(FileTreeContext)
  if (context === undefined)
    throw new Error('useFileTree must be used within a FileTreeProvider')
  return context
}

/**
 * A list of files and folders.
 */
export function FileTree({
  loading,
  active,
  items,
  onSelect,
  FileActions,
  FolderActions,
  TreeActions,
  className,
  lockingStatus,
}: {
  loading?: string
  active?: string
  items: ItemData[]
  onSelect: (value: ItemData['value']) => void
  className?: string
  lockingStatus?: FileLockingStatus
} & FileTreeContextMenuProps) {
  // put folders first
  const sortedItems = useMemo(() => toSortedItems(items), [items])

  const list = (
    <ul className={cn('group flex list-none flex-col', className)}>
      {sortedItems.map((item) => (
        <Item key={item.value} item={item} />
      ))}
    </ul>
  )

  let inner = list
  if (TreeActions) {
    inner = (
      <ContextMenu>
        <ContextMenuTrigger asChild>{list}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <TreeActions />
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    )
  }

  return (
    <FileTreeContext.Provider
      value={{
        onSelect,
        active,
        lockingStatus,
        loading,
        FileActions: FileActions ?? (() => null),
        FolderActions: FolderActions ?? (() => null),
        TreeActions: TreeActions ?? (() => null),
      }}
    >
      {inner}
    </FileTreeContext.Provider>
  )
}

/**
 * A file or a folder.
 */
function Item({ item }: { item: ItemData }) {
  return item.items ? <Folder item={item} /> : <File item={item} />
}

/**
 * A folder that can contain children of type `<Item />`.
 */
function Folder({ className, item }: { className?: string; item: ItemData }) {
  const { active, FolderActions } = useFileTree()
  const [open, setOpen] = useState(true)

  const isActive = item.items ? hasChildWithValue(item.items, active) : false
  useEffect(() => {
    if (isActive) setOpen(true)
  }, [isActive])

  // sort folders first, then alphabetically
  const sortedItems = useMemo(() => toSortedItems(item.items), [item.items])

  const content = item.items?.length ? (
    <div
      data-sidebar="menu-sub"
      className="border-v0-alpha-400 group-hover:border-l-alpha-400 duration-250 ml-3 flex min-w-0 translate-x-[0.5px] flex-col border-l border-l-transparent pl-1 transition-colors"
    >
      {sortedItems.map((subItem) => (
        <Item key={subItem.value} item={subItem} />
      ))}
    </div>
  ) : null

  return (
    <ContextMenu>
      <Collapsible
        className="flex flex-col gap-0"
        open={open}
        onOpenChange={setOpen}
      >
        <CollapsibleTrigger asChild>
          <ContextMenuTrigger asChild>
            <ItemRow
              icon={
                <ChevronRight
                  className={cn('h-4 w-4 transition-transform', {
                    'rotate-90': open,
                  })}
                />
              }
              onClick={(e) => {
                // Prevent focus from remaining on folder after click
                if (e.currentTarget instanceof HTMLButtonElement)
                  e.currentTarget.blur()
                setOpen((o) => !o)
              }}
              className={className}
              status={null}
            >
              {item.title}
            </ItemRow>
          </ContextMenuTrigger>
        </CollapsibleTrigger>
        <CollapsibleContent>{content}</CollapsibleContent>
      </Collapsible>
      <ContextMenuContent>
        <ContextMenuGroup>
          <FolderActions item={item} />
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

/**
 * An item without children.
 */
function File({
  item,
  className,
  ...props
}: {
  item: ItemData
  className?: string
} & React.HTMLAttributes<HTMLButtonElement>) {
  const { onSelect, active, loading, FileActions, lockingStatus } =
    useFileTree()

  const icon = useMemo(() => {
    if (loading === item.value) return <Spinner size={16} />
    if (item.type === 'binary') return <FileBlankIcon />
    if (item.addedCount && !item.removedCount) return <FileAddedIcon />
    if (!item.addedCount && item.removedCount) return <FileRemovedIcon />
    return <FileBlankIcon />
  }, [item.addedCount, item.removedCount, item.type, item.value, loading])

  if (!item.value) return null

  let status

  if (
    lockingStatus?.type === 'locking-all' ||
    lockingStatus?.type === 'unlocking-all' ||
    ((lockingStatus?.type === 'locking' ||
      lockingStatus?.type === 'unlocking') &&
      lockingStatus.fileName === item.value) ||
    ((lockingStatus?.type === 'locking-folder' ||
      lockingStatus?.type === 'unlocking-folder') &&
      item.value.startsWith(lockingStatus.folderName))
  ) {
    status = (
      <div className="flex items-center justify-end">
        <Spinner size={14} className="m-0 w-fit p-0" />
      </div>
    )
  } else if (item.isLocked) {
    status = (
      <div className="flex items-center justify-end">
        <LockClosed size={14} className="m-0 w-fit p-0" />
      </div>
    )
  } else if (item.addedCount && item.type === 'binary') {
    status = (
      <div className="flex items-center gap-0.5 text-xs text-v0-green-700">
        Added
      </div>
    )
  } else {
    status = <DiffNumbers added={item.addedCount} removed={item.removedCount} />
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <ItemRow
          active={item.value === active}
          onClick={() => onSelect(item.value)}
          className={cn(className, item.isLocked && 'text-v0-gray-900')}
          icon={icon}
          status={status}
          {...props}
        >
          {item.title}
        </ItemRow>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <FileActions item={item} />
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

/**
 * The clickable button for a <Folder /> or <File />.
 */
function ItemRow({
  className,
  active,
  icon,
  status,
  children,
  ...props
}: {
  className?: string
  active?: boolean
  icon: ReactNode
  status: ReactNode
  children: string
} & HTMLAttributes<HTMLButtonElement>) {
  return (
    <li>
      <Button
        className={cn(
          'data-[active=true]:bg-alpha-200 mb-0 h-[26px] w-full min-w-36 justify-between gap-2 pl-0.5 pr-1',
          className,
        )}
        data-active={active}
        size="sm"
        variant="ghost"
        title={children}
        {...props}
      >
        <div className="flex min-w-0 items-center gap-1">
          <div className="p-0.5 text-v0-gray-900 group-focus:text-v0-gray-1000 group-data-[active=true]:text-gray-900">
            {icon}
          </div>
          <span className="truncate font-normal">{children}</span>
        </div>
        {status}
      </Button>
    </li>
  )
}

function hasChildWithValue(items: ItemData[], value: string | undefined) {
  return items.some((item): boolean => {
    if (item.value === value) return true
    if (item.items) return hasChildWithValue(item.items, value)
    return false
  })
}
