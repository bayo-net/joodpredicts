'use client'

import Image from 'next/image'
import * as _ from 'lodash'
import { GroupStageCard } from './GroupStageCard'
import { Standings } from './Standings'
import { getThirdPlaceRankings } from '@/utils'
import { DeleteIcon } from '../DeleteIcon'
import { v4 as uuidv4 } from 'uuid'

interface ThirdPlaceRankingsProps {
    allUserSelections: any
    setAllUserSelections: any
}

export const ThirdPlaceRankings: React.FC<ThirdPlaceRankingsProps> = ({
    allUserSelections,
    setAllUserSelections,
}) => {
    const thirdPlaceRankingsFromGroups =
        getThirdPlaceRankings(allUserSelections)
    const checkIfAlreadySelected = (index: number) => {
        const { thirdPlaceRankings: thirdPlaceRankingsUserSelection } =
            allUserSelections
        return Object.keys(thirdPlaceRankingsUserSelection).some(
            (team) =>
                thirdPlaceRankingsUserSelection[team] !== false &&
                thirdPlaceRankingsFromGroups[index].code ===
                    thirdPlaceRankingsUserSelection[team].code
        )
    }

    const handleSelection = (selectedIndex: number) => {
        if (!checkIfAlreadySelected(selectedIndex)) {
            setAllUserSelections((prevState: any) => {
                const newState = _.cloneDeep(prevState)
                const { thirdPlaceRankings: thirdPlaceRankingsUserSelection } =
                    allUserSelections
                for (let index in thirdPlaceRankingsUserSelection) {
                    if (!thirdPlaceRankingsUserSelection[index]) {
                        thirdPlaceRankingsUserSelection[index] =
                            thirdPlaceRankingsFromGroups[selectedIndex]
                        break
                    }
                }
                return newState
            })
        }
    }

    const handleDelete = (selectedIndex: any) => {
        setAllUserSelections((prevState: any) => {
            const newState = _.cloneDeep(prevState)
            const { thirdPlaceRankings } = allUserSelections
            thirdPlaceRankings[selectedIndex] = false
            return newState
        })
    }

    const PopulateStandings = () => {
        const thirdPlaceUserSelection = allUserSelections.thirdPlaceRankings
        return Object.keys(thirdPlaceUserSelection).map((team, index) => (
            <Standings key={uuidv4()}>
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
                            <DeleteIcon />
                        </div>
                    </div>
                )}
            </Standings>
        ))
    }

    return (
        <div className="flex flex-col border-[0.5px] border-[#242424] bg-[#171616] px-3 py-2 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between mb-2 sm:space-x-2 sm:space-y-0 space-y-2">
                {thirdPlaceRankingsFromGroups &&
                    Object.keys(thirdPlaceRankingsFromGroups).map(
                        (team: any) => {
                            return (
                                <GroupStageCard
                                    key={uuidv4()}
                                    checkIfAlreadySelected={
                                        checkIfAlreadySelected
                                    }
                                    index={team}
                                    handleSelection={() =>
                                        handleSelection(team)
                                    }
                                >
                                    {thirdPlaceRankingsFromGroups[team] && (
                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row gap-2">
                                            <Image
                                                src={
                                                    thirdPlaceRankingsFromGroups[
                                                        team
                                                    ].url
                                                }
                                                alt="country_image"
                                                width={20}
                                                height={15}
                                            />
                                            <p>
                                                {
                                                    thirdPlaceRankingsFromGroups[
                                                        team
                                                    ].shortName
                                                }
                                            </p>
                                        </div>
                                    )}
                                </GroupStageCard>
                            )
                        }
                    )}
            </div>
            <div className="flex flex-col bg-[#0A0A0A] rounded-lg">
                <PopulateStandings />
            </div>
            <p className="italic text-gray-500 text-[10px] leading-[12.1px] pt-3">
                Click on countries in the order you think would rank
            </p>
        </div>
    )
}
