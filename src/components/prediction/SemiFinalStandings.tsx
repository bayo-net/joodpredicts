'use client'

import { SEMIFINALS_FIXTURE_RULES, SEMIS_STARTMATCH_NUM } from '@/constant'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import { getFallbackTextContent, getTeamInfoFromPosition } from '@/utils/utils'
import { TeamVsTeamCard } from './TeamVsTeamCard'
import { useCallback } from 'react'

interface SemiFinalStandingsProps {
    allUserSelections: any
    setAllUserSelections: any
}

export const SemiFinalStandings: React.FC<SemiFinalStandingsProps> = ({
    setAllUserSelections,
    allUserSelections,
}) => {
    const handleClick = (team: any, matchNumber: number) => {
        setAllUserSelections((prevState: any) => {
            const newState = _.cloneDeep(prevState)
            const { semiFinalsRankings } = newState
            if (team !== undefined) {
                semiFinalsRankings[matchNumber - SEMIS_STARTMATCH_NUM] = team
            }

            return newState
        })
    }

    const checkIfAlreadySelected = useCallback(
        (team: any) => {
            return allUserSelections.semiFinalsRankings.some(
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
        xl:grid-cols-2
        pb-5
        "
        >
            {SEMIFINALS_FIXTURE_RULES.map((round: any, index) => {
                return (
                    <div
                        className="flex flex-col border-[0.5px] border-[#242424] bg-[#171616] px-3 py-2 rounded-lg"
                        key={uuidv4()}
                    >
                        <div className="text-start py-2">{`Match ${
                            SEMIS_STARTMATCH_NUM + index
                        }`}</div>
                        <TeamVsTeamCard
                            handleClick={handleClick}
                            checkIfAlreadySelected={checkIfAlreadySelected}
                            setAllUserSelections={setAllUserSelections}
                            matchNumber={SEMIS_STARTMATCH_NUM + index}
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
