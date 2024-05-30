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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
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
              <AudioPlayerBottom />
            </Box>
          </Box>
        </Provider>
      </body>
    </html>
  )
}
