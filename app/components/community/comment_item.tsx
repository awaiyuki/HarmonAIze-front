//@ts-nocheck
import { Box, Fade, Grid, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import { AudioContext } from '@/app/context/audio_context'
import { useContext } from 'react'
import { AccountCircle, FavoriteBorderOutlined } from '@mui/icons-material'
import { grey } from '@mui/material/colors'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'

export default function CommentItem({
  id,
  username,
  content,
  numLikes,
  hasLiked,
  currentUsername,
}) {
  const handleLikeComment = async (postId, commentId) => {
    const res = await fetch(
      `api/community/likeComment?postId=${postId}&commentId=${commentId}`,
      { method: 'POST', body: JSON.stringify({ username: currentUsername }) }
    )
    const resData = res.json()
    console.log(resData)
  }

  return (
    <Box
      sx={{
        borderWidth: '1px',
        borderBottom: '1px',
        borderColor: 'black',
      }}
    >
      <Grid container alignContent="center">
        <AccountCircle />
        <Typography variant="h6">{username}</Typography>
      </Grid>
      <Typography variant="body1">{content}</Typography>
      <IconButton onClick={handleLikeComment}>
        <FavoriteBorderOutlinedIcon />
      </IconButton>
    </Box>
  )
}
