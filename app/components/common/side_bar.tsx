//@ts-nocheck
'use client'

import {
  Box,
  Button,
  Typography,
  Stack,
  Hidden,
  ListItem,
  ListItemText,
  ListItemButton,
  List,
  Grid,
} from '@mui/material'
import { ColorModeButton } from './toggle_color_mode'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect, usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { grey } from '@mui/material/colors'
import HomeIcon from '@mui/icons-material/Home'
import PeopleIcon from '@mui/icons-material/People'
import { useTheme } from '@emotion/react'
function MenuItem({ link, text }) {
  const pathname = usePathname()
  const selected = link == pathname ? true : false
  return (
    <ListItemButton
      width="100%"
      component={Link}
      variant="filled"
      href={link}
      selected={selected}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {text == '홈' && <HomeIcon />}
        {text == '커뮤니티' && <PeopleIcon />}
        {text == '옵션' && <PeopleIcon />}
        <ListItemText>
          <Typography sx={{ fontWeight: selected ? 'bold' : 500 }}>
            {text}
          </Typography>
        </ListItemText>
      </Box>
    </ListItemButton>
  )
}
export default function SideBar() {
  const { data: session, status } = useSession()

  if (status != 'authenticated') {
    return <></>
  }

  const theme = useTheme()

  return (
    <Box
      sx={{
        p: 1,
        zIndex: 1,
        width: '200px',
        height: '95%',
        // borderRight: 1,
        // borderColor: grey[400],
        display: 'flex',
        flexDirection: 'column',
        bgcolor:
          theme.palette.mode == 'light'
            ? 'rgba(255, 255, 255, 0.5)'
            : 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        m: 1,
      }}
    >
      <Box
        sx={{
          marginTop: '8px',
          display: 'flex',
          justifyContent: 'flex-start',
          pt: 4,
          pb: 4,
          pl: 1,
        }}
      >
        <Typography variant="h5" fontWeight="500">
          HarmonAIze
        </Typography>
      </Box>
      <Grid
        container
        height="100%"
        marginTop={2}
        direction="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box width="100%">
          <List>
            <MenuItem link="/generate" text="홈" />
            <MenuItem link="/community" text="커뮤니티" />
            <MenuItem link="/options" text="옵션" />
          </List>
        </Box>
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
        >
          {/* <ColorModeButton /> */}
          {session && (
            <>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <AccountCircleIcon fontSize="large" />
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  marginLeft={1}
                  marginRight={1}
                >
                  {session?.user.username}
                </Typography>
              </Grid>
              <Button onClick={() => signOut()}>로그아웃</Button>
            </>
          )}
        </Box>
      </Grid>
    </Box>
  )
}
