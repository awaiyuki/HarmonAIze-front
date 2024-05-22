//@ts-nocheck
import { Box, Fade, Grid, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import { AudioContext } from '@/app/context/audio_context'
import { useContext } from 'react'
import {
  AccountCircle,
  Favorite,
  FavoriteBorderOutlined,
} from '@mui/icons-material'
import { grey } from '@mui/material/colors'
import CommentItem from './comment_item'
import CommentInputBox from './comment_input_box'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
export default function PostBox({ postViewId, currentUsername }) {
  const { audioSrc, setAudioSrc } = useContext(AudioContext)
  const [postViewData, setPostViewData] = useState(null)

  const fetchPost = async (id, currentUsername) => {
    // const res = await fetch(`api/community/post?id=${id}&username=${currentUsername}`, {
    //   method: 'GET',
    // })
    // const resData = await res.json()
    const dummyData = {
      id: 1,
      username: 'name',
      mediaTitle: 'mediaTitle',
      postTitle: 'post title',
      postContent: 'post content',
      mediaURL: 'url',
      numLikes: 5,
      hasLiked: false,
      commentList: [
        {
          id: 1,
          username: 'commenter',
          content: 'comment content',
          numLikes: 1,
          hasLiked: false,
        },
      ],
    }
    setPostViewData(dummyData)
  }

  const handleLike = async (postId) => {
    const res = await fetch('/api/community/likePost?postId=' + postId, {
      method: 'POST',
      body: JSON.Stringify({ username }),
    })
    const resData = res.json()
    console.log(resData)
  }

  useEffect(() => {
    if (!postViewId) return
    fetchPost(postViewId, currentUsername)
  }, [postViewId])

  return (
    <Fade in={true} timeout={{ enter: 600 }}>
      <Box
        borderLeft={1}
        borderColor={grey[400]}
        minWidth="32vw"
        minHeight="100vh"
      >
        <Box padding={4}>
          {!postViewData && (
            <Typography variant="h6">게시글을 선택하세요.</Typography>
          )}
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
              <Box display="flex" width="100%" justifyContent="space-evenly">
                <Grid container justifyContent="center">
                  <IconButton onClick={handleLike}>
                    {postViewData.hasLiked ? (
                      <Favorite />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )}
                  </IconButton>
                  <Typography variant="body1">
                    {postViewData.numLikes}
                  </Typography>
                </Grid>
                <Grid container justifyContent="center">
                  <ChatBubbleOutlineIcon />
                  <Typography variant="body1">
                    {postViewData.commentList.length}
                  </Typography>
                </Grid>
              </Box>
              <CommentInputBox />
              {postViewData.commentList.map((e) => (
                <CommentItem
                  key={e.id}
                  id={e.id}
                  username={e.username}
                  content={e.content}
                  numLikes={e.numLikes}
                  hasLiked={e.hasLiked}
                  currentUsername={currentUsername}
                />
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Fade>
  )
}
