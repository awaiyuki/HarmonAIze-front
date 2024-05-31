//@ts-nocheck
import { Box, Drawer, IconButton } from '@mui/material'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import React from 'react'
export default function DrawerGenerateButton({}) {
  const [open, setOpen] = React.useState(false)
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }
  return (
    <Box
      sx={{
        width: '100%',
        display: { xs: 'flex', sm: 'none' },
        justifyContent: 'flex-end',
        pointerEvents: 'none',
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0) !important',
      }}
    >
      <IconButton
        sx={{
          position: 'relative',
          zIndex: 2,
          pointerEvents: 'auto',
        }}
        onClick={() => {
          toggleDrawer(true)
        }}
        size="large"
        color="primary"
      >
        <AutoFixHighIcon />
      </IconButton>
      <Drawer anchor={'bottom'} open={open} onClose={toggleDrawer(false)}>
        <Box>hello</Box>
      </Drawer>
    </Box>
  )
}
