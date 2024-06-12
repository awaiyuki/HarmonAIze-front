//@ts-nocheck

'use client'
import { Box, Typography, Button, IconButton, Grid } from '@mui/material'
import { grey, pink, purple, red } from '@mui/material/colors'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined'
import { useContext } from 'react'
import { AudioContext } from '@/app/context/audio_context'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import { AccountCircle, Favorite } from '@mui/icons-material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import MusicCover from '../common/music_cover'
import ChatIcon from '@mui/icons-material/Chat'

export default function FeedItem({
  id,
  username,
  mediaTitle,
  coverImageUrl,
  postTitle,
  numLikes,
  numComments,
  postViewId,
  setPostViewId,
  hasLiked,
}) {
  console.log(hasLiked)
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      borderBottom={1}
      borderColor={grey[400]}
      padding={2}
      bgcolor={id == postViewId ? 'secondary.main' : 'transparent'}
      onClick={() => setPostViewId(id)}
      sx={{
        '&:hover': {
          bgcolor: 'secondary.main',
        },
        cursor: 'pointer',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <MusicCover isLoading={false} src={coverImageUrl} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box paddingBottom={2}>
            <Typography variant="body1" fontWeight="bold">
              {mediaTitle}
            </Typography>

            <Box
              width="100%"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              gap={1}
            >
              <AccountCircle fontSize="medium" />
              <Typography variant="body1" fontWeight="medium">
                {username}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ChatIcon />
            <Typography variant="body1" fontWeight="medium">
              {postTitle}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        alignItems="center"
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap={1}
          margin={1}
        >
          <Box
            display="flex"
            alignItems="center"
            bgcolor="primary.main"
            borderRadius="8px"
            color="white"
            paddingLeft={1}
            paddingRight={1}
          ></Box>
        </Grid>
      </Box>
      <Box display="flex" width="100%" justifyContent="space-evenly">
        <Grid container justifyContent="center" gap={1}>
          {hasLiked ? (
            <Favorite sx={{ color: red[400] }} />
          ) : (
            <FavoriteBorderOutlinedIcon sx={{ color: red[400] }} />
          )}
          <Typography variant="body1">{numLikes}</Typography>
        </Grid>
        <Grid container justifyContent="center" gap={1}>
          <ChatBubbleOutlineIcon />
          <Typography variant="body1">{numComments}</Typography>
        </Grid>
      </Box>
    </Box>
  )
}
