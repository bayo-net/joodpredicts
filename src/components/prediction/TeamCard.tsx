'use client'

import { merge } from '@/utils/utils'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'

interface TeamCardProps {
    team?: any
    isFallback?: boolean
    fallbackContent?: string
    handleClick: any
    checkIfAlreadySelected: any
    matchNumber: any
}

export const TeamCard: React.FC<TeamCardProps> = ({
    team,
    isFallback = true,
    fallbackContent,
    handleClick,
    checkIfAlreadySelected,
    matchNumber,
}) => {
    return (
        <div
            className={merge(
                `
                bg-[#0A0A0A]
                flex
                flex-col
                justify-center
                items-center
                h-[120px]
                w-full
                rounded-lg
                hover:bg-[#1D2634]
                transition
                duration-300
                border-[#242424]
                hover:border-[#407ED2]
                border-[0.5px]
                `,
                checkIfAlreadySelected(team)
                    ? 'border-[#407ED2] bg-[#1D2634]'
                    : 'border-[#242424]'
            )}
            key={uuidv4()}
            onClick={() => handleClick(team, matchNumber)}
        >
            {!isFallback && (
                <>
                    {' '}
                    <Image
                        src={team.url!}
                        width={48}
                        height={36}
                        alt="team_logo"
                    />
                    <h2 className="font-[500] text-sm py-3">{team.name}</h2>
                </>
            )}
            {isFallback && (
                <h2 className="font-[500] text-[12px] text-white">
                    {fallbackContent}
                </h2>
            )}
        </div>
    )
}
