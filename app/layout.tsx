//@ts-nocheck
'use client'
import * as React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Provider from './provider'
import { ColorModeButton } from './components/common/toggle_color_mode'
import NavBar from './components/common/nav_bar'
import AudioPlayerBottom from './components/music/audio_player_bottom'
import SideBar from './components/common/side_bar'
import { Box, Grid, useMediaQuery } from '@mui/material'
import DrawerGenerateButton from './components/common/drawer_generate_button'
import { useContext } from 'react'
import { AudioContext } from './context/audio_context'
import { useTheme } from '@mui/material'

export default function RootLayout({ children }) {
  const [audioData, setAudioData] = React.useState('')
  const theme = useTheme()
  return (
    <html lang="en">
      <body>
        <Provider>
          <AudioContext.Provider value={{ audioData, setAudioData }}>
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
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url('${audioData.coverImageUrl}')`,
                  zIndex: -2,
                  transition: 'background-image 1s',
                }}
              ></Box>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  bgcolor: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(10px)',
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
                <DrawerGenerateButton />
                <AudioPlayerBottom />
              </Box>
            </Box>
          </AudioContext.Provider>
        </Provider>
      </body>
    </html>
  )
}
