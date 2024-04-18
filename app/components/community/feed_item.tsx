//@ts-nocheck

'use client'
import { Box, Typography, Button, IconButton } from '@mui/material'
import { grey } from '@mui/material/colors'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined'
export default function FeedItem({ title, content, username }) {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      borderBottom={1}
      borderColor={grey[400]}
      padding={1}
    >
      <Typography variant="h6">{username}</Typography>
      <Typography variant="body">{content}</Typography>
      <Box display="flex" width="100%" justifyContent="space-evenly">
        <IconButton color="primary" aria-label="repost">
          <RepeatOutlinedIcon />
        </IconButton>
        <IconButton color="primary" aria-label="favorite">
          <FavoriteBorderOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
