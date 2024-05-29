import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';

export default function ToastNotify({ open, handleClose, value, vertical = 'bottom', horizontal = 'right' }) {
  return (
    <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={value}
    />
  );
}
