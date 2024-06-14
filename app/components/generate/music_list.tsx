//@ts-nocheck
'use client'

import Link from 'next/link'
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
  InputLabel,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Switch,
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
import styles from '@/app/styles/glassmorphism.module.css'

export default function MusicList() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/')
    },
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [musicShareData, setMusicShareData] = useState({})

  const { audioPlayerRef, audioData, setAudioData } = useContext(AudioContext)
  const [playOption, setPlayOption] = useState('without-original')
  const username = session?.user.username
  const theme = useTheme()
  const [downloadMenuAnchorEl, setDownloadMenuAnchorEl] = useState(null)
  const open = Boolean(downloadMenuAnchorEl)
  const handleDownloadMenuClick = (e) => {
    setDownloadMenuAnchorEl(e.currentTarget)
  }
  const handleDownloadMenuClose = () => {
    setDownloadMenuAnchorEl(null)
  }

  const fetchMusicList = async () => {
    const res = await fetch(`/api/music/list?username=${username}`, {
      method: 'GET',
      headers: {},
    })
    const responseData = await res.json()
    console.log(responseData)
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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            margin: 0,
            width: '100%',
            overflowY: 'auto',
          }}
        >
          <List
            sx={{
              margin: 0,
            }}
          >
            <TransitionGroup>
              {Array.isArray(musicListData) &&
                musicListData.toReversed().map((music, i) => (
                  <Collapse key={i}>
                    <Box
                      sx={{
                        padding: 2,
                        '&:hover': { bgcolor: 'secondary.main' },
                        filter: music.progress ? 'blur(4px)' : 'none',
                        pointerEvents: music.progress ? 'none' : 'auto',
                        backgroundColor:
                          theme.palette.mode == 'light'
                            ? 'rgba(255, 255, 255, 0.5)'
                            : 'rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(14px)',
                        borderRadius: '16px',
                        margin: '8px',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                        pl: 4,
                        pr: 4,
                      }}
                      className={styles.glassmorphism}
                    >
                      {music.progress && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            filter: 'none',
                          }}
                        >
                          <CircularProgress />
                        </Box>
                      )}
                      <ListItem disablePadding>
                        <Button
                          sx={{ marginRight: 2, cursor: 'pointer' }}
                          onClick={() =>
                            setAudioData({
                              ...music,
                              mediaTitle: music.title,
                              playOption: audioData.playOption,
                              username,
                            })
                          }
                        >
                          <MusicCover
                            isLoading={music.progress}
                            src={music.coverImageUrl}
                          />
                        </Button>

                        {/* {music.mediaType === 'video' && (
                          <Box>
                            <video src={music.url} controls width="100%" />
                          </Box>
                        )} */}
                        <Box
                          sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between',
                          }}
                        >
                          <ListItemText
                            disableTypography
                            primary={
                              <>
                                <Typography
                                  variant="h6"
                                  fontWeight="bold"
                                  onClick={() =>
                                    setAudioData({
                                      ...music,
                                      mediaTitle: music.title,
                                      playOption: audioData.playOption,
                                      username,
                                    })
                                  }
                                  sx={{ cursor: 'pointer' }}
                                >
                                  {music.title}
                                </Typography>
                                <Typography
                                  variant="body1"
                                  fontWeight="500"
                                  color={blue[600]}
                                >
                                  {Array.isArray(music.tags) &&
                                    music.tags.map((tag) => '#' + tag + ' ')}
                                  {/* {'#더미태그1 #더미태그2'} */}
                                </Typography>
                              </>
                            }
                          />

                          <Box display="flex" flexDirection="row" gap="2">
                            <IconButton
                              color="primary.text"
                              onClick={(e) => {
                                e.stopPropagation()
                                setMusicShareData({
                                  username,
                                  title: music.title,
                                  mediaId: music.id,
                                  coverImageUrl: music.coverImageUrl,
                                  tags: music.tags,
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
                            <IconButton
                              color="primary.text"
                              onClick={handleDownloadMenuClick}
                            >
                              <DownloadIcon />
                            </IconButton>
                            <Menu
                              anchorEl={downloadMenuAnchorEl}
                              open={open}
                              onClose={handleDownloadMenuClose}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                              }}
                            >
                              <MenuItem
                                key={'download1-' + i}
                                component="a"
                                href={music.mediaUrl}
                                download
                              >
                                반주만
                              </MenuItem>
                              {console.log(music.mediaUrl)}
                              <MenuItem
                                key={'download2-' + i}
                                component="a"
                                href={music.mediaUrl2}
                                download
                              >
                                원음과 함께
                              </MenuItem>
                            </Menu>
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
    </>
  )
}
