'use client'

import React from 'react'
import { Container } from '../Container'
import { Logo } from './Logo'
import { UserMenu } from './UserMenu'
import dynamic from 'next/dynamic'
import { BsTelegram, BsTwitterX } from 'react-icons/bs'
import { FaTelegramPlane } from 'react-icons/fa'
import { CgWebsite } from 'react-icons/cg'
import { PiTelegramLogo } from 'react-icons/pi'
import { SocialMediaLinks } from '../SocialMediaLinks'

interface NavbarProps {
    item: String
}

// add this
const WalletMultiButtonDynamic = dynamic(
    async () =>
        (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
)

export const Navbar = () => {
    return (
        <div className="fixed w-full shadow-sm z-50">
            <div className="py-3 border-b border-b-gray-800 backdrop-blur-sm">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <div className="flex flex-row items-center gap-2 sm:gap-4">
                            <Logo />
                            <UserMenu />
                        </div>
                        <div className="flex flex-row gap-3">
                            <SocialMediaLinks />
                            <WalletMultiButtonDynamic className="text-red" />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}
