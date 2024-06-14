//@ts-nocheck
'use client'

import {
  Box,
  Button,
  Typography,
  Stack,
  Hidden,
  useTheme,
  ListItemButton,
  ListItemText,
  List,
} from '@mui/material'
import { ColorModeButton } from './toggle_color_mode'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect, usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

function NavMenuItem({ link, text }) {
  const pathname = usePathname()
  const selected = link == pathname ? true : false
  return (
    <ListItemButton
      component={Link}
      variant="filled"
      href={link}
      selected={selected}
      sx={{
        width: '90px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography
        sx={{ variant: 'body1', fontWeight: selected ? 'bold' : 500 }}
      >
        {text}
      </Typography>
    </ListItemButton>
  )
}
export default function NavBar() {
  const { data: session, status } = useSession()

  const theme = useTheme()

  if (status != 'authenticated') {
    return <></>
  }

  return (
    <Box
      theme
      sx={{
        p: 1,
        zIndex: 1,
        width: '100vw',
        bgcolor:
          theme.palette.mode == 'light'
            ? 'rgba(255, 255, 255, 0.5)'
            : 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
        boxShadow: 2,
      }}
    >
      <Box width="100%" display="flex" alignItems="center">
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          flexGrow={1}
          pl={2}
        >
          <Typography variant="h6" mr={2}>
            HarmonAIze
          </Typography>
          <List sx={{ display: 'flex', padding: 0 }}>
            <NavMenuItem link="/generate" text="홈" />
            <NavMenuItem link="/community" text="커뮤니티" />
            <NavMenuItem link="/options" text="설정" />
          </List>
        </Box>
        <Stack direction="row" spacing={4}>
          {/* <ColorModeButton /> */}
          {session && (
            <Box display="flex" alignItems="center">
              <AccountCircleIcon />
              {/* <Typography variant="body1" marginLeft={1} marginRight={1}>
                  {session?.user.username} 님
                </Typography> */}
              {/* <Button onClick={() => signOut()}>로그아웃</Button> */}
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  )
}
