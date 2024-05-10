//@ts-nocheck
import { Modal, Box, Typography, TextField, Button } from '@mui/material'
import { useState } from 'react'
import DoneIcon from '@mui/icons-material/Done'
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
    if (res.ok && resData.success && resData.success == 'true') {
      setSuccess(true)
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" sx={style} onSubmit={handleSubmit}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          음악 공유
        </Typography>
        <Typography>{musicShareData.title}</Typography>
        {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          음악 공유하기
        </Typography> */}
        <TextField name="post-title" />
        <TextField name="post-content" minRows={3} />
        <Button type="submit" variant="contained">
          공유
        </Button>
        {success && <DoneIcon />}
      </Box>
    </Modal>
  )
}
