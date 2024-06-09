'use client'

import { THIRD_PLACE_STANDING } from '@/constant'
import { merge } from '@/utils'
import Image from 'next/image'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import * as _ from 'lodash'
import { MdDelete } from 'react-icons/md'
import { GroupStageCard } from './GroupStageCard'
import { Standings } from './Standings'

interface ThirdPlaceRankingsProps {
    userSelection: any
    setThirdPlaceRankings: any
    thirdPlaceRankings: any
    setThirdPlaceUserSelection: any
    thirdPlaceUserSelection: any
}

export const ThirdPlaceRankings: React.FC<ThirdPlaceRankingsProps> = ({
    userSelection,
    setThirdPlaceRankings,
    thirdPlaceRankings,
    thirdPlaceUserSelection,
    setThirdPlaceUserSelection,
}) => {
    const checkIfAlreadySelected = (index: number) => {
        return Object.keys(thirdPlaceUserSelection).some(
            (item) =>
                thirdPlaceUserSelection[item] !== false &&
                thirdPlaceRankings[index].code ===
                    thirdPlaceUserSelection[item].code
        )
    }

    const handleSelection = (index: number) => {
        if (!checkIfAlreadySelected(index)) {
            setThirdPlaceUserSelection((prevState: any) => {
                const newState = _.cloneDeep(prevState)

                if (thirdPlaceRankings[index] !== false) {
                    for (let key in newState) {
                        // Use newState here instead of thirdPlaceUserSelection
                        if (newState[key] === false) {
                            newState[key] = thirdPlaceRankings[index]
                            break
                        }
                    }
                }
                console.log(thirdPlaceRankings[index])

                return newState
            })
        }
    }

    const handleDelete = (index: any) => {
        setThirdPlaceUserSelection((prevState: any) => {
            const newState = _.cloneDeep(prevState)
            newState[index] = false
            return newState
        })
    }

    const PopulateStandings = () => {
        return Object.keys(thirdPlaceUserSelection).map((team, index) => (
            <Standings>
                <p>{index + 1}</p>
                {thirdPlaceUserSelection[team] && (
                    <div className="flex flex-row gap-2 pl-5">
                        <Image
                            src={thirdPlaceUserSelection[team].url}
                            width={15}
                            height={20}
                            alt="flag"
                        />
                        <p>{thirdPlaceUserSelection[team].name}</p>
                        <div
                            className="absolute right-0 pr-4"
                            onClick={() => handleDelete(team)}
                        >
                            <MdDelete className="w-5 h-5 cursor-pointer" />
                        </div>
                    </div>
                )}
            </Standings>
        ))
    }

    useEffect(() => {
        for (let group in userSelection) {
            for (let team in userSelection[group]) {
                if (
                    team &&
                    userSelection[group][THIRD_PLACE_STANDING - 1] !== false
                ) {
                    setThirdPlaceRankings((prevState: any) => {
                        const thirdPlaceRankingsState = _.cloneDeep(prevState)
                        const newTeam =
                            userSelection[group][THIRD_PLACE_STANDING - 1]

                        // Check if the newTeam is already in the rankings
                        const isAlreadyInRankings = Object.values(
                            thirdPlaceRankingsState
                        ).some(
                            (rankedTeam: any) =>
                                rankedTeam && rankedTeam.code === newTeam.code
                        )

                        if (!isAlreadyInRankings) {
                            // Find the first false value to replace with newTeam
                            for (let key2 in thirdPlaceRankingsState) {
                                if (thirdPlaceRankingsState[key2] === false) {
                                    thirdPlaceRankingsState[key2] = newTeam
                                    break
                                }
                            }
                        }

                        return thirdPlaceRankingsState
                    })
                }
            }
        }
        // Check for and remove entries that are no longer in userSelection
        setThirdPlaceRankings((prevState: any) => {
            const thirdPlaceRankingsState = _.cloneDeep(prevState)

            for (let key in thirdPlaceRankingsState) {
                if (
                    thirdPlaceRankingsState[key] &&
                    !isInUserSelection(thirdPlaceRankingsState[key])
                ) {
                    thirdPlaceRankingsState[key] = false
                }
            }

            return thirdPlaceRankingsState
        })

        function isInUserSelection(team: any) {
            for (let group in userSelection) {
                for (let selectedTeam in userSelection[group]) {
                    if (
                        userSelection[group][selectedTeam] &&
                        userSelection[group][selectedTeam].code === team.code
                    ) {
                        return true
                    }
                }
            }
            return false
        }
    }, [userSelection, setThirdPlaceRankings])

    useEffect(() => {
        setThirdPlaceUserSelection((prevState: any) => {
            const newState = _.cloneDeep(prevState)

            Object.keys(newState).forEach((index) => {
                if (newState[index] !== false) {
                    const isPresentInRankings = Object.keys(
                        thirdPlaceRankings
                    ).some(
                        (index2) =>
                            thirdPlaceRankings[index2] !== false &&
                            thirdPlaceRankings[index2].code ===
                                newState[index].code
                    )

                    if (!isPresentInRankings) {
                        newState[index] = false
                    }
                }
            })

            return newState
        })
    }, [thirdPlaceRankings, setThirdPlaceRankings, setThirdPlaceUserSelection])

    return (
        <div className="flex flex-col border-[0.5px] border-[#242424] bg-[#171616] px-3 py-2 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between mb-2 sm:space-x-2 sm:space-y-0 space-y-2">
                {thirdPlaceRankings &&
                    Object.keys(thirdPlaceRankings).map((team: any) => {
                        return (
                            <GroupStageCard
                                checkIfAlreadySelected={checkIfAlreadySelected}
                                index={team}
                                handleSelection={handleSelection}
                            >
                                {thirdPlaceRankings[team] && (
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row gap-2">
                                        <Image
                                            src={thirdPlaceRankings[team].url}
                                            alt="country_image"
                                            width={20}
                                            height={15}
                                        />
                                        <p>
                                            {thirdPlaceRankings[team].shortName}
                                        </p>
                                    </div>
                                )}
                            </GroupStageCard>
                        )
                    })}
            </div>
            <div className="flex flex-col bg-[#0A0A0A] rounded-lg">
                <PopulateStandings />
            </div>
        </div>
    )
}
