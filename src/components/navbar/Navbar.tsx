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
                        <div className="flex flex-row justify-center items-center gap-2 sm:gap-4">
                            <a
                                href="https://x.com/joodonsol"
                                target="_blank"
                                rel="noopener"
                            >
                                <BsTwitterX className="cursor-pointer w-3 h-3 sm:w-4 sm:h-4" />
                            </a>
                            <a
                                href="https://t.me/joodonsol"
                                target="_blank"
                                rel="noopener"
                            >
                                <BsTelegram className="cursor-pointer  w-3 h-3 sm:w-4 sm:h-4" />
                            </a>
                            <a
                                href="https://dexscreener.com/solana/huwamsh3x6vtsm73unemsmfn4ygf4kfdne8ahy6ez5ly"
                                target="_blank"
                                rel="noopener"
                            >
                                <img
                                    src="dex-screener.png"
                                    alt="dexscreener"
                                    className="hidden sm:visible rounded-full w-6 h-6"
                                />
                            </a>
                            {/* <CgWebsite className="cursor-pointer" /> */}
                        </div>
                        <WalletMultiButtonDynamic />
                    </div>
                </Container>
            </div>
        </div>
    )
}
