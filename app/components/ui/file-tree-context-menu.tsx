import { ItemData } from './file-tree'
import React, { ReactNode } from 'react'

export interface FileTreeAction {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  onClick: (item: ItemData) => void
  group?: 'primary' | 'secondary' | 'danger'
}

export interface FileTreeContextMenuProps {
  FileActions?: (props: { item: ItemData }) => ReactNode
  FolderActions?: (props: { item: ItemData }) => ReactNode
  TreeActions?: () => ReactNode
}
