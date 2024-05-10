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
function MenuItem({ link, text }) {
  const pathname = usePathname()
  return (
    <ListItemButton
      component={Link}
      variant="filled"
      href={link}
      selected={link == pathname ? true : false}
    >
      <ListItemText>{text}</ListItemText>
    </ListItemButton>
  )
}
export default function SideBar() {
  const { data: session, status } = useSession()

  if (status != 'authenticated') {
    return <></>
  }

  return (
    <Hidden smDown>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          p: 1,
          zIndex: 1,
          width: '160px',
          height: '100vh',
          bgColor: '#ffffffa0',
          //   backdropFilter: 'blur(10px)',
          borderRight: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h5">HarmonAIze</Typography>
        <Grid
          container
          direction="column"
          height="80%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
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
          >
            <ColorModeButton />
            {session && (
              <Box>
                <AccountCircleIcon />
                <Typography variant="body1" marginLeft={1} marginRight={1}>
                  {/* {session?.user.username} 님 */}
                </Typography>
                <Button onClick={() => signOut()}>로그아웃</Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Box>
    </Hidden>
  )
}
