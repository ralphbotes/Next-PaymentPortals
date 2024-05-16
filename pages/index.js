import { Inter } from '@next/font/google'
import Link from "next/link";
import Head from "next/head";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <>
          <Head>
              <title>Ninja List | Home</title>
              <meta name='keywords' content='clients' />
          </Head>

          <div>
              <h1>Home</h1>
              <p>
                  Through effective hotel management software,
                  CiMSO suites provide a fully integrated ERP
                  solution for more efficiency and growth in the
                  hospitality industry - hotels, lodges,
                  SPA's and golf clubs worldwide.
              </p>
              <Link href='/clients'>See Clients Listing</Link>
          </div>
      </>
  )
}
