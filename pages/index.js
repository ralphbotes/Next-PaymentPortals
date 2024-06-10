import Head from "next/head";
import { Box, Divider, Typography } from '@mui/material';
import PortalStepper from "../components/PortalStepper/PortalStepper"
import { useEffect, useState } from 'react';
import BaseModal from '@/components/BaseModal/BaseModal';
import PortalNotification from '@/components/PortalNotification/PortalNotification';
import Cookies from 'js-cookie';

export default function Home() {
    const [propData, setPropData] = useState({});
    const [openNotification, setOpenNotification] = useState(false)
    
    /*
    setPropData({
        PP_DATA: {
            ppBody: data,
            ppHeaders: response.headers,
        },
    });
    setOpenNotification(true);
    */

    useEffect(() => {
      // Read the transaction data from the cookie
      const cookieData = Cookies.get('transactionData');
      if (cookieData) {
        if (cookieData) {
          try {
            const parsedData = JSON.parse(cookieData);
            setPropData({
              PP_DATA: {
                  ppBody: parsedData,
                  ppHeaders: null,
              },
          });
          } catch (e) {
            setPropData({
              PP_DATA: {
                  ppBody: cookieData,
                  ppHeaders: null,
              },
          });
          }
        }
        setOpenNotification(true);
        Cookies.remove('transactionData');
      }
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