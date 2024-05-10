//@ts-nocheck
import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'
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
    <Box>
      <Typography>{postViewData.username}</Typography>
      <Typography>{postViewData.postTitle}</Typography>
      <Typography>{postViewData.postContent}</Typography>
      <Typography>{postViewData.mediaTitle}</Typography>
    </Box>
  )
}
