import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
export default function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <CircularProgress />
    </Box>
  )
}
