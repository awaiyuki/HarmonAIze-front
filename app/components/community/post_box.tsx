//@ts-nocheck
import { Box, Fade, Grid, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import { AudioContext } from '@/app/context/audio_context'
import { useContext } from 'react'
import { AccountCircle } from '@mui/icons-material'

export default function PostBox({ postViewId }) {
  const { audioSrc, setAudioSrc } = useContext(AudioContext)
  const [postViewData, setPostViewData] = useState({})

  const fetchPost = async (id) => {
    const res = await fetch('api/community/post?id=' + id, {
      method: 'GET',
    })
    const resData = await res.json()
    setPostViewData(resData)
  }
  useEffect(() => {
    if (!postViewId) return
    fetchPost(postViewId)
  }, [postViewId])

  return (
    <Fade in={true} timeout={{ enter: 600 }}>
      <Box borderLeft={1}>
        <Box padding={4} minWidth="32vw">
          {postViewData && (
            <Grid container direction="column" gap={2}>
              <Typography variant="h4">{postViewData.postTitle}</Typography>
              <Grid container direction="row" gap={2}>
                <IconButton
                  color="primary"
                  fontSize="large"
                  onClick={() => setAudioSrc(postViewData.mediaURL)}
                >
                  <AudiotrackIcon />
                </IconButton>
                <Typography variant="h6" fontWeight="bold">
                  {postViewData.mediaTitle}
                </Typography>
              </Grid>
              <Grid container direction="row" gap={2}>
                <AccountCircle fontSize="large" />
                <Typography variant="h6">{postViewData.username}</Typography>
              </Grid>
              <Typography variant="h6">{postViewData.postContent}</Typography>
            </Grid>
          )}
        </Box>
      </Box>
    </Fade>
  )
}
