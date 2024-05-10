//@ts-nocheck
import { Box } from '@mui/material'

export default function GenerateLayout({ children }) {
  return <Box marginLeft={{ default: '0px', sm: '160px' }}>{children}</Box>
}
