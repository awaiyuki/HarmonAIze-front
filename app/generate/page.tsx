//@ts-nocheck
'use client'

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import WorkIcon from '@mui/icons-material/Work'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Fade from '@mui/material/Fade'
import { styled } from '@mui/material/styles'
import { useContext, useState } from 'react'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { CurrencyYenTwoTone } from '@mui/icons-material'
import { useTheme } from '@emotion/react'
import RotateLeftIcon from '@mui/icons-material/RotateLeft'
import DownloadIcon from '@mui/icons-material/Download'
import { AudioContext } from '../context/audio_context'
import { pink, purple } from '@mui/material/colors'
import { ListItemButton, ListItemIcon } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import useSWR from 'swr'

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

export default function Generate() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/')
    },
  })
  const theme = useTheme()

  const [uploadedAudioData, setUploadedAudioData] = useState({})
  // const [musicListData, setMusicListData] = useState([])
  const [currentMusicData, setCurrentMusicData] = useState({
    title: '',
    url: '',
  })
  const { audioSrc, setAudioSrc } = useContext(AudioContext)

  const handleFileUpload = async (file) => {
    const url = URL.createObjectURL(file)
    setUploadedAudioData({ title: file.name, url, file })
  }

  const handleGenerateAccompaniment = async (username) => {
    const file = uploadedAudioData.file
    const formData = new FormData()
    formData.append('name', username)
    formData.append('file', file)

    const fileContent = formData.get('file')
    for (let value of formData.values()) {
      console.log(value)
    }

    const res = await fetch('/api/music/generate', {
      method: 'POST',
      headers: {},
      body: formData,
    })

    mutate('/api/music/list?username=' + session?.user.username)
  }

  const fetchMusicList = async (url) => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {},
    })
    const responseData = await res.json()
    console.log(responseData)
    return responseData
  }

  let {
    data: musicListData,
    error,
    isLoading,
  } = useSWR(
    '/api/music/list?username=' + session?.user.username,
    fetchMusicList
  )
  console.log(musicListData, error, isLoading)

  // Music List Dummy Data
  // musicListData = [
  //   { id: 1, music: 'd', progress: false, title: 'hello', date: '2010-02-28' },
  //   { id: 1, music: 'd', progress: false, title: 'hello', date: '2010-02-28' },
  //   { id: 1, music: 'd', progress: true, title: 'hello', date: '2010-02-28' },
  //   { id: 1, music: 'd', progress: true, title: 'hello', date: '2010-02-28' },
  //   { id: 1, music: 'd', progress: true, title: 'hello', date: '2010-02-28' },
  //   { id: 1, music: 'd', progress: true, title: 'hello', date: '2010-02-28' },
  //   { id: 1, music: 'd', progress: true, title: 'hello', date: '2010-02-28' },
  // ]

  const fetchMusicFile = async (username, title) => {
    const res = await fetch(
      '/api/music/play?username=' + username + '&music=' + title,
      {
        method: 'GET',
        headers: {},
      }
    )
    const responseData = await res.json()
    setCurrentMusicData({ title: responseData.title, url: responseData.url })
    setAudioSrc(responseData.url)
  }

  useEffect(() => {
    if (!session) return

    console.log(session)

    fetchMusicList(session?.user.username)
  }, [session])

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
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            size="large"
            startIcon={<CloudUploadIcon />}
            sx={{
              marginTop: 4,
              width: '400px',
              maxWidth: '100%',
            }}
          >
            음악 업로드
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => {
                e.preventDefault()
                if (!e.target.files) return

                const file = e.target.files[0]

                if (!file) return

                handleFileUpload(file)
              }}
            />
          </Button>

          {uploadedAudioData && uploadedAudioData.title && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 4,
              }}
            >
              <Typography variant="h5">{uploadedAudioData.title}</Typography>
              <audio src={uploadedAudioData.url} type="audio/mp3" controls />
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
              maxWidth: '100%',
            }}
            disabled={uploadedAudioData.title ? false : true}
            onClick={() => {
              handleGenerateAccompaniment(session?.user.username)
            }}
          >
            반주 생성
          </Button>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 8,
              marginBottom: 24,
            }}
          >
            <Typography variant="h4">음악 목록</Typography>
            <IconButton
              color="primary"
              onClick={() => fetchMusicList(session?.user.username)}
            >
              <RefreshIcon />
            </IconButton>
            <Box
              sx={{
                width: '100%',
                maxHeight: '500px',
                overflow: 'auto',
              }}
            >
              <List
                sx={{
                  bgcolor: 'background.paper',
                }}
              >
                {musicListData &&
                  musicListData.map((music, i) => (
                    <Fade
                      key={'music' + music.id}
                      in={true}
                      // style={{ transitionDelay: `${i * 150}ms` }}
                      timeout={{ enter: 1000 }}
                      delay
                    >
                      <ListItem
                        onClick={() =>
                          fetchMusicFile(session?.user.username, music.title)
                        }
                        disablePadding
                      >
                        <ListItemButton>
                          <ListItemIcon>
                            <AudiotrackIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={music.title}
                            secondary={music.date}
                          />
                          <Box
                            marginLeft={4}
                            display="flex"
                            flexDirection="column"
                          >
                            <Box>
                              {music.progress ? (
                                <></>
                              ) : (
                                <RotateLeftIcon
                                  sx={{
                                    animation: 'spin 2s linear infinite',
                                    '@keyframes spin': {
                                      '0%': {
                                        transform: 'rotate(360deg)',
                                      },
                                      '100%': {
                                        transform: 'rotate(0deg)',
                                      },
                                    },
                                  }}
                                />
                              )}
                            </Box>
                            <Box>
                              <DownloadIcon />
                            </Box>
                          </Box>
                        </ListItemButton>
                      </ListItem>
                    </Fade>
                  ))}
              </List>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Container>
  )
}
