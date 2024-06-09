'use client'

import { v4 as uuidv4 } from 'uuid'

interface StandingsProps {
    children: React.ReactNode
}

export const Standings: React.FC<StandingsProps> = ({ children }) => {
    return (
        <div
            className="
        border-dashed
        px-4
        py-3
        hover:bg-slate-600
        rounded-sm
        transition
        duration-500
        flex
        flex-row
        items-center
        border-b-2
        border-b-[#949494]
        relative
        "
            key={uuidv4()}
        >
            {children}
        </div>
    )
}