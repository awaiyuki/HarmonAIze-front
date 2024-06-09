//@ts-nocheck
import { useState, useEffect, useRef } from 'react'
import { createContext } from 'react'

export const AudioContext = createContext({
  audioPlayerRef: {},
  audioData: '',
  setAudioData: () => {},
})
