import Head from "next/head";
import { Box, Divider, Typography } from '@mui/material';
import PortalStepper from "../components/PortalStepper/PortalStepper"
import { useEffect, useState } from 'react';
import BaseModal from '@/components/BaseModal/BaseModal';
import PortalNotification from '@/components/PortalNotification/PortalNotification';
import Cookies from 'js-cookie';
import query_paygate from "@/utils/api/query_paygate";
import ToastNotify from "@/components/ToastNotify/ToastNotify";
import {parsePaygateData} from "@/utils/common_utils";

export default function Home() {
    const [portalData, setPortalData] = useState({});
    const [openNotification, setOpenNotification] = useState(false)
    const [toastOpen, setToastOpen] = useState({
        open: false, value: ""
      });

    const handleToastClose = () => {
      setToastOpen(prevState => ({ 
        ...prevState, 
        open: false, 
        value: "" 
      }));
    };
    
    /*
    setPropData({
        PP_DATA: {
            ppBody: data,
            ppHeaders: response.headers,
        },
    });
    setOpenNotification(true);
    */

    /* 
        Instead of handling the portal callback and redirect data,
        we will take the transactionData we saved earlier in the cookie 
        and use it to query the transaction status
    */
    useEffect(() => {
        const handlePaymentData = async (a_cookieData) => {
            try {
                const parsedData = JSON.parse(a_cookieData);

                // Now we will do a request to get transaction status
                let pay_request_id = "";
                let reference = "";
                if ("portal" in parsedData && parsedData["portal"] === "paygate") {
                    const trx_data = parsePaygateData(parsedData["transactionData"]);
                    pay_request_id = trx_data["PAY_REQUEST_ID"]
                    reference = trx_data["REFERENCE"]
                }

                if (pay_request_id !== "" && reference !== "") {
                    const response = await query_paygate(pay_request_id,reference);
                    if (response && !response.includes("error")) {
                        const parsed_data = parsePaygateData(response);
                        setPortalData({
                            PP_DATA: {
                                ppBody: parsed_data,
                                ppHeaders: null,
                                ppType: "paygate"
                            },
                        });
                        setOpenNotification(true);
                    } else {
                        setToastOpen(prevState => ({ 
                            ...prevState, 
                            open: true, 
                            value: "An error occured while handling query data." 
                          }));
                    }
                } else {
                    setToastOpen(prevState => ({ 
                        ...prevState, 
                        open: true, 
                        value: "Not valid PayGate data." 
                      }));
                }
            } catch (e) {
                setToastOpen(prevState => ({ 
                    ...prevState, 
                    open: true, 
                    value: "An error occured while handling cookie data" 
                  }));
            }
            Cookies.remove('transactionData');
        }


        // Read the transaction data from the cookie if it exists
        const cookieData = Cookies.get('transactionData');
        if (cookieData) {
            void handlePaymentData(cookieData);
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
                portalData &&
                <BaseModal 
                    open={openNotification}
                    handleClose={() => setOpenNotification(false)}
                >
                    <PortalNotification portal_data={portalData} />
                </BaseModal>
            }
            {
                toastOpen && toastOpen.open &&
                  <ToastNotify 
                    open={toastOpen.open} 
                    handleClose={() => handleToastClose()} 
                    value={toastOpen.value}
                  />
              }
        </>
    )
}