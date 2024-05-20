import Link from 'next/link'
import Box from '@mui/material/Box';

const Navbar = () => {
    return (
        <nav>
            <Box 
                className='logo' 
                component={'img'} 
                src='/testlogo.png' 
                alt='Logo' 
            />
            <Link href='/'>Home</Link>
        </nav>
    );
};

export default Navbar;