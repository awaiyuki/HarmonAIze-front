//@ts-nocheck
import { Box, useTheme } from '@mui/material'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { AudioContext } from '@/app/context/audio_context'

export default function BackgroundImage() {
  const { audioData } = useContext(AudioContext)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState('/default_background.png')
  const theme = useTheme()

  useEffect(() => {
    if (!audioData?.coverImageUrl) return
    setImageLoaded(false)
    setTimeout(() => setImageSrc(audioData?.coverImageUrl), 1000)
  }, [audioData?.coverImageUrl])

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        bgcolor:
          theme.palette.mode == 'light'
            ? 'rgba(255, 255, 255, 0.5)'
            : 'rgba(0, 0, 0, 0.5)',
        zIndex: -2,
      }}
    >
      <Image
        src={imageSrc}
        alt="background image"
        fill
        objectFit="cover"
        priority
        style={{
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 1s',
        }}
        onLoad={() => {
          setImageLoaded(true)
        }}
      />
    </Box>
  )
}
