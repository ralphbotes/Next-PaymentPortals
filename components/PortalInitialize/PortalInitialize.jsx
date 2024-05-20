import CodeDisplay from '../CodeDisplay/CodeDisplay';
import styles from './PortalInitialize.module.css';

export default function PortalInitialize({portal}) {

    const sampleCode = `
import React from 'react';
import { Box } from '@mui/material';

const App = () => {
  return (
    <Box sx={{ padding: 2 }}>
      Hello, world!
    </Box>
  );
};

export default App;
`;

    return (
        <>
            <CodeDisplay code={sampleCode} language={'javascript'} />
        </>
    )
}