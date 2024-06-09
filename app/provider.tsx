//@ts-nocheck
'use client'
import { Session } from 'inspector'
import { SessionProvider } from 'next-auth/react'
import ToggleColorMode from './components/common/toggle_color_mode'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { AudioContext } from './context/audio_context'
import { useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
export default function Provider({ children }) {
  const queryClient = new QueryClient()
  return (
    <SessionProvider>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <QueryClientProvider client={queryClient}>
          <ToggleColorMode>{children}</ToggleColorMode>
        </QueryClientProvider>
      </AppRouterCacheProvider>
    </SessionProvider>
  )
}
