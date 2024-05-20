import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import styles from './CodeDisplay.module.css'

const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter').then(mod => mod.Prism), { ssr: false });

const CodeDisplay = ({ code, language }) => {
  return (
    <Box className={styles.code_box}>
      <Paper elevation={3} className={styles.code_container}>
        <Typography variant="h6" className={styles.code_header_text}>
          Code Example
        </Typography>
        <SyntaxHighlighter language={language} showLineNumbers>
          {code}
        </SyntaxHighlighter>
      </Paper>
    </Box>
  );
};

export default CodeDisplay;
