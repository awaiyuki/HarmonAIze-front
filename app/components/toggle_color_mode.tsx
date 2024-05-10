//@ts-nocheck
'use client'
import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useEffect } from 'react'
import { green, lime, pink, purple, teal } from '@mui/material/colors'

const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

export function ColorModeButton() {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)
  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={colorMode.toggleColorMode}
      color="inherit"
    >
      {theme.palette.mode === 'dark' ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  )
}

export default function ToggleColorMode({ children }) {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark')

  let initialMode

  useEffect(() => {
    initialMode = window.localStorage.getItem('theme')
    if (!initialMode) return
    console.log(initialMode)
    setMode(initialMode)
  }, [])

  useEffect(() => {
    if (initialMode) return
    console.log('set local', mode)
    window.localStorage.setItem('theme', mode)
  }, [mode])

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: purple[500],
            light: purple[400],
            dark: purple[600],
          },
          secondary: pink,
        },
      }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}
