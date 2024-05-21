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

export default function CommentInputBox({ username, postId }) {
  const [inputData, setInputData] = useState('')

  const handleCommentWrite = async () => {
    await fetch('/api/community/writeComment?postId=' + postId, {
      method: 'POST',
      body: JSON.Stringify({ username, content: inputData }),
    })
  }

  return (
    <Grid container>
      <TextField
        multiline
        minRows={2}
        value={inputData}
        onChange={(e) => {
          setInputData(e.target.value)
        }}
      />
      <Button variant="contained" onClick={handleCommentWrite}>
        게시
      </Button>
    </Grid>
  )
}
