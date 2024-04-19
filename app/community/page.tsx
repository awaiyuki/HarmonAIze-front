//@ts-nocheck
'use client'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Fade from '@mui/material/Fade'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import FeedItem from '../components/community/feed_item'
import { grey } from '@mui/material/colors'

export default function Community() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/')
    },
  })

  console.log(session)
  const [audioInfo, SetAudioInfo] = useState({ name: '', url: '' })

  const handleFileUpload = async (e) => {
    e.preventDefault()

    if (!e.target.files[0]) {
      return
    }
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('name', 'dummyUser')
    formData.append('file', file)

    const fileContent = formData.get('file')
    for (let value of formData.values()) {
      console.log(value)
    }

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {},
      body: formData,
    })
    const responseFormData = await res.formData()
    const responseFile = responseFormData.get('file')
    const url = URL.createObjectURL(responseFile)
    console.log(responseFile)
    SetAudioInfo({ name: responseFile.name, url })
  }

  return (
    <Container maxWidth="sm">
      <Fade in={true} timeout={{ enter: 700 }}>
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="100%"
            marginBottom={2}
          >
            <TextField
              variant="standard"
              placeholder="입력하세요"
              sx={{
                width: '100%',
                marginBottom: 1,
              }}
              minRows={2}
              multiline
            />
            <Box display="flex" width="100%" justifyContent="space-between">
              <Box display="flex">
                <Button variant="text">음악</Button>
                <Button variant="text">사진</Button>
              </Box>
              <Button
                variant="contained"
                sx={{
                  flexGrow: 0.5,
                }}
              >
                게시
              </Button>
            </Box>
          </Box>
          <Box
            width="100%"
            borderTop={1}
            borderColor={grey[400]}
            marginBottom={20}
          >
            <FeedItem
              sx={{
                width: '100%',
                height: '100px',
                border: '1px',
                borderColor: 'white',
              }}
              username="username1"
              content="이 반주 진짜 좋은 것 같아요."
            />
            <FeedItem
              sx={{
                width: '100%',
                height: '100px',
                border: '1px',
                borderColor: 'white',
              }}
              username="username2"
              content="이 반주 진짜 좋은 것 같아요."
            />
            <FeedItem
              sx={{
                width: '100%',
                height: '100px',
                border: '1px',
                borderColor: 'white',
              }}
              username="username3"
              content="이 반주 진짜 좋은 것 같아요."
            />
          </Box>
        </Box>
      </Fade>
    </Container>
  )
}
