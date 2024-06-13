//@ts-nocheck
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Backdrop,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import DoneIcon from '@mui/icons-material/Done'
import { AccountCircle, Audiotrack } from '@mui/icons-material'
import { blue } from '@mui/material/colors'
import MusicCover from '../common/music_cover'

export default function MusicShareModal({ open, setOpen, musicShareData }) {
  const [success, setSuccess] = useState(false)
  const theme = useTheme()
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius: '16px',
    bgcolor: 'background.paper',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    filter: 'none',
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
        mediaId: musicShareData.mediaId,
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
      slots={{
        backdrop: Backdrop,
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.1);',
          },
        },
      }}
    >
      <Box component="form" sx={style} onSubmit={handleSubmit}>
        <Grid container direction="column" gap={1}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            음악 공유
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Grid container direction="row" gap={1}>
              <AccountCircle fontSize="medium" />
              <Typography variant="body1">{musicShareData.username}</Typography>
            </Grid>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              gap={1}
              padding={2}
            >
              <MusicCover
                isLoading={false}
                src={musicShareData.coverImageUrl}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" fontWeight="500">
                  {musicShareData.title}
                </Typography>
                <Typography variant="body1" fontWeight="500" color={blue[500]}>
                  {Array.isArray(musicShareData.tags) &&
                    musicShareData.tags.map((tag) => '#' + tag + ' ')}
                </Typography>
              </Box>
            </Grid>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <TextField name="post-title" label="제목" size="small" />
              <TextField
                name="post-content"
                multiline
                minRows={3}
                label="내용"
                size="small"
              />
            </Box>
          </Box>
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
