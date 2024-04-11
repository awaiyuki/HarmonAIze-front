import { Box, Button } from "@mui/material"
import { ColorModeButton } from "./toggle_color_mode"
import Link from "next/link"
export default function NavBar () {
    return <Box sx={{
        position:'fixed',
        top:0,
        left:0,
        zIndex:1,
        width:'100vw',
        m:1,
        boxShadow:'10px'
    }}>
        <Box
            display="flex"
            justifyContent="center"
        >
        <Link href='/upload'><Button>홈</Button></Link>
        <Link href='/community'><Button>커뮤니티</Button></Link>

        <ColorModeButton />
        </Box>
    </Box>
}