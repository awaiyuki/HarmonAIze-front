//@ts-nocheck
import { Modal, Box, Typography, TextField, Button, Grid } from '@mui/material'
import { useState } from 'react'
import DoneIcon from '@mui/icons-material/Done'
import { Audiotrack } from '@mui/icons-material'
import { blue } from '@mui/material/colors'
export default function MusicShareModal({ open, setOpen, musicShareData }) {
  const [success, setSuccess] = useState(false)
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const res = await fetch('api/music/share', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: musicShareData.username,
        mediaTitle: musicShareData.title,
        postTitle: formData.get('post-title'),
        postContent: formData.get('post-content'),
      }),
    })
    const resData = await res.json()
    if (res.ok && resData) {
      setSuccess(true)
    }
    setTimeout(() => {
      setSuccess(false)
      setOpen(false)
    }, 1000)
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" sx={style} onSubmit={handleSubmit}>
        <Grid container direction="column" gap={1}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            음악 공유
          </Typography>
          <Grid container justifyContent="center" padding={2}>
            <Audiotrack color="primary" />
            <Typography variant="h6" fontWeight="bold">
              {musicShareData.title}
            </Typography>
          </Grid>
          <TextField name="post-title" placeholder="제목" />
          <TextField
            name="post-content"
            multiline
            minRows={3}
            placeholder="내용"
          />
          <Button type="submit" variant="contained">
            공유
          </Button>
          {success && (
            <Box alignSelf="center">
              <DoneIcon sx={{ color: blue[400] }} fontSize="large" />
            </Box>
          )}
        </Grid>
      </Box>
    </Modal>
  )
}
