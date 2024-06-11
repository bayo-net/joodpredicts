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
        icon: '/logo.png', // /public path
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
