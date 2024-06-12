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
                <meta
                    name="description"
                    content="JOODPredicts by JOODonSOLMeta2"
                />
                <link rel="short icon" href="logo.png" />
                <link rel="icon" href="logo.png" />

                {/* <!-- Twitter --> */}
                <meta name="twitter:card" content="summary_large_image" />
                {/* <meta
                    property="twitter:url"
                    content={
                        'https://pbs.twimg.com/media/GPzBNA3XoAApr6C?format=jpg&name=large'
                    }
                /> */}
                <meta name="twitter:title" content="JOODPredictsMeta2" />
                <meta
                    name="twitter:description"
                    content="JOODPredicts by JOODonSOLMeta2"
                />
                <meta
                    name="twitter:image"
                    content="https://pbs.twimg.com/media/GP4YflfbYAAx-kl?format=png&name=small"
                />
            </Head>
            <main className="flex flex-col"></main>
        </>
    )
}
