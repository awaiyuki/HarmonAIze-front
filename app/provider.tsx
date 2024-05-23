//@ts-nocheck
'use client'
import { Session } from 'inspector'
import { SessionProvider } from 'next-auth/react'
import ToggleColorMode from './components/toggle_color_mode'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { AudioContext } from './context/audio_context'
import { useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
export default function Provider({ children }) {
  const [audioSrc, setAudioSrc] = useState('')

  const queryClient = new QueryClient()
  return (
    <SessionProvider>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <QueryClientProvider client={queryClient}>
          <ToggleColorMode>
            <AudioContext.Provider value={{ audioSrc, setAudioSrc }}>
              {children}
            </AudioContext.Provider>
          </ToggleColorMode>
        </QueryClientProvider>
      </AppRouterCacheProvider>
    </SessionProvider>
  )
}
