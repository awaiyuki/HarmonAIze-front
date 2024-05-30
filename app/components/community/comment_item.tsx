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
import { grey, red } from '@mui/material/colors'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function CommentItem({
  postId,
  commentId,
  postViewData,
  username,
  content,
  numLikes,
  hasLiked,
  currentUsername,
}) {
  const queryClient = useQueryClient()

  const handleLikeComment = useMutation({
    mutationFn: async ({ postId, commentId, currentUsername }) => {
      console.log(
        `api/community/likeComment?postId=${postId}&commentId=${commentId}&username=${currentUsername}`
      )

      const res = await fetch(
        `api/community/likeComment?postId=${postId}&commentId=${commentId}&username=${currentUsername}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        }
      )
      const resData = await res.json()
      return resData
      console.log(resData)
    },
    onMutate: async () => {
      const previousPostData = queryClient.getQueryData(['post'])
      await queryClient.cancelQueries(['post'])
      queryClient.setQueryData(['post'], () => {
        return {
          ...postViewData,
          commentList: {
            ...postViewData.commentList.map((comment) => {
              if (comment.id == commentId) {
                return {
                  ...comment,
                  numLikes: hasLiked ? numLikes - 1 : numLikes + 1,
                  hasLiked: !hasLiked,
                }
              }
            }),
          },
          numLikes: postViewData?.hasLiked
            ? postViewData?.numLikes - 1
            : postViewData?.numLikes + 1,
          hasLiked: !postViewData?.hasLiked,
        }
      })
      return { previousPostData }
    },
    onSuccess: () => {
      console.log('on success')
      queryClient.invalidateQueries({ queryKey: ['post'] })
      // queryClient.invalidateQueries({
      //   queryKey: ['postList'],
      //   refetchType: 'all',
      // })
    },
    onError: (error, variables, context) => {
      console.log('on error', error)
      queryClient.setQueryData(['post'], () => {
        return { ...context?.previousPostData }
      })
    },
  })
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
        onClick={() =>
          handleLikeComment.mutate({ postId, commentId, currentUsername })
        }
      >
        {hasLiked ? (
          <Favorite sx={{ color: red[400] }} />
        ) : (
          <FavoriteBorderOutlinedIcon sx={{ color: red[400] }} />
        )}
        <Typography>{numLikes}</Typography>
      </IconButton>
    </Box>
  )
}
