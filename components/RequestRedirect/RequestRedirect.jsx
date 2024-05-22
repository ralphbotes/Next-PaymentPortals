import styles from "./RequestRedirect.module.css";
import data from '../../data/data';
import { Button, Box, Typography } from '@mui/material';

export default function RequestRedirect({ portal, handleRedirect, initiatePayRequest }) {
    return (
        <>
            <Typography variant={'h6'}>Description:</Typography>
            <Typography>{data[portal.name].initialize.description}</Typography>

            <Typography variant={'h6'}>Request Code:</Typography>
            {/* <CodeDisplay code={data[portal.name].initialize.code} language={data[portal.name].initialize.language} /> */}
        </>
    )
}