//@ts-nocheck

'use client'
import { Box, Typography, Button, IconButton } from '@mui/material'
import { grey, pink, purple } from '@mui/material/colors'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined'
import { useContext } from 'react'
import { AudioContext } from '@/app/context/audio_context'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import { AccountCircle } from '@mui/icons-material'

export default function FeedItem({
  id,
  username,
  mediaTitle,
  postTitle,
  setPostViewId,
}) {
  const { setAudioSrc } = useContext(AudioContext)
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      borderBottom={1}
      borderColor={grey[400]}
      padding={1}
      onClick={() => setPostViewId(id)}
    >
      <Box
        width="100%"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box marginRight={2}>
          <AccountCircle fontSize="large" />
        </Box>
        <Box>
          <Typography variant="h6">{username}</Typography>
          <Typography variant="body">{postTitle}</Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        alignItems="center"
      >
        <Box display="flex" alignItems="center">
          <IconButton color="primary">
            <AudiotrackIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6">{mediaTitle}</Typography>
        </Box>
      </Box>
      <Box display="flex" width="100%" justifyContent="space-evenly">
        <IconButton color="primary" aria-label="repost">
          <RepeatOutlinedIcon />
        </IconButton>
        <IconButton color="primary" aria-label="favorite">
          <FavoriteBorderOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
