import { Button, Box } from '@mui/material';
import styles from './ImageButton.module.css'

export default function ImageButton({id, name, src, setSelected}) {
    return (
        <Box className={styles.image_container}>
            <Box
                component={'img'} 
                src={src} 
                className={styles.image_box}
                alt={name}
                onClick={() => setSelected(id)}
            />
        </Box>
    )
}