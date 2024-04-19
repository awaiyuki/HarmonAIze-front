//@ts-nocheck
import { useState, useEffect } from 'react'
import { createContext } from 'react'

export const AudioContext = createContext({
  audioSrc: '',
  setAudioSrc: () => {},
})
