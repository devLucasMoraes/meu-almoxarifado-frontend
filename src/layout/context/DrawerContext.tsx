'use client'
import { useTheme } from '@mui/material'
import { createContext, useCallback, useContext, useState } from 'react'

interface IDrawerOptions {
  path: string
  icon: JSX.Element
  label: string
  group: string
}
interface IDrawerContextData {
  isDrawerOpen: boolean
  toggleDrawerOpen: () => void
  drawerOptions: IDrawerOptions[]
  setDrawerOptions: (newDrawerOptions: IDrawerOptions[]) => void
  drawerWidth: string
}

const DrawerContext = createContext({} as IDrawerContextData)

export const useDrawerContext = () => {
  return useContext(DrawerContext)
}

export default function DrawerProvider({ children }: { children: React.ReactNode }) {
  const theme = useTheme()

  const drawerWidth = theme.spacing(32)

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([])

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen)
  }, [])

  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOptions[]) => {
    setDrawerOptions(newDrawerOptions)
  }, [])

  return (
    <DrawerContext.Provider
      value={{ isDrawerOpen, toggleDrawerOpen, drawerOptions, setDrawerOptions: handleSetDrawerOptions, drawerWidth }}
    >
      {children}
    </DrawerContext.Provider>
  )
}
