import { Inter } from '@next/font/google'
import Head from "next/head";
import { Box, Divider, Typography } from '@mui/material';
import PortalStepper from "../components/PortalStepper/PortalStepper"
import { useState } from 'react';
import BaseModal from '@/components/BaseModal/BaseModal';
import PortalNotification from '@/components/PortalNotification/PortalNotification';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ data }) {
    const [openNotification, setOpenNotification] = useState("PP_DATA" in data)

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

            {
                "PP_DATA" in data &&
                    <BaseModal 
                        open={openNotification}
                        handleClose={() => setOpenNotification(false)}
                        children={<PortalNotification data={data.PP_DATA} />}
                    />
            }
        </>
    )
}

export async function getServerSideProps(context) {
    const { req } = context;
    let propData = {};
  
    if (req.method === 'POST') {
      // Parse the body manually
      const body = await new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString(); // Convert Buffer to string
        });
        req.on('end', () => {
          try {
            const contentType = req.headers['content-type'];
            if (contentType && contentType.includes('application/json')) {
              resolve(JSON.parse(body)); // Parse the JSON body
            } else {
              resolve(body); // Return as text
            }
          } catch (error) {
            reject(error);
          }
        });
      });
  
      // Add the parsed body and headers to propData
      propData.PP_DATA = {
        ppBody: body,
        ppHeaders: req.headers,
      };
    }
  
    // Handle other request methods if necessary
    return {
      props: {
        data: propData,
      },
    };
}