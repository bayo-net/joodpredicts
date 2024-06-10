'use client'

import { ROUND16_FIXTURE_RULES, ROUND16_STARTMATCH_NUM } from '@/constant'
import { v4 as uuidv4 } from 'uuid'
import { TeamVsTeamCard } from './TeamVsTeamCard'
import { getFallbackTextContent, getTeamInfoFromPosition } from '@/utils/utils'
import { useCallback } from 'react'
import _ from 'lodash'

interface Round16StandingsProps {
    allUserSelections: any
    setAllUserSelections: any
}

export const Round16Standings: React.FC<Round16StandingsProps> = ({
    allUserSelections,
    setAllUserSelections,
}) => {
    // Check from the rules

    const checkIfAlreadySelected = useCallback(
        (team: any) => {
            return allUserSelections.round16Rankings.some(
                (rankings: any) =>
                    rankings && team && rankings.code === team.code
            )
        },
        [allUserSelections]
    )

    const handleClick = (team: any, matchNumber: number) => {
        setAllUserSelections((prevState: any) => {
            const newState = _.cloneDeep(prevState)
            const { round16Rankings } = newState
            if (team !== undefined) {
                round16Rankings[matchNumber - ROUND16_STARTMATCH_NUM] = team
            }

            return newState
        })
    }

    return (
        <div
            className="
        grid
        grid-flow-row
        gap-8
        grid-cols-1
        xl:grid-cols-4
        pb-5
        "
        >
            {ROUND16_FIXTURE_RULES.map((round: any, index) => {
                return (
                    <div
                        className="flex flex-col border-[0.5px] border-[#242424] bg-[#171616] px-3 py-2 rounded-lg"
                        key={uuidv4()}
                    >
                        <div className="text-start py-2">{`Match ${
                            ROUND16_STARTMATCH_NUM + index
                        }`}</div>
                        <TeamVsTeamCard
                            handleClick={handleClick}
                            setAllUserSelections={setAllUserSelections}
                            matchNumber={ROUND16_STARTMATCH_NUM + index}
                            checkIfAlreadySelected={checkIfAlreadySelected}
                            firstTeam={getTeamInfoFromPosition(
                                round.firstTeam,
                                allUserSelections
                            )}
                            secondTeam={getTeamInfoFromPosition(
                                round.secondTeam,
                                allUserSelections
                            )}
                            firstTeamFallbackContent={getFallbackTextContent(
                                round.firstTeam
                            )}
                            secondTeamFallbackContent={getFallbackTextContent(
                                round.secondTeam
                            )}
                        />
                    </div>
                )
            })}
        </div>
    )
}
