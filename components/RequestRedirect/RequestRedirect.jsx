import styles from "./RequestRedirect.module.css";
import { Button, Box, Typography } from '@mui/material';
import BaseModal from "../BaseModal/BaseModal";
import BaseDataTable from '../BaseDataTable/BaseDataTable';
import CodeDisplay from '../CodeDisplay/CodeDisplay';
import { useState } from 'react';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import Grid from '@mui/material/Grid';
import { getPortalData } from "../../utils/common_utils";

export default function RequestRedirect({ portal, initiatePayRequest }) {
    const [openPreReqTableModal, setOpenPreReqTableModal] = useState(false);
    const portalData = getPortalData(portal.name);
    
    return (
        <>
            <Typography variant={'h6'}>Description:</Typography>
            <Typography>{portalData.redirect.description}</Typography>
            <Button 
                variant="outlined" 
                startIcon={<TextSnippetIcon />}
                onClick={() => setOpenPreReqTableModal(true)}
            >
                Detailed Request Params
            </Button>

            <Typography variant={'h6'}>Collected Data:</Typography>
            <Box className={styles.pay_response_box}>
            {
                initiatePayRequest.map((item,idx) => (
                    <Typography key={idx}>{item}</Typography>
                ))
            }
            </Box>

            <Typography variant={'h6'}>Request Code:</Typography>
            <CodeDisplay code={portalData.redirect.code} language={portalData.initialize.language} />

            <Typography variant={'h6'}>Card Data:</Typography>
            <Typography variant={'body1'}>
                The following card data can be used for the transaction:
            </Typography>
            <Box className={styles.card_data_box}>
            {
                portalData.card_data.map((item,idx) => (
                    <Box key={idx} className={styles.card_box}>
                        <Typography variant={'body1'}>{item.brand}</Typography>
                        <Typography variant={'h6'}>{item.number}</Typography>
                        <Typography 
                            variant={'body1'}
                            className={item.result_code === -1 ? styles.card_declined : item.result_code === 1 ? styles.card_approved : styles.card_other}
                        >
                            {item.result}
                        </Typography>
                    </Box>
                ))
            }
            </Box>
            <Typography variant={'body1'}>{portalData.card_data_description}</Typography>

            <BaseModal 
                handleClose={setOpenPreReqTableModal} 
                open={openPreReqTableModal} 
            >
                <BaseDataTable 
                    rows={portalData.redirect.pre_req_table} 
                    title={portalData.redirect.pre_req_table_title} 
                    description={portalData.redirect.pre_req_table_description} 
                />
            </BaseModal>
        </>
    )
}