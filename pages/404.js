import Link from 'next/link'
import { useEffect } from "react";
import { useRouter } from "next/router";

const NotFound = () => {
    const router = useRouter(); // contains a method we can use to re-direct the user

    useEffect(() => {
        // Start timer for 3 sec and re-direct
        setTimeout(() => {
            router.push('/')    // Re-direct user to home page
        }, 3000);
    },[]);

    return (
        <div className='not-found'>
            <h1>Ooooops...</h1>
            <h2>That page cannot be found!</h2>
            <p>Go back to the <Link href='/'>Home</Link></p>
        </div>
    );
};

export default NotFound;