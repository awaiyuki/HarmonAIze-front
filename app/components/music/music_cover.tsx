//@ts-nocheck
import { Box } from '@mui/material'
import Audiotrack from '@mui/icons-material/Audiotrack'
import { RotateLeft } from '@mui/icons-material'

export default function MusicCover({ isLoading }) {
  return (
    <Box
      width="80px"
      height="80px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      border="0.16rem solid"
      borderRadius="4px"
      borderColor="primary.main"
      margin={1}
    >
      {isLoading ? (
        <RotateLeft
          sx={{
            animation: 'spin 2s linear infinite',
            '@keyframes spin': {
              '0%': {
                transform: 'rotate(360deg)',
              },
              '100%': {
                transform: 'rotate(0deg)',
              },
            },
          }}
        />
      ) : (
        <Audiotrack fontSize="large" color="primary" />
      )}
    </Box>
  )
}
