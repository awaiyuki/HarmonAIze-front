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
import Loading from '../components/common/loading'
import { useQuery, useMutation } from '@tanstack/react-query'

export default function Community() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/')
    },
  })

  console.log(session)
  const [audioInfo, SetAudioInfo] = useState({ name: '', url: '' })
  // const [postList, setPostList] = useState([])
  const [postViewId, setPostViewId] = useState(null)
  // const [isLoading, setIsLoading] = useState(false)

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
    // setIsLoading(true)
    const res = await fetch(
      `api/community/postlist?username=${session?.user.username}`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    )
    const resData = await res.json()
    // setPostList(resData)
    return resData
    console.log(postList)
    // const dummyPostList = [
    //   {
    //     id: 1,
    //     username: 'hello',
    //     mediaTitle: 'music',
    //     postTitle: 'posttitle',
    //     numLikes: 5,
    //     hasLiked: false,
    //     numComments: 8,
    //   },
    // ]
    // setPostList(dummyPostList)
    // setIsLoading(false)
  }

  const {
    data: postList,
    error,
    isLoading,
  } = useQuery({ queryKey: ['postList'], queryFn: fetchPostList })

  // const mutation = useMutation(postComment, {
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries('postLists')
  //   },
  // })

  // useEffect(() => {
  //   fetchPostList()
  // }, [])

  if (isLoading) return Loading

  return (
    <Fade in={true}>
      <Box
        sx={{
          height: '100%',
          width: '100%',
          // marginTop: 4,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box
          sx={{
            flex: '0.5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // width: '100%',
          }}
        >
          <Box width="100%" borderColor={grey[400]} marginBottom={10}>
            {postList &&
              postList
                .toReversed()
                .map((e) => (
                  <FeedItem
                    key={e.id}
                    id={e.id}
                    username={e.username}
                    mediaTitle={e.mediaTitle}
                    postTitle={e.postTitle}
                    postViewId={postViewId}
                    setPostViewId={setPostViewId}
                    numLikes={e.numLikes}
                    numComments={e.numComments}
                    hasLiked={e.hasLiked}
                  />
                ))}
          </Box>
        </Box>
        <Box sx={{ flex: '0.5' }}>
          <PostBox
            postViewId={postViewId}
            currentUsername={session?.user.username}
          />
        </Box>
      </Box>
    </Fade>
  )
}
