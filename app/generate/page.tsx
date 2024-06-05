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
import {
  AddBox,
  Check,
  CheckBox,
  CurrencyYenTwoTone,
} from '@mui/icons-material'
import { useTheme } from '@emotion/react'
import RotateLeftIcon from '@mui/icons-material/RotateLeft'
import DownloadIcon from '@mui/icons-material/Download'
import { AudioContext } from '../context/audio_context'
import { blue, grey, pink, purple } from '@mui/material/colors'
import {
  Collapse,
  FormControl,
  Grow,
  Input,
  ListItemButton,
  ListItemIcon,
  Modal,
  Radio,
  RadioGroup,
  Switch,
} from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import useSWR from 'swr'
import ShareIcon from '@mui/icons-material/Share'
import MusicShareModal from '../components/music/music_share_modal'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import MusicCover from '../components/music/music_cover'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useQuery } from '@tanstack/react-query'
import { TransitionGroup } from 'react-transition-group'
import Loading from '../components/common/loading'

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
  const [generateResult, setGenerateResult] = useState(false)
  const [inputInstrument, setInputInstrument] = useState('p')
  const [outputInstrumentList, setOutputInstrumentList] = useState({
    p: true,
    g: false,
    b: false,
    d: false,
  })

  const [currentMusicData, setCurrentMusicData] = useState({
    title: '',
    url: '',
  })

  const [mediaTitle, setMediaTitle] = useState('')
  const [tags, setTags] = useState([])

  const { audioSrc, setAudioSrc } = useContext(AudioContext)
  const fetchMusicList = async () => {
    const res = await fetch(`/api/music/list?username=${username}`, {
      method: 'GET',
      headers: {},
    })
    const responseData = await res.json()
    console.log('musics:' + responseData)
    return responseData
  }

  const {
    data: musicListData,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['musicList'],
    queryFn: fetchMusicList,
    refetchInterval: 1000,
  })

  // console.log(musicListData, error, isLoading, isFetching)
  // Music List Dummy Data
  // const musicListData = [
  //   { id: 1, music: 'd', progress: false, title: 'hello', date: '2010-02-28' },
  //   { id: 1, music: 'd', progress: false, title: 'hello', date: '2010-02-28' },
  //   { id: 1, music: 'd', progress: true, title: 'hello', date: '2010-02-28' },
  //   { id: 1, music: 'd', progress: true, title: 'hello', date: '2010-02-28' },
  //   { id: 1, music: 'd', progress: true, title: 'hello', date: '2010-02-28' },
  //   { id: 1, music: 'd', progress: true, title: 'hello', date: '2010-02-28' },
  //   { id: 1, music: 'd', progress: true, title: 'hello', date: '2010-02-28' },
  // ]

  const handleFileUpload = async (file) => {
    const url = URL.createObjectURL(file)
    const type = file.type.split('/')[0]
    setUploadedAudioData({ title: file.name, url, type, file })
  }

  const handleGenerateAccompaniment = async (username) => {
    /* convert output instrument data */
    let content_name = ''
    const keys = Object.keys(outputInstrumentList)
    for (let i = 0; i < keys.length; i++) {
      if (outputInstrumentList[keys[i]]) content_name += keys[i]
    }

    console.log(content_name)

    const file = uploadedAudioData.file
    const formData = new FormData()
    formData.append(
      'mediaInfo',
      new Blob(
        [
          JSON.stringify({
            username,
            mediaTitle,
            mediaMode: uploadedAudioData.type,
            instrument: inputInstrument,
            content_name,
            tags: tags,
          }),
        ],
        { type: 'application/json' }
      )
    )
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

    const resData = await res.json()
    console.log('generate result:', resData)
    if (resData) {
      setGenerateResult(true)
      setTimeout(() => {
        setGenerateResult(false)
      }, 2000)
    }
  }

  const fetchMusicFile = async (id) => {
    const res = await fetch(`/api/music/play?id=${id}`, {
      method: 'GET',
      headers: {},
    })

    const responseData = await res.text()
    console.log(responseData)
    setCurrentMusicData({ title: 'dummy', url: responseData })
    setAudioSrc(responseData)
  }

  const handleInputInstrumentChange = (e) => {
    setInputInstrument(e.target.value)
    console.log(e.target.value)
  }

  const handleOutputInstrumentChange = (e) => {
    setOutputInstrumentList({
      ...outputInstrumentList,
      [e.target.name]: e.target.checked,
    })
    console.log({
      ...outputInstrumentList,
      [e.target.name]: e.target.checked,
    })
  }
  return (
    <Fade in={true}>
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
            display: { xs: 'none', sm: 'block' },
            height: '100%',
            minWidth: '320px',
            flex: '0.3',
            borderRight: 1,
            borderColor: grey[400],
            padding: 2,
            overflowY: 'auto',
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
              accept="image/*, audio/*, video/*"
              onChange={(e) => {
                e.preventDefault()
                if (!e.target.files) return

                const file = e.target.files[0]

                if (!file) return

                handleFileUpload(file)
              }}
            />
          </Button>
          <div>
            <Grow
              in={uploadedAudioData && uploadedAudioData.title}
              style={{ transformOrigin: 'top center' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: 4,
                }}
              >
                <Typography variant="subtitle1">
                  {uploadedAudioData.title}
                </Typography>
                {uploadedAudioData.type === 'audio' && (
                  <audio
                    src={uploadedAudioData.url}
                    type="audio/mp3"
                    controls
                  />
                )}
                {uploadedAudioData.type === 'video' && (
                  <video src={uploadedAudioData.url} width="100%" controls />
                )}

                <Box component="form" sx={{ mt: 4 }} autoComplete="off">
                  <TextField
                    width="100%"
                    required
                    label="제목"
                    value={mediaTitle}
                    onChange={(e) => setMediaTitle(e.target.value)}
                    sx={{ mb: 2 }}
                    size="small"
                    fullWidth
                  />
                  <TextField
                    variant="outlined"
                    label="태그"
                    value={tags}
                    onChange={(e) => {
                      const newTags = e.target.value
                        .replace(/\s+/g, '')
                        .split(',')
                      setTags(newTags)
                      console.log(newTags)
                    }}
                    size="small"
                    fullWidth
                  />
                  <Typography
                    sx={{ mt: 4 }}
                    variant="subtitle1"
                    fontWeight={500}
                  >
                    입력 음악 악기
                  </Typography>
                  <RadioGroup
                    aria-labelledby="radio-buttons-input-instruments"
                    defaultValue="p"
                    name="radio-buttons-group"
                    onChange={handleInputInstrumentChange}
                  >
                    <Box sx={{ display: 'flex' }}>
                      <FormControlLabel
                        value="p"
                        control={<Radio />}
                        label="피아노"
                      />
                      <FormControlLabel
                        value="g"
                        control={<Radio />}
                        label="기타"
                      />
                      <FormControlLabel
                        value="b"
                        control={<Radio />}
                        label="베이스"
                      />
                    </Box>
                  </RadioGroup>

                  <Typography
                    sx={{ mt: 4 }}
                    variant="subtitle1"
                    fontWeight={500}
                  >
                    생성 음악 악기
                  </Typography>
                  <FormGroup>
                    <FormControlLabel
                      checked={outputInstrumentList.p}
                      name="p"
                      control={
                        <Switch onChange={handleOutputInstrumentChange} />
                      }
                      label="피아노"
                    />
                    <FormControlLabel
                      checked={outputInstrumentList.g}
                      name="g"
                      control={
                        <Switch onChange={handleOutputInstrumentChange} />
                      }
                      label="기타"
                    />
                    <FormControlLabel
                      checked={outputInstrumentList.b}
                      name="b"
                      control={
                        <Switch onChange={handleOutputInstrumentChange} />
                      }
                      label="베이스"
                    />
                    <FormControlLabel
                      checked={outputInstrumentList.d}
                      name="d"
                      control={
                        <Switch onChange={handleOutputInstrumentChange} />
                      }
                      label="드럼"
                    />
                  </FormGroup>

                  <Button
                    type="submit"
                    variant="contained"
                    tabIndex={-1}
                    size="large"
                    sx={{
                      mt: 4,
                      mb: 4,
                      width: '100%',
                    }}
                    startIcon={generateResult ? <Check /> : <AutoFixHighIcon />}
                    disabled={uploadedAudioData.title ? false : true}
                    onClick={(e) => {
                      e.preventDefault()
                      handleGenerateAccompaniment(username)
                    }}
                  >
                    {generateResult ? '' : '반주 생성'}
                  </Button>
                </Box>
              </Box>
            </Grow>
          </div>
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
          {isLoading ? (
            <Loading />
          ) : (
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
                <TransitionGroup>
                  {Array.isArray(musicListData) &&
                    musicListData.toReversed().map((music, i) => (
                      <Collapse key={'music' + music.id}>
                        <Box
                          sx={{
                            padding: 2,
                            '&:hover': { bgcolor: 'secondary.main' },
                            cursor: 'pointer',
                          }}
                        >
                          <ListItem disablePadding>
                            {music.mediaType === 'audio' && (
                              <Box
                                sx={{ marginRight: 2 }}
                                onClick={() => fetchMusicFile(music.id)}
                              >
                                <MusicCover isLoading={music.progress} />
                              </Box>
                            )}
                            {music.mediaType === 'video' && (
                              <Box>
                                <video src={music.url} controls width="100%" />
                              </Box>
                            )}
                            <ListItemText
                              disableTypography
                              primary={
                                <>
                                  <Typography variant="h6" fontWeight="500">
                                    {music.title}
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    fontWeight="500"
                                    color={blue[500]}
                                  >
                                    {/* {Array.isArray(music.tags) &&
                                    music.tags.map((tag) => '#' + tag)}
                                  {console.log(music.tags)} */}
                                    {'#더미태그1 #더미태그2'}
                                  </Typography>
                                </>
                              }
                            />
                            <IconButton
                              color="primary"
                              onClick={(e) => {
                                e.stopPropagation()
                                setMusicShareData({
                                  username,
                                  title: music.title,
                                  mediaId: music.id,
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

                            <Box
                              marginLeft={4}
                              display="flex"
                              flexDirection="row"
                              gap="2"
                            >
                              {/* <Box>
                              {!music.progress ? (
                                <></>
                              ) : (
                                <Box sx={{ display: 'flex', gap: 1 }}>
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
                                  <Typography variant="body1">
                                    생성중...
                                  </Typography>
                                </Box>
                              )}
                            </Box> */}
                              <Box>
                                <DownloadIcon />
                              </Box>
                            </Box>
                          </ListItem>
                        </Box>
                      </Collapse>
                    ))}
                </TransitionGroup>
              </List>
            </Box>
          )}
        </Box>
      </Box>
    </Fade>
  )
}
