'use client'

import {
  createContext,
  ReactNode,
  use,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'

export type UserData = {
  id?: string
  username?: string
  avatarSha?: string
  isV0Admin?: boolean
  isAdminMode?: boolean
  isDemoMode?: boolean
  isVercelian?: boolean
  isImpersonation?: boolean
}

interface UserContextProps {
  user: null | UserData
  setUser: Dispatch<SetStateAction<UserData | null>>
  expectUser: boolean
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  expectUser: false,
})

export const UserProvider = ({
  children,
  expectUser = false,
}: {
  children: ReactNode
  expectUser?: boolean
}) => {
  const [userState, setUser] = useState<UserData | null>(null)

  return (
    <UserContext.Provider value={{ user: userState, expectUser, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => use(UserContext)
