import { Box } from '@mui/material'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { AudioContext } from '@/app/context/audio_context'

export default function BackgroundImage() {
  const { audioData } = useContext(AudioContext)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {}, [audioData])

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
      }}
    >
      <Image
        src={
          audioData?.coverImageUrl
            ? audioData?.coverImageUrl
            : '/default_background.png'
        }
        alt="background image"
        fill
        objectFit="cover"
        priority
        style={{
          // opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 1s',
        }}
        onLoadStart={() => setImageLoaded(false)}
        onLoadingComplete={() => {
          setTimeout(() => setImageLoaded(true), 1000)
        }}
      />
    </Box>
  )
}
