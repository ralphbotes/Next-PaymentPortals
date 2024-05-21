import CodeDisplay from '../CodeDisplay/CodeDisplay';
import styles from './PortalInitialize.module.css';
import data from '../../data/data';
import { Button, Typography } from '@mui/material';
import initiate_paygate from "../../pages/api/initiate_paygate";
import { useState } from 'react';

export default function PortalInitialize({portal}) {
    const [initiatePayRequest, setInitiatePayRequest] = useState(null);

    const sampleCode = data[portal.name].initialize.code
    const sampleLanguage = data[portal.name].initialize.language

    const handle_request = async () => {
        if (portal.name === "paygate") {
            const request = await initiate_paygate();
            setInitiatePayRequest(request)
        }
    }

    return (
        <>
            <CodeDisplay code={sampleCode} language={sampleLanguage} />
            {
                !initiatePayRequest ?
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
                        <Typography>{initiatePayRequest}</Typography>
                    </>
            }
        </>
    )
}