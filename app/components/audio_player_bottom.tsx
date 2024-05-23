//@ts-nocheck
'use client'
import { Box } from '@mui/material'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { useContext } from 'react'
import { AudioContext } from '../context/audio_context'
import { useSession } from 'next-auth/react'
export default function AudioPlayerBottom() {
  const { audioSrc, setAudioSrc } = useContext(AudioContext)

  const { data: session, status } = useSession()

  if (status != 'authenticated') {
    return <></>
  }
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100',
        zIndex: 2,
        bgColor: 'white',
      }}
    >
      {/* audio 제목 */}
      <AudioPlayer
        autoPlay
        src={audioSrc}
        onPlay={(e) => console.log('onPlay')}
        // other props here
      />
    </Box>
  )
}
