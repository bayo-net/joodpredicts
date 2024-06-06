'use client'

import { groups, teams } from '@/constant'
import { Team } from '@/types/sharedtypes'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'
import * as _ from 'lodash'
import { merge } from '@/utils'
import { MdDelete } from 'react-icons/md'
import { useEffect, useState } from 'react'

interface GroupStageTableProps {
    setUserSelection: any
    userSelection: any
    thirdPlaceRankings: any
    setThirdPlaceRankings: any
}

export const GroupStageTable: React.FC<GroupStageTableProps> = ({
    setUserSelection,
    userSelection,
    thirdPlaceRankings,
    setThirdPlaceRankings,
}) => {
    const checkIfAlreadySelected = (team: Team) => {
        return Object.keys(userSelection[team.group]).some(
            (entry) => userSelection[team.group][entry].code === team.code
        )
    }

    const handleDelete = (team: Team) => {
        setUserSelection((prevState: any) => {
            const newState = _.cloneDeep(prevState)

            if (newState.hasOwnProperty(team.group)) {
                for (let key in newState[team.group]) {
                    if (newState[team.group][key].code === team.code) {
                        newState[team.group][key] = false
                        break
                    }
                }
            }
            return newState
        })
    }

    const handleSelection = (team: Team) => {
        setUserSelection((prevState: any) => {
            const newState = _.cloneDeep(prevState)

            if (newState.hasOwnProperty(team.group)) {
                for (let key in newState[team.group]) {
                    if (newState[team.group][key] === false) {
                        newState[team.group][key] = team
                        break
                    }
                }
            }

            return newState
        })
    }

    const allTeamsGroupByName: any[] = []
    groups.forEach((group) => {
        const teamsByGroup = teams.filter((team: Team) => team.group === group)
        allTeamsGroupByName.push(teamsByGroup)
    })

    const PopulateStandings = ({ group }: { group: string }) => {
        return userSelection[group].map((team: Team, index: number) => (
            <div
                className="
                    border-dotted
                    px-4
                    py-3
                    hover:bg-slate-600
                    rounded-sm
                    transition
                    duration-500
                    flex
                    flex-row
                    relative
                    "
                key={uuidv4()}
            >
                <span>{index + 1}</span>
                {team && (
                    <div className="flex flex-row gap-2 pl-5">
                        <Image
                            src={team.url}
                            width={15}
                            height={20}
                            alt="flag"
                        />
                        <p>{team.name}</p>
                        <div
                            className="absolute right-0 pr-4"
                            onClick={() => handleDelete(team)}
                        >
                            <MdDelete className="w-5 h-5 cursor-pointer" />
                        </div>
                    </div>
                )}
            </div>
        ))
    }

    return (
        <div
            className="
                grid
                grid-flow-row
                gap-8
                grid-cols-1
                md:grid-cols-3
                2xl:grid-cols-5
                pb-5
                "
        >
            {allTeamsGroupByName.map((teamsByGroup) => (
                <div
                    className="flex flex-col border px-3 py-2 rounded-lg"
                    key={uuidv4()}
                >
                    <div className="text-start py-2">{`Group ${teamsByGroup[0].group}`}</div>
                    <div className="flex flex-row justify-between gap-3 mb-2">
                        {teamsByGroup.map((team: Team) => (
                            <button
                                className={merge(
                                    `
                                    flex
                                    justify-center
                                    items-center
                                    gap-2
                                    px-3
                                    sm:px-6
                                    py-1
                                    bg-slate-800
                                    rounded-md 
                                    hover:bg-orange-500
                                    transition
                                    duration-300
                                    `,
                                    checkIfAlreadySelected(team)
                                        ? 'cursor-not-allowed bg-gradient-to-tl from-emerald-400 to-emerald-300 text-black'
                                        : 'cursor-pointer text-white'
                                )}
                                onClick={() => handleSelection(team)}
                                disabled={checkIfAlreadySelected(team)}
                                key={uuidv4()}
                            >
                                <Image
                                    src={team.url}
                                    alt="country_image"
                                    width={20}
                                    height={15}
                                />
                                <p>{team.shortName}</p>
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-col">
                        <PopulateStandings group={teamsByGroup[0].group} />
                    </div>
                    <p className="italic text-gray-500">
                        Click on countries in the order you think would rank
                    </p>
                </div>
            ))}
        </div>
    )
}
