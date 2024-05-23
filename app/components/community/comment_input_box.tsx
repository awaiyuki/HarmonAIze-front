//@ts-nocheck
import {
  Box,
  Button,
  Fade,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import { AudioContext } from '@/app/context/audio_context'
import { useContext } from 'react'
import { AccountCircle } from '@mui/icons-material'
import { grey } from '@mui/material/colors'
import SendIcon from '@mui/icons-material/Send'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

export default function CommentInputBox({ currentUsername, postId }) {
  const queryClient = useQueryClient()

  const [inputData, setInputData] = useState('')

  const handleCommentWrite = async ({ currentUsername, postId, content }) => {
    console.log({
      username: currentUsername,
      content: inputData,
    })
    const res = await fetch('/api/community/writeComment?postId=' + postId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: currentUsername,
        content,
      }),
    })
    const resData = await res.json()
    setInputData('')
    return resData
    console.log(resData)
  }

  const mutation = useMutation({
    mutationFn: handleCommentWrite,
    onSuccess: () => {
      // Invalidate and refetch
      console.log('on success')
      queryClient.invalidateQueries({ queryKey: ['post'] })
      queryClient.invalidateQueries({ queryKey: ['postList'] })
    },
  })

  return (
    <Grid container sx={{ width: '100%' }}>
      <TextField
        sx={{
          flex: '1',
          marginRight: 1,
        }}
        multiline
        minRows={2}
        value={inputData}
        onChange={(e) => {
          setInputData(e.target.value)
        }}
      />
      <Button
        variant="contained"
        onClick={() =>
          mutation.mutate({ currentUsername, postId, content: inputData })
        }
      >
        <SendIcon />
      </Button>
    </Grid>
  )
}
