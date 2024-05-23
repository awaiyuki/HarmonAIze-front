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
import { AddBox, CurrencyYenTwoTone } from '@mui/icons-material'
import { useTheme } from '@emotion/react'
import RotateLeftIcon from '@mui/icons-material/RotateLeft'
import DownloadIcon from '@mui/icons-material/Download'
import { AudioContext } from '../context/audio_context'
import { grey, pink, purple } from '@mui/material/colors'
import { ListItemButton, ListItemIcon, Modal } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import useSWR from 'swr'
import ShareIcon from '@mui/icons-material/Share'
import MusicShareModal from '../components/music_share_modal'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import MusicCover from '../components/music_cover'
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
  const username = session?.user.username
  const theme = useTheme()

  const [modalOpen, setModalOpen] = useState(false)
  const [musicShareData, setMusicShareData] = useState({})

  const [uploadedAudioData, setUploadedAudioData] = useState({})
  // const [musicListData, setMusicListData] = useState([])
  const [currentMusicData, setCurrentMusicData] = useState({
    title: '',
    url: '',
  })
  const { audioSrc, setAudioSrc } = useContext(AudioContext)
  const fetchMusicList = async (url) => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {},
    })
    const responseData = await res.json()
    console.log('musics:' + responseData)
    return responseData
  }

  let {
    data: musicListData,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/music/list?username=' + username, fetchMusicList)
  console.log(musicListData, error, isLoading)
  console.log(musicListData)

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

    mutate()
  }

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
      `/api/music/play?username=${username}&music=${title}`,
      {
        method: 'GET',
        headers: {},
      }
    )

    const responseData = await res.json()
    console.log(responseData)
    setCurrentMusicData({ title: responseData.title, url: responseData.url })
    setAudioSrc(responseData.url)
  }

  return (
    // <Fade in={true} timeout={{ enter: 600 }}>
    <Box
      sx={{
        display: 'flex',
        flex: '1',
        flexDirection: { xs: 'column', sm: 'row' },
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        sx={{
          height: '100%',
          flex: '0.3',
          borderRight: 1,
          borderColor: grey[400],
          padding: 2,
          overflow: 'hidden',
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
            marginTop: 2,
            width: '100%',
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
            width: '100%',
          }}
          startIcon={<AutoFixHighIcon />}
          disabled={uploadedAudioData.title ? false : true}
          onClick={() => {
            handleGenerateAccompaniment(username)
          }}
        >
          반주 생성
        </Button>
      </Box>

      <Box
        sx={{
          flex: '0.7',
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          alignItems: 'flex-end',
          margin: '0',
        }}
      >
        <Box
          sx={{
            margin: '0',
            width: '100%',
            overflow: 'auto',
          }}
        >
          <List
            sx={{
              margin: '0',
              bgcolor: 'background.paper',
            }}
          >
            {musicListData &&
              musicListData.toReversed().map((music, i) => (
                <Fade
                  key={'music' + music.id}
                  in={true}
                  // style={{ transitionDelay: `${i * 150}ms` }}
                  timeout={{ enter: 1000 }}
                >
                  <Box
                    sx={{
                      padding: 2,
                      '&:hover': { bgcolor: 'secondary.main' },
                      cursor: 'pointer',
                    }}
                    onClick={() => fetchMusicFile(username, music.title)}
                  >
                    <ListItem disablePadding>
                      <Box sx={{ marginRight: 2 }}>
                        <MusicCover />
                      </Box>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography variant="body1" fontWeight="500">
                            {music.title}
                          </Typography>
                        }
                      />
                      <IconButton
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation()
                          setMusicShareData({
                            username,
                            title: music.title,
                          })
                          setModalOpen(true)
                        }}
                      >
                        <ShareIcon />
                      </IconButton>

                      <MusicShareModal
                        open={modalOpen}
                        setOpen={setModalOpen}
                        musicShareData={musicShareData}
                      />

                      <Box marginLeft={4} display="flex" flexDirection="column">
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
                    </ListItem>
                  </Box>
                </Fade>
              ))}
          </List>
        </Box>
      </Box>
    </Box>
    // </Fade>
  )
}
