'use client'

import { Box, Button, Typography } from '@mui/material'
import { ColorModeButton } from './toggle_color_mode'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { signOut } from 'next-auth/react'
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
      <Box display="flex">
        <Box flexGrow={1} pl={2}>
          <Link href="/generate">
            <Button>홈</Button>
          </Link>
          <Link href="/community">
            <Button>커뮤니티</Button>
          </Link>
        </Box>
        <ColorModeButton />
        {session && (
          <Typography variant="body1">{session.user.username} 님</Typography>
        )}
        <Button onClick={() => signOut()}>로그아웃</Button>
      </Box>
    </Box>
  )
}
