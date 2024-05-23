import CodeDisplay from '../CodeDisplay/CodeDisplay';
import styles from './PortalInitialize.module.css';
import data from '../../data/data';
import { Button, Box, Typography } from '@mui/material';
import initiate_paygate from "../../pages/api/initiate_paygate";
import ReplayIcon from '@mui/icons-material/Replay';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import BaseModal from '../BaseModal/BaseModal';
import { useState } from 'react';
import BaseDataTable from '../BaseDataTable/BaseDataTable';

export default function PortalInitialize({portal, initiatePayRequest, setInitiatePayRequest}) {
    const [openPreReqTableModal, setOpenPreReqTableModal] = useState(false);
    const [openPostReqTableModal, setOpenPostReqTableModal] = useState(false);

    const handle_request = async () => {
        if (portal.name === "paygate") {
            const request = await initiate_paygate();
            const dataList = request.split('&').map(segment => segment.trim() + "&");
            if (dataList.length > 0) {
                dataList[dataList.length - 1] = dataList[dataList.length - 1].slice(0, -1);
            }
            setInitiatePayRequest(dataList);
        }
    }

    return (
        <>
            <Typography variant={'h6'}>Description:</Typography>
            <Typography>{data[portal.name].initialize.description}</Typography>
            <Button 
                variant="outlined" 
                startIcon={<TextSnippetIcon />}
                onClick={() => setOpenPreReqTableModal(true)}
            >
                Detailed Request Params
            </Button>

            <Typography variant={'h6'}>Request Code:</Typography>
            <CodeDisplay code={data[portal.name].initialize.code} language={data[portal.name].initialize.language} />
            {
                initiatePayRequest.length < 1 ?
                    <Button
                        variant="contained"
                        onClick={() => handle_request()}
                        sx={{ mt: 1, mr: 1 }}
                    >
                        Initiate transaction request
                    </Button>
                :
                    <>
                        <Typography variant={'h6'}>Response:</Typography>
                        <Box className={styles.pay_response_box}>
                        {
                            initiatePayRequest.map((item,idx) => (
                                <Typography key={idx}>{item}</Typography>
                            ))
                        }
                        </Box>
                        <Button 
                            variant="outlined" 
                            startIcon={<TextSnippetIcon />}
                            onClick={() => setOpenPostReqTableModal(true)}
                        >
                            Detailed Response Params
                        </Button>
                        <Typography>{data[portal.name].initialize.result}</Typography>
                        <Button 
                        variant="contained" 
                        endIcon={<ReplayIcon />}
                        onClick={() => handle_request()}
                        >
                            Retry
                        </Button>
                    </>
            }
            <BaseModal 
                handleClose={setOpenPreReqTableModal} 
                open={openPreReqTableModal} 
                children={
                    <BaseDataTable 
                        rows={data[portal.name].initialize.pre_req_table} 
                        title={data[portal.name].initialize.pre_req_table_title} 
                        description={data[portal.name].initialize.pre_req_table_description} 
                    />
                } 
            />
            <BaseModal 
                handleClose={setOpenPostReqTableModal} 
                open={openPostReqTableModal} 
                children={
                    <BaseDataTable 
                        rows={data[portal.name].initialize.post_req_table} 
                        title={data[portal.name].initialize.post_req_table_title} 
                        description={data[portal.name].initialize.post_req_table_description} 
                    />
                } 
            />
        </>
    )
}