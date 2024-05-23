import styles from "./BaseModal.module.css";
import { Box, Button, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function BaseModal({ children, open, handleClose }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            className={styles.modal_container}
        >
            <Box className={styles.modal_box_container}>
                <Box className={styles.modal_children_container}>
                    {children}
                </Box>
                
                <Button
                    variant="contained"
                    onClick={() => handleClose(false)}
                    endIcon={<CloseIcon />}
                    className={styles.close_button}

                >
                    Close
                </Button>
            </Box>
        </Modal>
    )
}