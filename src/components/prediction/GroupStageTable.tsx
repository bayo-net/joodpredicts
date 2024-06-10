'use client'

import { Team } from '@/types/sharedtypes'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'
import * as _ from 'lodash'
import { groupCountriesMap, merge } from '@/utils/utils'
import { Standings } from './Standings'
import { DeleteIcon } from '../DeleteIcon'

interface GroupStageTableProps {
    allUserSelections: any
    setAllUserSelections: any
}

export const GroupStageTable: React.FC<GroupStageTableProps> = ({
    allUserSelections,
    setAllUserSelections,
}) => {
    const allTeams = groupCountriesMap()
    const checkIfAlreadySelected = (team: Team) => {
        const groupStageRankings = allUserSelections['groupStageRankings']
        return Object.keys(groupStageRankings[team.group]).some(
            (entry) => groupStageRankings[team.group][entry].code === team.code
        )
    }

    const handleDelete = (team: Team) => {
        setAllUserSelections((prevState: any) => {
            const newState = _.cloneDeep(prevState)
            let deletedItemTeamCode
            // effect group state rankings
            const groupStageRankings = newState.groupStageRankings
            if (groupStageRankings.hasOwnProperty(team.group)) {
                for (let key in groupStageRankings[team.group]) {
                    if (
                        groupStageRankings[team.group][key].code === team.code
                    ) {
                        deletedItemTeamCode =
                            groupStageRankings[team.group][key].code
                        groupStageRankings[team.group][key] = false
                        break
                    }
                }
            }

            // effect thirdplace rankings
            const thirdPlaceRankingsFromUserSelection =
                newState.thirdPlaceRankings
            for (let thirdPlaceTeamKey in thirdPlaceRankingsFromUserSelection) {
                if (
                    thirdPlaceRankingsFromUserSelection[thirdPlaceTeamKey] &&
                    thirdPlaceRankingsFromUserSelection[thirdPlaceTeamKey]
                        .code === deletedItemTeamCode
                ) {
                    thirdPlaceRankingsFromUserSelection[thirdPlaceTeamKey] =
                        false
                }
            }
            return newState
        })
    }

    const handleSelection = (team: Team) => {
        setAllUserSelections((prevState: any) => {
            const newState = _.cloneDeep(prevState)

            // Set state for group stage rankings
            const groupStageRankings = newState.groupStageRankings
            if (groupStageRankings.hasOwnProperty(team.group)) {
                for (let key in groupStageRankings[team.group]) {
                    if (groupStageRankings[team.group][key] === false) {
                        groupStageRankings[team.group][key] = team
                        break
                    }
                }
            }

            return newState
        })
    }

    const PopulateStandings = ({ group }: { group: string }) => {
        return allUserSelections['groupStageRankings'][group].map(
            (team: Team, index: number) => (
                <Standings key={uuidv4()}>
                    <p className="font-[500] text-[#949494]">{`${
                        index + 1
                    }.`}</p>
                    {team && (
                        <div
                            className="flex flex-row gap-2 pl-5 items-center"
                            key={uuidv4()}
                        >
                            <Image
                                src={team.url}
                                width={15}
                                height={20}
                                alt="flag"
                            />
                            <p className="text-[12px]">{team.name}</p>
                            <div
                                className="absolute right-0 pr-4"
                                onClick={() => handleDelete(team)}
                            >
                                <DeleteIcon />
                            </div>
                        </div>
                    )}
                </Standings>
            )
        )
    }

    return (
        <div
            className="
                grid
                grid-flow-row
                gap-8
                grid-cols-1
                xl:grid-cols-3
                pb-5
                "
        >
            {allTeams.map((teamsByGroup) => (
                <div
                    className="flex flex-col border-[0.5px] border-[#242424] bg-[#171616] px-3 py-2 rounded-lg"
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
                                    bg-[#292727]
                                    rounded-md 
                                    hover:bg-[#1D2634]
                                    transition
                                    duration-300
                                    border-[#242424]
                                    hover:border-[#407ED2]
                                    border-[0.5px]
                                    `,
                                    checkIfAlreadySelected(team)
                                        ? 'cursor-not-allowed bg-[#1D2634] border-[#407ED2]'
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
                    <div className="flex flex-col bg-[#0A0A0A] rounded-lg">
                        <PopulateStandings
                            group={teamsByGroup[0].group}
                            key={uuidv4()}
                        />
                    </div>
                    <p className="italic text-gray-500 text-[10px] leading-[12.1px] pt-3">
                        Click on countries in the order you think would rank
                    </p>
                </div>
            ))}
        </div>
    )
}
