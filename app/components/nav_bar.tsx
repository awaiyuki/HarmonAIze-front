//@ts-nocheck
'use client'

import { Box, Button, Typography, Stack } from '@mui/material'
import { ColorModeButton } from './toggle_color_mode'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { signOut } from 'next-auth/react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
export default function NavBar() {
  const { data: session, status } = useSession()

  if (status != 'authenticated') {
    return <></>
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        p: 1,
        zIndex: 1,
        width: '100vw',
        bgColor: '#ffffffa0',
        backdropFilter: 'blur(10px)',
        boxShadow: 2,
      }}
    >
      <Box display="flex" alignItems="center">
        <Box display="flex" alignItems="center" flexGrow={1} pl={2}>
          <Typography variant="h5">HarmonAIze</Typography>
          <Link href="/generate">
            <Button>홈</Button>
          </Link>
          <Link href="/community">
            <Button>커뮤니티</Button>
          </Link>
        </Box>
        <Stack direction="row" spacing={4}>
          <ColorModeButton />
          {session && (
            <Box display="flex" alignItems="center">
              <AccountCircleIcon />
              <Typography variant="body1" marginLeft={1} marginRight={1}>
                {session?.user.username} 님
              </Typography>
              <Button onClick={() => signOut()}>로그아웃</Button>
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  )
}
