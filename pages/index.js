import { Inter } from '@next/font/google'
import Head from "next/head";
import { Box, Divider, Typography } from '@mui/material';
import PortalStepper from "../components/PortalStepper/PortalStepper"
import { useEffect, useState } from 'react';
import BaseModal from '@/components/BaseModal/BaseModal';
import PortalNotification from '@/components/PortalNotification/PortalNotification';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [propData, setPropData] = useState({});
    const [openNotification, setOpenNotification] = useState(false)

    useEffect(() => {
      const fetchData = async () => {
        if (typeof window !== 'undefined') {
          const req = {
            method: 'POST', // or the appropriate method you want to simulate
            headers: {
              'Content-Type': 'application/json', // Adjust if necessary
            },
            body: JSON.stringify({ /* your body data here */ }),
          };
  
          let body = await new Promise((resolve, reject) => {
            let body = '';
            req.on('data', (chunk) => {
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
  
          // Simulate fetching the body and headers
          setPropData({
            PP_DATA: {
              ppBody: body,
              ppHeaders: req.headers,
            },
          });
          setOpenNotification(true);
        }
      };
  
      fetchData();
    }, []);

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
                "PP_DATA" in propData &&
                <BaseModal 
                    open={openNotification}
                    handleClose={() => setOpenNotification(false)}
                >
                    <PortalNotification data={propData.PP_DATA} />
                </BaseModal>
            }
        </>
    )
}