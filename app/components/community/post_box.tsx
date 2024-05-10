//@ts-nocheck
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
export default function PostBox({ postViewId }) {
  const [postViewData, setPostViewData] = useState({})

  const fetchPost = async (id) => {
    const res = await fetch('api/community/post?id=' + id, {
      method: 'GET',
    })
    const resData = await res.json()
    setPostViewData(resData)
  }
  useEffect(() => {
    fetchPost(postViewId)
  }, [postViewId])

  if (!postViewData) return <>{'error'}</>

  return (
    <Box padding={4}>
      <Typography variant="h4">{postViewData.postTitle}</Typography>
      <Typography variant="h6">{postViewData.username}a</Typography>
      <Typography variant="h5">{postViewData.postContent}</Typography>
      <Typography variant="h5">{postViewData.mediaTitle}</Typography>
    </Box>
  )
}
