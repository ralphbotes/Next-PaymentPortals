import { Inter } from '@next/font/google'
import Head from "next/head";
import { Box, Divider, Typography } from '@mui/material';
import PortalStepper from "../components/PortalStepper/PortalStepper"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <Head>
                <title>Payment Portal Tester | Home</title>
            </Head>

            <Box>
                <Typography variant='h4'>Home</Typography>
                <Divider />
                <PortalStepper />
            </Box>
        </>
    )
}
