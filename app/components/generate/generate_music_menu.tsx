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
import { AudioContext } from '@/app/context/audio_context'
import { blue, grey, pink, purple } from '@mui/material/colors'
import {
  CircularProgress,
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
import MusicShareModal from '@/app/components/generate/music_share_modal'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import MusicCover from '@/app/components/generate/music_cover'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useQuery } from '@tanstack/react-query'
import { TransitionGroup } from 'react-transition-group'
import Loading from '@/app/components/common/loading'
import MusicList from '../components/music/music_list'

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

export default function GenerateMusicMenu() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/')
    },
  })
  const username = session?.user.username
  const theme = useTheme()

  const [uploadedAudioData, setUploadedAudioData] = useState({})
  const [generateResult, setGenerateResult] = useState(false)
  const [inputInstrument, setInputInstrument] = useState('p')
  const [outputInstrumentList, setOutputInstrumentList] = useState({
    p: true,
    g: false,
    b: false,
    d: false,
  })

  const [mediaTitle, setMediaTitle] = useState('환상적인 음악')
  const [tags, setTags] = useState([])
  const [tempo, setTempo] = useState(120)

  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = async (file) => {
    const url = URL.createObjectURL(file)
    const type = file.type.split('/')[0]
    setUploadedAudioData({ title: file.name, url, type, file })
  }

  const handleGenerateAccompaniment = async (username) => {
    setIsLoading(true)
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
            tempo,
          }),
        ],
        { type: 'application/json' }
      )
    )
    formData.append('file', file)
    formData.append('mediaTitle', mediaTitle)
    tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag)
    })

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
    setIsLoading(false)
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
    <Box p={1} height="100%">
      <Box
        sx={{
          display: { xs: 'none', sm: 'block' },
          height: '100%',
          minWidth: '320px',
          // borderRight: 1,
          // borderColor: grey[400],
          padding: 1,
          overflowY: 'auto',
          backgroundColor:
            theme.palette.mode == 'light'
              ? 'rgba(255, 255, 255, 0.5)'
              : 'rgba(0, 0, 0, 0.5)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          borderRadius: '16px',
          backdropFilter: 'blur(12px)',
          p: 2,
        }}
      >
        <Box>
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
              fontWeight: 'bold',
              borderRadius: '32px',
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
                <Typography variant="h6" fontWeight="bold">
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
                    sx={{ mb: 2 }}
                    size="small"
                    fullWidth
                  />
                  <TextField
                    variant="outlined"
                    label="템포"
                    type="number"
                    value={tempo}
                    onChange={(e) => {
                      setTempo(e.target.value)
                    }}
                    size="small"
                    fullWidth
                  />
                  <Typography
                    sx={{ mt: 4 }}
                    variant="subtitle1"
                    fontWeight="bold"
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
                    fontWeight="bold"
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
                      fontWeight: 'bold',
                      borderRadius: '32px',
                    }}
                    startIcon={
                      generateResult ? (
                        <Check />
                      ) : isLoading ? (
                        <CircularProgress />
                      ) : (
                        <AutoFixHighIcon />
                      )
                    }
                    disabled={isLoading}
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
      </Box>
    </Box>
  )
}
