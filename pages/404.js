import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const NotFound = () => {
    const router = useRouter();

    useEffect(() => {
        // Start timer for 3 sec and re-direct
        const timer = setTimeout(() => {
            router.push('/'); // Re-direct user to home page
        }, 3000);

        // Clean up the timer if the component unmounts before the timeout is reached
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className='not-found'>
            <h1>Ooooops...</h1>
            <h2>That page cannot be found!</h2>
            <p>Go back to the <Link href='/'>Home</Link></p>
        </div>
    );
};

export default NotFound;
