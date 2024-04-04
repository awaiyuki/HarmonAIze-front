'use client'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Fade from '@mui/material/Fade'
import { styled } from '@mui/material/styles';

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
  });

export default function Upload(props) {
  
  const handleFileUpload = async (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.DATA_API_KEY!,
      },
      body: JSON.stringify(formData),
    })
  }
  
  return (
    <Container maxWidth="lg">
      
      <Fade in={true} timeout={{enter:700}}>
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
            marginTop:4,
            width:400
          }}
        >
          음악 업로드
          <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
        </Button>

        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          size="large"
          sx={{
            marginTop:4,
            width:400
          }}
        >
          반주 생성
        </Button>
      </Box>
      </Fade>
    </Container>
  )
}