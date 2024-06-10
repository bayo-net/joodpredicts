'use client'

import { Team } from '@/types/sharedtypes'
import { TeamCard } from './TeamCard'
import * as _ from 'lodash'
import { ROUND16_STARTMATCH_NUM } from '@/constant'
import { useCallback } from 'react'

interface TeamVsTeamCardProps {
    firstTeam: Team
    secondTeam: Team
    firstTeamFallbackContent: string
    secondTeamFallbackContent: string
    allUserSelections: any
    setAllUserSelections: any
    matchNumber: number
}

export const TeamVsTeamCard: React.FC<TeamVsTeamCardProps> = ({
    matchNumber,
    firstTeam,
    secondTeam,
    firstTeamFallbackContent,
    secondTeamFallbackContent,
    allUserSelections,
    setAllUserSelections,
}) => {
    console.log('first team', firstTeam)
    console.log('second team', secondTeam)

    const handleClick = (team: any) => {
        setAllUserSelections((prevState: any) => {
            const newState = _.cloneDeep(prevState)
            const { round16Rankings } = newState
            if (
                team &&
                round16Rankings[matchNumber - ROUND16_STARTMATCH_NUM] === false
            ) {
                round16Rankings[matchNumber - ROUND16_STARTMATCH_NUM] = team
            }

            return newState
        })
    }

    const checkIfAlreadySelected = useCallback(
        (team: any) => {
            return allUserSelections.round16Rankings.some(
                (rankings: any) =>
                    rankings && team && rankings.code === team.code
            )
        },
        [allUserSelections]
    )

    console.log('new state', allUserSelections)

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
                checkIfAlreadySelected={checkIfAlreadySelected}
            />
        </div>
    )
}
