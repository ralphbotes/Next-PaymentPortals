import styles from "./BaseDataTable.module.css";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Divider, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

export default function BaseDataTable({ title, description, rows }) {
    return (
        <>
            <Typography variant={'h6'}>{title}</Typography>
            <Typography variant={'body1'}>{description}</Typography>
            <Divider />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead className={styles.table_head}>
                        <TableRow>
                            <TableCell>Field</TableCell>
                            <TableCell>Data Type</TableCell>
                            <TableCell>Required</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={styles.table_body}>
                        {rows.map((row,idx) => (
                            <TableRow
                                key={idx}
                            >
                            <TableCell component="th" scope="row">
                                {row.field}
                            </TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>
                                {row.required ? <CheckIcon /> : "Optional"}
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
        </>
    )
}