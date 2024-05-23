//@ts-nocheck
import { Box, Fade, Grid, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import { AudioContext } from '@/app/context/audio_context'
import { useContext } from 'react'
import { AccountCircle, FavoriteBorderOutlined } from '@mui/icons-material'
import { grey, red } from '@mui/material/colors'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'

export default function CommentItem({
  postId,
  commentId,
  username,
  content,
  numLikes,
  hasLiked,
  currentUsername,
}) {
  const handleLikeComment = async (postId, commentId, currentUsername) => {
    console.log(
      `api/community/likeComment?postId=${postId}&commentId=${commentId}`
    )

    const res = await fetch(
      `api/community/likeComment?postId=${postId}&commentId=${commentId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: currentUsername }),
      }
    )
    const resData = await res.json()
    console.log(resData)
    // 여기서 mutate 혹은 refetch 필요해보임.
  }

  return (
    <Box
      sx={{
        borderBottom: '1px solid',
        borderColor: grey[500],
        marginBottom: 1,
        padding: 1,
      }}
    >
      <Grid container alignItems="center" gap={1}>
        <AccountCircle />
        <Typography variant="body1">{username}</Typography>
      </Grid>
      <Box marginTop={1}>
        <Typography variant="body1">{content}</Typography>
      </Box>
      <IconButton
        onClick={() => handleLikeComment(postId, commentId, currentUsername)}
      >
        <FavoriteBorderOutlinedIcon sx={{ color: red[400] }} />
        <Typography>{numLikes}</Typography>
      </IconButton>
    </Box>
  )
}
