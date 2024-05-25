import styles from "./RequestRedirect.module.css";
import data from '../../data/data';
import { Button, Box, Typography } from '@mui/material';
import BaseModal from "../BaseModal/BaseModal";
import BaseDataTable from '../BaseDataTable/BaseDataTable';
import CodeDisplay from '../CodeDisplay/CodeDisplay';
import { useState } from 'react';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

export default function RequestRedirect({ portal, initiatePayRequest }) {
    const [openPreReqTableModal, setOpenPreReqTableModal] = useState(false);
    
    return (
        <>
            <Typography variant={'h6'}>Description:</Typography>
            <Typography>{data[portal.name].redirect.description}</Typography>
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
            <CodeDisplay code={data[portal.name].redirect.code} language={data[portal.name].initialize.language} />

            <Typography variant={'h6'}>Card Data:</Typography>
            <Typography variant={'body1'}>
                The following card data can be used for the transaction:
            </Typography>
            <Box className={styles.card_data_box}>
            {
                data[portal.name].card_data.map((item,idx) => (
                    <Box className={styles.card_box}>
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
            <Typography variant={'body1'}>{data[portal.name].card_data_description}</Typography>

            <BaseModal 
                handleClose={setOpenPreReqTableModal} 
                open={openPreReqTableModal} 
                children={
                    <BaseDataTable 
                        rows={data[portal.name].redirect.pre_req_table} 
                        title={data[portal.name].redirect.pre_req_table_title} 
                        description={data[portal.name].redirect.pre_req_table_description} 
                    />
                } 
            />
        </>
    )
}