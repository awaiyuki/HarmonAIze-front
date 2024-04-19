//@ts-nocheck
'use client'
import { Session } from 'inspector'
import { SessionProvider } from 'next-auth/react'
import ToggleColorMode from './components/toggle_color_mode'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { AudioContext } from './context/audio_context'
import { useState } from 'react'
export default function Provider({ children }) {
  const [audioSrc, setAudioSrc] = useState('')

  return (
    <SessionProvider>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ToggleColorMode>
          <AudioContext.Provider value={{ audioSrc, setAudioSrc }}>
            {children}
          </AudioContext.Provider>
        </ToggleColorMode>
      </AppRouterCacheProvider>
    </SessionProvider>
  )
}
