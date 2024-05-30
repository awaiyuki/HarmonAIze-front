//@ts-nocheck
import { Box } from '@mui/material'
import Audiotrack from '@mui/icons-material/Audiotrack'

export default function MusicCover() {
  return (
    <Box
      width="80px"
      height="80px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      border="solid"
      borderWidth="1px"
      borderRadius="4px"
      borderColor="primary.main"
      margin={1}
    >
      <Audiotrack fontSize="large" color="primary" />
    </Box>
  )
}
