//@ts-nocheck

'use client'
import { Box, Typography, Button, IconButton, Grid } from '@mui/material'
import { grey, pink, purple } from '@mui/material/colors'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined'
import { useContext } from 'react'
import { AudioContext } from '@/app/context/audio_context'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import { AccountCircle } from '@mui/icons-material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
export default function FeedItem({
  id,
  username,
  mediaTitle,
  postTitle,
  numLikes,
  numComments,
  setPostViewId,
}) {
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
      sx={{
        '&:hover': {
          bgcolor: 'primary.light',
        },
        cursor: 'pointer',
      }}
    >
      <Box
        width="100%"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        gap={1}
      >
        <AccountCircle fontSize="large" />
        <Typography variant="h6" fontWeight="bold">
          {username}
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        alignItems="center"
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={1}
        >
          <Typography variant="h6" fontWeight="bold">
            {postTitle}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            bgcolor="primary.main"
            borderRadius="8px"
            color="white"
            paddingLeft={1}
            paddingRight={1}
          >
            <AudiotrackIcon color="white" />
            <Typography variant="body1">{mediaTitle}</Typography>
          </Box>
        </Grid>
      </Box>
      <Box display="flex" width="100%" justifyContent="space-evenly">
        <Grid container justifyContent="center">
          <FavoriteBorderOutlinedIcon />
          <Typography variant="body1">{numLikes}</Typography>
        </Grid>
        <Grid container justifyContent="center">
          <ChatBubbleOutlineIcon />
          <Typography variant="body1">{numComments}</Typography>
        </Grid>
      </Box>
    </Box>
  )
}
