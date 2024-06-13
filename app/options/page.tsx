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
  Collapse,
  FormControl,
  Grow,
  Input,
  InputLabel,
  ListItemButton,
  ListItemIcon,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import useSWR from 'swr'
import ShareIcon from '@mui/icons-material/Share'
import MusicShareModal from '@/app/components/generate/music_share_modal'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import MusicCover from '@/app/components/common/music_cover'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useQuery } from '@tanstack/react-query'
import { TransitionGroup } from 'react-transition-group'
import Loading from '@/app/components/common/loading'
import MusicList from '../components/generate/music_list'
import GenerateMusicMenu from '../components/generate/generate_music_menu'

export default function Options({}) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/')
    },
  })
  const { audioData, setAudioData } = useContext(AudioContext)

  const handlePlayOptionChange = (e, playOption) => {
    setAudioData({ ...audioData, playOption })
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        // borderRight: 1,
        // borderColor: grey[400],
        padding: 1,
        overflowY: 'auto',
        bgcolor: 'rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        borderRadius: '32px',
        backdropFilter: 'blur(12px)',
        p: 4,
        pt: 6,
        m: 1,
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        설정
      </Typography>
      <ToggleButtonGroup
        value={audioData?.playOption}
        exclusive
        onChange={handlePlayOptionChange}
        aria-label="play option"
      >
        <ToggleButton value="without-original" aria-label="without original">
          반주만
        </ToggleButton>
        <ToggleButton value="with-original" aria-label="with original">
          원음과 함께
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )
}
