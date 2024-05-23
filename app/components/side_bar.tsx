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
function MenuItem({ link, text }) {
  const pathname = usePathname()
  return (
    <ListItemButton
      width="100%"
      component={Link}
      variant="filled"
      href={link}
      selected={link == pathname ? true : false}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {text == '홈' && <HomeIcon />}
        {text == '커뮤니티' && <PeopleIcon />}
        <ListItemText>{text}</ListItemText>
      </Box>
    </ListItemButton>
  )
}
export default function SideBar() {
  const { data: session, status } = useSession()

  if (status != 'authenticated') {
    return <></>
  }

  return (
    <Box
      sx={{
        p: 1,
        zIndex: 1,
        width: '160px',
        height: '100%',
        bgColor: '#ffffffa0',
        borderRight: 1,
        borderColor: grey[400],
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ marginTop: '8px' }}>
        <Typography variant="h5">HarmonAIze</Typography>
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
          </List>
        </Box>
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
        >
          <ColorModeButton />
          {session && (
            <>
              <Grid container direction="row" justifyContent="center">
                <AccountCircleIcon fontSize="large" />
                <Typography variant="body1" marginLeft={1} marginRight={1}>
                  {session?.user.username} 님
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
