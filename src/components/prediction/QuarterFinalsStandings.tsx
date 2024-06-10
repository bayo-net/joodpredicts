'use client'

import { v4 as uuidv4 } from 'uuid'
interface QuarterFinalsStandingsProps {
    allUserSelections: any
    setAllUserSelections: any
}
import {
    QUARTERFINALS_FIXTURE_RULES,
    QUARTERS_STARTMATCH_NUM,
    ROUND16_STARTMATCH_NUM,
} from '@/constant'
import { getFallbackTextContent, getTeamInfoFromPosition } from '@/utils'
import { TeamVsTeamCard } from './TeamVsTeamCard'
import { useCallback } from 'react'
import _ from 'lodash'

export const QuarterFinalsStandings: React.FC<QuarterFinalsStandingsProps> = ({
    allUserSelections,
    setAllUserSelections,
}) => {
    const handleClick = (team: any, matchNumber: number) => {
        setAllUserSelections((prevState: any) => {
            const newState = _.cloneDeep(prevState)
            const { quarterFinalsRankings } = newState
            if (typeof team !== 'undefined') {
                console.log('going inside', team)
                quarterFinalsRankings[matchNumber - QUARTERS_STARTMATCH_NUM] =
                    team
            }

            return newState
        })
    }
    const checkIfAlreadySelected = useCallback(
        (team: any) => {
            return allUserSelections.quarterFinalsRankings.some(
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
        xl:grid-cols-4
        pb-5
        "
        >
            {QUARTERFINALS_FIXTURE_RULES.map((round: any, index) => {
                return (
                    <div
                        className="flex flex-col border-[0.5px] border-[#242424] bg-[#171616] px-3 py-2 rounded-lg"
                        key={uuidv4()}
                    >
                        <div className="text-start py-2">{`Match ${
                            QUARTERS_STARTMATCH_NUM + index
                        }`}</div>
                        <TeamVsTeamCard
                            handleClick={handleClick}
                            checkIfAlreadySelected={checkIfAlreadySelected}
                            setAllUserSelections={setAllUserSelections}
                            matchNumber={QUARTERS_STARTMATCH_NUM + index}
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
