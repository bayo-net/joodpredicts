'use client'

import { useRouter } from 'next/navigation'

export const Banner = () => {
    const router = useRouter()

    const handleClick = () => {
        router.push('/prediction')
    }
    return (
        <div className="min-w-screen min-h-screen">
            <button
                className="px-5 py-2 bg-orange-500 text-black uppercase rounded-lg shadow-sm text-lg border-orange-500"
                onClick={handleClick}
            >
                Make a prediction
            </button>
        </div>
    )
}
