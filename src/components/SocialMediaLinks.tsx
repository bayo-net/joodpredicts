'use client'

import { BsTelegram, BsTwitterX } from 'react-icons/bs'

export const SocialMediaLinks: React.FC<{}> = () => (
    <div className="flex flex-row justify-center items-center gap-4">
        <a href="https://x.com/joodonsol" target="_blank" rel="noopener">
            <BsTwitterX className="hidden sm:block cursor-pointer w-4 h-4" />
        </a>
        <a href="https://t.me/joodonsol" target="_blank" rel="noopener">
            <BsTelegram className="hidden sm:block cursor-pointer w-4 h-4" />
        </a>
        <a
            href="https://dexscreener.com/solana/huwamsh3x6vtsm73unemsmfn4ygf4kfdne8ahy6ez5ly"
            target="_blank"
            rel="noopener"
        >
            <img
                src="/dex-screener.png"
                alt="dexscreener"
                className="hidden sm:block rounded-full w-6 h-6"
            />
        </a>
    </div>
)
