import Link from 'next/link'
import Box from '@mui/material/Box';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <Box className={styles.nav_box}>
            <nav className={styles.nav_container}>
                <Box 
                    className={styles.logo}
                    component={'img'} 
                    src='/testlogo.png' 
                    alt='Logo' 
                />
                <Link href='/' className={styles.nav_links}>Home</Link>
            </nav>
        </Box>
    );
};

export default Navbar;