'use client'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ImageIcon from '@mui/icons-material/Image'
import WorkIcon from '@mui/icons-material/Work'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Fade from '@mui/material/Fade'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
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
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/')
    },
  })

  const [audioInfo, SetAudioInfo] = useState({ name: '', url: '' })
  const [generatedAudioInfo, SetGeneratedAudioInfo] = useState({
    name: '',
    url: '',
  })
  const [musicListData, setMusicListData] = useState({ list: [] })

  const handleFileUpload = async (e) => {
    e.preventDefault()

    if (!e.target.files[0]) {
      return
    }
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('name', session.user.name)
    formData.append('file', file)

    const fileContent = formData.get('file')
    for (let value of formData.values()) {
      console.log(value)
    }

    const res = await fetch('/api/music/upload', {
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

  const handleGenerateAccompaniment = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/music/generate', {
      method: 'GET',
      headers: {},
    })
    const responseFormData = await res.formData()
    const responseFile = responseFormData.get('file')
    const url = URL.createObjectURL(responseFile)
    console.log(responseFile)
    SetGeneratedAudioInfo({ name: responseFile.name, url })
  }

  const fetchMusicList = async () => {
    const res = await fetch('/api/music/list', {
      method: 'GET',
      headers: {},
    })
    const responseData = await res.json()
    console.log(responseData)
    setMusicListData(responseData)
  }

  useEffect(() => {
    fetchMusicList()
  }, [])
  return (
    <Container maxWidth="md">
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
            onClick={handleGenerateAccompaniment}
          >
            반주 생성
          </Button>

          {generatedAudioInfo && generatedAudioInfo.name && (
            <Box
              sx={{
                marginTop: 4,
              }}
            >
              <Typography variant="h5">{generatedAudioInfo.name}</Typography>
              <audio src={generatedAudioInfo.url} type="audio/x-m4a" controls />
            </Box>
          )}

          <Box
            sx={{
              marginTop: 8,
            }}
          >
            <Typography variant="h4">음악 목록</Typography>
            <Box>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                }}
              >
                {musicListData.list.map((music) => (
                  <ListItem key={'music' + music.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={music.title}
                      secondary={music.date}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Container>
  )
}
