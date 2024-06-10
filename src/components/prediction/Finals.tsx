'use client'

import {
    FINALS_FIXTURE_RULES,
    FINALS_STARTMATCH_NUM,
    SEMIFINALS_FIXTURE_RULES,
    SEMIS_STARTMATCH_NUM,
} from '@/constant'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import { getFallbackTextContent, getTeamInfoFromPosition } from '@/utils'
import { TeamVsTeamCard } from './TeamVsTeamCard'
import { useCallback } from 'react'

interface FinalsProps {
    allUserSelections: any
    setAllUserSelections: any
}

export const Finals: React.FC<FinalsProps> = ({
    setAllUserSelections,
    allUserSelections,
}) => {
    const handleClick = (team: any, matchNumber: number) => {
        setAllUserSelections((prevState: any) => {
            const newState = _.cloneDeep(prevState)
            const { finalsRankings } = newState
            if (typeof team !== 'undefined') {
                finalsRankings[matchNumber - FINALS_STARTMATCH_NUM] = team
            }

            return newState
        })
    }

    const checkIfAlreadySelected = useCallback(
        (team: any) => {
            return allUserSelections.finalsRankings.some(
                (rankings: any) =>
                    rankings && team && rankings.code === team.code
            )
        },
        [allUserSelections]
    )

    return (
        <div
            className="
        grid
        grid-flow-row
        gap-8
        grid-cols-1
        pb-5
        "
        >
            {FINALS_FIXTURE_RULES.map((round: any, index) => {
                return (
                    <div
                        className="flex flex-col border-[0.5px] border-[#242424] bg-[#171616] px-3 py-2 rounded-lg"
                        key={uuidv4()}
                    >
                        <div className="text-start py-2">{`Match ${
                            FINALS_STARTMATCH_NUM + index
                        }`}</div>
                        <TeamVsTeamCard
                            handleClick={handleClick}
                            checkIfAlreadySelected={checkIfAlreadySelected}
                            setAllUserSelections={setAllUserSelections}
                            matchNumber={FINALS_STARTMATCH_NUM + index}
                            firstTeam={getTeamInfoFromPosition(
                                round.firstTeam,
                                allUserSelections
                            )}
                            secondTeam={getTeamInfoFromPosition(
                                round.secondTeam,
                                allUserSelections
                            )}
                            firstTeamFallbackContent={getFallbackTextContent(
                                round.firstTeam!
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
