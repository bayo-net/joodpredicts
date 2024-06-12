import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/src/components/navbar/Navbar'
import Wallet from '@/src/components/Wallet'

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css')

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'JOODPredicts',
    description: 'JOODPredicts by JOODonSOL',
    icons: {
        icon: '/thumbnail.png', // /public path
    },
    twitter: {
        card: 'summary_large_image',
        title: 'JOODPredicts',
        description: 'JOODPredicts by JOODonSOL',
        images: [
            {
                url: 'https://pbs.twimg.com/media/GP4YflfbYAAx-kl?format=png&name=small',
                width: 1200,
                height: 630,
                alt: 'sponsors',
            },
        ],
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Wallet>
                    <Navbar />
                    <div className="pb-20 pt-16">{children}</div>
                </Wallet>
            </body>
        </html>
    )
}
