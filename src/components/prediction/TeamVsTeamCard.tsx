'use client'

import { Team } from '@/types/sharedtypes'
import { TeamCard } from './TeamCard'
import * as _ from 'lodash'

interface TeamVsTeamCardProps {
    firstTeam: Team
    secondTeam: Team
    firstTeamFallbackContent?: string
    secondTeamFallbackContent?: string
    setAllUserSelections: any
    matchNumber: number
    checkIfAlreadySelected: any
    handleClick: any
}

export const TeamVsTeamCard: React.FC<TeamVsTeamCardProps> = ({
    matchNumber,
    firstTeam,
    secondTeam,
    firstTeamFallbackContent,
    secondTeamFallbackContent,
    handleClick,
    checkIfAlreadySelected,
}) => {
    const firstTeamPropsVal = () => {
        if (firstTeam) {
            return {
                team: firstTeam,
                isFallback: false,
            }
        } else {
            return {
                fallbackContent: firstTeamFallbackContent,
            }
        }
    }

    const secondTeamPropsVal = () => {
        if (secondTeam) {
            return {
                team: secondTeam,
                isFallback: false,
            }
        } else {
            return {
                fallbackContent: secondTeamFallbackContent,
            }
        }
    }

    return (
        <div className="flex flex-row justify-between gap-2 relative">
            <TeamCard
                {...firstTeamPropsVal()}
                matchNumber={matchNumber}
                handleClick={handleClick}
                checkIfAlreadySelected={checkIfAlreadySelected}
            />
            <div
                className="
            absolute text-[#949494] font-[500] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0A0A0A]
            flex
            justify-center
            items-center
            border-[0.5px]
            rounded-lg
            px-3
            py-2
            border-[#242424]"
            >
                vs
            </div>
            <TeamCard
                {...secondTeamPropsVal()}
                handleClick={handleClick}
                matchNumber={matchNumber}
                checkIfAlreadySelected={checkIfAlreadySelected}
            />
        </div>
    )
}
