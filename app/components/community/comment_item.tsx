//@ts-nocheck
import { Box, Fade, Grid, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import { AudioContext } from '@/app/context/audio_context'
import { useContext } from 'react'
import { AccountCircle } from '@mui/icons-material'
import { grey } from '@mui/material/colors'

export default function CommentItem({
  id,
  username,
  content,
  numLikes,
  hasLiked,
}) {
  return (
    <Box>
      <AccountCircle /> {username}
      {content}
    </Box>
  )
}
