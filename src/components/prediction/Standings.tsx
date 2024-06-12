'use client'

import { v4 as uuidv4 } from 'uuid'

interface StandingsProps {
    children: React.ReactNode
}

export const Standings: React.FC<StandingsProps> = ({ children }) => {
    return (
        <div
            className="
            border-b-[0.5px]
            border-dashed
            px-4
            py-3
            rounded-sm
            transition
            duration-500
            flex
            flex-row
            items-center
            relative
            "
            key={uuidv4()}
        >
            {children}
        </div>
    )
}
