//@ts-nocheck
'use client'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Fade from '@mui/material/Fade'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import FeedItem from '../components/community/feed_item'
import { grey } from '@mui/material/colors'
import { useEffect } from 'react'
import PostBox from '../components/community/post_box'
export default function Community() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/')
    },
  })

  console.log(session)
  const [audioInfo, SetAudioInfo] = useState({ name: '', url: '' })
  const [postList, setPostList] = useState([])
  const [postViewId, setPostViewId] = useState(null)

  const handleFileUpload = async (e) => {
    e.preventDefault()

    if (!e.target.files[0]) {
      return
    }
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('name', 'dummyUser')
    formData.append('file', file)

    const fileContent = formData.get('file')
    for (let value of formData.values()) {
      console.log(value)
    }

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {},
      body: formData,
    })
    const responseFormData = await res.formData()
    const responseFile = responseFormData.get('file')
    const url = URL.createObjectURL(responseFile)
    console.log(responseFile)
    SetAudioInfo({ name: responseFile.name, url })
  }

  const fetchPostList = async () => {
    const res = await fetch('api/community/postlist', {
      method: 'GET',
    })
    const resData = await res.json()
    setPostList(resData)
    console.log(postList)
  }
  useEffect(() => {
    fetchPostList()
  }, [])

  return (
    <Container maxWidth="sm">
      <Fade in={true} timeout={{ enter: 700 }}>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Box
            sx={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              width="100%"
              borderTop={1}
              borderColor={grey[400]}
              marginBottom={20}
            >
              {postList &&
                postList.map((e) => (
                  <FeedItem
                    key={e.id}
                    sx={{
                      width: '100%',
                      height: '100px',
                      border: '1px',
                      borderColor: 'white',
                    }}
                    id={e.id}
                    username={e.username}
                    mediaTitle={e.mediaTitle}
                    postTitle={e.postTitle}
                    setPostViewId={setPostViewId}
                  />
                ))}
            </Box>
          </Box>
          {postViewId && <PostBox postViewData={postViewId} />}
        </Box>
      </Fade>
    </Container>
  )
}
