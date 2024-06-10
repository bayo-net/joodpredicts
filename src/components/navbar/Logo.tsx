'use client'

export const Logo = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold">JOODPredicts</h1>
            <div className="flex flex-row text-sm text-gray-500 gap-1">
                <p>by</p>
                <img
                    src="./logo.png"
                    width={20}
                    height={20}
                    alt="jood_logo"
                    className="rounded-full"
                />
                <a
                    target="_blank"
                    href="https://joodonsol.com/"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:underline transition-all duration-300"
                >
                    JOODonSOL
                </a>
            </div>
        </div>
    )
}
