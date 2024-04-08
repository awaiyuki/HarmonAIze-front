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

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

export default function Upload(props) {
  const [audioInfo, SetAudioInfo] = useState({name:'',url:''})
  const handleFileUpload = async (e) => {
    e.preventDefault()

    if(!e.target.files[0]) {
      return;
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
    SetAudioInfo({name:responseFile.name, url})
  }

  return (
    <Container maxWidth="lg">
      <Fade in={true} timeout={{ enter: 700 }}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            size="large"
            startIcon={<CloudUploadIcon />}
            sx={{
              marginTop: 4,
              width: 400,
            }}
          >
            음악 업로드
            <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
          </Button>

          {audioInfo && audioInfo.name && (
            <Box
              sx={{
                marginTop: 4,
              }}
            >
              <Typography variant="h5">{audioInfo.name}</Typography>
              <audio src={audioInfo.url} type="audio/x-m4a" controls />
            </Box>
          )}

          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            size="large"
            sx={{
              marginTop: 4,
              width: 400,
            }}
          >
            반주 생성
          </Button>
        </Box>
      </Fade>
    </Container>
  )
}
