'use client'

import { FaXTwitter } from 'react-icons/fa6'

interface ShareOnTwiiterProps {
    url1: string
    url2: string
}

export const ShareOnTwiiter: React.FC<ShareOnTwiiterProps> = ({
    url1,
    url2,
}) => {
    return (
        <a
            className="
px-3
py-2
rounded-lg
bg-gradient-to-r from-[#004AAD] to-[#001E47]
font-semibold
text-sm
text-[#F9F9F9]
border-[0.5px]
border-[#407ED2]
flex items-center justify-center
cursor-pointer
"
            target="_blank"
            rel="noopener"
            href={`https://twitter.com/intent/tweet?text=Here is my JOODPredicts EURO Cup Bracket Submission ${url1}, try out JOODPredicts
            for EURO CUP 2024 here ${url2}`}
            data-size="large"
        >
            Share on
            <FaXTwitter className="ml-2" />
        </a>
    )
}
