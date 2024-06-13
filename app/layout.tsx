//@ts-nocheck
'use client'
import * as React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Provider from './provider'
import { ColorModeButton } from './components/common/toggle_color_mode'
import NavBar from './components/common/nav_bar'
import AudioPlayerBottom from './components/common/audio_player_bottom'
import SideBar from './components/common/side_bar'
import { Box, Grid, useMediaQuery } from '@mui/material'
import DrawerGenerateButton from './components/common/drawer_generate_button'
import { useContext } from 'react'
import { AudioContext } from './context/audio_context'
import { useTheme } from '@mui/material'
import Image from 'next/image'
import BackgroundImage from './components/common/background_image'

export default function RootLayout({ children }) {
  const [audioData, setAudioData] = React.useState({
    playOption: 'with-original',
  })
  const audioPlayerRef = React.useRef()
  const theme = useTheme()
  const [imageLoaded, setImageLoaded] = React.useState(false)

  return (
    <html lang="en">
      <body>
        <Provider>
          <AudioContext.Provider
            value={{ audioPlayerRef, audioData, setAudioData }}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                maxHeight: '100vh',
              }}
            >
              <BackgroundImage />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(0px)',
                  zIndex: -1,
                }}
              ></Box>
              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <NavBar />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flex: '1',
                  overflow: 'hidden',
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <SideBar />
                </Box>
                {children}
              </Box>
              <Box>
                {/* <DrawerGenerateButton /> */}
                <AudioPlayerBottom />
              </Box>
            </Box>
          </AudioContext.Provider>
        </Provider>
      </body>
    </html>
  )
}
