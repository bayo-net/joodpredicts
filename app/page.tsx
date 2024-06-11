'use client'

import Head from 'next/head'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        router.push('/prediction')
    }, [router])

    return (
        <>
            <Head>
                <title>JOODPredicts</title>
                <meta name="description" content="JOODPredicts by JOODonSOL" />
                <link rel="short icon" href="logo.png" />
                <link rel="icon" href="logo.png" />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                {/* <meta
                    property="twitter:url"
                    content={
                        'https://pbs.twimg.com/media/GPzBNA3XoAApr6C?format=jpg&name=large'
                    }
                /> */}
                <meta property="twitter:title" content="JOODPredicts" />
                <meta
                    property="twitter:description"
                    content="JOODPredicts by JOODonSOL"
                />
                <meta
                    property="twitter:image"
                    content={
                        'https://pbs.twimg.com/media/GPzBNA3XoAApr6C?format=jpg&name=large'
                    }
                />
            </Head>
            <main className="flex flex-col"></main>
        </>
    )
}
