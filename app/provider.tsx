'use client'
import { Session } from 'inspector'
import { SessionProvider } from 'next-auth/react'
import ToggleColorMode from './components/toggle_color_mode'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
export default function Provider({ children }) {
  return (
    <SessionProvider>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ToggleColorMode>{children}</ToggleColorMode>
      </AppRouterCacheProvider>
    </SessionProvider>
  )
}
